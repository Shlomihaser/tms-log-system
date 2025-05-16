import { Request, Response } from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../../lib/utils/token.js";

export const login = async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;
    console.log("Logging in with", username, password);
    try {
        const user = await User.findOne({ username });
       
        if (!user)
            return res.status(400).json({ message: "Invalid Credentials - username" });

       const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid Credentials - password" });

        const token = generateToken(user._id, res);
        res.status(200).json({ token:token});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = (req: Request, res: Response, next: any) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({ message: "Logged out succesfully."});
    } catch (error : any) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAuth = (req: Request, res: Response) => {
    try {
        res.status(200).json(req.user);
    } catch (error: any) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const register = async () => {
    let username = "adinunu";
    let passsword = "adinunu";

    try {
        const user = await User.findOne({ username });

        if (user)
            return;

        const hashedPassword = await bcrypt.hash(passsword, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

    } catch (error) {
      
    }
};

