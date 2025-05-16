import { Request, Response } from "express"
import Log from "../models/log.model.js";


export const getLogs = async (req: Request, res: Response): Promise<any> => {
    try {
        const logs = await Log.find();
        res.status(200).json(logs);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const addLog = async (req: Request, res: Response): Promise<any> => {
    const log = req.body;

    try {
        if (!log.name || !log.deviceModel || !log.fixingPrice)
            return res.status(400).json({ message: "Fill all the required inputs" });

        const newLog = new Log(log);
        if (newLog) await newLog.save();
        else res.status(400).json({ message: "Invalid user data" });
        res.status(200).json(newLog)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}
export const updateLogColor = async (req: Request, res: Response): Promise<any> => {
    const logId = req.params.id;
    const tableColor = req.body.color;

    try {
        const updatedLog = await Log.findByIdAndUpdate(
          logId,
          { tableColor },
          { new: true, runValidators: true } // Add { new: true } to get the updated document and run validators
        );
        console.log(updatedLog);
        if (!updatedLog) {
          return res.status(404).json({ message: 'Log not found' });
        }
        res.status(200).json(updatedLog);
      } catch (error: any) {
        console.error('Error updating log color:', error);
        res.status(500).json({ message: 'Failed to update log color', error: error.message });
      }

}
export const updateLog = async (req: Request, res: Response): Promise<any> => {
    const logId = req.params.id;
    const newLog = req.body;

    try {
        const updatedLog = await Log.findByIdAndUpdate(logId, newLog);
        console.log(updatedLog)
        res.status(200).json(updatedLog);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteLog = async (req: Request, res: Response): Promise<any> => {
    const logId = req.params.id;

    try {
        await Log.findByIdAndDelete(logId);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }

}