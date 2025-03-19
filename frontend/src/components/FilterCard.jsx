import React, { useEffect, useState } from 'react'
import { array } from 'zod'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from '@radix-ui/react-label'
import { useDispatch } from 'react-redux'
import { set } from 'mongoose'
import { setSearchedQuery } from '@/redux/jobSlice'
 const filterData =[
    {
        filterType:"Location",
        array:["Gurgaon", "Hyderabad", "Bangalore", "Delhi NCR","Pune"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer", "Backend Developer", "Mern Stack", "HR"]
    },
    {
        filterType:"Salary",
        array:["0-40k", "40k-1Lac", "1Lac-1.25Lac", "1.5L"]
    }
   
 ]
function FilterCard() {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch()
    const changeHandler = (value)=>{
        setSelectedValue(value)
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue))
    },[selectedValue])
  return (
    <div className='w-full rounded-md p-3 bg-white'>
        <img src='https://media.tenor.com/iyOOkFq5RLQAAAAj/what-looking.gif'/>
        <hr className='mt-5'/>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
                filterData.map((data, index) =>(
                    <div>
                        <h1 className='font-bold text-2xl'>{data.filterType}</h1>
                        { 
                            data.array.map((item, idx)=>{
                                const itemId = `id${index}-${idx}`
                                return (
                                    <div className='flex items-center space-x-1 my-2'>
                                        <RadioGroupItem value={item} id={itemId}/>
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterCard