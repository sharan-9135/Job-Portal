import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';

import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [query,setQuery] = useState("");
  const searchJobHandler = (e)=>{
      e.preventDefault();
      dispatch(setSearchedQuery(query))
      navigate('/browse')
  }

  return (
    <div className='text-center'>
    <div className='flex flex-col gap-5 my-10'>
       <span className='mx-auto py-2 px-4 rounded-full bg-gray-100 text-[#F83002] font-medium'>Unlock Endless Possibilities with <span className='font-bold text-lg text-[#6A38C2]'>DreamHire</span> Your Pathway to the Perfect Job!</span>
       <h1 className='text-5xl font-extrabold'>Search Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Job</span></h1>
       <p className='font-semibold text-xl'>Explore thousands of job listings from top companies, tailored to your skills and preferences.</p>
    </div>
    <div className='flex w-[40%] border border-gray-300 shadow-lg rounded-full  pl-3 mx-auto items-center'>
        <input
            type='text'
            placeholder='Find your dream job'
            onChange={(e)=>setQuery(e.target.value)}
            className='outline-none w-full border-none'
        />
        <Button onClick={searchJobHandler}   className='rounded-r-full bg-[#6A38C2] hover:bg-[rgb(90,8,213)]'>
            <Search className='w-4 h-4'/>
        </Button>
    </div>
    </div>
  )
}

export default HeroSection