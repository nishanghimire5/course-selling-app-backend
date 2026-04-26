const { Router } = require("express");
const courseRouter = Router();


courseRouter.post('/purchase',async(req,res)=>{
    // user supposed to pay money in this logic
})



courseRouter.get('/preview',async(req,res)=>{
    //user suppose to view all their purchases here
})


module.exports = {
    courseRouter
}