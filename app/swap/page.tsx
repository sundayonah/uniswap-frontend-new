'use client'

import React, { useEffect, useState } from 'react';
import Header from '../component/header';

import { ImageSvg } from '@/app/component/Image'
import axios from 'axios';


// Define an interface for the coin objects
interface Coin {
 symbol: string;
 name: string;
 coin: string;
 // Add other properties as needed
}
export const FetchPairToken = async (tokenIn: string, tokenOut:string) => {
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
const [tokenIn, setTokenIn] = useState<string>('');
 const [tokenOut, setTokenOut] = useState<string>('');
 const [pairingInfo, setPairingInfo] = useState<any>(null); // Replace 'any' with the actual type of the pairing info if known
 const [coins, setCoins] = useState<Coin[]>([]); //
   const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState(''); // New state for the amount



 useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get('https://sideshift.ai/api/v2/coins');
        console.log(response.data)
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
    console.log(response)
    setPairingInfo(response?.data);
    setIsLoading(false); // Set loading state to false once the data is fetched
 };

   return (
 <div className='flex flex-col items-center justify-center min-h-[80%] mt-44'>
 <h1 className='text-center text-4xl font-bold mb-8'>Swap Page</h1>
 <form onSubmit={handleSubmit} className='w-full max-w-md'>
    <div className='mb-4'>
      <label htmlFor='tokenIn' className='block text-sm font-medium text-gray-700'>Token In:</label>
      <select
        id='tokenIn'
        value={tokenIn}
        onChange={(e) => setTokenIn(e.target.value)}
        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
      >
        <option value="">Select a token</option>
        {coins.map((coin) => (
          <option key={coin.symbol} value={coin.symbol} className='text-black'>
             {coin.coin} 
          </option>
        ))}
      </select>
    </div>
    <div className='mb-4'>
      <label htmlFor='tokenOut' className='block text-sm font-medium text-gray-700'>Token Out:</label>
      <select
        id='tokenOut'
        value={tokenOut}
        onChange={(e) => setTokenOut(e.target.value)}
        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
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
      className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      disabled={isLoading} // Disable the button while loading
    >
      {isLoading ? 'Loading...' : 'Get Pairing Info'}
    </button>
 </form>
 {pairingInfo && (
    <div className='mt-8'>
      <h3 className='text-lg font-semibold'>Pairing Info:</h3>
      {/* Display the pairing info here */}
      <pre className='mt-4 text-sm text-gray-500'>{JSON.stringify(pairingInfo, null, 2)}</pre>
    </div>
 )}
</div>
   );
};

export default Swap;