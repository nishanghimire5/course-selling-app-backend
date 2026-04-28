const { Router } = require('express');
const { auth } = require('../middleware/auth');
const jwt = require('jsonwebtoken')
const Admin = require('../models/admin');
const bcrypt = require('bcrypt')
const { signupSchema,loginSchema } = require('../schemas/validate');
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
const user = await Admin.findOne({email});
if(!user) return res.status(401).json({message:"Invalid credentials"});
const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch) return res.status(401).json({message:"Invalid Credentials"})
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
return res.status(201).json({message:token})
 }
catch(e){
    return e.message;
}
})

adminRouter.post('/course',async(req,res)=>{

})

adminRouter.get('/courses',async(req,res)=>{

})


adminRouter.put('/course/:id',async(req,res)=>{

})


adminRouter.delete('/course/:id',async(req,res)=>{

})


module.exports = {
    adminRouter
}