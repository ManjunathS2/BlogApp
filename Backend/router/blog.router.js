import express from "express";
import { createBlog, deleteBlog, getAllBlog, getMyBlog, getSingleBlog, updateBlog } from "../controller/blog.controller.js";
import { isAdmin, isAuthenticated } from '../middleware/authUser.js'

const route=express.Router()

route.post("/createblog",isAuthenticated,isAdmin("admin"),createBlog);
route.delete("/delete/:id",isAuthenticated,isAdmin("admin"),deleteBlog);
route.get('/all-blog',getAllBlog)
route.get('/single-blog/:id',isAuthenticated,getSingleBlog)
route.get('/my-blog',isAuthenticated,isAdmin("admin"),getMyBlog)
route.put('/update-blog/:id',isAuthenticated,isAdmin("admin"),updateBlog)

export default route

