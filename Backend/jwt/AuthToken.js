import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js";


const createTokenAndSaveCookies = async (userId,res)=>{
    const token=jwt.sign({userId},"shhh",{
        expiresIn:"30d"
    })

    res.cookie("jwt",token,{
        httpOnly:true,
        path:"/",
        secure:true,
        sameSite:"lax"
    })

    await User.findByIdAndUpdate(userId,{token})


    return token
}

export default createTokenAndSaveCookies