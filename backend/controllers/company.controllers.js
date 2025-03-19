import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        // Ensure companyName is provided and not an empty string
        if (!companyName || companyName.trim() === "") {
            return res.status(400).json({
                message: "Company name is required and cannot be empty.",
                success: false
            });
        }

        // Normalize the company name by trimming any spaces
        const normalizedCompanyName = companyName.trim();

        // Check if a company with the same name already exists
        let existingCompany = await Company.findOne({ name: normalizedCompanyName });
        console.log("Existing Company:", existingCompany);
        if (existingCompany) {
            return res.status(400).json({
                message: "You can't register the same company.",
                success: false
            });
        }

        // Register the company
        let company;
        try {
            company = await Company.create({
                name: normalizedCompanyName,
                userId: req.id
            });
        } catch (createError) {
            console.error("Error creating company:", createError);
            return res.status(500).json({
                message: "An error occurred while creating the company.",
                success: false
            });
        }

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        // Handle and log other errors
        console.error("Error in registerCompany:", error);
        return res.status(500).json({
            message: "An error occurred while registering the company.",
            success: false
        });
    }
};

// Get all companies for a user
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;  // Assuming `req.id` contains the authenticated user's ID

        const companies = await Company.find({ userId });  // Pass `userId` as an object

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found for the user",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Get a company by its ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(companyId);  // Use `companyId` instead of `userId`

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Update a company's details
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;  // Assume this is for file uploads (e.g., using Cloudinary)
         const fileUri = getDataUri(file);
         const cloudResponce = await cloudinary.uploader.upload(fileUri.content)
         const logo = cloudResponce.secure_url
        const updateData = { name, description, website, location,logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });  // Await the update

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(202).json({
            message: "Company information updated",
            success: true,
            company
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
