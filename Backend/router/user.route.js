import express from "express"
import { getAdmins, getMyProfile, login, logout, register } from "../controller/user.controller.js"
import { isAdmin, isAuthenticated } from "../middleware/authUser.js"

const route=express.Router()

route.post('/register',register)
route.post('/login',login)
route.post("/logout" ,isAuthenticated, logout);
route.get('/admin',isAuthenticated,isAdmin('admin'),getAdmins)
route.get('/myprofile',isAuthenticated,getMyProfile)

export default route;