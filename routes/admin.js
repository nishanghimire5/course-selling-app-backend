const { Router } = require('express');
const adminRouter = Router();

adminRouter.post('/signup',async(req,res)=>{

})


adminRouter.post('/signin' ,async(req,res)=>{

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