import { User } from "../model/user.model";
import jwt from "jsonwebtoken"

export const isAuthenticated=async(req,res)=>{
    try{
        const token=req.cookies.jwt
        if(!token){
            return res.status(400).json({messge:"user not authorized"})
        }
        const decoder=jwt.verify(token,"shh")
        const user=await User.findOne(decoder.userid)
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        req.user=user
        next()


    }catch(error){
        console.log(error)

    }

}

export const isAdmin=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return res.status(400).json({message:"user is not authenticated"})

        }
    }
}