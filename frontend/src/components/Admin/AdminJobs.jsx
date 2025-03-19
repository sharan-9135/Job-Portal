import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { useNavigate } from 'react-router-dom'


import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import {setSearchJobByText } from '@/redux/jobSlice'

function AdminJobs() {
    useGetAllAdminJobs()
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSearchJobByText(input))
    }, [input])
    return (
        <div>
            <Navbar />
            <div className=' max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between'  >

                    <Input
                        className='w-fit'
                        placeholder='filter By Name, role'
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => { navigate('/admin/jobs/create') }}>New Jobs</Button>
                </div>
                <AdminJobsTable />
            </div>
        </div>
    )
}

export default AdminJobs