import { useEffect, useRef, useState } from "react";
import Log from "../types/Log";
import useLogStore from "../store/useLogStore";
import { ArrowDown, ArrowUp, Edit, Palette, Trash } from "lucide-react";
import LogForm from "./LogForm";
import IconButton from "./common/IconButton";
import { formatDate } from "../lib/utils";
import useLogsSorting from "../hooks/useLogsSorting";
import { ColorPalette } from "./common/ColorPalette";

interface TableHeaderProps {
  column: keyof Log;
  label: string;
}

const LogsTable = () => {
  const { filteredLogs, deleteLog, getLogs, isLoading,updateLogColor } = useLogStore();
  const [editLog, setEditLog] = useState<Log | null>(null);
  const { sortColumn, sortDirection, sortedLogs, handleSort } = useLogsSorting({
    logs: filteredLogs,
  });
  const [colorPaletteOpenForId, setColorPaletteOpenForId] = useState<string | null>(null);

  // Create a ref for the color palette container
  const colorPaletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getLogs();
  }, []);

  // Effect to handle clicks outside the color palette
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If the palette is open and the click is outside the palette ref
      if (colorPaletteOpenForId && colorPaletteRef.current && !colorPaletteRef.current.contains(event.target as Node)) {
        setColorPaletteOpenForId(null); // Close the palette
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [colorPaletteOpenForId]); // Re-run effect when colorPaletteOpenForId changes

  const renderSortIcon = (column: keyof Log) => {
    if (sortColumn !== column) return null;

    if (sortDirection === "asc")
      return <ArrowUp size={16} className="inline-block mr-1" />;
    else return <ArrowDown size={16} className="inline-block mr-1" />;
  };

  const TableCell = ({ value }: { value: any }) => (
    <td className="py-1.5">{value !== undefined && value !== null ? value : '-'}</td>
  );

  const TableHeader = ({ column, label }: TableHeaderProps) => (
    <th
      className="py-2 px-1 text-right font-semibold text-nowrap cursor-pointer"
      onClick={() => handleSort(column)}
    >
      {label} {renderSortIcon(column)}
    </th>
  );

  const handleColorSelect = (logId: string, color: string) => {
    console.log(`Color ${color} selected for log with ID: ${logId}`);
    // In a real application, you would likely update the log's color in the store/database here.
    setColorPaletteOpenForId(null);
    updateLogColor(logId, color);
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200 flex justify-center items-center h-64">
        <div className="text-lg">Loading logs...</div>
      </div>
    );
  }
  return (
    <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200 relative">
      {editLog && (
        <LogForm
          title="עריכת תיקון"
          currentLog={editLog}
          onClose={() => setEditLog(null)}
        />
      )}

      {sortedLogs.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No logs found. Add a new log to get started.
        </div>
      ) : (
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
                <TableHeader column="expense" label="עלות חלקים" />
                <TableHeader column="profit" label="רווח" />
                <TableHeader column="fixNumber" label="מספר תיקון" />
                <th className="py-2 px-1 text-right font-semibold text-nowrap">הערות</th>
                <th className="py-2 px-1 text-right font-semibold text-nowrap"></th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {sortedLogs.map((log: Log) => (
                <tr key={log._id} className="border-b border-gray-200" style={{ backgroundColor: log.tableColor || 'transparent' }}>
                  <TableCell value={log.date ? formatDate(new Date(log.date)) : '-'} />
                  <TableCell value={log.name} />
                  <TableCell value={log.deviceModel} />
                  <TableCell value={log.imei} />
                  <TableCell value={log.faultDescription} />
                  <TableCell value={log.repairDescription} />
                  <TableCell value={log.fixingPrice ? `${log.fixingPrice}₪` : '-'} />
                  <TableCell value={log.expense ? `${log.expense}₪` : '-'} />
                  <TableCell value={log.profit ? `${log.profit}₪` : '-'} />
                  <TableCell value={log.fixNumber} />
                  <TableCell value={log.comments} />
                  <td className="py-1.5 flex justify-end relative">
                    <IconButton
                      text=""
                      icon={<Palette size={16} />}
                      onClick={() => setColorPaletteOpenForId(log._id)}
                      className="px-1 py-1.5 text-gray-600 hover:text-green-600"
                    />
                    {colorPaletteOpenForId === log._id && (
                      <div className="absolute top-0 right-8" ref={colorPaletteRef}> {/* Assign the ref here */}
                        <ColorPalette
                          onColorSelect={(color) => handleColorSelect(log._id, color)}
                          onClose={() => setColorPaletteOpenForId(null)}
                        />
                      </div>
                    )}
                    <IconButton
                      text=""
                      icon={<Edit size={16} />}
                      onClick={() => setEditLog(log)}
                      className="px-1 py-1.5 text-gray-600 hover:text-blue-600"
                    />
                    <IconButton
                      text=""
                      icon={<Trash size={16} />}
                      onClick={() => deleteLog(log._id)}
                      className="px-1 py-1.5 text-gray-600 hover:text-red-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LogsTable;