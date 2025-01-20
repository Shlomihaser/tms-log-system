import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import Log from '../types/Log';
import LogStore from '../types/LogStore';

type SortDirection = 'asc' | 'desc' | null;

export const useLogStore = create<LogStore>((set, get) => ({
    logs: [],
    filteredLogs: [],
    isLoading: false,
    searchTerm: '',
    sortColumn: null,
    sortDirection: null,

    getLogs: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/logs");
             const sortedLogs = [...res.data].sort((a, b) => {
                const aDate = new Date(a.date);
                 const bDate = new Date(b.date);
                return bDate.getTime() - aDate.getTime();
            })

          set({
            logs: res.data,
            filteredLogs: sortedLogs,
            sortColumn: "date",
            sortDirection: "desc"
           });
        } catch (error) {
            console.log("Error in getLogs:", error);
              set({ logs: [], filteredLogs: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    addLog: async (data: Log) => {
        set({ isLoading: true });
        try {
            await axiosInstance.post("/logs/add-log", data);
            toast.success("Log created successfully");
            await get().getLogs();
        } catch (error: any) {
            console.log("Error in addLog:", error);
            toast.error(error.response?.data.message || error.message);
        } finally {
            set({ isLoading: false });
        }
    },

    editLog: async (data: Log) => {
      set({ isLoading: true });
      try {
        await axiosInstance.put(`/logs/${data.id}`, data);
        toast.success("Log updated successfully");
         await get().getLogs();
      } catch (error: any) {
        console.log("Error in editLog:", error);
        toast.error(error.response?.data.message || error.message);
      } finally {
        set({ isLoading: false });
      }
    },
    
    deleteLog: async (logId: number) => {
      set({ isLoading: true });
      try {
        await axiosInstance.delete(`/logs/${logId}`);
         toast.success("Log deleted successfully");
          await get().getLogs();
      } catch (error: any) {
        console.log("Error in deleteLog:", error);
        toast.error(error.response?.data.message || error.message);
      } finally {
        set({ isLoading: false });
      }
    },

    handleSearchChange: (searchTerm: string) => {
      set({ searchTerm });
        const { logs } = get();
        if (!logs || logs.length === 0) {
            set({ filteredLogs: [] });
            return;
        }

        if (!searchTerm) {
            set({ filteredLogs: logs });
            return;
        }
        const filtered = logs.filter((log: Log) => {
            const searchString = searchTerm.toLowerCase();
            return (
                log.name.toLowerCase().includes(searchString) ||
                log.deviceModel.toLowerCase().includes(searchString) ||
                log.imei.toLowerCase().includes(searchString) ||
                log.faultDescription.toLowerCase().includes(searchString) ||
                log.repairDescription.toLowerCase().includes(searchString) ||
                String(log.id).includes(searchString) ||
                log.comments.toLowerCase().includes(searchString)
            );
        });
        set({ filteredLogs: filtered });
    },

    setSort: (column: keyof Log) => {
        const { sortColumn, sortDirection, filteredLogs } = get();

        const newDirection =
            sortColumn === column
                ? sortDirection === "asc" ? "desc" : "asc"
                : "asc";

        const sorted = [...filteredLogs].sort((a, b) => {
            const aValue = a[column];
            const bValue = b[column];
           if (aValue === undefined || bValue === undefined) return 0;


           if (typeof aValue === 'string' && typeof bValue === 'string') {
             return newDirection === 'asc'
               ? aValue.localeCompare(bValue)
               : bValue.localeCompare(aValue);
           }
           if(typeof aValue === 'number' && typeof bValue === 'number'){
             return newDirection === 'asc' ? aValue - bValue : bValue - aValue;
         }
          return 0;
         });

        set({
            sortColumn: column,
            sortDirection: newDirection,
              filteredLogs: sorted,
        });
    },
}));