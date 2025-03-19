import React from 'react'
import { Button } from './ui/button'
import {Bookmark } from 'lucide-react'

import { AvatarImage, Avatar } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function Job({job}) {
    const navigate = useNavigate()
    // const jobId = "hgfdhs";

    const postedDay = (mongodbTime)=>{
       const createdAt = new Date(mongodbTime);
       const currentTime = new Date();
       const timeDifference = currentTime-createdAt;
       return Math.floor(timeDifference/(1000*24*60*60))
    }
    return (
        <div className='p-5 rounded-md shadow-xl border border-gray-200 bg-white'>
            <div className='flex justify-between items-center'>
                <p>{postedDay(job?.createdAt)=== 0 ?'Today':`${postedDay(job?.createdAt)} Days ago`}</p>
                <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
            </div>

            <div className='flex gap-2 my-2 items-center'>
                <Button variant='outline' className='p-6' size='icon'>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-400'>India</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} position</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
            </div>
            <div className='flex items-center mt-4 gap-4'>
                <Button variant='outline' className='rounded-sm' onClick={ () => navigate(`/description/${job._id}`)}>Details</Button>
                <Button  className='rounded-sm bg-[#7209b7] text-white'>Save For Later</Button>
            </div>

        </div>


    )
}

export default Job