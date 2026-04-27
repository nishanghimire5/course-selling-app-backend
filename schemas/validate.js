const { z } = require("zod");

const signupSchema = z.object({
    firstname:z.string().min(1,"firstname should be minimum of 1 character"),
    lastname : z.string().min(1,"lastname should be of 1 charcter"),
    email:z.string().email("Invalid email format"),
    password:z.string().min(6,"Please enter min of 6 character")
});


const loginSchema = z.object({
    email:z.string().email(),
    password:z.string()
});




const courseSchema = z.object({
 title:z.string().min(1,"Title required"),
     description:z.string(),
    price:z.number(),
    imageUrl:z.string()
});


const updateCourseSchema = z.object({
     title:z.string().min(1,"Title required"),
    description:z.string(),
    price:z.number(),
    imageUrl:z.string()
});



module.exports = {
    signupSchema,loginSchema,courseSchema,updateCourseSchema
}