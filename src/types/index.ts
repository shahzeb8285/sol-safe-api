export enum TokenType {
  TOKEN = "TOKEN",
  NFT = "NFT",
  NATIVE_TOKEN = "NATIVE_TOKEN",
}

export type SafeBalanceResponse = {
  fiatTotal: string;
  items: Array<{
    tokenInfo: TokenInfo;
    balance: string;
    fiatBalance: string;
    fiatConversion: string;
  }>;
};

export type TokenInfo = {
  type: TokenType;
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  logoUri: string;
};

export type TokenConfigType = {
  type: TokenType;
  address: string
  decimals: number
  symbol:string
  name: string
  logoUri: string,
  isStable: boolean
  price: number
};
