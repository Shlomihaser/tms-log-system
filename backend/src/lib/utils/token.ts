import jwt from "jsonwebtoken";
import { Response } from "express";
import mongoose from "mongoose";

export const generateToken = (userId : mongoose.Types.ObjectId, res: Response) => {
    const jwtSecret = process.env.JWT_SECRET as string;

    const token = jwt.sign({userId}, jwtSecret, {
        expiresIn:"7d"
    });
    
    res.cookie("jwt",token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // Valid for 7 Days 
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    });
  
    return token;
}