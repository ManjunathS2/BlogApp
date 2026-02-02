import mongoose from "mongoose";
import { Blog } from "../model/blog.model.js";
import {v2 as cloudinary } from "cloudinary"

export const createBlog=async (req,res)=>{
    try {
        if(!req.files||Object.keys(req.files).length===0){
           return res.status(400).json({message:"file is required"})
        }

        const {blogImage}=req.files
        const allowedFormat = ["image/jpeg", "image/png", "image/webp"];

        if(!allowedFormat.includes(blogImage.mimetype)){
            return res.status(400).json({message:"file format is wrong"})
        }

        const {title,category,about}=req.body
        if(!title||!category||!about){
            return res.status(400).json({message:"all fields are require"})
        }

        const adminName = req.user?.name || "Unknown";
        const adminPhoto = req.user?.photo?.url || "";
        const createdBy = req.user?._id;

        const cloudinaryResponse= await cloudinary.uploader.upload(blogImage.tempFilePath)
        if(!cloudinaryResponse){
            console.log("error")
        }

        const blogData = {
          title,
          about,
          category,
          adminName,
          adminPhoto,
          createdBy,
          blogImage: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.url,
          },
        };
        const blog=await Blog.create(blogData)
        res.status(201).json({
          message: "Blog created successfully",
          blog,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server error" });
        
    }

}

export const deleteBlog=async (req,res)=>{
    const {id}=req.params
    const blog= await Blog.findById(id)
    if(!blog){
        return res.status(400).json({message:"blog not found"})
    }
    await blog.deleteOne()
    res.status(200).json({message:"blog deleted successfuly"})
}

export const getAllBlog=async (req,res)=>{
    const allBlog=await Blog.find()
    res.status(200).json(allBlog)
}

export const getSingleBlog=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"invalid id"})
    }
    const blog= await Blog.findById(id)
    if(!blog){
        return res.status(400).json({message:"blog not found"})
    }
    res.status(200).json(blog)
}

export const getMyBlog=async(req,res)=>{
    const createdBy=req.user._id
    const myBlog=await Blog.find({createdBy})
    res.status(200).json(myBlog)
}

export const updateBlog=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"user not found"})
    }
    const updateBlog=await Blog.findByIdAndUpdate(id,req.body,{new:true})
    if(!updateBlog){
        return res.status(400).json({message:"not able to update"})
    }
    res.status(200).json(updateBlog)
}