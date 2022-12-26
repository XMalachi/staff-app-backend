import JWT from "jsonwebtoken";
import Staff from "../models/staffModel.js";


const Protect = async(req, res, next) => {
    console.log("req.header.authorization",req.headers.authorization)
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    
    try{
        const decoded = await JWT.verify(token, process.env.JWT_TOKEN)
        console.log('the decoded token', decoded.id)
        const staff = await Staff.findById(decoded.id).select("-password")
        console.log("staff with decoded id", staff)
        req.staff = staff;
        console.log(req.staff)
        next()
    }catch(err){
        console.log(err)
            res.status(401).json({
                status: "error",
                error: "Invalid token. Not authorized!"
            })
        }
    }

    if(!token){
        res.status(401).json({
            status: "error",
            error: "No token. Not authorized!"
        })
    }

}

// Authorize Staff Roles
const authorizeStaff = (roles) => {
    return (req, res, next)=>{
        if(!roles.includes(req.staff.role)){
            throw new Error(`Role ${req.staff.role} is not authorized to visit this page`)
        }
        next()
    }
}


export {Protect, authorizeStaff}