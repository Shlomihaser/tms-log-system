import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import Log from '../types/Log';
import LogStore from '../types/LogStore';


export const useLogStore = create<LogStore>((set) => ({
    logs:[],
    isLoading: false,

    getLogs: async () => {
        set({ isLoading: true});
        try {
            const res = await axiosInstance.get("/logs");
            set({ logs: res.data });
        } catch (error) {  
            console.log("Error in getLogs:",error);
            set({ logs: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    addLog: async (data : Log) => {
        set({ isLoading : true});
        try {
            await axiosInstance.post("/logs/add-log",data);
            toast.success("Log created successfully");
        } catch (error : any) {
            console.log("Error in addLog:",error);
            toast.error(error.response?.data.message || error.message);
        }finally {
            set({ isLoading : false});
        }
    },

    editLog: async (data : Log) => {
        set({ isLoading: true });
        try {
            
        } catch (error) {
            
        } finally {
            set( { isLoading: true });
        }
    }


}))