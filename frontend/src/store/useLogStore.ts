import { create } from "zustand";
import toast from "react-hot-toast";
import Log from "../types/Log";
import axios from 'axios';

interface LogStore {
  logs: Log[];
  filteredLogs: Log[];
  isLoading: boolean;
  searchTerm: string;
  getLogs: () => Promise<void>;
  addLog: (log: Log) => Promise<void>;
  editLog: (log: Log) => Promise<void>;
  handleSearchChange: (searchTerm: string) => void;
  deleteLog: (logId: string) => Promise<void>;
  updateLogColor: (id: string, color: string) => Promise<void>;
}

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

// Update auth header when token changes
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useLogStore = create<LogStore>((set, get) => {
  
  const handleApiError = (error: any) => {
    console.error("API Error:", error);
    
    // Handle unauthorized errors
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      // Redirect to login if needed
      window.location.href = '/login';
      return;
    }
    
    toast.error(
      error.response?.data.message || error.message || "An error occurred."
    );
  };

  return {
    logs: [],
    filteredLogs: [],
    isLoading: false,
    searchTerm: "",
    
    getLogs: async () => {
      set({ isLoading: true });
      try {
        const res = await axiosInstance.get("/logs");
        console.log("Fetched logs:", res.data);
        
        // Ensure we're setting the state with the data in the right format
        const logsData = Array.isArray(res.data) ? res.data : [];
        
        set({
          logs: logsData,
          filteredLogs: logsData,
        });
      } catch (error) {
        handleApiError(error);
        set({ logs: [], filteredLogs: [] });
      } finally {
        set({ isLoading: false });
      }
    },

    addLog: async (data: Log) => {
      set({ isLoading: true });
      try {
        const response = await axiosInstance.post("/logs/add-log", data);
        toast.success("Log created successfully");
        
        // Option 1: Update state directly for faster UI response
        const newLog = response.data;
        set(state => ({
          logs: [...state.logs, newLog],
          filteredLogs: [...state.filteredLogs, newLog]
        }));
        
        // Option 2: Refetch all logs (commented out but can be used instead)
        // await get().getLogs();
      } catch (error) {
        handleApiError(error);
      } finally {
        set({ isLoading: false });
      }
    },

    editLog: async (data: Log) => {
      set({ isLoading: true });
      try {
        await axiosInstance.put(`/logs/${data._id}`, data);
        toast.success("Log updated successfully");
        
        // Option 1: Update state directly for faster UI response
        set(state => ({
          logs: state.logs.map(log => log._id === data._id ? data : log),
          filteredLogs: state.filteredLogs.map(log => log._id === data._id ? data : log)
        }));
        
        // Option 2: Refetch all logs (commented out but can be used instead)
        // await get().getLogs();
      } catch (error) {
        handleApiError(error);
      } finally {
        set({ isLoading: false });
      }
    },

    updateLogColor: async (id: string, color: string) => {
      try {
        await axiosInstance.put(`/logs/${id}/color`, { color }); // Send only the color to update

        set({
          logs: get().logs.map((log) =>
            log._id === id ? { ...log, color } : log
          ),
          filteredLogs: get().filteredLogs.map((log) =>
            log._id === id ? { ...log, color } : log
          ),
        });
      } catch (error: any) {
        console.error('Failed to update log color:', error.message);
      }
    },

    deleteLog: async (logId: string) => {
      set({ isLoading: true });

      try {
        await axiosInstance.delete(`/logs/${logId}`);
        toast.success("Log deleted successfully");
        
        // Option 1: Update state directly for faster UI response
        set(state => ({
          logs: state.logs.filter(log => log._id !== logId),
          filteredLogs: state.filteredLogs.filter(log => log._id !== logId)
        }));
        
        // Option 2: Refetch all logs (commented out but can be used instead)
        // await get().getLogs();
      } catch (error) {
        handleApiError(error);
      } finally {
        set({ isLoading: false });
      }
    },

    handleSearchChange: (searchTerm: string) => {
      set({ searchTerm });
      const { logs } = get();

      if (!logs || !Array.isArray(logs) || logs.length === 0) {
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
          (log.name?.toLowerCase() || '').includes(searchString) ||
          (log.deviceModel?.toLowerCase() || '').includes(searchString) ||
          (log.imei?.toLowerCase() || '').includes(searchString) ||
          (log.faultDescription?.toLowerCase() || '').includes(searchString) ||
          (log.repairDescription?.toLowerCase() || '').includes(searchString) ||
          (log._id || '').includes(searchString) ||
          (log.fixNumber?.toString() || '').includes(searchString) ||
          (log.comments?.toLowerCase() || '').includes(searchString)
        );
      });

      set({ filteredLogs: filtered });
    },
  };
});

export default useLogStore;