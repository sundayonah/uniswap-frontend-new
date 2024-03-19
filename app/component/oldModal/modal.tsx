import axios from 'axios';
import { useEffect, useState } from 'react';
import { Token } from '../swap';

interface ModalProps {
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
   tokenJsonList: Token[];
   filteredTokens: Token[]; // Ensure this is typed as an array of Token objects
   onTokenSelect: (token: Token) => void;
}

// const Modal = ({ isOpen, setIsOpen, tokenJsonList, filteredTokens }) => {
const Modal: React.FC<ModalProps> = ({
   isOpen,
   setIsOpen,
   tokenJsonList,
   filteredTokens,
   onTokenSelect,
}) => {
   const [searchTerm, setSearchTerm] = useState('');
   const [filterTokens, setFilterTokens] = useState<Token[]>([]);

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
   };

   useEffect(() => {
      const results = tokenJsonList.filter(
         (token) =>
            token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (token.address?.toLowerCase() ?? '').includes(
               searchTerm.toLowerCase()
            )
      );

      setFilterTokens(results);
   }, [searchTerm, tokenJsonList]);

   if (!isOpen) return null;

   return (
      <div
         className="fixed z-50 inset-0 flex items-center justify-center select-modal"
         onClick={() => setIsOpen(false)}
      >
         <div
            className="select-modal-content bg-[#121212] border border-gray-600 rounded-lg max-w-sm w-full h-[70%] text-white font-sans text-left shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
         >
            <div className="titleHead flex justify-between">
               <h4 className="text-md py-3 pl-6">Select a token</h4>
               <h4
                  onClick={() => setIsOpen(false)}
                  className="text-md py-3 pr-6 cursor-pointer"
               >
                  ×
               </h4>
            </div>

            <div className=" px-6 mb-3">
               <input
                  className="searchToken bg-transparent border border-gray-600 rounded-lg py-2 px-4 w-full text-white placeholder-white::placeholder outline-none"
                  placeholder="Search name or paste address..."
                  onChange={handleSearchChange}
               />
            </div>
            <div className="px-6 py-2 w-[85%]">
               <div className="grid grid-cols-3">
                  {filteredTokens.map(({ name, symbol, logoURI, address }) => (
                     <div
                        key={symbol}
                        className="flex items-center border border-gray-500 hover:bg-gray-800 m-1 rounded-lg p-1 gap-2 cursor-pointer"
                        onClick={() =>
                           onTokenSelect({ name, symbol, logoURI, address })
                        } // Add this line
                     >
                        <img src={logoURI} alt="logo url" className="w-5 h-5" />
                        <span>{symbol}</span>
                     </div>
                  ))}
               </div>
            </div>
            <hr className="border-gray-700" />
            <div className="">
               <span className="text-sm text-gray-500 px-4">
                  Popular tokens
               </span>
               <div className="scroll-component w-full h-[calc(100vh-510px)] overflow-y-auto">
                  {/* {filteredTokens.map(({ logoURI, name, symbol, address }) => ( */}
                  {filterTokens.map(({ name, symbol, logoURI, address }) => (
                     <div
                        key={address}
                        className="flex items-center gap-2 space-y-3 px-4 hover:bg-slate-700 cursor-pointer"
                        onClick={() =>
                           onTokenSelect({ name, symbol, logoURI, address })
                        } // Add this line
                     >
                        <img
                           className="w-6 h-6 rounded-full"
                           src={logoURI}
                           alt=""
                        />
                        <div>
                           <div className="text-xs text-gray-400">{name}</div>
                           <div className="text-xs text-gray-500">{symbol}</div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};
export default Modal;
