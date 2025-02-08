import { useState, useCallback } from "react";
import Log from "../types/Log";

interface UseLogsSortingProps {
  logs: Log[];
}

const useLogsSorting = ({ logs }: UseLogsSortingProps) => {
  const [sortColumn, setSortColumn] = useState<keyof Log | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(null);
  const [sortedLogs, setSortedLogs] = useState<Log[]>(logs);

  const handleSort = useCallback(
    (column: keyof Log) => {
      setSortColumn(column);
      setSortDirection((prevSortDirection) => {
        const newDirection =
          sortColumn === column 
            ? prevSortDirection === "asc"
              ? "desc"
              : "asc"
            : "asc";

        setSortedLogs((prevLogs) => {
          return [...prevLogs].sort((a, b) => {
            const aValue = a[column];
            const bValue = b[column];
            if (aValue === undefined || bValue === undefined) return 0;

            if (typeof aValue === "string" && typeof bValue === "string") {
              return newDirection === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
            }
            if (typeof aValue === "number" && typeof bValue === "number") {
              return newDirection === "asc"
                ? aValue - bValue
                : bValue - aValue;
            }
            return 0;
          });
        });
        return newDirection
      });
    },
    [logs, sortColumn, sortDirection] // Include sortColumn and sortDirection in the dependency array
  );

  return {
    sortColumn,
    sortDirection,
    sortedLogs,
    handleSort,
  };
};

export default useLogsSorting;