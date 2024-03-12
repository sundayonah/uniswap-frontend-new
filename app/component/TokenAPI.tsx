import React from 'react'
import { ChainId, Token, CurrencyAmount } from '@uniswap/sdk-core'
import { ethers } from 'ethers'
import IUniswapV2Factory from '@uniswap/v2-core/build/IUniswapV2Factory.json';
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json';

import { Pair } from '@uniswap/v2-sdk'
import UniswapV2Abi from '@/app/contract/uniswapV2Abi.json'
import { getAddress } from 'viem';
// import { IUniswapV2Pair } from '@uniswap/sdk';



const TokenAPI = () => {



const chainId = ChainId.MAINNET
const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // must be checksummed
const decimals = 18

const ETH = new Token(ChainId.MAINNET, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'ETH', 'Ether');
const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin');

  // console.log(DAI)
  // console.log(IUniswapV2Pair)



//   async function createPair(): Promise<Pair> {

//     // const pairAddress = await Pair.getAddress(DAI, ETH[DAI.chainId])
//     const pairAddress = await Pair.getAddress(DAI, ETH);

//     console.log(pairAddress)
// const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/1f9136b294e248fca6fce6f5c95a0811');

//   // Setup provider, import necessary ABI ...
//     const pairContract = new ethers.Contract(pairAddress, IUniswapV2Pair.abi, provider)
//     console.log(pairContract)
//   // Call the getReserves function
//   const reserves = await pairContract["getReserves"]()
//   const [reserve0, reserve1] = reserves
//     console.log(reserves.toString(), 'reserves')

//     console.log(`Reserve0: ${reserve0}, Reserve1: ${reserve1}`);

//     const rate = reserve0 / reserve1;
//     console.log(`Exchange rate: ${rate}`);
    

//     // Assuming `reserve0` is the reserve of token0 and `reserve1` is the reserve of token1
// const rateDAIInWETH = reserve0 / reserve1;
// const rateWETHInDAI = reserve1 / reserve0;

// console.log(`Rate of DAI in WETH: ${rateDAIInWETH}`);
//     console.log(`Rate of WETH in DAI: ${rateWETHInDAI}`);
//      // Calculate the exchange rate



//   // Determine the tokens
//   const tokens = [DAI, ETH]
//   const [token0, token1] = tokens[0].sortsBefore(tokens[1]) ? tokens : [tokens[1], tokens[0]]


//   // Create the pair object
//     const pair = new Pair(CurrencyAmount.fromRawAmount(token0, reserve0), CurrencyAmount.fromRawAmount(token1, reserve1))
//     console.log(pair)
//   return pair
//   }
  
//   createPair()

  


// Define the provider


const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/1f9136b294e248fca6fce6f5c95a0811');

async function createPair(tokenAAddress: string, tokenBAddress: string): Promise<Pair> {
 // Create the tokens
 const tokenA = new Token(ChainId.MAINNET, tokenAAddress, 18, 'TOKEN_A', 'Token A');
 const tokenB = new Token(ChainId.MAINNET, tokenBAddress, 18, 'TOKEN_B', 'Token B');

 // Get the pair address
  const pairAddress = await Pair.getAddress(tokenA, tokenB);
  console.log(pairAddress)

 // Setup the pair contract
 const pairContract = new ethers.Contract(pairAddress, IUniswapV2Pair.abi, provider);

 // Call the getReserves function
 const reserves = await pairContract.getReserves();
 const [reserve0, reserve1] = reserves;

  
      const rate = reserve1 / reserve0;
      console.log(`Exchange rate: ${rate}`);
  

 // Create the pair object
 const pair = new Pair(CurrencyAmount.fromRawAmount(tokenA, reserve0), CurrencyAmount.fromRawAmount(tokenB, reserve1));
console.log(pair)
 return pair;
}

// Example usage:
// const tokenAAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI
//   const tokenBAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // WETH9
  
  const tokenAAddress = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // DAI
const tokenBAddress = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'; // WETH9

createPair(tokenAAddress, tokenBAddress)
 .then(pair => {
    console.log(pair,'pair created successfully');
 })
 .catch(error => {
    console.error('Error creating pair:', error);
 });

  return (
    <div className='mt-24'><h1>TokenAPI</h1></div>
  )
}

export default TokenAPI