import mongoose, { Schema, Model } from 'mongoose';
import ILog from '../types/log.type.js';

const LogSchema: Schema = new Schema({
    name: {  type: String , required: true},
    date: {
        type:Date,
        default: Date.now
    },
    deviceModel: { 
        type: String , 
        required:true
    },
    imei: { type: String },
    faultDescription: { type: String },
    repairDescription: { type: String},
    fixingPrice: { 
        type: Number,
        required:true
     },
    expense: { type: Number },
    profit: { type: Number },
    fixNumber: { type: Number },
    tableColor: { type: String },
    comments: { type: String },
}, { timestamps: true });


const Log: Model<ILog> = mongoose.model<ILog>('Log', LogSchema);

export default Log;