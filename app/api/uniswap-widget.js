// pages/api/uniswap.js

export default async function handler(req, res) {
   const CMC_TOKEN_LIST =
      'https://api.coinmarketcap.com/data-api/v3/uniswap/all.json';

   try {
      const response = await axios.get(CMC_TOKEN_LIST, {
         headers: {
            'X-CMC_PRO_API_KEY': '708a0700-50c7-43ef-8394-c3a4fb37a3f1',
         },
      });
      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      res.status(200).json(data);
   } catch (error) {
      console.error('Error fetching data from cooinmarket:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
}
