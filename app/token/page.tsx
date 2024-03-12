'use client'
import Header from '@/app/component/header';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {FetchTokens,FetchPairToken} from '@/app/api/tokens'

const Token = () => {
   const [selectedNetwork, setSelectedNetwork] = useState('Ethereum');
   const [tokens, setTokens] = useState<any[]>([]);
   const [filteredTokens, setFilteredTokens] = useState<any[]>([]);

function shortenAddress(address: string, startLength = 6, endLength = 4) {
    if (!address) return '';
    return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
}
  
  


   useEffect(() => {
      const fetchData = async () => {
         try {
 
           const response = await FetchTokens()
           const fetchPairToken = await FetchPairToken()
           
           console.log(fetchPairToken);
           console.log(response);
            setTokens(response);
            setFilteredTokens(response);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };
      fetchData();
   }, []);

  // const networks = ['ethereum', 'solana', 'avax', 'polygon', 'dash', 'bitcoincash','cardano']; // Add more networks as needed

// const contractAddress = networks
//   .map(network => tokenDetails?.[network]?.contractAddress)
//   .find(address => address !== undefined);


   // // Function to handle token filtering based on input valu
   // const handleTokenFilter = (e) => {
   //    const inputValue = e.target.value.toLowerCase();
   //    const filtered = tokens.filter((token) =>
   //       token.name.toLowerCase().includes(inputValue)
   //    );
   //    setFilteredTokens(filtered);
   // };

   //    const filterTokens = (tokenList) => {
   //       const filtered = tokenList.filter(
   //          (token) => token.blockchain === selectedNetwork
   //       );
   //       setFilteredTokens(filtered);
   //    };

   // Function to format volum
   // function formatVolume(volume) {
   //    // Check if volume is in billions
   //    if (volume >= 1e9) {
   //       return (volume / 1e9).toFixed(2) + 'B';
   //    }
   //    // Check if volume is in millions
   //    else if (volume >= 1e6) {
   //       return (volume / 1e6).toFixed(2) + 'M';
   //    }
   //    // Otherwise, return volume as is
   //    else {
   //       return volume.toFixed(2);
   //    }
   // }

   return (
     <>
       <Header />
         <div className="max-w-5xl mx-auto px-4 mt-44">
            <h1 className="text-2xl">Top tokens on Uniswap</h1>

            <div className="flex gap-6 mt-6">
               <div>Ethereum</div>
               <div>1D</div>
               <div>
                  <input
                     className=" bg-[#121212] border rounded-md px-2 "
                     placeholder="Filter Tokens"
                    //  onChange={handleTokenFilter}
                  />
               </div>
         </div>

            
            <div className="border border-gray-600 px-4 mb-4 rounded-lg mt-10 py-4 bg-[#121212]">
               <div className="grid grid-flow-col space-x-4 gap-3">
                  <span className="text-sm text-gray-500"># Token name</span>
                  <span className="text-sm text-gray-500">Symbol</span>
                  <span className="text-sm text-gray-500">Network</span>
                  <span className="text-sm text-gray-500">Contract Address</span>
                  <span className="text-sm text-gray-500">Decimail</span>
               </div>
               
               <div>
            {tokens.map(
                      ({ coin, iconUrl, name,networks, tokenDetails }, index) => {
                        // Ensure tokenDetails and ethereum are defined before accessing contractAddress and decimals
                const contractAddress = tokenDetails?.ethereum?.contractAddress || tokenDetails?.solana?.contractAddress || tokenDetails?.avax?.contractAddress || tokenDetails?.ronin?.contractAddress || tokenDetails?.polygon?.contractAddress || tokenDetails?.dash?.contractAddress || tokenDetails?.cardano?.contractAddress || tokenDetails?.doge?.contractAddress || tokenDetails?.polkadot?.contractAddress || tokenDetails?.cosmos?.contractAddress || tokenDetails?.algorand?.contractAddress || tokenDetails?.bitcoin?.contractAddress;
                      //  const contractAddress = networks
                      //   .map((network: string) => tokenDetails?.[network]?.contractAddress)
                      //   .find((address: string | undefined) => address !== undefined);
                        const decimals = tokenDetails?.ethereum?.decimals || tokenDetails?.solana?.decimals;

                        return (
                          <div
                            key={coin}
                            className="grid grid-flow-col mt-8 space-x-4 gap-3"
                          >
                            <span className="flex items-center gap-2 text-sm">
                              <p className="text-gray-500 text-sm">
                                {index + 1}
                              </p>
                              <img
                                src={`data:image/svg+xml,${encodeURIComponent(iconUrl)}`}
                                width={20}
                                height={20}
                                alt="tokens logo"
                              />
                              {name}
                              <p className="text-gray-500 pr-4">{coin}</p>
                            </span>

                            <span className="text-sm">
                              {networks.join(', ')} 
                            </span>
                            <span className="text-sm">
                              {shortenAddress(contractAddress || 'N/A')}
                              </span>
                            <span className="text-sm">
                              {decimals || 'N/A'} 
                            </span>
                          </div>
                        );
                      }
                    )}
               </div>
            </div>
         </div>
      </>
   );
};

export default Token;
