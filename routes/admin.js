const express = require("express");
const app = express();
app.use(express.json())
const { Router } = require('express');
const { adminAuth } = require('../middleware/adminAuth');
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin');
const Course = require("../models/course")
const bcrypt = require('bcrypt')
const { signupSchema,loginSchema,courseSchema,updateCourseSchema } = require('../schemas/validate');
const { json } = require("zod");
const adminRouter = Router();

adminRouter.post('/signup',async(req,res)=>{
const result = signupSchema.safeParse(req.body);
if(!result.success){
    return res.status(400).json({
         error:result.error.issues
    })
}
console.log(result.data);
const {firstname,lastname,email,password} = result.data;
try{
    const existing = await Admin.findOne({ 
email
    })
if(existing){
return res.status(409).json({
    message:"email already exists"
})
}
const hashedPassword = await bcrypt.hash(password,10);
const user = await Admin.create({
    firstName:firstname,lastName:lastname,email,password:hashedPassword
})
return res.status(201).json({
    message:`signup Successful with userId: ${user._id}`
})
}
catch(error){
    console.error("ERROR NAME:", error.name);
    console.error("ERROR MESSAGE:", error.message);
    console.error("ERROR CODE:", error.code);
    return res.status(500).json({ 
        message: "Internal server error",
        errorName: error.name,
        errorMessage: error.message,
        errorCode: error.code
    });
}



})


adminRouter.post('/signin' ,async(req,res)=>{
const result = loginSchema.safeParse(req.body);
if(!result.success){
    return res.status(400).json({
        error:result.error.issues
    })
}
const {email,password} = result.data;
try{
const admin = await Admin.findOne({email});
if(!admin) return res.status(401).json({message:"Invalid credentials"});
const isMatch = await bcrypt.compare(password,admin.password);
if(!isMatch) return res.status(401).json({message:"Invalid Credentials"})
    const token = jwt.sign({id:admin._id},process.env.JWT_ADMIN_SECRET)
return res.status(201).json({message:token})
 }
catch(e){
    return e.message;
}
})



adminRouter.post('/course',adminAuth,async(req,res)=>{
const result = courseSchema.safeParse(req.body);
if(!result.success) return res.status(401).json({error:result.error.issues})
    const { title,description,price,imageUrl } = result.data;
try{
const course = await Course.create({
    title,description,price,imageUrl,creatorId:req.id
})
return res.status(201).json({message:"successfully course created"})

}
catch(error){
    return res.status(500).json({
        error:error.message
    })
}
})
//get all courses or preview all courses
adminRouter.get('/courses',async(req,res)=>{
try{const data = await Course.find().populate("creatorId","firstName");

    const formatted = data.map((course)=>({
        title:course.title,
        description:course.description,
        price:course.price,
        image:course.imageUrl,
        creator:course.creatorId?.firstName
    }))


return res.status(201).json(
formatted
)

}
catch(error){
    return res.status(500).json({message:error.message})
}
})


adminRouter.put('/course/:id',async(req,res)=>{

})


adminRouter.delete('/course/:id',async(req,res)=>{

})


module.exports = {
    adminRouter
}