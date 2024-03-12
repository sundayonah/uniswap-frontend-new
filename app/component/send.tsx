const Send = () => {
return(
    
               <div className="flex flex-col items-center justify-center space-y-1">
                  <div className="flex justify-between items-center bg-[#1c1c1c] shadow-xl rounded-xl p-2 my-1 w-full">
                     <div className="flex-1">
                        <label className="text-gray-500 text-sm">You are sending</label>
                        <input
                           type="text"
                           placeholder="0.0"
                           className="bg-transparent text-white placeholder-gray-500 rounded w-full p-2 outline-none"
                        />
                     </div>
                     <button className="bg-[#1c1c1c] text-white rounded p-2">
                        Select Token
                     </button>
                  </div>

                  <div className="flex justify-between items-center bg-[#1c1c1c] shadow-xl rounded-xl p-2 w-full">
                     <div className="flex-1">
                        <label className="text-gray-500 text-sm">
                          To
                        </label>
                        <input
                           type="text"
                           placeholder="Wallet address or ENS name"
                           className="bg-transparent text-white placeholder-gray-500 rounded w-full p-2 outline-none "
                        />
                     </div>
                
                  </div>
                  <div className="w-full flex justify-center mt-2">
                     <button
                        // onClick={handleSwap}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                     >
                        Send
                     </button>
                  </div>
               </div>
)
}
export default Send