import { Request, Response } from "express"
import Log from "../models/log.model.js";


export const getLogs = async (req: Request, res: Response) : Promise<any>  => {
    try {
        const logs = await Log.find();

        res.status(200).json(logs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getLogById = async (req: Request, res: Response) :Promise<any> => {
    const logId  = req.params.id;

    try {
        const log = await Log.findById(logId);
        if(!log)
            res.status(400).json({ message : "Failed to fetch log"});
        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const addLog = async (req: Request, res: Response) : Promise<any> => {
    const log = req.body;
    
    try {   
        if (!log.name || !log.deviceModel || !log.fixingPrice)
            return res.status(400).json({ message: "Fill all the required inputs" });
        
        const newLog = new Log(log);
        console.log(newLog);
        if (newLog) await newLog.save();
        else res.status(400).json({ message: "Invalid user data" });
        res.status(200).json(newLog)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateLog = async (req: Request, res: Response): Promise<any> => {
    const logId = req.params.id;
    const newLog = req.body;

    try {
        const updatedLog = await Log.findByIdAndUpdate(logId, newLog);
        res.status(200).json(updatedLog);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteLog = async (req: Request, res: Response) : Promise<any>=> {
    const  logId  = req.params.id;

    try {
        await Log.findByIdAndDelete(logId);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }

}