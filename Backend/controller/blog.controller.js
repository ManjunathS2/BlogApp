import { Blog } from "../model/blog.model";
import { v2 as cloudinary } from "cloudinary";

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

        const cloudinaryResponse= await cloudinary.uploder.upload(blogImage.tempFilePath)
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
        const blog=Blog.create(blogData)
        res.status({
            message:"blog created sucssefully",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server error" });
        
    }

}