import { TokenType, type TokenConfigType } from "../types";

// const tokenList: TokenConfigType[] = [
//   {
//     type: TokenType.NATIVE_TOKEN,
//     address: "0x0000000000000000000000000000000000000000",
//     decimals: 9,
//     symbol: "SOL",
//     isStable: false,
//     price: 0,
//     name: "Solana",
//     logoUri: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
//   },
//   {
//     type: TokenType.TOKEN,
//     address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
//     decimals: 6,
//     symbol: "USDC",
//     isStable: true,
//     price: 1,
//     name: "USDC",
//     logoUri:
//       "https://statics.solscan.io/cdn/imgs/s60?ref=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f736f6c616e612d6c6162732f746f6b656e2d6c6973742f6d61696e2f6173736574732f6d61696e6e65742f45506a465764643541756671535371654d32714e31787a7962617043384734774547476b5a777954447431762f6c6f676f2e706e67",
//   },
//   {
//     type: TokenType.TOKEN,
//     address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
//     decimals: 6,
//     symbol: "USDT",
//     isStable: true,
//     name: "USDT",
//     price: 1,

//     logoUri:
//       "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.svg",
//   },
// ];











const tokenList: TokenConfigType[] = [
    {
      type: TokenType.NATIVE_TOKEN,
      address: "0x0000000000000000000000000000000000000000",
      decimals: 9,
      symbol: "SOL",
      isStable: false,
      price: 0,
      name: "Solana",
      logoUri: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
    },
    {
      type: TokenType.TOKEN,
      address: '4UwnhyktCZ4cq2WuV83gp4SbkupAqXTj32sD25GHi3VU',
      decimals: 6,
      symbol: 'Sewey',
      isStable: true,
      price: 0,
      name: 'SeweyToken',
      logoUri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    },
   
   
  ];
  
export default tokenList;
