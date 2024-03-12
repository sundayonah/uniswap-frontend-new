import { useEffect, useState } from "react";
import Modal from '@/app/component/oldModal/modal';
// import UniswapWidget from '@/app/pages/uniswap-widget'
import TokenList from '@/app/component/tokenList'
import axios from "axios";
import { SwapWidget } from "@uniswap/widgets";
import {TokenJsonList} from '@/app/api/tokensJson'
import TokenAPI from "./TokenAPI";
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
   const [tokenIn, setTokenIn] = useState('ETH');
   const [tokenOut, setTokenOut] = useState('');
   const [activeView, setActiveView] = useState('swap'); 
   const [tokenList, setTokenList] = useState([])
     const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
    const [currentSelection, setCurrentSelection] = useState(''); // New state variable


   // const openModal = () => setIsModalOpen(true);
      // Modify the openModal function to accept a parameter
    
    
   const openModal = (selection: 'A' | 'B') => {
      setCurrentSelection(selection);
      setIsModalOpen(true);
   }

   const closeModal = () => setIsModalOpen(false);

   // Dummy function for swap logic
   const handleSwap = () => {
      console.log(`Swapping ${tokenIn} for ${tokenOut}`);
      // Swap logic goes here
   };


//  const handleTokenASelect = (token: Token) => {
//     setTokenIn(token.symbol);
//     setIsModalOpen(false);
//     setCurrentSelection('A'); // Update current selection
//  };

//  const handleTokenBSelect = (token: Token) => {
//     setTokenOut(token.symbol);
//     setIsModalOpen(false);
//     setCurrentSelection('B'); // Update current selection
   //  };


   const handleTokenSelect = (token: Token) => {
      if (currentSelection === 'A') {
         setTokenIn(token.symbol);
         console.log(token)
      } else if (currentSelection === 'B') {
         console.log(token)
         setTokenOut(token.symbol);
      }
      setIsModalOpen(false);
   };


   
//     // Use useEffect to perform actions when tokenIn or tokenOut changes
//  useEffect(() => {
//     // Actions to perform when tokenIn or tokenOut changes
//     // This could include updating the UI or performing other side effects
//  }, [tokenIn, tokenOut]);

 

      const importantTokens = ['USDC', 'WETH', 'USDT', 'WBTC', 'ETH', 'DAI', 'MATIC'];

const filteredTokens: Token[] = TokenJsonList.filter((token) =>
      importantTokens.includes(token.symbol)
   );



    return (
    <>
        <div className="flex flex-col items-center justify-center space-y-1">
                  <div className="flex justify-between items-center bg-[#1c1c1c] shadow-xl rounded-xl p-2 my-1 w-full">
                     <div className="flex-1">
                        <label className="text-gray-500 text-sm">You pay</label>
                        <input
                           type="text"
                           placeholder="0.0"
                           className="bg-transparent text-white placeholder-gray-500 rounded w-full p-2 outline-none"
                        />
                     </div>
                    <button className="bg-[#1c1c1c] text-white rounded p-2" onClick={() => openModal('A')}>
          {tokenIn || 'Select Token A'}
                </button>
                  </div>
                  <div className="flex justify-between items-center bg-[#1c1c1c] shadow-xl rounded-xl p-2 w-full">
                     <div className="flex-1">
                        <label className="text-gray-500 text-sm">
                           You receive
                        </label>
                        <input
                           type="text"
                           placeholder="0.0"
                           className="bg-transparent text-white placeholder-gray-500 rounded w-full p-2 outline-none "
                        />
                     </div>
                  <button className="bg-[#1c1c1c] text-white rounded p-2" onClick={() => openModal('B')}>
          {tokenOut || 'Select Token B'}
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
            
)
}
export default SwapUi