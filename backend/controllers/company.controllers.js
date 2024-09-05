import { Company } from "../models/company.model.js";
export const registerCompany = async (res, req)=>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            res.status(400).json({
                message: "company name is required",
                success: false
            })
        }
        let company =await Company.findOne({name:companyName})
        if(company){
            res.status(400).json({
                message: "you can not registre with same company",
                success:false,
            })
        }
        company = await Company.create({
            name:companyName,
            userId:req.id
        });
        return res.status(201).json({
            message:"company registered successfully",
            company,
            success:true
        })
    } catch (error) {
       console.log(error) 
    }
}