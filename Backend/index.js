import dotenv from 'dotenv';
import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import registerRoute from "./router/user.route.js"
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload"

const app = express();
dotenv.config();
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET, // Click 'View API Keys' above to copy your API secret
    });


const port = process.env.PORT || 3000;
const MONGO_URI= process.env.MONGO_URI;

try{
    mongoose.connect(MONGO_URI)
    console.log("Connected to MongoDB");
} catch (error) {
    console.log("Error connecting to MongoDB:", error); 
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

app.use('/api/user',registerRoute)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
