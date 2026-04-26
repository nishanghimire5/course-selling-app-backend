const { Router } = require("express");
const userRouter = Router();


// user signup
userRouter.post('/signup', async(req,res)=>{
res.status(200).json({message:"signup done"})
})


//user signin
userRouter.post('/signin',async(req,res)=>{

})

//user purchases
userRouter.get('/purchases',async(req,res)=>{

})



module.exports={
userRouter
}