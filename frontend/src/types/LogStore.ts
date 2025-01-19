import Log from "./Log";

interface LogStore {
  logs: Log[];
  addLog:(log: Log) => void;
  isLoading: Boolean
}

export default LogStore;