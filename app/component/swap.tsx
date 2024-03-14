import { useEffect, useState } from 'react';
import Modal from '@/app/component/oldModal/modal';
// import UniswapWidget from '@/app/pages/uniswap-widget'
import TokenList from '@/app/component/tokenList';
import axios from 'axios';
import { SwapWidget } from '@uniswap/widgets';
import { TokenJsonList } from '@/app/api/tokensJson';
import { CreatePair } from './TokenAPI';
import { ArrowDown } from '@/app/component/icons';
import { ethers } from 'ethers';
import { Token as UniswapToken } from '@uniswap/sdk-core';

// import { SwapWidget } from '@uniswap/widgets';
// import '@uniswap/widgets/fonts.css';

export interface Token {
   chainId?: number;
   name: string;
   address?: string;
   decimals?: number;
   symbol: string;
   logoURI: string;
}

const SwapUi = () => {
   // const CMC_TOKEN_LIST = 'https://api.coinmarketcap.com/data-api/v3/uniswap/all.json';

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [tokenIn, setTokenIn] = useState<Token | null>(null);
   const [tokenOut, setTokenOut] = useState<Token | null>(null);
   const [inputAmount, setInputAmount] = useState<number | null>(null);
   const [activeView, setActiveView] = useState('swap');
   const [tokenList, setTokenList] = useState([]);
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [currentSelection, setCurrentSelection] = useState(''); // New state variable

   // const openModal = () => setIsModalOpen(true);
   // Modify the openModal function to accept a parameter

   const openModal = (selection: 'A' | 'B') => {
      setCurrentSelection(selection);
      setIsModalOpen(true);
   };

   const closeModal = () => setIsModalOpen(false);

   // Dummy function for swap logic
   const handleSwap = () => {
      console.log(`Swapping ${tokenIn} for ${tokenOut}`);
      // Swap logic goes here
   };

   // Function to convert frontend Token to Uniswap SDK Token
   const convertToUniswapToken = (frontendToken: Token) => {
      return new UniswapToken(
         frontendToken.chainId || 0,
         frontendToken.address || '',
         frontendToken.decimals || 0
      );
   };

   if (tokenIn && tokenOut && inputAmount !== null) {
      const uniswapTokenIn = convertToUniswapToken(tokenIn);
      const uniswapTokenOut = convertToUniswapToken(tokenOut);
      console.log({ uniswapTokenIn, uniswapTokenOut }, 'uniswapToken');

      const inputAmountInWei = ethers.utils.parseUnits(
         inputAmount.toString(),
         tokenIn.decimals
      );

      const toNumber = Number(inputAmountInWei);
      console.log(inputAmountInWei.toString(), 'inputAmountInWei');
      // const inputAmountInWeiNumber = inputAmountInWei.toNumber();

      console.log(inputAmountInWei, 'inputAmountInWei');

      CreatePair(toNumber, uniswapTokenIn, uniswapTokenOut)
         .then((pair) => {
            console.log(pair, 'pair created successfully');
         })
         .catch((error) => {
            console.error('Error creating pair:', error);
         });
   } else {
      console.error('Both tokens must be selected before creating a pair.');
   }

   // // Inside your component
   // if (tokenIn && tokenOut && inputAmount !== null) {
   //    // You already have tokenIn and tokenOut as Token objects, so you can pass them directly
   //    const inputAmountInWei = ethers.utils.parseUnits(
   //       inputAmount.toString(),
   //       tokenIn.decimals
   //    );
   //    const inputAmountInWeiNumber = inputAmountInWei.toNumber();

   //    console.log({ tokenIn, tokenOut });
   //    CreatePair(inputAmountInWeiNumber, tokenIn, tokenOut)
   //       .then((pair) => {
   //          console.log(pair, 'pair created successfully');
   //       })
   //       .catch((error) => {
   //          console.error('Error creating pair:', error);
   //       });
   // } else {
   //    console.error('Both tokens must be selected before creating a pair.');
   // }

   //    // Check if both tokens are selected before calling CreatePair
   // if (tokenIn && tokenOut && inputAmount !== null) {
   //    const tokenInAddress = tokenIn?.address ?? '';
   //    const tokenOutAddress = tokenOut?.address ?? '';
   //    // Convert inputAmount to wei
   //    const inputAmountInWei = ethers.utils.parseUnits(
   //       inputAmount.toString(),
   //       tokenIn.decimals
   //    );
   //    const inputAmountInWeiNumber = inputAmountInWei.toNumber();

   //    console.log({ tokenInAddress, tokenOutAddress });
   //    CreatePair(inputAmountInWeiNumber, tokenInAddress, tokenOutAddress)
   //       .then((pair) => {
   //          console.log(pair, 'pair created successfully');
   //       })
   //       .catch((error) => {
   //          console.error('Error creating pair:', error);
   //       });
   // } else {
   //    console.error('Both tokens must be selected before creating a pair.');
   // }

   const handleTokenSelect = (token: Token) => {
      if (currentSelection === 'A') {
         setTokenIn(token);
         console.log(token);
      } else if (currentSelection === 'B') {
         console.log(token);
         setTokenOut(token);
      }
      setIsModalOpen(false);
   };

   //     // Use useEffect to perform actions when tokenIn or tokenOut changes
   //  useEffect(() => {
   //     // Actions to perform when tokenIn or tokenOut changes
   //     // This could include updating the UI or performing other side effects
   //  }, [tokenIn, tokenOut]);

   const importantTokens = [
      'USDC',
      'WETH',
      'USDT',
      'WBTC',
      'ETH',
      'DAI',
      'MATIC',
   ];

   const filteredTokens: Token[] = TokenJsonList.filter((token) =>
      importantTokens.includes(token.symbol)
   );

   return (
      <>
         <div className="flex flex-col items-center justify-center ">
            <div className="flex justify-between items-center bg-[#1c1c1c] shadow-xl rounded-xl p-2 my-1 w-full">
               <div className="flex-1">
                  <label className="text-gray-500 text-sm">You pay</label>
                  <input
                     type="text"
                     placeholder="0.0"
                     className="bg-transparent text-white placeholder-gray-500 rounded w-full p-2 outline-none"
                     value={inputAmount !== null ? inputAmount.toString() : ''}
                     onChange={(e) =>
                        setInputAmount(parseFloat(e.target.value))
                     }
                  />
               </div>
               <button
                  className="bg-[#1c1c1c] text-white rounded p-2 flex items-center"
                  onClick={() => openModal('A')}
               >
                  {tokenIn ? (
                     <div className="flex items-center justify-center gap-1  border border-gray-700 bg-black hover:bg-gray-800 rounded-xl p-1">
                        <img
                           src={tokenIn.logoURI}
                           alt={tokenIn.symbol}
                           className="w-5 h-5 mr-1"
                        />
                        <span className="text-sm">{tokenIn.symbol}</span>
                        <ArrowDown />
                     </div>
                  ) : (
                     <div className="flex items-center space-x-1 py-1 px-1 rounded-md bg-[rgb(13,11,18)]">
                        <span className="text-sm">Select Token</span>
                        <ArrowDown />
                     </div>
                  )}
               </button>
            </div>
            {/* Arrow button to swap tokens */}
            <div className="relative">
               <button
                  className="absolute border border-gray-800 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-[#1c1c1c] text-white rounded p-1 flex items-center justify-center"
                  onClick={() => {
                     const tempToken = tokenIn;
                     setTokenIn(tokenOut);
                     setTokenOut(tempToken);
                  }}
               >
                  <ArrowDown /> {/* Assuming ArrowDown is your arrow icon */}
               </button>
            </div>
            <div className="flex justify-between items-center bg-[#1c1c1c] shadow-xl rounded-xl p-2 w-full">
               <div className="flex-1">
                  <label className="text-gray-500 text-sm">You receive</label>
                  <input
                     type="text"
                     placeholder="0.0"
                     className="bg-transparent text-white placeholder-gray-500 rounded w-full p-2 outline-none "
                  />
               </div>
               <button
                  className="bg-[#1c1c1c] text-white rounded p-2"
                  onClick={() => openModal('B')}
               >
                  {tokenOut ? (
                     <div className="flex items-center justify-center gap-1  border border-gray-700 bg-black hover:bg-gray-800 rounded-xl p-1">
                        <img
                           src={tokenOut.logoURI}
                           alt={tokenOut.symbol}
                           className="w-5 h-5 mr-1"
                        />
                        <span className="text-sm">{tokenOut.symbol}</span>
                        <ArrowDown />
                     </div>
                  ) : (
                     <div className="flex items-center space-x-1 py-1 px-1 rounded-md bg-[rgb(13,11,18)]">
                        <span className="text-sm">Select Token</span>
                        <ArrowDown />
                     </div>
                  )}{' '}
               </button>
            </div>
            <div className="w-full flex justify-center mt-2">
               <button
                  // onClick={handleSwap}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               >
                  Swap
               </button>
            </div>
         </div>

         <Modal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            tokenJsonList={TokenJsonList}
            filteredTokens={filteredTokens}
            onTokenSelect={handleTokenSelect} // Use the updated function

            // onTokenSelect={currentSelection === 'A' ? handleTokenASelect : handleTokenBSelect}

            // onTokenSelect={handleTokenASelect}
         />

         {/* <TokenAPI /> */}

         {/* <Modal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            tokenJsonList={TokenJsonList}
            filteredTokens={filteredTokens}
            onTokenSelect={isTokenA ? handleTokenASelect : handleTokenBSelect}
            /> */}

         {/* <Modal  isOpen={isModalOpen} setIsOpen={setIsModalOpen}  tokenJsonList={TokenJsonList} filteredTokens={filteredTokens}  /> */}

         {/* <SwapWidget /> */}
         {/* <UniswapWidget /> */}
         {/* <TokenList /> */}
      </>
   );
};
export default SwapUi;
