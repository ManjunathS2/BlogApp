import { User } from "../model/user.model.js"
import bcrypt from  "bcryptjs"
import { v2 as cloudinary } from "cloudinary";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";

export const register = async (req, res) => {
  try {

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Upload a file" });
    }

    const { photo } = req.files;
    const allowedFormat = ["image/jpeg", "image/png", "image/jpg"];


    if (!allowedFormat.includes(photo.mimetype)) {
      return res.status(400).json({ message: "Wrong file format" });
    }


    const { email, name, password, phone, education, role } = req.body;
    if (!email || !name || !password || !phone || !education || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists (email or phone)" });
    }


    const hashPassword = await bcrypt.hash(password, 10);
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath,
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(400).json({ message: "Error in Cloudinary" });
    }


    const newUser = new User({
      email,
      name,
      password: hashPassword,
      phone,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
      education,
      role,
    });

    await newUser.save();

    if (newUser) {
      const token = await createTokenAndSaveCookies(newUser._id, res);
      console.log("Token generated:", token);

      return res.status(201).json({
        message: "User created successfully", 
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          education: newUser.education,
          photo: newUser.photo, 
          createdOn: newUser.createdAt, 
        },
        token: token,
      });
    }
  } catch (error) {
    console.log("Error in register:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login= async(req,res)=>{
    const {email,password,role}=req.body
    console.log(req.body)

    try{
        if(!email||!password||!role){
           return res.status(400).json({meassage:"error in the file"})
        }
        const user=await User.findOne({email}).select("+password")
        if(!user){
            
           return res.status(400).json({ meassage: "invalid password or email" });
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!user||!isMatch){
            return res.status(400).json({ meassage: "invalid password or email" });
        }
        if(user.role!==role){
            return res
              .status(400)
              .json({ meassage: "invalid role" });

        }
        let token=await createTokenAndSaveCookies(user._id,res)
        console.log(token)
        res.status(200).json({
            message:"login success",
            user:{
                _id:user._id,
                name:user.name,
                email: user.email,
             role: user.role,
            },
            token:token
        })


    }catch(error){
          console.log(error);
          return res.status(500).json({ error: "Internal Server error" });

    }
}

export const logout=(req,res)=>{
    try {
        res.clearCookie("jwt")
        res.status(200).json({message:"logout successfull"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server error" });
    }

}


export const getMyProfile = async(req,res)=>{
    const user=await req.user
    res.status(200).json({user})

}

export const getAdmins=async (req,res)=>{
    try{
        const   admin= await User.find({role:"admin"})
        res.status(200).json({admin})
    }catch(err){
        console.log(err)
    }
}
