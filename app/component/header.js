import Link from 'next/link';
import React from 'react';

import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { MinningContext } from '@/Context/MinnigContext';
// import logo from '../../yolva.png';

const Header = () => {
   // const { connectWallet, connect } = useContext(MinningContext);

   const navMenu = [
      { id: 1, name: 'Swap', url: '/' },
      { id: 2, name: 'Token', url: '/token' },
      { id: 3, name: 'NFTs', url: '/nfts' },
      { id: 3, name: 'Uniswap', url: '/uniswap' },
      { id: 4, name: 'Pools', url: '/pools' },
   ];

   return (
      <main className="w-full flex justify-between  items-center fixed top-0  bg-opacity-10 backdrop-blur-md shadow-lg h-16 z-20 mb-20">
         <div className="flex w-full p-4 justify-between items-center  shadow-custom">
            <div className=" flex gap-9 pr-2">
               <div>LOGO</div>
               {/* <img src="" alt="logo-image" className="h-12 w-10" /> */}
               <div className="flex gap-3">
                  {navMenu.map((menu) => (
                     <div key={menu.id} className="flex">
                        <Link href={menu.url} className="text-white">
                           {menu.name}
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
            <div className="flex space-x-5 justify-center items-center">
               <div className="">
                  <ConnectButton />
               </div>
            </div>
         </div>
      </main>
   );
};

export default Header;
