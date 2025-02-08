import { useEffect, useState, useMemo } from "react";
import Log from "../types/Log";
import { useLogStore } from "../store/useLogStore";
import { ArrowDown, ArrowUp, Edit, Palette, Trash } from "lucide-react";
import LogForm from "./LogForm";
import IconButton from "./common/IconButton";
import { formatDate } from "../lib/utils";
import useLogsSorting from "../hooks/useLogsSorting";

interface TableHeaderProps {
  column: keyof Log;
  label: string;
}

const LogsTable = () => {
  const { filteredLogs, deleteLog, getLogs } = useLogStore();
  const [editLog, setEditLog] = useState<Log | null>(null);
  const { sortColumn, sortDirection, sortedLogs, handleSort } = useLogsSorting({logs: filteredLogs,});

  useEffect(() => { getLogs();}, [getLogs]);

  const memoizedSortedLogs = useMemo(() => sortedLogs, [sortedLogs]);
  
  const renderSortIcon = (column: keyof Log) => {
    if (sortColumn !== column) return null;

    if (sortDirection === "asc")
      return <ArrowUp size={16} className="inline-block mr-1" />;
    else return <ArrowDown size={16} className="inline-block mr-1" />;
  };

  const TableCell = ({ value }: { value: any }) => (<td className="py-1.5">{value}</td>);
  const TableHeader = ({ column, label }: TableHeaderProps) => (
    <th className="py-2 px-1 text-right font-semibold text-nowrap cursor-pointer" onClick={() => handleSort(column)}>
      {label} {renderSortIcon(column)}
    </th>
  );

  return (
    <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">
      {editLog && (
        <LogForm
          title="עריכת תיקון"
          onClose={() => setEditLog(null)}
          currentLog={editLog}
        />
      )}

      <div className="overflow-y-auto scrollbar-hidden max-h-[70vh]">
        <table className="table w-full rtl">
          <thead className="text-gray-800">
            <tr className="border-b text-sm border-gray-300 ">
              <TableHeader column="date" label="תאריך" />
              <TableHeader column="name" label="שם לקוח" />
              <TableHeader column="deviceModel" label="דגם מכשיר" />
              <TableHeader column="imei" label="IMEI" />
              <TableHeader column="faultDescription" label="תיאור תקלה" />
              <TableHeader column="repairDescription" label="תיאור תיקון" />
              <TableHeader column="fixingPrice" label="מחיר תיקון" />
              <TableHeader column="expense" label="עלות חלקים" />
              <TableHeader column="profit" label="רווח" />
              <TableHeader column="fixNumber" label="מספר תיקון" />
              <th className="py-2  px-1 text-right font-semibold text-nowrap">הערות</th>
              <th className="py-2 px-1 text-right font-semibold text-nowrap"></th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {memoizedSortedLogs.map((log: Log) => (
              <tr key={log._id} className="border-b border-gray-200">
                <TableCell value={formatDate(new Date(log.date))} />
                <TableCell value={log.name} />
                <TableCell value={log.deviceModel} />
                <TableCell value={log.imei} />
                <TableCell value={log.faultDescription} />
                <TableCell value={log.repairDescription} />
                <TableCell value={`${log.fixingPrice}₪`} />
                <TableCell value={`${log.expense}₪`} />
                <TableCell value={`${log.profit}₪`} />
                <TableCell value={log.fixNumber} />
                <TableCell value={log.comments} />
                <td className="py-1.5 flex">
                  <IconButton text="" icon={<Edit size={16} />} onClick={() => setEditLog(log)} className="px-1 py-1.5 text-gray-600 hover:text-blue-600"/>
                  <IconButton text="" icon={<Trash size={16} />} onClick={() => deleteLog(log._id)} className="px-1 py-1.5 text-gray-600 hover:text-red-600"/>
                  <IconButton text="" icon={<Palette size={16} />} onClick={() => ""} className="px-1 py-1.5 text-gray-600 hover:text-green-600"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsTable;