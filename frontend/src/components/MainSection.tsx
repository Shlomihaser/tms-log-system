import { useState, useEffect } from "react";
import Input from "./Input";
import LogsTable from "./LogsTable";
import LogForm from "./LogForm";
import { FileDown, Plus } from "lucide-react";
import IconButton from "./IconButton";
import { useLogStore } from "../store/useLogStore";
import * as XLSX from "xlsx";

const MainSection = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { getLogs, logs, handleSearchChange, searchTerm } = useLogStore();

  useEffect(() => {
    getLogs();
  }, [getLogs]);

  const exportToExcel = () => {
    const data = logs.map((log) => ({
      תאריך: log.date?.toString() || "N/A",
      שם_לקוח: log.name,
      דגם_מכשיר: log.deviceModel,
      IMEI: log.imei,
      תיאור_תקלה: log.faultDescription,
      תיאור_תיקון: log.repairDescription,
      מחיר_תיקון: log.fixingPrice,
      עלות_חלקים: log.expense,
      רווח: log.profit,
      מספר_תיקון: log.id,
      הערות: log.comments,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: Object.keys(data[0]),
    });

    worksheet["!cols"] = Array(Object.keys(data[0]).length).fill({
      wch: 15,
    });

    worksheet["!options"] = { direction: "rtl" };
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Logs");

    XLSX.writeFile(workbook, "logs.xlsx", { bookType: "xlsx", type: "binary" });
  };

  return (
    <main className="h-screen pt-16" dir="rtl">
      {/* Form */}
      {showForm && (
        <LogForm title="הוספת תיקון" onClose={() => setShowForm(false)} />
      )}

      <div className="container mx-auto px-4">
        {/* Heading and Actions Section */}
        <div className="flex justify-between w-full gap-2 pt-4 pb-5 items-center">
          <Input
            name="search-log"
            type="text"
            placeholder="חיפוש תיקון..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />

          <div className="flex gap-1 ">
            <IconButton
              onClick={exportToExcel}
              icon={<FileDown size={18} />}
              text="ייצא לאקסל"
              className="bg-green-500 hover:bg-green-600 flex-shrink-0 h-[40px]"
            />
            <IconButton
              onClick={() => setShowForm(true)}
              icon={<Plus size={18} />}
              text="הוסף תיקון חדש"
              className="bg-blue-500 hover:bg-blue-600 flex-shrink-0 h-[40px]"
            />
          </div>
        </div>
        <LogsTable />
      </div>
    </main>
  );
};

export default MainSection;
