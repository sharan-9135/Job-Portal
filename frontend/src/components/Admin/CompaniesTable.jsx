import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CompaniesTable() {
    const navigate = useNavigate()
    const { companies, searchCompanyByText } = useSelector(store => store.company)
    const [filterCompany, setFilterCompany] = useState(companies);
    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>A list of your registered company</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className='text-medium font-bold'>Logo</TableHead>
                        <TableHead className='text-medium font-bold'>Name</TableHead>
                        <TableHead className='text-medium font-bold'>Date</TableHead>
                        <TableHead className='text-right text-medium font-bold'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {

                        filterCompany?.map((company) => (
                            <tr key={company.id} >
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                                <TableCell className='text-right'>
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            <div onClick={() => { navigate(`/admin/companies/${company._id}`) }} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>


                        ))

                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable