'use client'


import Image from 'next/image'

import {ConnectWallet} from './component/ConnectButton'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Header from '@/app/component/header'
import Swap from './swap/page';
import { ethers } from 'ethers';


export default function Home() {

  //    const RPC_URL =
  //     'https://eth-mainnet.g.alchemy.com/v2/1V5KSkZF5x5F1h0wEAhcgTDBpwr7-OsC';

  // console.log(RPC_URL)

//  // Check if we are in the browser environment
//    if (typeof window !== 'undefined') {
//       // Now it's safe to use window.ethereum
//       console.log(window.ethereum);
//       const provider = new ethers.providers.AlchemyProvider(RPC_URL);

//       // Example: Get the current block number
//       provider
//          .getBlockNumber()
//          .then((blockNumber) => {
//             console.log('Current block number:', blockNumber);
//          })
//          .catch((error) => {
//             console.error('Error fetching block number:', error);
//          });
//    } else {
//       console.error(
//          'Window object is not available. This code should be executed in a browser environment.'
//       );
//    }

  return (
 <div>
      <Header />
      <div className='mt-24'>
      <Swap />
</div>
    </div>
  )
}
