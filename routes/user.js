const express = require('express');
const app = express();
app.use(express.json());

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { Router } = require("express");
const { signupSchema,loginSchema } = require('../schemas/validate')
const User = require('../models/user')

const {auth}  = require('../middleware/auth')
const userRouter = Router();


// user signup
userRouter.post('/signup', async(req,res)=>{
const result = signupSchema.safeParse(req.body);
if(!result.success){
   return res.status(400).json({
        error:result.error.issues
    })

}
const { firstname,lastname,email,password} = result.data;
console.log(firstname,lastname)
try {
    const existing = await User.findOne({
        email
    })
    if(existing){
       return res.status(401).json({
            message:"email already exist"
        })
    }
const hashedPassword = await bcrypt.hash(password,10);
const user = await User.create({
    firstname:firstname,
    lastname:lastname,
    email,
    password:hashedPassword
})
return res.status(200).json({
    message:"signup Successful"
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

//user signin
userRouter.post('/signin',async(req,res)=>{
const result = loginSchema.safeParse(req.body);
if(!result.success){
    return res.status(401).json({
        error:result.error.issues
    })
}
const { email,password} = result.data;
try{
    const user = await User.findOne({email})

    if(!user) return res.status(401).json({message:"invalid credencials"})

        const isMatched = await bcrypt.compare(password,user.password);
        if(!isMatched) return res.status(401).json({message:"invalid credentials"})

            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET);
            return res.status(201).json({Message:token})
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
app.use(auth)

//user purchases
userRouter.get('/purchases',async(req,res)=>{

})



module.exports={
userRouter
}