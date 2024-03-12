import React, { useEffect, useState } from 'react';
import { FetchTokens } from '@/app/api/tokens';

const TokenList = () => {
   const [tokens, setTokens] = useState([]);

   useEffect(() => {
      FetchTokens()
         .then((fetchedTokens) => {
            setTokens(fetchedTokens);
            console.log(fetchedTokens);
         })
         .catch((error) => {
            console.error('Error fetching tokens List:', error);
         });
   }, []);

   return (
      <div>
         <h1>Token List</h1>
         <ul>
            {/* {tokens.map((token, index) => (
               <li key={index}>
                  <img src={token.logoURI} alt={token.name} />
                  <span>
                     {token.name} ({token.symbol})
                  </span>
               </li>
            ))} */}
         </ul>
      </div>
   );
};

export default TokenList;
