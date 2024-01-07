const jwt = require("jsonwebtoken")
// JWT_SECRET = "CSWPPD"



// authorization work has been Done Succesfully......y
module.exports = async(req,res,next)=>{
try {
    const token = req.headers['authorization'].split(" ")[1];
    // console.log(token)
    jwt.verify(token,JWT_SECRET,(err,decode)=>{
       if(err){
           return res.status(200).send({
               message : `${err}`,
               success : false
           })
           
       }
       else{
           req.body.userId = decode.id;
           next()
       }
    })
} catch (error) {
    console.log(error);
    res.status(402).send({
        message:"Authentication Failed",
        success: false
    })
}
}