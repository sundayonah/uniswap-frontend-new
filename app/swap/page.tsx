import React from 'react';
import Header from '../component/header';

import {ImageSvg} from '@/app/component/Image'


const Swap = () => {
   return (
      <div className='flex flex-col items-center justify-center min-h-[80%] mt-44'>
         <h1 className='text-center'>Swap Page</h1>
         <p className='text-center'>Welcome to the home page!</p>
         
<ImageSvg />
         
         <img src='https://sideshift.ai/api/v2/coins/icon/ATLAS' className='w-8 h-8'  alt='' />
      </div>
   );
};

export default Swap;