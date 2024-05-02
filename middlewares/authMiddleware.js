import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';

//Protected Route token based
export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Authorization token is missing" });
        }

        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode   ; // Attach decoded token to req object
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};


//admin access
export const isAdmin = async(req,res,next)=>{
    try{
        const user= await userModel.findById(req.user._id)
        if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:'Unauthorized Access',
            });
        }else{
            next();
        }
    }catch(error){
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:'Error in admin middleware',
        })
    }
}