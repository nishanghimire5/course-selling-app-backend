const mongoose = require("mongoose")
async function dbConnect(){
try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected successfully")
}
catch(error){
    console.log("cannot connect to server",error)
}
    }

module.exports = {
    dbConnect:dbConnect
}