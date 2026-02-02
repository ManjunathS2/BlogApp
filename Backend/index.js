import dotenv from 'dotenv';
import express from 'express';
import mongoose, { Mongoose } from 'mongoose';
import registerRoute from "./router/user.route.js"
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload"
import cookieParser from 'cookie-parser';
import cors from "cors"
import blogRoute from './router/blog.router.js'

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const MONGO_URI= process.env.MONGO_URI;
app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
  }),
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // Click 'View API Keys' above to copy your API secret
});


app.use("/api/user", registerRoute);
app.use("/api/blog", blogRoute);





try{
    mongoose.connect(MONGO_URI)
    console.log("Connected to MongoDB");
} catch (error) {
    console.log("Error connecting to MongoDB:", error); 
}



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
