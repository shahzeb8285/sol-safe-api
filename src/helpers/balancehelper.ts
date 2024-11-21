import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
  TokenType,
  type SafeBalanceResponse,
  type TokenConfigType,
  type TokenInfo,
} from "../types";
import tokenRawList from "../config/tokens.list";
import { priceConfig } from "../config/priceconfig";
import cron from "node-cron";
import axios from "axios";

export class BalanceHelper {
  private connection: Connection;
  public tokenConfigs: TokenConfigType[] = tokenRawList;

  constructor() {
    this.connection = new Connection(process.env.SOL_RPC_URL!);
    this.initPriceCron();
  }

  private fetchPrice = async (address: string): Promise<number> => {
    const url = `https://api.jup.ag/price/v2?ids=${priceConfig.SOLANA_ADDRESS},${address}`;
    try {
      const resp = await axios.get(url);
      const price = Number(resp.data.data[address].price);

      return price;
    } catch (err) {
      console.log("SAsasasasasasasas", err);
    }
    return 0;
  };

  private async initPriceCron() {
    await this.loadTokenPrice();
    cron.schedule("*/5 * * * *", async () => {
      await this.loadTokenPrice();
    });
  }

  private async loadTokenPrice() {
    const list: TokenConfigType[] = [];
    try {
      for (const tokenConfig of this.tokenConfigs) {
        if (!tokenConfig.isStable) {
          const address =
            tokenConfig.type === TokenType.NATIVE_TOKEN
              ? priceConfig.SOLANA_ADDRESS
              : tokenConfig.address;
          const price = await this.fetchPrice(address);
          tokenConfig.price = price;
        }
        list.push(tokenConfig);
      }
    } catch (err) {}

    this.tokenConfigs = list;
  }

  private async _getBalance(
    walletAddress: string
  ): Promise<SafeBalanceResponse> {
    

    let fiatTotal = 0;
    let tokens: Array<{
      tokenInfo: TokenInfo;
      balance: string;
      fiatBalance: string;
      fiatConversion: string;
    }> = [];

    try {
      const userWallet = new PublicKey(walletAddress);

      const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(
        userWallet,
        {
          programId: new PublicKey(
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          ),
        }
      );




      for (const tokenAccountInfo of tokenAccounts.value) {
        const accountData = tokenAccountInfo.account.data.parsed.info;
        const mintAddress = accountData.mint;
        const balance = accountData.tokenAmount.uiAmount;

        const tokenMetadata = this.tokenConfigs.find((i) => {
          return i.address.toLowerCase() === mintAddress.toLowerCase();
        });

        if (balance === 0) {
          continue;
        }

        let name = mintAddress;
        let symbol = mintAddress;
        let logoUri = "-";
        let tokenPrice = 0;

        if (tokenMetadata) {
          name = tokenMetadata.name;
          symbol = tokenMetadata.symbol;
          logoUri = tokenMetadata.logoUri;
          if (tokenMetadata.isStable) {
            tokenPrice = 1;
          } else {
            //todo load price
          }
        }

        const fiatBalance = balance * tokenPrice;
        fiatTotal += fiatBalance;

        tokens.push({
          tokenInfo: {
            type: TokenType.TOKEN,
            address: mintAddress,
            decimals: accountData.tokenAmount.decimals,
            symbol,
            name,
            logoUri,
          },
          balance: accountData.tokenAmount.amount,
          fiatConversion: tokenPrice.toString(),
          fiatBalance: fiatBalance.toString(),
        });
      }



      // load native balance

      const balanceInLamports = await this.connection.getBalance(userWallet);

      const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

      const nativeTokenMetadata = this.tokenConfigs.find((i) => {
        return i.type === TokenType.NATIVE_TOKEN;
      })!;



      const fiatBalance = balanceInSOL * nativeTokenMetadata.price;
      fiatTotal += fiatBalance;

      tokens.push({
        tokenInfo: {
          type: TokenType.NATIVE_TOKEN,
          address: nativeTokenMetadata.address,
          decimals: nativeTokenMetadata.decimals,
          symbol: nativeTokenMetadata.symbol,
          name: nativeTokenMetadata.name,
          logoUri: nativeTokenMetadata.logoUri,
        },

        balance: balanceInLamports.toString(),
        fiatConversion: nativeTokenMetadata.price.toString(),
        fiatBalance: fiatBalance.toString(),
      });
    } catch (error) {
      console.error("Error fetching token balances:", error);
    }

    const data: SafeBalanceResponse = {
      fiatTotal: fiatTotal.toString(),
      items: tokens,
    };

    return data;
  }
  public async getBalance(walletAddress: string): Promise<SafeBalanceResponse> {
    
    return await this._getBalance(walletAddress);
  }
}
