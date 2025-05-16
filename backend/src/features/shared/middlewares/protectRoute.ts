import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../../authentication/models/user.model.js";
import { Request, Response } from "express";
import { CustomJwtPayload } from "../../authentication/types/index.js";

export const protectRoute = async (req: Request, res: Response, next: any) => {
  
    try {
        const token = req.cookies.jwt;
    
        if(!token){
            res.status(401).json({ message: "Unauthorized - No Token Provided."});
            return;
        }
       
        const jwtSecret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token,jwtSecret) as CustomJwtPayload ;
        if(!decoded){
            res.status(401).json({ message: "Unauthorized - Invalid Token"});
            return;
        }
        
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            res.status(404).json({ message: "User not found"});
            return;
        }
        
        req.user = user;
        next();
    } catch (error : any) {
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error"});
    }
} 