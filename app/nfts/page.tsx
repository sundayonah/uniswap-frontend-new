// app/pages/about.js
import Header from '@/app/component/header';
import { ethers } from 'ethers';
import { Fetcher, Route, WETH, Trade, TokenAmount,Token,TradeType, Percent } from '@uniswap/sdk';
import IUniswapV2Factory from '@uniswap/v2-core/build/IUniswapV2Factory.json';
// import { DAI, WETH } from '@uniswap/sdk-tokens'; // Adjust the import based on the actual library you're using




const NFTs = () => {
  
  
  interface TokenAmountAndSlippage {
  amount: number;
    slippage: number;
    walletAddress:string
  }


  // Define the token amount and slippage
const args: TokenAmountAndSlippage = {
    amount: 100, // Example amount
    slippage: 50, // Example slippage in percentage
    walletAddress: '0x1BB8Dd168a0A6B0d51e0343163aF38Baa330F7c3', // Example wallet address
};
  
  // https://eth-sepolia.g.alchemy.com/v2/ihPUduK-Fp15GsGxUTX92YyglOKJXiyp
  
  const QUICKNODE_HTTP_ENDPOINT = "https://sepolia.infura.io/v3/1f9136b294e248fca6fce6f5c95a0811";
  // const QUICKNODE_HTTP_ENDPOINT = "https://eth-mainnet.g.alchemy.com/v2/1V5KSkZF5x5F1h0wEAhcgTDBpwr7-OsC";
  
  const UNISWAP_ROUTER_CONTRACT_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'; // Uniswap V2 Router contract address on Ethereum mainnet

const chainId = 5
  
// Define the addresses for DAI and WETH
const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

// Create Token objects
const DAI = new Token(chainId, DAI_ADDRESS, 18, 'DAI', 'DAI');
  const WETH = new Token(chainId, WETH_ADDRESS, 18, 'WETH', 'Wrapped Ether');
  
  console.log({ DAI: DAI, WETH: WETH });
  
const network = 'sepolis'
const RPC_URL = 'https://eth-sepolia.g.alchemy.com/v2/kjJMKog-gOBOUs_z5Ji8DtiqHU-E4AB8'

// Create a provider connected to the Ethereum node
  const provider = new ethers.providers.AlchemyProvider();

// Example: Get the current block number
provider.getBlockNumber().then(blockNumber => {
    console.log('Current block number:', blockNumber);
}).catch(error => {
    console.error('Error fetching block number:', error);
});



  
// async function swapTokens(args:TokenAmountAndSlippage) {

//     // Convert amountIn to a BigNumber
// const amountInBigInt = BigInt(args.amount.toString());

//  // Convert slippage to a BigInt
//     const slippageBigInt = BigInt(args.slippage);

//     // Convert slippage to a Percent type
//     const percentSlippage = new Percent(slippageBigInt);


//   const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/1f9136b294e248fca6fce6f5c95a0811');

//   // Fetch DAI and WETH pair
//   const pair = await Fetcher.fetchPairData(DAI, WETH, provider);

//   // Create route
//   const route = new Route([pair], WETH);

//   console.log({pair, route})

//    const trade = new Trade(
//         route,
//         new TokenAmount(DAI, amountInBigInt),
//         TradeType.EXACT_INPUT, // or TradeType.EXACT_OUTPUT depending on your use case
//         // { slippageTolerance: new Percent(slippageBigInt, 100) }
//    );
  
//   console.log(trade)

//   // Get minimum amount of WETH out
//   const amountOutMin = trade.minimumAmountOut(percentSlippage);

//   // Define path
//   const path = [DAI_ADDRESS, WETH_ADDRESS];

//   // Define recipient
//   const to = args.walletAddress;
//   console.log(to)

//   // Set deadline
//   const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now

//   // Convert value to hex
//   const value = trade.inputAmount.raw;
//   const valueHex = await ethers.BigNumber.from(value.toString()).toHexString();

//   // Create a contract instance
// const uniswapRouter = new ethers.Contract(
//     UNISWAP_ROUTER_CONTRACT_ADDRESS,
//     IUniswapV2Factory.abi,
//     provider
// );
//   console.log(uniswapRouter)

// // Example for swapping DAI for WETH
// const tx = await uniswapRouter.populateTransaction.swapExactTokensForETH(
//     args.amount,
//     amountOutMin,
//     path,
//     to,
//     deadline
// );
  
//   console.log({tx}, 'transaction')
//   // Send the transaction
//   // const sendTxn = await wallet.sendTransaction(tx);
//   // console.log(sendTxn.hash, "to see your transaction");
// }
  
// swapTokens(args)
  

 return (
    <div className='mt-24'>
     <Header />
     
 <div className= 'max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[80%] mt-44 p-4'>
       
           <h1 className="font-gilroy-heavy mt-[2rem] lg:mt-[4rem] text-[3rem] lg:text-[3.5rem]">
        Who We Are
      </h1>
      <p className="mt-[1rem] font-gilroy-medium lg:text-[1.1rem]">
        Lorem ipsum dolor sit amet consectetur. Quam enim nunc malesuada felis
      </p>
    </div>
     </div>
 );
};

export default NFTs;