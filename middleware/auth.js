const jwt = require("jsonwebtoken");

function auth(req,res,next){
const authHeader = req.headers.authorization;
if(!authHeader || !authHeader.startsWith("Bearer ")){
    res.status(401).json({
        message: "Invalid token or token missing"
    })
}
const token = authHeader.split("")[1];

try{
const decoded = jwt.verify(token,process.env.JWT_SECRET);
req.userId = decoded.userId
next()
}
catch(error){
res.status(500).json({
    message:"server error",error
})
}

}


module.exports = {auth}