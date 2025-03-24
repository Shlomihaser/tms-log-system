import XLSX from "xlsx";
import Log from "../../features/logs/models/log.model.js";


export const loadData = async () => {
    const workBook = XLSX.readFile("data.xlsx");
    const sheetNames = workBook.SheetNames;


    for (let i = 0; i < sheetNames.length; i++) {
        const sheet = workBook.Sheets[sheetNames[i]];
        const data = XLSX.utils.sheet_to_json(sheet);
        for(let j = 0; j < data.length; j++) {
            const logData = mapExcelDataToLog(data[j]);
            const newLog = new Log(logData);
            await newLog.save();
        }
    }
}

const mapExcelDataToLog = (excelData : any) => {
    return {
        name: excelData['שם'], 
        date:   parseDate(excelData['תאריך']),
        deviceModel: excelData['דגם מכשיר'],
        imei: excelData.IMEI, 
        faultDescription: excelData['תקלה'],
        repairDescription: excelData['תיקון'],
        fixingPrice: excelData['מחיר'],
        expense: excelData['עלות'],
        profit: excelData['רווח סופי'],
        fixNumber: null, 
        tableColor: "white", 
        comments: excelData['הערות']
    };
};

const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;

    const parts = dateString.split('.');
    if (parts.length !== 3) return null;

    let [day, month, year] = parts.map(Number);

    // התאמת שנת 2 ספרות לשנת 4 ספרות
    if (year < 100) {
        year += 2000; // מניחים שמדובר בשנת 2000+
    }

    const parsedDate = new Date(year, month - 1, day); // JavaScript משתמש באינדקסים של חודשים (0-11)
    
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
};