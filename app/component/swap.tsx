import { useEffect, useState } from 'react';
import Modal from '@/app/component/oldModal/modal';
// import UniswapWidget from '@/app/pages/uniswap-widget'
// import TokenList from '@/app/component/tokenList';
import axios from 'axios';
import { SwapWidget } from '@uniswap/widgets';
import { TokenJsonList } from '@/app/api/tokensJson';
import { CreatePair } from '@/app/component/TokenAPI';
// import { GetTokenDataAndPerformSwap } from '@/app/component/TokenApi';
import { ArrowDown } from '@/app/component/icons';
import { BigNumber, ethers } from 'ethers';
import { Token as UniswapToken } from '@uniswap/sdk-core';
import { useAccount } from 'wagmi';

// import { SwapWidget } from '@uniswap/widgets';
// import '@uniswap/widgets/fonts.css';

export interface Token {
   chainId?: number;
   name: string;
   address?: string;
   decimals?: number;
   symbol: string;
   logoURI?: string;
}

const SwapUi = () => {
   // const CMC_TOKEN_LIST = 'https://api.coinmarketcap.com/data-api/v3/uniswap/all.json';

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [tokenIn, setTokenIn] = useState<Token | null>(null);
   const [tokenOut, setTokenOut] = useState<Token | null>(null);
   const [inputAmount, setInputAmount] = useState<string>('');
   // const [inputAmount, setInputAmount] = useState(null);
   const [outputAmount, setOutputAmount] = useState('');

   const [activeView, setActiveView] = useState('swap');
   // const [tokenList, setTokenList] = useState([]);
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [currentSelection, setCurrentSelection] = useState('');
   const [rate, setRate] = useState(null);

   const account = useAccount();
   // console.log(account, 'account');
   // const openModal = ( => setIsModalOpen(true);
   // Modify the openModal function to accept a parameter

   // useEffect(() => {
   //    const fetchTokens = async () => {
   //       const response = await fetch(
   //          'https://bridge.arbitrum.io/token-list-42161.json'
   //       );
   //       const data = await response.json();
   //       console.log(data.tokens);
   //       setTokenList(data.tokens);
   //       //  setFilteredTokens(data.tokens);
   //    };

   //    fetchTokens();
   // }, []);

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

   // // Function to convert frontend Token to Uniswap SDK Token
   const convertToUniswapToken = (frontendToken: Token) => {
      return new UniswapToken(
         frontendToken.chainId || 0,
         frontendToken.address || '',
         frontendToken.decimals || 0
      );
   };
   // GetTokenDataAndPerformSwap('1');

   // CreatePair('1', uniswapTokenIn, uniswapTokenOut);

   if (tokenIn && tokenOut && inputAmount) {
      const uniswapTokenIn = convertToUniswapToken(tokenIn);
      const uniswapTokenOut = convertToUniswapToken(tokenOut);
      const inputAmountInWei = ethers.utils.parseUnits(
         inputAmount,
         tokenIn.decimals
      );

      const inputAmountInWeiString = inputAmountInWei.toString();

      CreatePair(inputAmount, uniswapTokenIn, uniswapTokenOut)
         .then((pairs) => {
            console.log(pairs, 'pair created successfully');
            const {
               pair,
               exchangeRate,
               outputAmount,
               toFixedRatePerOne,
               finalExchange,
               formattedExchangeRate,
            } = pairs;
            // const formatedRate = `1 ${tokenOut.symbol} = ${toFixedRatePerOne} ${tokenIn.symbol}`;
            setRate(finalExchange);
            setOutputAmount(formattedExchangeRate);
            console.log(exchangeRate, ' RATE');
            console.log(outputAmount, 'output Amount');
            console.log(formattedExchangeRate, 'formatted exchange rate');
         })
         .catch((error) => {
            console.error('Error creating pair:', error);
         });
   } else {
      console.error('Both tokens must be selected before creating a pair.');
   }

   // // GET TOKEN BALANCE
   // getTokenBalance(tokenOut?.address ?? '', account?.address ?? '')
   //    .then((balance) => {
   //       console.log(balance, 'token balance');
   //    })
   //    .catch((error) => {
   //       console.error('error getting balance');
   //    });

   const isValidInput = (input: string) => {
      return /^(?=.*[0-9]|0(?=\.))\d*(?:\.\d+)?$/.test(input);
   };

   // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   //    const inputValue = event.target.value;
   //    // Assuming tokenIn.decimals is correctly set
   //    const decimals = tokenIn?.decimals || 18; // Provide a default value if decimals is undefined
   //    const weiValue = ethers.utils.parseUnits(inputValue, decimals);
   //    const humanReadableValue = ethers.utils.formatEther(weiValue);

   //    // Display the human-readable value to the user
   //    console.log(humanReadableValue);

   //    // Store the wei value for transaction purposes
   //    setInputAmount(humanReadableValue);
   // };

   // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   //    const inputValue = event.target.value;
   //    console.log(inputAmount);
   //    const decimals = tokenIn?.decimals || 18;
   //    const bigNumberValue = ethers.utils.parseUnits(inputValue, decimals);
   //    console.log(bigNumberValue, 'bigNumberValue');

   //    setInputAmount(bigNumberValue);
   // };

   // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   //    const inputValue = event.target.value;
   //    // Validate the input using the regex
   //    const isValid = /^\d+(\.\d+)?$/.test(inputValue);

   //    if (isValid) {
   //       // Convert the input value to a BigNumber
   //       const bigNumberValue = ethers.utils.parseUnits(
   //          inputValue,
   //          tokenIn?.decimals
   //       );
   //       console.log(bigNumberValue);
   //       setInputAmount(bigNumberValue);
   //    } else {
   //       console.error('Invalid input');
   //       // Optionally, clear the input or set it to a default value
   //    }
   // };

   // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   //    const inputValue = event.target.value;
   //    // Convert the input value to a number for isFinite check
   //    const numberValue = parseFloat(inputValue);
   //    // if (!isNaN(numberValue) && isFinite(numberValue)) {
   //    //    // Convert the input value to a BigNumber for ethers.js
   //    //    const bigNumberValue = ethers.utils.parseUnits(
   //    //       inputValue,
   //    //       tokenIn?.decimals
   //    //    );
   //    //    console.log(bigNumberValue);
   //    //    setInputAmount(bigNumberValue);
   //    // } else {
   //    //    // Handle invalid input, e.g., clear the input or set it to a default value
   //    //    console.error('Invalid input');
   //    //    setInputAmount(null); // Assuming you want to clear the input on invalid input
   //    // }
   // };

   // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   //    const inputValue = event.target.value;
   //    // Convert the input value to a BigNumber
   //    const bigNumberValue = ethers.utils.parseUnits(
   //       inputValue,
   //       tokenIn?.decimals
   //    );
   //    console.log(bigNumberValue);
   //    setInputAmount(bigNumberValue);
   // };

   // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   //    const value = e.target.value;
   //    console.log(value);
   //    if (value === '' || isValidInput(value)) {
   //       // Parse the input as a floating-point number
   //       const floatValue = parseFloat(value);
   //       console.log(floatValue);
   //       // Check if the parsed value is NaN (which would indicate an invalid input)
   //       if (!isNaN(floatValue)) {
   //          // Convert the floating-point number to a BigNumber
   //          const bigNumberValue = ethers.BigNumber.from(floatValue.toString());
   //          console.log(bigNumberValue);
   //          setInputAmount(value === '' ? null : bigNumberValue);
   //       } else {
   //          // Handle the case where the input is not a valid number
   //          setInputAmount(null);
   //       }
   //    }
   // };

   // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   //    const value = e.target.value;
   //    if (value === '' || isValidInput(value)) {
   //       setInputAmount(value === '' ? null : ethers.BigNumber.from(value));
   //    }
   // };

   // // Adjusted input handling
   // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   //    const value = e.target.value;
   //    // if (
   //    //    value === '' ||
   //    //    (parseFloat(value) < 0 && !isNaN(parseFloat(value)))
   //    // ) {
   //    setInputAmount(value === '' ? null : ethers.BigNumber.from(value));
   //    // }
   // };

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
      } else if (currentSelection === 'B') {
         setTokenOut(token);
      }
      setIsModalOpen(false);
   };

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

   // console.log(outputAmount);

   return (
      <>
         <div className="flex flex-col items-center justify-center ">
            <div className="flex justify-between items-center bg-[#1c1c1c] shadow-xl rounded-xl p-2 my-1 w-full">
               <div className="flex-1">
                  <label className="text-gray-500 text-sm">You pay</label>
                  <input
                     type="number"
                     placeholder="0.0"
                     className="bg-transparent text-white placeholder-gray-500 rounded w-full p-2 outline-none"
                     value={inputAmount}
                     // pattern="^[0-9]*[.,]?[0-9]*$"
                     onChange={(e) => setInputAmount(e.target.value)}
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
                  <ArrowDown />
               </button>
            </div>
            <div className="flex justify-between items-center bg-[#1c1c1c] shadow-xl rounded-xl p-2 w-full">
               <div className="flex-1">
                  <label className="text-gray-500 text-sm">You receive</label>
                  <input
                     type="number"
                     placeholder="0.0"
                     className="bg-transparent text-white placeholder-gray-500 rounded w-full p-2 outline-none "
                     value={outputAmount}
                     readOnly
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
            {rate === null ? (
               ''
            ) : (
               <div className="w-full flex justify-start items-start my-1">
                  <span className=" text-gray-400 text-xs font-mono">{`1 ${tokenOut?.symbol} = ${rate} ${tokenIn?.symbol}`}</span>
               </div>
            )}
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

{
   /*

i inputed 0.1 immdiately i input the 1 it deleted with the decimal

index.js:231 Uncaught Error: invalid BigNumber string (argument="value", value="0.1", code=INVALID_ARGUMENT, version=bignumber/5.7.0)


 <input
                     type="number"
                     placeholder="0.0"
                     className="bg-transparent text-white placeholder-gray-500 rounded w-full p-2 outline-none"
                     value={inputAmount !== null ? inputAmount.toString() : ''}
                     onChange={handleInputChange}


   const isValidInput = (input: string) => {
      return /^(?=.*[0-9]|0(?=\.))\d*(?:\.\d+)?$/.test(input);
   };
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      console.log(value)
      if (value === '' || isValidInput(value)) {
         // Parse the input as a floating-point number
         const floatValue = parseFloat(value);
         console.log(floatValue)
         // Check if the parsed value is NaN (which would indicate an invalid input)
         if (!isNaN(floatValue)) {
            // Convert the floating-point number to a BigNumber
            const bigNumberValue = ethers.BigNumber.from(floatValue.toString());
            console.log(bigNumberValue)
            setInputAmount(value === '' ? null : bigNumberValue);
         } else {
            // Handle the case where the input is not a valid number
            setInputAmount(null);
         }
      }
   };
*/
}
