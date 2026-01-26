import mongoose, { mongo }  from "mongoose";
import validator from "validater"

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true     
    },
    email:{
        type:String,
        require:true,
        unique:true, 
        validator:[validator.isEmail,"wrong email"] 
    },
    password:{
        type:String,
        require:true     
    },
    photo:{
        public_id:{
            type:String,
            require:true
        },
        url:{
            type:String,
            require:true
        }
    },
    phone:{
        type:Number,
        require:true,
        unique:true
    },
    role:{
        type:String,
        enum:["admin","user"]
    },
    education:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const User=mongoose.model("User",userSchema)

