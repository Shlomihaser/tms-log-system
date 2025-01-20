import Log from "../types/Log";
import { useLogStore } from "../store/useLogStore";
import { ArrowDown, ArrowUp, Edit, Trash } from "lucide-react";
import { useState } from "react";
import LogForm from "./LogForm";

const LogsTable = () => {
  const { filteredLogs, sortColumn, sortDirection, setSort, deleteLog } =
    useLogStore();
  const [editLog, setEditLog] = useState<Log | null>(null);

  const handleSort = (column: keyof Log) => {
    setSort(column);
  };

  const renderSortIcon = (column: keyof Log) => {
    if (sortColumn !== column) {
      return null;
    }

    if (sortDirection === "asc") {
      return <ArrowUp size={16} className="inline-block mr-1" />;
    } else {
      return <ArrowDown size={16} className="inline-block mr-1" />;
    }
  };

  const handleEditLog = (log: Log) => {
    setEditLog(log);
  };

  const handleDeleteLog = async (logId: number) => {
    await deleteLog(logId);
  };

  const handleCloseEditForm = () => {
    setEditLog(null);
  };
  return (
    <div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">
      {editLog && (
        <LogForm
          title="עריכת תיקון"
          onClose={handleCloseEditForm}
          currentLog={editLog}
        />
      )}
      <div className="overflow-y-auto scrollbar-hidden max-h-[70vh]">
        <table className="table w-full rtl">
          {/* Table Headers */}
          <thead className="text-gray-800">
            <tr className="border-b text-sm border-gray-300">
              <th
                className="py-2 px-1 text-right font-semibold text-nowrap cursor-pointer"
                onClick={() => handleSort("date")}
              >
                תאריך{renderSortIcon("date")}
              </th>
              <th
                className="py-2 px-1 text-right font-semibold text-nowrap cursor-pointer"
                onClick={() => handleSort("name")}
              >
                שם לקוח{renderSortIcon("name")}
              </th>
              <th
                className="py-2 px-1 text-right font-semibold text-nowrap cursor-pointer"
                onClick={() => handleSort("deviceModel")}
              >
                דגם מכשיר{renderSortIcon("deviceModel")}
              </th>
              <th
                className="py-2 px-1 text-right font-semibold text-nowrap cursor-pointer"
                onClick={() => handleSort("imei")}
              >
                IMEI{renderSortIcon("imei")}
              </th>
              <th
                className="py-2 px-1 text-right font-semibold text-nowrap cursor-pointer"
                onClick={() => handleSort("faultDescription")}
              >
                תיאור תקלה{renderSortIcon("faultDescription")}
              </th>
              <th
                className="py-2 px-1 text-right font-semibold text-nowrap cursor-pointer"
                onClick={() => handleSort("repairDescription")}
              >
                תיאור תיקון{renderSortIcon("repairDescription")}
              </th>
              <th
                className="py-2 px-1 text-right font-semibold text-nowrap cursor-pointer"
                onClick={() => handleSort("fixingPrice")}
              >
                מחיר תיקון{renderSortIcon("fixingPrice")}
              </th>
              <th
                className="py-2 px-1 text-right font-semibold text-nowrap cursor-pointer"
                onClick={() => handleSort("expense")}
              >
                עלות חלקים{renderSortIcon("expense")}
              </th>
              <th
                className="py-2 px-1 text-right font-semibold text-nowrap cursor-pointer"
                onClick={() => handleSort("profit")}
              >
                רווח{renderSortIcon("profit")}
              </th>
              <th
                className="py-2 px-1 text-right font-semibold text-nowrap cursor-pointer"
                onClick={() => handleSort("id")}
              >
                מספר תיקון{renderSortIcon("id")}
              </th>
              <th
                className="py-2  px-1 text-right font-semibold text-nowrap cursor-pointer"
                onClick={() => handleSort("comments")}
              >
                הערות{renderSortIcon("comments")}
              </th>
              <th className="py-2  px-1 text-right font-semibold text-nowrap"></th>
            </tr>
          </thead>

          {/* Table Content */}
          <tbody className="text-gray-700">
            {filteredLogs.map((log: Log) => (
              <tr key={log.id} className="border-b border-gray-200">
                <td className="py-2 ">{log.date?.toString() || "N/A"}</td>
                <td className="py-2 ">{log.name}</td>
                <td className="py-2 ">{log.deviceModel}</td>
                <td className="py-2 ">{log.imei}</td>
                <td className="py-2 ">{log.faultDescription}</td>
                <td className="py-2 ">{log.repairDescription}</td>
                <td className="py-2 ">{log.fixingPrice}</td>
                <td className="py-2 ">{log.expense}</td>
                <td className="py-2 ">{log.profit}</td>
                <td className="py-2 ">{log.id}</td>
                <td className="py-2 ">{log.comments}</td>
                <td className="py-2  text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleEditLog(log)}
                    className="text-gray-600 hover:text-blue-600 focus:outline-none"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteLog(log.id)}
                    className="text-gray-600 hover:text-red-600 focus:outline-none"
                  >
                    <Trash size={16} />
                  </button>
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
