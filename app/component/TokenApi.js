const { ethers } = require('ethers');
const {
   ChainId,
   Token,
   Fetcher,
   Route,
   Trade,
   TokenAmount,
   TradeType,
} = require('@uniswap/sdk');
import { TokenList } from '@uniswap/token-lists';

// Define the provider
const provider = new ethers.providers.JsonRpcProvider(
   'https://mainnet.infura.io/v3/1f9136b294e248fca6fce6f5c95a0811'
);

const decimals = 18;

export const GetTokenDataAndPerformSwap = async (amount) => {
   try {
      // Define the tokens
      // Define the tokens
      const token2 = new Token(
         ChainId.MAINNET,
         '0xdac17f958d2ee523a2206206994597c13d831ec7',
         6,
         'WETH',
         'Wrapped Ether'
      );
      const token1 = new Token(
         ChainId.MAINNET,
         '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
         // '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
         18,
         'USDT',
         'Tether'
      );

      // Fetch the pair data
      const pair = await Fetcher.fetchPairData(token1, token2, provider);
      console.log(pair);

      // Define the trade type and amount
      const tradeType = TradeType.EXACT_INPUT;
      const amountIn = ethers.utils.parseUnits(
         amount.toString(),
         token1.decimals
      );
      console.log(tradeType);

      const token1ToUsdRate = 1; // Example rate

      // Adjust the input amount based on the token's value
      const adjustedAmountIn = amountIn * token1ToUsdRate;

      // Create the trade
      const trade = new Trade(
         new Route([pair], token1, token2),
         new TokenAmount(token1, amountIn),

         //  new TokenAmount(token1, amountIn),
         tradeType
      );
      console.log(trade, 'TRADE');

      // Assuming `trade` is your Trade object
      const inputAmount = trade.inputAmount.toSignificant(6);
      //   const outputAmount = trade.outputAmount.toSignificant(6);
      const quote = trade.executionPrice.toSignificant(6);
      // Calculate the output amount, considering slippage tolerance
      const outputAmount =
         tradeType === TradeType.EXACT_INPUT
            ? trade.outputAmount.toSignificant(6) // For exact input trades
            : trade.inputAmount.toSignificant(6); // For exact output trades

      // Log the results
      console.log(
         `Input Amount: ${trade.inputAmount.toSignificant(6)} ${token1.symbol}`
      );
      console.log(`Output Amount: ${outputAmount} ${token2.symbol}`);
      console.log(
         `Quote: 1 ${token2.symbol} = ${trade.executionPrice.toSignificant(
            6
         )} ${token1.symbol}`
      );

      //   // Assuming `trade` is your Trade object
      //   const inputAmount = trade.inputAmount.toSignificant(6);
      //   const outputAmount = trade.outputAmount.toSignificant(6);
      //   const quote = trade.executionPrice.toSignificant(6);

      //   console.log(`Input Amount: ${inputAmount} ${token1.symbol}`);
      //   console.log(`Output Amount: ${outputAmount} ${token2.symbol}`);
      //   console.log(`Quote: 1 ${token1.symbol} = ${quote} ${token2.symbol}`);

      // Calculate the exchange rate
      const exchangeRate = trade.executionPrice.toSignificant(6);
      console.log(exchangeRate);

      // Log the results
      console.log(
         `Input Amount: ${ethers.utils.formatUnits(
            amountIn,
            token1.decimals
         )} ${token1.symbol}`
      );
      console.log(
         `Output Amount: ${ethers.utils.formatUnits(
            outputAmount,
            token2.decimals
         )} ${token2.symbol}`
      );
      console.log(
         `Exchange Rate: 1 ${token1.symbol} = ${exchangeRate} ${token2.symbol}`
      );

      // Return the results
      return {
         inputAmount: trade.inputAmount.toSignificant(6),
         outputAmount,
         quote: trade.executionPrice.toSignificant(6),
      };
      //   return {
      //      inputAmount: ethers.utils.formatUnits(amountIn, token1.decimals),
      //      outputAmount: ethers.utils.formatUnits(outputAmount, token2.decimals),
      //      rate: exchangeRate,
      //      price: trade.executionPrice.toSignificant(6),
      //   };
   } catch (error) {
      console.error('Error fetching token data or performing swap:', error);
   }
};

// Example usage
GetTokenDataAndPerformSwap('1');

/*
   
   
✅ SwapExactETHforTokens //
✅ SwapExactTokensforETH
✅ SwapETHforEaxctTokens
✅ SwapTokensForEaxctETH
✅ SwapExactTokensForTokens
✅ SwapTokensForExactTokens

   
   */
