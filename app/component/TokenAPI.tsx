import React from 'react';
import { CurrencyAmount, Currency, Token } from '@uniswap/sdk-core';
import {
   ChainId,
   Token as Tokens,
   Fetcher,
   TradeType,
   Route,
   Trade,
   //  Pair,
   //  Currency,
   BigintIsh,
   JSBI,
   TokenAmount,
   //  CurrencyAmount,
} from '@uniswap/sdk';

// import { ChainId, Token, WETH9, CurrencyAmount } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';

import { ethers } from 'ethers';
import IUniswapV2Factory from '@uniswap/v2-core/build/IUniswapV2Factory.json';
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json';

// import {CurrencyAmount } from '@uniswap/v2-sdk';
import UniswapV2Abi from '@/app/contract/uniswapV2Abi.json';
import { TokenJsonList } from '@/app/api/tokensJson';

// import {    CurrencyAmount } from '@uniswap/sdk';

const chainId = ChainId.MAINNET;
console.log(chainId);
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // must be checksummed
const decimals = 18;

const provider = new ethers.providers.JsonRpcProvider(
   'https://mainnet.infura.io/v3/1f9136b294e248fca6fce6f5c95a0811'
);

// Define your tokens
const DAI = new Token(
   ChainId.MAINNET,
   '0x6B175474E89094C44Da98b954EedeAC495271d0F',
   18,
   'DAI',
   'DAI'
);

// Assuming WETH9 is defined similarly
const WETH9 = new Token(
   ChainId.MAINNET,
   '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // Example WETH9 address on Ethereum mainnet
   18,
   'WETH9',
   'Wrapped Ether'
);

interface TradeDetails {
   amountOut: CurrencyAmount<Currency>;
   quote: string;
   rate: number;
   // Add any other details you need here
}

// console.log(Token);

// async function createPair(

//    inputAmount: number
// ): Promise<Pair> {

export const CreatePair = async (
   inputAmount: number,
   tokenIn: Token,
   tokenOut: Token
): Promise<any> => {
   const pairAddress = Pair.getAddress(tokenIn, tokenOut);

   //  const pairAddress = Pair.getAddress(DAI, WETH9[DAI.chainId]);

   // Setup provider, import necessary ABI ...
   const pairContract = new ethers.Contract(
      pairAddress,
      IUniswapV2Pair.abi,
      provider
   );

   //  console.log(pairContract);
   const reserves = await pairContract['getReserves']();
   const [reserve0, reserve1] = reserves;
   console.log(reserves);

   const rate = reserve1 / reserve0;
   console.log(`Exchange rate: ${rate}`);

   // Determine which token is the input and which is the output
   const tokens = [tokenIn, tokenOut];
   const [token0, token1] = tokens[0].sortsBefore(tokens[1])
      ? tokens
      : [tokens[1], tokens[0]];
   console.log(tokens);

   // Calculate the output amount based on the input amount
   let outputAmount;
   if (token0.address === tokenIn.address) {
      // If tokenIn is the input token, we're calculating the amount of tokenOut we get for the input tokenIn
      outputAmount = inputAmount * (reserve1 / reserve0);
   } else {
      // If tokenOut is the input token, we're calculating the amount of tokenIn we get for the input tokenOut
      outputAmount = inputAmount * (reserve0 / reserve1);
   }

   console.log(`Input Amount: ${inputAmount.toString()}`);
   console.log(`Output Amount: ${outputAmount.toString}`);

   const pair = new Pair(
      CurrencyAmount.fromRawAmount(token0, reserve0),
      CurrencyAmount.fromRawAmount(token1, reserve1)
   );
   //  console.log(pair);
   return outputAmount;
   //  return { pair, outputAmount };
};

// // Call the createPair function with specific tokens and an input amount
// CreatePair(1000, DAI, WETH9)
//    .then((pair) => {
//       console.log(pair);
//    })
//    .catch((error) => {
//       console.error(error);
//    });

// export const CreatePair = async (
//  tokenAAddress: string,
//  tokenBAddress: string,
//    amountIn: JSBI // Assuming amountIn is in the smallest unit of the token (e.g., wei for ETH)
// ): Promise<TradeDetails> => {
//    // Create the tokens
//    const tokenA = new Token(
//       ChainId.MAINNET,
//       tokenAAddress,
//       18,
//       'TOKEN_A',
//       'Token A'
//    );
//    const tokenB = new Token(
//       ChainId.MAINNET,
//       tokenBAddress,
//       18,
//       'TOKEN_B',
//       'Token B'
//    );

//    // Get the pair address
//    const pairAddress = await Pair.getAddress(tokenA, tokenB);
//    console.log(pairAddress);

//    // Setup the pair contract
//    const pairContract = new ethers.Contract(
//       pairAddress,
//       IUniswapV2Pair.abi,
//       provider
//    );

//    console.log(pairContract);

//    // Call the getReserves function
//    const reserves = await pairContract.getReserves();
//    const [reserve0, reserve1] = reserves;

//    // Create TokenAmount instances from the reserves
//    const tokenAmountA = new TokenAmount(
//       tokenA,
//       JSBI.BigInt(reserve0.toString())
//    );
//    const tokenAmountB = new TokenAmount(
//       tokenB,
//       JSBI.BigInt(reserve1.toString())
//    );

//    // Create the pair object
//    const pair = new Pair(tokenAmountA, tokenAmountB);

//    // Calculate the output amount
//    const route = new Route([pair], tokenA, tokenB);
//    const trade = new Trade(
//       route,
//       new TokenAmount(tokenA, amountIn),
//       TradeType.EXACT_INPUT
//    );

//    console.log(route);
//    console.log(trade);
//    const amountOut = trade.outputAmount;
//    console.log(amountOut);

//    console.log(`Output amount: ${amountOut.toSignificant(6)}`);

//    const tradeDetails: TradeDetails = {
//       amountOut: amountOut,
//       quote: 'Your quote here', // Replace with actual quote calculation
//       rate: 1.0, // Replace with actual rate calculation
//       // Add any other details you need here
//    };
//    return tradeDetails;
// };

// export const CreatePair = async (
//    tokenAAddress: string,
//    tokenBAddress: string
// ): Promise<Pair> => {
//    // Create the tokens
//    const tokenA = new Token(chainId, tokenAAddress, 18, 'TOKEN_A', 'Token A');
//    const tokenB = new Token(chainId, tokenBAddress, 18, 'TOKEN_B', 'Token B');

//    //    // Get the pair address
//    const pairAddress = await Pair.getAddress(tokenA, tokenB);
//    console.log(pairAddress);

//    // Setup the pair contract
//    const pairContract = new ethers.Contract(
//       pairAddress,
//       IUniswapV2Pair.abi,
//       provider
//    );

//    console.log(pairContract);

//    // Call the getReserves function
//    const reserves = await pairContract.getReserves();
//    const [reserve0, reserve1] = reserves;

// const rate = reserve1 / reserve0;
// console.log(`Exchange rate: ${rate}`);

//    // Convert reserves to JSBI for arithmetic operations
//    const reserve0JSBI = JSBI.BigInt(reserve0.toString());
//    const reserve1JSBI = JSBI.BigInt(reserve1.toString());

//    console.log({ reserve0JSBI, reserve1JSBI }, 'jsbi');

//    // Calculate the exchange rate using JSBI
//    const rate = JSBI.divide(reserve1JSBI, reserve0JSBI);
//    console.log(`Exchange rate: ${JSBI.toNumber(rate)}`);

//    // Create TokenAmount instances from CurrencyAmount instances
//    const tokenAmountA = new TokenAmount(tokenA, reserve0JSBI.toString());
//    const tokenAmountB = new TokenAmount(tokenB, reserve1JSBI.toString());
//    console.log({ tokenAmountA, tokenAmountB });

//    // Create the pair object
//    const pair = new Pair(tokenAmountA, tokenAmountB);
//    console.log(pair);

//    // Create the pair object
//  const pair = new Pair(
//     CurrencyAmount.fromRawAmount(tokenA, reserve0),
//     CurrencyAmount.fromRawAmount(tokenB, reserve1)
//  );
//    //  console.log(pair);
//    return pair;
// };

// function createTokenAmount(
//    currency: Currency,
//    amount: BigintIsh
// ): CurrencyAmount {
//    // This is a placeholder. You'll need to replace this with actual logic
//    // to create a CurrencyAmount instance for your specific token.
//  return CurrencyAmount.fromRawAmount(currency, amount);
// }

// // Function to calculate the output amount for a given input amount
// async function calculateOutputAmount(
//    tokenInAddress: string,
//    tokenOutAddress: string,
//    amountIn: ethers.BigNumber
// ) {
//    // Inside your calculateOutputAmount function, before calling Fetcher.fetchPairData
//    const tokenA = new Tokens(
//       ChainId.MAINNET,
//       tokenInAddress,
//       18,
//       'TOKEN_A',
//       'Token A'
//    );
//    const tokenB = new Tokens(
//       ChainId.MAINNET,
//       tokenOutAddress,
//       18,
//       'TOKEN_B',
//       'Token B'
//    );
//    // Fetch the pair
//    const pair = (await Fetcher.fetchPairData(tokenA, tokenB, provider)) as any;
//    console.log(pair, 'calculate Output Amount');

//    //    // Calculate the output amount
//    // const route = new Route([pair], tokenA, tokenB);
//    // const amountOut = route.midPrice.toSignificant(6);

//    //    return amountOut;

//    const wei = ethers.utils.parseUnits(amountIn.toString(), 18);
//    const amountInCurrency = CurrencyAmount.fromRawAmount(
//       pair.reserve0.currency,
//       JSBI.BigInt(wei)
//    );

//    console.log(wei);
//    console.log(amountInCurrency);

//    const trade = new UniswapTrade(
//       new Route([pair], tokenA, tokenB),
//       amountInCurrency,
//       TradeType.EXACT_INPUT
//    );

//    // Calculate the output amount
//    const amountOut = trade.outputAmount;
//    console.log(`Output amount: ${amountOut.toSignificant(6)}`);
//    return pair;
// }

// // // Example usage
// const tokenInAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // Address of tokenIn
// const tokenOutAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; // Address of tokenOut
// const amountIn = ethers.utils.parseUnits('1.0', 18); // Example input amount

// calculateOutputAmount(tokenInAddress, tokenOutAddress, amountIn)
//    .then((outputAmount) => {
//       console.log('Output amount:', outputAmount);
//    })
//    .catch((error) => {
//       console.error('Error calculating output amount:', error);
//    });

// export const getTrade = async (
//    tokenAAddress: string,
//    tokenBAddress: string,
//    tradeAmount: string
// ): Promise<any> => {
//    try {
//       // Create the tokens
//       const tokenA = new Token(
//          chainId,
//          tokenAAddress,
//          18,
//          'TOKEN_A',
//          'Token A'
//       );
//       const tokenB = new Token(
//          chainId,
//          tokenBAddress,
//          18,
//          'TOKEN_B',
//          'Token B'
//       );

//       // Get the pair address
//       const pairAddress = await Pair.getAddress(tokenA, tokenB);

//       // Setup the pair contract
//       const pairContract = new ethers.Contract(
//          pairAddress,
//          IUniswapV2Pair.abi,
//          provider
//       );

//       // Get reserves
//       const reserves = await pairContract.getReserves();
//       const [reserve0, reserve1] = reserves;
//       console.log(reserves);
//       const rate = reserve1 / reserve0;
//       console.log(`Exchange rate: ${rate}`);
//       // Create route
//       const pair = new Pair(
//          CurrencyAmount.fromRawAmount(tokenA, reserve0),
//          CurrencyAmount.fromRawAmount(tokenB, reserve1)
//       );
//       console.log(pair);
//       const route = new Route([pair], tokenA, tokenB);
//       console.log(route);
//       // Create a trade
//       const trade = Trade.exactIn(
//          [new Route([pair], tokenA, tokenB)],
//          amountIn
//          // The token you want to receive
//       );

//       // Return trade details
//       return route;

//       //  // Get trade details
//       //  const amountIn = CurrencyAmount.fromRawAmount(tokenA, tradeAmount);
//       //  const trade = TradeType.EXACT_INPUT;
//       //  const { amountOut, tradePath } = route.bestTradeExactIn(
//       //     amountIn,
//       //     trade
//       //  );

//       //  // Return trade details
//       //  return {
//       //     amountOut: amountOut.toSignificant(6), // Convert to a human-readable format
//       //     tradePath: tradePath.map((token) => token?.address), // Convert token objects to addresses
//       //  };
//    } catch (error) {
//       console.error('Error getting trade:', error);
//       return null;
//    }
// };

// // Example usage
// const tokenInAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // Address of tokenIn
// const tokenOutAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; // Address of tokenOut
// const amountIn = '5.0'; // Example input amount

// getTrade(tokenInAddress, tokenOutAddress, amountIn)
//    .then((outputAmount) => {
//       console.log('Output amount:', outputAmount);
//    })
//    .catch((error) => {
//       console.error('Error calculating output amount:', error);
//    });
