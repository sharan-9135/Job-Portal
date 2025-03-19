import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyBYId from '@/hooks/useGetCompanyBYId'

function CompaniesSetup() {
    const params = useParams();
    useGetCompanyBYId(params.id)
    const {singleCompany} = useSelector(store=>store.company)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file && !file.type.startsWith('image/')) {
            toast.error('Please upload a valid image file.');
            return;
        }
        setInput({ ...input, file });
    };

    const validateForm = () => {
        if (!input.name || !input.description || !input.website || !input.location) {
            toast.error('Please fill all required fields.');
            return false;
        }
        return true;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };
     useEffect(()=>{
       setInput({
        name: singleCompany.name|| "",
        description: singleCompany.description|| "",
        website:singleCompany.website||  "",
        location:singleCompany.location||  "",
        file: singleCompany.file|| null
       })
     },[singleCompany])

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button
                            onClick={() => navigate('/admin/companies')}
                            variant='outline'
                            className='flex items-center text-gray-500'
                            disabled={loading}
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='text-xl font-bold'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type='text'
                                name='name'
                                value={input.name}
                                onChange={changeEventHandler}
                                disabled={loading}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name='description'
                                value={input.description}
                                onChange={changeEventHandler}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type='text'
                                name='website'
                                value={input.website}
                                onChange={changeEventHandler}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='location'
                                value={input.location}
                                onChange={changeEventHandler}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type='file'
                                accept="image/*"
                                onChange={changeFileHandler}
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <Button
                        type='submit'
                        className='w-full my-4'
                        disabled={loading}
                    >
                        {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Update'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default CompaniesSetup;
