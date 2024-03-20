'use client';

import React, { useEffect, useState } from 'react';
import Header from '../component/header';

import { ImageSvg } from '@/app/component/Image';
import axios from 'axios';
import { ethers } from 'ethers';
import {
   Fetcher,
   Percent,
   Route,
   Token,
   TokenAmount,
   Trade,
   TradeType,
} from '@uniswap/sdk';
import IUniswapV2Factory from '@uniswap/v2-core/build/IUniswapV2Factory.json';
// import Sample from '../component/TokenAPI';
// import styles from './Button.module.css';

// import { DAI, WETH } from '@uniswap/sdk-tokens'; // Adjust the import based on the actual library you're using

// Define an interface for the coin objects
interface Coin {
   symbol: string;
   name: string;
   coin: string;
   // Add other properties as needed
}
export const FetchPairToken = async (tokenIn: string, tokenOut: string) => {
   try {
      const response = await axios.get(
         `https://sideshift.ai/api/v2/pair/${tokenIn}/${tokenOut}`
      );
      console.log(response, 'pair token response');
      return response;
   } catch (error) {
      console.error('Error fetching pair token:', error);
   }
};

const Swap = () => {
   interface TokenAmountAndSlippage {
      amount: number;
      slippage: number;
      walletAddress: string;
   }

   // Define the token amount and slippage
   const args: TokenAmountAndSlippage = {
      amount: 5, // Example amount
      slippage: 50, // Example slippage in percentage
      walletAddress: '0x1BB8Dd168a0A6B0d51e0343163aF38Baa330F7c3', // Example wallet address
   };

   const [tokenIn, setTokenIn] = useState<string>('');
   const [tokenOut, setTokenOut] = useState<string>('');
   const [pairingInfo, setPairingInfo] = useState<any>(null); // Replace 'any' with the actual type of the pairing info if known
   const [coins, setCoins] = useState<Coin[]>([]); //
   const [isLoading, setIsLoading] = useState(false);
   const [amount, setAmount] = useState(''); // New state for the amount
   const [isModalOpen, setIsModalOpen] = useState(false);

   //   // Define the addresses for DAI and WETH
   // const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
   //   const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
   //   const BNB_ADDRESS = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
   //   const LINK_ADDRESS = '0x514910771AF9Ca656af840dff83E8264EcF986CA'

   //   const chainId = 5

   //   // Create Token objects
   // const DAI = new Token(chainId, BNB_ADDRESS, 18, 'BNB', 'Binance Smart Chain');
   //   const WETH = new Token(chainId, LINK_ADDRESS, 18, 'LINK', 'LINK');

   //   console.log({ DAI: DAI, WETH: WETH });

   //     const UNISWAP_ROUTER_CONTRACT_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'; // Uniswap V2 Router contract address on Ethereum mainnet

   //   async function swapTokens(args:TokenAmountAndSlippage) {

   //     // Convert amountIn to a BigNumber
   // const amountInBigInt = BigInt(args.amount.toString());

   //  // Convert slippage to a BigInt
   //     const slippageBigInt = BigInt(args.slippage);

   //     // Convert slippage to a Percent type
   //     const percentSlippage = new Percent(slippageBigInt);

   //   const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/1f9136b294e248fca6fce6f5c95a0811');

   //   // Fetch DAI and WETH pair
   //     const pair = await Fetcher.fetchPairData(DAI, WETH, provider);
   //     console.log(pair)

   //   // Create route
   //   const route = new Route([pair], WETH);

   //   console.log('Route:', route);
   // // // console.log('TokenAmount:', new TokenAmount(DAI, amountInBigInt));
   // // // console.log('TradeType:', TradeType.EXACT_INPUT);

   //    const trade = new Trade(
   //         route,
   //         new TokenAmount(DAI, amountInBigInt),
   //         TradeType.EXACT_INPUT, // or TradeType.EXACT_OUTPUT depending on your use case
   //         // { slippageTolerance: new Percent(slippageBigInt, 100) }
   //    );

   // console.log('Trade:', trade);

   // // To get the execution price, you can use the `executionPrice` property of the Trade object
   // const executionPrice = trade.executionPrice;

   // // The executionPrice is a Price object, which represents the price of TokenA in terms of TokenB
   // // You can convert it to a human-readable format or use it directly in your application
   // console.log('Execution Price:', executionPrice.toSignificant(6)); // Adjust the number of significant digits as needed

   //   // Get minimum amount of WETH out
   //   const amountOutMin = trade.minimumAmountOut(percentSlippage);

   //   // Define path
   //   const path = [DAI_ADDRESS, WETH_ADDRESS];

   //   // Define recipient
   //   const to = args.walletAddress;
   //   console.log(to)

   //   // Set deadline
   //   const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

   //   // Convert value to hex
   //   const value = trade.inputAmount.raw;
   //   const valueHex = await ethers.BigNumber.from(value.toString()).toHexString();

   //   // Create a contract instance
   // const uniswapRouter = new ethers.Contract(
   //     UNISWAP_ROUTER_CONTRACT_ADDRESS,
   //     IUniswapV2Factory.abi,
   //     provider
   // );
   //   console.log(uniswapRouter)

   // // Example for swapping DAI for WETH
   // const tx = await uniswapRouter.populateTransaction.swapExactTokensForETH(
   //     args.amount,
   //     amountOutMin,
   //     path,
   //     to,
   //     deadline
   // );

   // console.log({tx}, 'transaction')
   // Send the transaction
   // const sendTxn = await wallet.sendTransaction(tx);
   // console.log(sendTxn.hash, "to see your transaction");
   // }

   // swapTokens(args)

   // Example usage in a React component
   // const handleClick = () => {
   //   if (window.sideshift) {
   //     window.sideshift.show();
   //   }
   // };

   useEffect(() => {
      const fetchCoins = async () => {
         try {
            const response = await axios.get(
               'https://sideshift.ai/api/v2/coins'
            );
            console.log(response.data);
            setCoins(response.data);
         } catch (error) {
            console.error('Error fetching coins:', error);
         }
      };

      fetchCoins();
   }, []);

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true); // Set loading state to true when the form is submitted
      const response = await FetchPairToken(tokenIn, tokenOut);
      // console.log(response)
      setPairingInfo(response?.data);
      setIsLoading(false); // Set loading state to false once the data is fetched
   };

   const handleTokenInClick = () => {
      setIsModalOpen(true);
   };

   const handleTokenOutClick = () => {
      setIsModalOpen(true);
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-[80%] mt-44">
         <h1 className="text-center text-4xl font-bold mb-8">Swap Page</h1>
         <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
               <label
                  htmlFor="tokenIn"
                  className="block text-sm font-medium text-gray-700"
               >
                  Token In:
               </label>
               <select
                  id="tokenIn"
                  value={tokenIn}
                  onChange={(e) => setTokenIn(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               >
                  <option value="">Select a token</option>
                  {coins.map((coin) => (
                     <option
                        key={coin.symbol}
                        value={coin.symbol}
                        className="text-black"
                     >
                        {coin.coin}
                     </option>
                  ))}
               </select>
            </div>
            <div className="mb-4">
               <label
                  htmlFor="tokenOut"
                  className="block text-sm font-medium text-gray-700"
               >
                  Token Out:
               </label>
               <select
                  id="tokenOut"
                  value={tokenOut}
                  onChange={(e) => setTokenOut(e.target.value)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               >
                  <option value="">Select a token</option>
                  {coins.map((coin) => (
                     <option key={coin.symbol} value={coin.symbol}>
                        {coin.coin}
                     </option>
                  ))}
               </select>
            </div>
            {/* <div className='mb-4'>
          <label htmlFor='amount' className='block text-sm font-medium text-gray-700'>Amount:</label>
          <input
            type='number'
            id='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            placeholder='Enter amount'
          />
        </div> */}
            <button
               type="submit"
               className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               disabled={isLoading} // Disable the button while loading
            >
               {isLoading ? 'Loading...' : 'Get Pairing Info'}
            </button>
         </form>
         {pairingInfo && (
            <div className="mt-8">
               <h3 className="text-lg font-semibold">Pairing Info:</h3>
               {/* Display the pairing info here */}
               <pre className="mt-4 text-sm text-gray-500">
                  {JSON.stringify(pairingInfo, null, 2)}
               </pre>
            </div>
         )}
         {/* <Sample /> */}
         {/* <button
    onClick={() => window.sideshift && window.sideshift.show()}
    id="sideshift-modal-button"
    className={styles.sideshiftModalButton}
  >
    Shift Crypto
  </button> */}

         {/* <button onClick={handleClick} id="sideshift-modal-button">
            Shift Crypto
        </button> */}
      </div>
   );
};

export default Swap;
