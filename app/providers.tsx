// // import React from 'react';
// // import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// // import {  WagmiProvider } from 'wagmi'; // Alias the imported provider
// // import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
// // import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';

// // const config = getDefaultConfig({
// //    appName: 'My RainbowKit App',
// //    projectId: '60fa83860edbb9d7d2e1df131caa2675',
// //    chains: [mainnet, polygon, optimism, arbitrum, base, zora],
// //    ssr: true, // If your dApp uses server side rendering (SSR)
// // });

// // const queryClient = new QueryClient();

// // // Define the type of children prop
// // type ProviderFromWagmiProps = {
// //    children: React.ReactNode,
// // };

// // export const ProviderFromWagmi = ({ children }: ProviderFromWagmiProps) => {
// //    return (
// //       <WagmiProvider config={config}>
// //          <QueryClientProvider client={queryClient}>
// //             <RainbowKitProvider>{children}</RainbowKitProvider>
// //          </QueryClientProvider>
// //       </WagmiProvider>
// //    );
// // };


// 'use client';

// import * as React from 'react';
// import {
//   RainbowKitProvider,
//   getDefaultWallets,
//   getDefaultConfig,
// } from '@rainbow-me/rainbowkit';
// import {
//   argentWallet,
//   trustWallet,
//   ledgerWallet,
// } from '@rainbow-me/rainbowkit/wallets';
// import {
//   arbitrum,
//   base,
//   mainnet,
//   optimism,
//   polygon,
//   sepolia,
//   zora,
// } from 'wagmi/chains';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { WagmiProvider } from 'wagmi';

// const { wallets } = getDefaultWallets();

// const config = getDefaultConfig({
//   appName: 'RainbowKit demo',
//   projectId: 'YOUR_PROJECT_ID',
//   wallets: [
//     ...wallets,
//     {
//       groupName: 'Other',
//       wallets: [argentWallet, trustWallet, ledgerWallet],
//     },
//   ],
//   chains: [
//     mainnet,
//     polygon,
//     optimism,
//     arbitrum,
//     base,
//     zora,
//     // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
//   ],
//   ssr: true,
// });

// const queryClient = new QueryClient();

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={queryClient}>
//         <RainbowKitProvider>{children}</RainbowKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }
