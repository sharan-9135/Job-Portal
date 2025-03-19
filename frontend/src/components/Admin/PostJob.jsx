import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectValue } from '../ui/select';
import { SelectLabel, SelectTrigger } from '@radix-ui/react-select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

function PostJob() {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handling input field change
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const { companies } = useSelector(store => store.company);

    // Handling company selection
    const selectChangeHandelar = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany?._id });
    };

    // Submit form handler
    const submitHandelar = async (e) => {
        e.preventDefault();

        // Basic validation to check if all required fields are filled
        if (!input.title || !input.description || !input.salary || !input.companyId) {
            toast.error("Please fill out all required fields.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandelar} className='p-8 max-w-4xl border-gray-200 shadow-lg rounded-md w-full'>
                    <div className='grid grid-cols-2 gap-3'>

                        <div>
                            <Label>Title</Label>
                            <Input
                                type='text'
                                name='title'
                                value={input.title}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>

                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type='text'
                                name='requirements'
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input
                                type='text'
                                name='salary'
                                value={input.salary}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>

                        <div>
                            <Label>JobType</Label>
                            <Input
                                type='text'
                                name='jobType'
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>

                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type='text'
                                name='experience'
                                value={input.experience}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>

                        <div>
                            <Label>No. of Positions</Label>
                            <Input
                                type="number"
                                name='position'
                                value={input.position}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>

                        {/* Company Selection */}
                        {companies.length > 0 && (
                            <Select onValueChange={selectChangeHandelar} disabled={companies.length === 0}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a company" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Companies</SelectLabel>
                                        {companies.map((company) => (
                                            <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {/* Submit Button with Loading Spinner */}
                    <Button type="submit" className="w-full my-4" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </>
                        ) : (
                            "Post New Job"
                        )}
                    </Button>

                    {/* If no companies, show this message */}
                    {companies.length === 0 && (
                        <p className='text-xs text-red-500 font-bold text-center mt-4'>
                            *Please register a company before creating a job
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default PostJob;
