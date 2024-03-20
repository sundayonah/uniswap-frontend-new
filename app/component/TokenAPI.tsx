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
// console.log(chainId);
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // must be checksummed
const decimals = 18;

const provider = new ethers.providers.JsonRpcProvider(
   'https://mainnet.infura.io/v3/1f9136b294e248fca6fce6f5c95a0811'
);

interface TradeDetails {
   amountOut: CurrencyAmount<Currency>;
   quote: string;
   rate: number;
}

// export const CreatePair = async (
//    inputAmount: string,
//    tokenIn: Token,
//    tokenOut: Token
// ): Promise<any> => {
//    const pairAddress = Pair.getAddress(tokenIn, tokenOut);

//    const pairContract = new ethers.Contract(
//       pairAddress,
//       IUniswapV2Pair.abi,
//       provider
//    );

//    //  console.log(pairContract);
//    const reserves = await pairContract['getReserves']();
//    const [reserve0, reserve1] = reserves;

//    const exchangeRateForToken = reserve0 / reserve1;

//    // Format the exchange rate to a specific number of decimal places

// const adjustedReserve0 = reserve0 / Math.pow(10, tokenIn.decimals);
// const adjustedReserve1 = reserve1 / Math.pow(10, tokenOut.decimals);

// // Calculate exchange rate
// const exchangeRate1 = adjustedReserve1 / adjustedReserve0;

// console.log(`Exchange Rate exchangeRate1: ${exchangeRate1}`);

//    /*
//    36282.11 formatted exchange rate
//     */
//    const formattedExchangeRate = (
//       parseFloat(inputAmount) * exchangeRateForToken
//    ).toFixed(2);
//    console.log(formattedExchangeRate, 'formatted exchange rate');
//    /*
//     */
//    /*
//    0.000276 rate for tokens reserves
//     */
//    const exchangeRate = reserve1 / reserve0;
//    console.log(exchangeRate.toFixed(6), 'rate for tokens reserves');
//    /*
//     */
//    const exchangeRateForTokens = exchangeRate / Math.pow(10, tokenOut.decimals);
//    const finalExchange = exchangeRateForTokens.toFixed(6);
//    console.log(finalExchange, 'final exchange');

//    const tokens = [tokenIn, tokenOut];
//    const [token0, token1] = tokens[0].sortsBefore(tokens[1])
//       ? tokens
//       : [tokens[1], tokens[0]];

//    const inputAmountInWei = ethers.utils.parseUnits(
//       inputAmount,
//       tokenIn.decimals
//    );

//    console.log(inputAmountInWei, 'input amount in wei');

//    let outputAmount;
//    if (token0.address === tokenIn.address) {
//       // If tokenIn is the input token, we're calculating the amount of tokenOut we get for the input tokenIn
//       outputAmount = inputAmountInWei.mul(reserve1).div(reserve0);
//    } else {
//       // If tokenOut is the input token, we're calculating the amount of tokenIn we get for the input tokenOut
//       outputAmount = inputAmountInWei.mul(reserve0).div(reserve1);
//    }

//    const formattedOutputAmount = ethers.utils.formatUnits(
//       outputAmount.div(ethers.BigNumber.from(1e12)),
//       tokenOut.decimals
//    );

//    console.log(`Input Amount: ${inputAmount}`);
//    console.log(`Output Amount: ${outputAmount}`);

//    const pair = new Pair(
//       CurrencyAmount.fromRawAmount(token0, reserve0),
//       CurrencyAmount.fromRawAmount(token1, reserve1)
//    );
//    //  console.log(pair);
//    return {
//       outputAmount,
//       pair,
//       // toFixedRatePerOne,
//       exchangeRate,
//       finalExchange,
//       formattedExchangeRate,
//    };
// };

// Define your tokens

export const CreatePair = async (
   inputAmount: string,
   tokenIn: Token,
   tokenOut: Token
): Promise<any> => {
   const pairAddress = Pair.getAddress(tokenIn, tokenOut);

   const pairContract = new ethers.Contract(
      pairAddress,
      IUniswapV2Pair.abi,
      provider
   );

   console.log(pairContract);
   const reserves = await pairContract['getReserves']();
   const [reserve0, reserve1] = reserves;

   const exchangeRateForToken = reserve0 / reserve1;

   // Format the exchange rate to a specific number of decimal places

   const adjustedReserve0 = reserve0 / Math.pow(10, tokenIn.decimals);
   const adjustedReserve1 = reserve1 / Math.pow(10, tokenOut.decimals);

   // Calculate exchange rate
   const exchangeRate1 = adjustedReserve1 / adjustedReserve0;

   console.log(`Exchange Rate exchangeRate1: ${exchangeRate1}`);

   /*
   36282.11 formatted exchange rate
    */
   const formattedExchangeRate = (
      parseFloat(inputAmount) * exchangeRateForToken
   ).toFixed(2);
   console.log(formattedExchangeRate, 'formatted exchange rate');
   /*
    */
   /*
   0.000276 rate for tokens reserves
    */
   const exchangeRate = reserve1 / reserve0;
   console.log(exchangeRate.toFixed(6), 'rate for tokens reserves');
   /*
    */
   const exchangeRateForTokens = exchangeRate / Math.pow(10, tokenOut.decimals);
   const finalExchange = exchangeRateForTokens.toFixed(6);
   console.log(finalExchange, 'final exchange');

   const tokens = [tokenIn, tokenOut];
   const [token0, token1] = tokens[0].sortsBefore(tokens[1])
      ? tokens
      : [tokens[1], tokens[0]];

   const inputAmountInWei = ethers.utils.parseUnits(
      inputAmount,
      tokenIn.decimals
   );

   console.log(inputAmountInWei, 'input amount in wei');

   let outputAmount;
   if (token0.address === tokenIn.address) {
      // If tokenIn is the input token, we're calculating the amount of tokenOut we get for the input tokenIn
      outputAmount = inputAmountInWei.mul(reserve1).div(reserve0);
   } else {
      // If tokenOut is the input token, we're calculating the amount of tokenIn we get for the input tokenOut
      outputAmount = inputAmountInWei.mul(reserve0).div(reserve1);
   }

   const formattedOutputAmount = ethers.utils.formatUnits(
      outputAmount.div(ethers.BigNumber.from(1e12)),
      tokenOut.decimals
   );

   console.log(`Input Amount: ${inputAmount}`);
   console.log(`Output Amount: ${outputAmount}`);

   const pair = new Pair(
      CurrencyAmount.fromRawAmount(token0, reserve0),
      CurrencyAmount.fromRawAmount(token1, reserve1)
   );
   //  console.log(pair);
   return {
      outputAmount,
      pair,
      // toFixedRatePerOne,
      exchangeRate,
      finalExchange,
      formattedExchangeRate,
   };
};

const WBTC = new Token(
   ChainId.MAINNET,
   '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
   8,
   'WETH',
   'Wrapped Ether'
);
const WETH9 = new Token(
   ChainId.MAINNET,
   '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',

   //  '0xdac17f958d2ee523a2206206994597c13d831ec7',
   18,
   'WBTC',
   'Wrapped Bitcoin'
);

CreatePair('1', WETH9, WBTC);
//  .then((result) => {
//     console.log(result, 'Result......');
//  })
//  .catch((error) => {
//     console.error('Error calculating output amount...:', error);
//  });
