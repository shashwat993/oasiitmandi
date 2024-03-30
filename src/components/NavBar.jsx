import Link from 'next/link';
import React from 'react'
import Search from './Search';

const NavBar = () => {
  return (
    <div>
        <div className='bg-white hidden md:flex justify-between border-t-[25px] border-pink-500 px-10 '>
         
          <div className='text-xl font-bold text-black flex items-center select-none'>
             <Link href='/' >
            STUDENT <span className='text-xl text-pink-500 text-nowrap font-light '>PORTAL</span>  
            </Link>
            </div>
          
            

            <div>
                <Search />
            </div>
            
            <div className='text-xl font-bold text-black flex items-center hover:text-pink-500 select-none' > 
            <Link href="/student" className='' > STUDENT</Link>
            </div>
            
            
        </div>


           {/* before md scren */}

        <div className=' flex flex-col md:hidden bg-white border-t-[25px] border-pink-500 px-3 sm:px-5 '>
          
        <div className='text-xl font-bold text-black flex items-center select-none justify-center my-4'>
           <Link href="/" > STUDENT  <span className='text-xl text-pink-500 text-nowrap font-light ml-1'> PORTAL</span> 
            </Link> </div>

      <div className='flex justify-between mb-3'>
        <div>
       <Search />
        </div>
        <div className='text-md font-bold text-black flex items-center hover:text-pink-500 select-none' > 
            <Link href="/student"  > STUDENT</Link>
            </div>
      </div>
        </div>
    </div>
  )
}

export default NavBar