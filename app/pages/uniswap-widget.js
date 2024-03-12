// import dynamic from 'next/dynamic';
// import { useState, useEffect } from 'react';

// const UniswapWidget = () => {
//    const [SwapWidget, setSwapWidget] = useState(null);
//    const [error, setError] = useState(null);

//    useEffect(() => {
//       if (typeof window !== 'undefined') {
//          import('@uniswap/widgets')
//             .then(({ SwapWidget }) => {
//                setSwapWidget(() => SwapWidget);
//             })
//             .catch((error) => {
//                console.error('Error loading SwapWidget:', error);
//                setError('Failed to load the Uniswap widget.');
//             });
//       }
//    }, []);

//    const CMC_TOKEN_LIST =
//       'https://api.coinmarketcap.com/data-api/v3/uniswap/all.json';

//    // Use Next.js dynamic import with no SSR
//    const DynamicSwapWidget = dynamic(
//       () => import('@uniswap/widgets').then((mod) => mod.SwapWidget),
//       { ssr: false }
//    );

//    return (
//       <div>
//          {error && <p>{error}</p>}
//          {SwapWidget && <DynamicSwapWidget tokenList={CMC_TOKEN_LIST} />}
//       </div>
//    );
// };

// export default UniswapWidget;
