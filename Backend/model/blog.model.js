import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    blogImage:{
        public_id:{
            type:String,
            require:true
        },
        url:{
            type:String,
            require:true
        }
    },
    category:{
        type:String,
        require:true
    },
    about:{
        type:String,
        require:true
    },
    adminName:{
        type:String,

    },
    adminPhoto:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }

})

export const Blog=mongoose.model("Blog",blogSchema)