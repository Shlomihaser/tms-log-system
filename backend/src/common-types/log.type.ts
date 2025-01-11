import { Document } from 'mongoose';

interface ILog extends Document {
    name: string,
    date: Date,
    deviceModel: string,
    imei: string,
    faultDescription: string,
    repairDescription: string,
    fixingPrice: number,
    exspense: number,
    profit: number,
    completed: boolean,
    comments:string,
    isStarred: boolean
}

export default ILog;