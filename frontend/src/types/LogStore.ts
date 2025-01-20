import Log from "./Log";

interface LogStore {
    logs: Log[];
    filteredLogs: Log[];
    isLoading: boolean;
    searchTerm: string;
     sortColumn: keyof Log | null;
    sortDirection: 'asc' | 'desc' | null;
    getLogs: () => Promise<void>;
    addLog: (log: Log) => Promise<void>;
    editLog: (log: Log) => Promise<void>;
    handleSearchChange: (searchTerm: string) => void;
   setSort: (column: keyof Log) => void;
   deleteLog: (logId: number) => Promise<void>;
}

export default LogStore;