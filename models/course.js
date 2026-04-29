const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    price:{type:Number},
    imageUrl:{type:String},
    creatorId:{type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",required:true
    }
},{ timestamps: true })


module.exports = mongoose.model("Course",courseSchema)