// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import axios from 'axios';

import axios from 'axios';

// export default async function handler(req, res) {
//    try {
//       // Fetch latest cryptocurrency listings

//       const response = await axios.get(
//          'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
//          {
//             headers: {
//                'X-CMC_PRO_API_KEY': 'a1895011-2217-4ef3-84c4-9d69ed0f2e7b',
//             },
//          }
//       );

//       // Extract token IDs
//       const tokenIds = response.data.data.map((token) => token.id);
//       // console.log(tokenIds);

//       // Fetch metadata for each token
//       const metadataResponse = await axios.get(
//          'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
//          {
//             headers: {
//                'X-CMC_PRO_API_KEY': 'a1895011-2217-4ef3-84c4-9d69ed0f2e7b',
//             },
//             params: {
//                id: tokenIds.join(','),
//             },
//          }
//       );

//       const metadataData = metadataResponse.data.data;
//       // console.log(metadataData);

//       // Fetch historical market data for each token
//       // const historicalDataPromises = tokenIds.map(async (tokenId) => {
//       //    const historicalResponse = await axios.get(
//       //       // `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?id=${tokenId}&interval=1d&count=30`,
//       //       `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical`,
//       //       {
//       //          headers: {
//       //             'X-CMC_PRO_API_KEY': 'a1895011-2217-4ef3-84c4-9d69ed0f2e7b',
//       //          },
//       //       }
//       //    );
//       //    console.log(historicalResponse);
//       //    return historicalResponse.data.data[tokenId];
//       // });

//       // console.log(historicalDataPromises);

//       // Wait for all historical data promises to resolve///
//       // const historicalDataResults = await Promise.all(historicalDataPromises);

//       // console.log(historicalDataResults);

//       // Combine token listings with metadata
//       const tokens = response.data.data.map((token) => ({
//          ...token,
//          logo: metadataData[token.id]?.logo,
//          tvl: token.tvl !== null ? token.tvl : 'N/A',
//          volume_24h: token.volume_24h,
//          // historicalData: historicalDataResults[index],
//       }));

//       // console.log(tokens);

//       res.status(200).json(tokens);
//    } catch (error) {
//       console.error('Error fetching data:', error);
//       res.status(500).json({ error: 'Internal server error' });
//    }
// }

// export const FetchTokens = async () => {
//    try {
//       const response = await axios.get('https://sideshift.ai/api/v2/coins');

//       return response.data;
//    } catch (error) {
//       console.log(error);
//    }
// };

// export const Fetchicon = async () => {
//    try {
//       const iconResponse = await axios.get(
//           `https://sideshift.ai/api/v2/coins/icon/BTC`
//           https://sideshift.ai/api/v2/pair/:from/:to

//       );
//       console.log(iconResponse, 'icons');

//       return iconResponse;
//    } catch (error) {
//       console.log(error);
//    }
// };
export const FetchTokens = async () => {
   try {
      const coinsResponse = await axios.get(
         'https://sideshift.ai/api/v2/coins'
      );
      const coins = coinsResponse.data;

      const coinsWithIcons = await Promise.all(
         coins.map(async (coin) => {
            try {
               const iconResponse = await axios.get(
                  `https://sideshift.ai/api/v2/coins/icon/${coin.coin}`
               );
               const iconUrl = iconResponse.data; // Assuming the response contains the icon URL
               return {
                  ...coin, // Include all coin details
                  iconUrl, // Add icon URL to coin object
               };
            } catch (iconError) {
               console.warn(
                  `Failed to fetch icon for coin: ${coin.coin}`,
                  iconError
               );
               return {
                  ...coin, // Include all coin details
                  iconUrl: null, // Set iconUrl to null or a default icon URL
               };
            }
         })
      );
      console.log(coinsWithIcons);
      return coinsWithIcons;
   } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error so it can be handled by the caller
   }
};

export const FetchPairToken = async () => {
   try {
      const iconResponse = await axios.get(
         `https://sideshift.ai/api/v2/pair/eth/BCH`
      );
      console.log(iconResponse, 'icons');

      return iconResponse;
   } catch (error) {
      console.log(error);
   }
};
