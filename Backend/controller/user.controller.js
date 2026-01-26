import { User } from "../model/user.model.js"
import bcrypt from  "bcryptjs"
import { v2 as cloudinary } from "cloudinary";

export const register=async (req,res)=>{
    try {
        if(!req.files|| Object.keys(req.files).length===0){
            res.status(400).json({message:"upload a file"})
        }
        const { photo } = req.files;
        const allowedFormat = ["image/jpeg", "image/png", "image/jpg"];
        if(!allowedFormat.includes(photo.mimetype)){
            res.status(400).json({message:"wrong file formate"})
        }
        

        const { email, name, password, phone, education, role } = req.body;
        if(!email||!name||!password||!phone||!education||!role||!photo){
            return res.status(400).json({message:"all feilds are required"})
        }

        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"user alredy exist"})
        }
        const hashPassword=await bcrypt.hash(password,10)

        const cloudinaryResponse=await cloudinary.uploader.upload(photo.tempFilePath)
        const newUser = new User({
          email,
          name,
          password:hashPassword,
          phone,
          photo:{     
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.url
          },
          education,
          role,
        });
        await newUser.save()
        if(newUser){
            return res.status(200).json({message:"user crested succesfully",})
        }

    } catch (error) {
        console.log("error",error)
    }

}

