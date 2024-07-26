const jwt = require("jsonwebtoken");
const JWT_SECRET = 'karannn@efe';

const fetchuser=(req,res,next)=>{

    const token=req.header('auth-token');

    if(!token)
    {
        return res.status(401).send({ error: "Authentication failed!!" });
    }
    try
    {
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
    
    
        next();
    
    }
    catch(error){
        return res.status(401).send({ error: "Authentication failed!!" });
    }
   
}

module.exports=fetchuser;