'use client'


import Image from 'next/image'

import {ConnectWallet} from './component/ConnectButton'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Header from '@/app/component/header'
import Swap from './swap/page';


export default function Home() {
  return (
 <div>
      <Header />
      <div className='mt-24'>
      <Swap />
</div>
    </div>
  )
}
