import mongoose from "mongoose";
import { number } from "zod";
const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    requirement:[{
        type:String
    }],
    salary:{
        type: number,
        required: true
    },
    location:{
        type:String,
        required: true
    },
    jobtype:{
         type: String,
         required: true
    },
    position:{
        type:Number,
        required: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    application:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Application',
    }]
       
    
},{timestamps:true});
export const Job = mongoose.model("Job", jobSchema);