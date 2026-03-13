import jwt from "jsonwebtoken";

const blocklist =[];

const auth  = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message : "Access denied. No token provided."});
    }
    if(blocklist.includes(token)){
        return res.status(401).json({message:"Token expired after logout"});
    }
    try{
        const verified = jwt.verify(token, "secretkey");
        req.user = verified;
        next();
    }
    catch(error){
        return res.status(401).json({message : "Invalid token..."});
    }
}

export {auth, blocklist};