'use client';
import React, { useState } from 'react';
import Header from '../component/header';
import Link from 'next/link';
import Send from '../component/send';
import SwapUi from '../component/swap';

const Swap = () => {
   const [activeView, setActiveView] = useState('swap'); // Default active view

   const handleViewChange = (view) => {
      setActiveView(view);
   };

   const swapHeader = [
      {
         id: 1,
         name: 'Swap',
         page: '/swap',
      },
      {
         id: 2,
         name: 'Limit',
         page: '/limit',
      },
      {
         id: 3,
         name: 'Send',
         page: '/send',
      },
      {
         id: 4,
         name: 'Buy',
         page: '/buy',
      },
   ];

   return (
      <>
         <Header />
         <div className=" max-w-sm mx-auto mt-44">
            <div className="flex justify-between">
               <div className="flex justify-start items-center gap-4">
                  {swapHeader.map(({ id, name, page }) => (
                     <div key={id} className="">
                        {/* <Link className="text-gray-500 text-sm">{name}</Link> */}
                        <button
                           className={`text-gray-500 text-sm ${
                              activeView === name.toLowerCase()
                                 ? ' text-gray-200 bg-[#292929] hover:text-gray-500 rounded-lg py-1 px-2'
                                 : ''
                           }`}
                           onClick={() => handleViewChange(name.toLowerCase())}
                        >
                           {name}
                        </button>
                     </div>
                  ))}
               </div>

               <div>
                  <button>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-gray-500"
                     >
                        <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                        />
                        <path
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                     </svg>
                  </button>
               </div>
            </div>
            {activeView === 'swap' && (
               // Render Swap UI

               // <div className="flex flex-col items-center justify-center space-y-1">
               //    <div className="flex justify-between items-center bg-[#1c1c1c] shadow-xl rounded-xl p-2 my-1 w-full">
               //       <div className="flex-1">
               //          <label className="text-gray-500 text-sm">You pay</label>
               //          <input
               //             type="text"
               //             placeholder="0.0"
               //             className="bg-transparent text-white placeholder-gray-500 rounded w-full p-2 outline-none"
               //          />
               //       </div>
               //       <button className="bg-[#1c1c1c] text-white rounded p-2">
               //          Select Token
               //       </button>
               //    </div>

               //    <div className="flex justify-between items-center bg-[#1c1c1c] shadow-xl rounded-xl p-2 w-full">
               //       <div className="flex-1">
               //          <label className="text-gray-500 text-sm">
               //             You receive
               //          </label>
               //          <input
               //             type="text"
               //             placeholder="0.0"
               //             className="bg-transparent text-white placeholder-gray-500 rounded w-full p-2 outline-none "
               //          />
               //       </div>
               //       <button className="bg-[#1c1c1c] text-white rounded p-2">
               //          Select Token
               //       </button>
               //    </div>
               //    <div className="w-full flex justify-center mt-2">
               //       <button
               //          // onClick={handleSwap}
               //          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
               //       >
               //          Swap
               //       </button>
               //    </div>
               // </div>

               <SwapUi />
            )}

            {activeView === 'limit' && (
               // Render Limit UI
               <div className="w-full flex justify-center mt-2">
                  <h1 className="text-white">COMING SOON</h1>
               </div>
            )}
            {activeView === 'send' && (
               // Render Send UI
               <div className="w-full flex justify-center mt-2">
                  <Send />
               </div>
            )}
         </div>
      </>
   );
};

export default Swap;

{
   /* <div className="flex flex-col justify-between items-center mb-4">
   <div>
      <label
         htmlFor="tokenIn"
         className="block text-sm font-medium text-gray-700"
      >
         You Pay
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
         <input
            type="text"
            name="tokenIn"
            id="tokenIn"
            value={tokenIn}
            readOnly
            onClick={openModal}
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm bg-transparent border-gray-300"
         />
      </div>
   </div>
   <button
      onClick={() => setTokenIn(tokenOut) || setTokenOut(tokenIn)}
      className="mx-2 text-gray-500"
   >
      ⇄
   </button>
   <div>
      <label
         htmlFor="tokenOut"
         className="block text-sm font-medium text-gray-700"
      >
         You Recieve
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
         <input
            type="text"
            name="tokenOut"
            id="tokenOut"
            value={tokenOut}
            readOnly
            onClick={openModal}
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm bg-transparent border-gray-300"
         />
      </div>
   </div>
</div>
<button
   onClick={handleSwap}
   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
   Swap
</button>

{isModalOpen && (
   <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
         <button onClick={closeModal}>Close</button>
      </div>
   </div>
)} */
}
