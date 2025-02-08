import * as XLSX from "xlsx";
import Log from "../types/Log";


export const exportTableToExcel = (logs: Log[]) => {
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
      מספר_תיקון: log.fixNumber,
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