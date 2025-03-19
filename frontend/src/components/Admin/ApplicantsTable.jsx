import React from 'react'
import { TableCaption, Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const shortListingStatus = ['Accepted', 'Rejected']

function ApplicantsTable() {
    const { applicants } = useSelector(store => store.application) || {};
    const applications = applicants?.applications || [];

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating status");
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>List of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan="6">No applicants found</TableCell>
                        </TableRow>
                    ) : (
                        applications.map((item) => {
                            const applicant = item?.applicant; // Extract the applicant

                            return (
                                <TableRow key={item._id}>
                                    <TableCell>{applicant?.fullname || 'N/A'}</TableCell>
                                    <TableCell>{applicant?.email || 'N/A'}</TableCell>
                                    <TableCell>{applicant?.phoneNumber || 'N/A'}</TableCell>
                                    <TableCell>
                                        {applicant?.profile?.resume ? (
                                            <a
                                                className="text-blue-600 cursor-pointer"
                                                href={applicant?.profile?.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {applicant?.profile?.resumeOriginalName || 'Resume'}
                                            </a>
                                        ) : (
                                            <span>NA</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{applicant?.createdAt ? applicant.createdAt.split("T")[0] : 'N/A'}</TableCell>
                                    <TableCell className='text-right'>
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className='w-32 overflow-hidden'>
                                                {shortListingStatus.map((status, index) => (
                                                    <div
                                                        onClick={() => statusHandler(status, item?._id)}
                                                        key={index}
                                                        className='flex w-fit items-center my-2 cursor-pointer'
                                                    >
                                                        <span>{status}</span>
                                                    </div>
                                                ))}
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

export default ApplicantsTable;
