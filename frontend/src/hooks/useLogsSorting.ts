import { useState, useMemo } from 'react';
import Log from '../types/Log';

type SortDirection = 'asc' | 'desc';

interface UseLogsSortingProps {
  logs: Log[];
}

interface UseLogsSortingResult {
  sortColumn: keyof Log | null;
  sortDirection: SortDirection;
  sortedLogs: Log[];
  handleSort: (column: keyof Log) => void;
}

const useLogsSorting = ({ logs }: UseLogsSortingProps): UseLogsSortingResult => {
  const [sortColumn, setSortColumn] = useState<keyof Log | null>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (column: keyof Log) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to descending for dates, ascending for everything else
      setSortColumn(column);
      setSortDirection(column === 'date' ? 'desc' : 'asc');
    }
  };

  const sortedLogs = useMemo(() => {
    console.log('Sorting logs:', logs);
    
    // Safety check
    if (!logs || !Array.isArray(logs) || logs.length === 0) {
      console.log('No logs to sort or invalid logs array');
      return [];
    }

    // Make a copy to avoid mutating the original
    const sortedArray = [...logs];

    if (!sortColumn) {
      console.log('No sort column selected');
      return sortedArray;
    }

    try {
      return sortedArray.sort((a, b) => {
        // Handle missing or null values (send them to the end)
        if (a[sortColumn] === undefined || a[sortColumn] === null) return 1;
        if (b[sortColumn] === undefined || b[sortColumn] === null) return -1;

        // Handle different data types
        if (sortColumn === 'date') {
          const dateA = new Date(a.date || 0).getTime();
          const dateB = new Date(b.date || 0).getTime();
          return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        }
        
        if (sortColumn === 'fixingPrice' || sortColumn === 'expense' || sortColumn === 'profit') {
          const numA = parseFloat(String(a[sortColumn])) || 0;
          const numB = parseFloat(String(b[sortColumn])) || 0;
          return sortDirection === 'asc' ? numA - numB : numB - numA;
        }
        
        if (sortColumn === 'fixNumber') {
          const numA = parseInt(String(a[sortColumn])) || 0;
          const numB = parseInt(String(b[sortColumn])) || 0;
          return sortDirection === 'asc' ? numA - numB : numB - numA;
        }

        // Default string comparison
        const strA = String(a[sortColumn]).toLowerCase();
        const strB = String(b[sortColumn]).toLowerCase();
        
        if (sortDirection === 'asc') {
          return strA.localeCompare(strB);
        } else {
          return strB.localeCompare(strA);
        }
      });
    } catch (error) {
      console.error('Error sorting logs:', error);
      return sortedArray;
    }
  }, [logs, sortColumn, sortDirection]);

  return {
    sortColumn,
    sortDirection,
    sortedLogs,
    handleSort,
  };
};

export default useLogsSorting;