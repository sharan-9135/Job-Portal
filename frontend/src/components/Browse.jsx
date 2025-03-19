import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

function Browse() {
    useGetAllJobs();
    const dispatch = useDispatch();
    const {allJobs} = useSelector(store=>store.job)
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""))
        }
    },[])
    return (

        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='text-xl font-bold my-10'>Search Result ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    )
}

export default Browse