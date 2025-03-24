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
}

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api"
});

const useLogStore = create<LogStore>((set, get) => {
  
  const handleApiError = (error: any) => {
    console.error("API Error:", error);
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

        set({
          logs: res.data,
          filteredLogs: res.data,
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
        await axiosInstance.post("/logs/add-log", data);
        toast.success("Log created successfully");
        await get().getLogs();
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
        await get().getLogs();
      } catch (error) {
        handleApiError(error);
      } finally {
        set({ isLoading: false });
      }
    },

    deleteLog: async (logId: string) => {
      set({ isLoading: true });

      try {
        await axiosInstance.delete(`/logs/${logId}`);
        toast.success("Log deleted successfully");
        await get().getLogs();
      } catch (error) {
        handleApiError(error);
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
          log._id.includes(searchString) ||
          log.fixNumber.toString().includes(searchString) ||
          log.comments.toLowerCase().includes(searchString)
        );
      });

      set({ filteredLogs: filtered });
    },
  };
});

export default useLogStore;