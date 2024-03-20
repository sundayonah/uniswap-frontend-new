'use client';

import Head from 'next/head'; // Import Head from next/head
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { useState, useEffect } from 'react';
import {
   RainbowKitProvider,
   getDefaultConfig,
   darkTheme,
} from '@rainbow-me/rainbowkit';
import { Config, WagmiProvider } from 'wagmi';

import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Script from 'next/script';

const metadata = {
   title: 'Uniswap',
   description: 'Generated by create next app',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const [config, setConfig] = useState<Config | null>(null);

   useEffect(() => {
      // Fetch config data from the server or perform any server-side logic here
      const fetchedConfig = getDefaultConfig({
         appName: 'My RainbowKit App',
         projectId: '60fa83860edbb9d7d2e1df131caa2675',
         chains: [mainnet, polygon, optimism, arbitrum, base, zora],
         ssr: true,
      });
      setConfig(fetchedConfig);
   }, []);

   const queryClient = new QueryClient();

   return (
      <html lang="en">
         {/* <Head>
     
      </Head> */}
         <body>
            {config && (
               <WagmiProvider config={config}>
                  <QueryClientProvider client={queryClient}>
                     <RainbowKitProvider theme={darkTheme()}>
                        {children}
                     </RainbowKitProvider>
                  </QueryClientProvider>
               </WagmiProvider>
            )}
            <Script id="sideshift-config" type="text/javascript">
               {`window.__SIDESHIFT__ = {
            parentAffiliateId: "I3Ewwmtec",
            defaultDepositMethodId: "btc",
            defaultSettleMethodId: "eth",
            settleAddress: undefined,
            type: "variable",
            settleAmount: undefined,
          }`}
            </Script>
            <Script
               src="https://sideshift.ai/static/js/main.js"
               strategy="beforeInteractive"
            />
         </body>
      </html>
   );
}
