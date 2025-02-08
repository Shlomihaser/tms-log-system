import { useState } from "react";
import LogsTable from "./LogsTable";
import LogForm from "./LogForm";
import IconButton from "./common/IconButton";
import Input from "./common/Input";
import { FileDown, Plus, Calendar } from "lucide-react";
import { useLogStore } from "../store/useLogStore";
import { exportTableToExcel } from "../lib/excel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MainSection = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDatePickers, setShowDatePickers] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { logs, searchTerm, handleSearchChange } = useLogStore();

  const handleDatePickersToggle = () => {
    setShowDatePickers(!showDatePickers);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <main className="h-screen pt-16" dir="rtl">
      {showForm && (
        <LogForm title="הוספת תיקון" onClose={() => setShowForm(false)} />
      )}
      <div className="container mx-auto px-4">
        <div className="flex flex-col w-full gap-2 pt-4 pb-5">
          <div className="flex justify-between w-full gap-2 items-center">
            <div className="flex gap-2 items-center">
              <Input name="search-log" type="text" placeholder="חיפוש תיקון..." className="w-full"value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <IconButton text="" icon={<Calendar size={18} />} className="px-2 text-gray-700 h-[40px] border border-gray-300 rounded hover:bg-gray-100"
                onClick={handleDatePickersToggle}
              />

              {showDatePickers && (
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="בחר טווח תאריכים"
                  className="h-[40px] px-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  dateFormat="dd/MM/yyyy"
                  onChange={(e) => { setStartDate(e[0]); setEndDate(e[1]) }}
                />
              )}
            </div>
            
            {/* Log Actions */}
            <div className="flex gap-1">
              <IconButton text="ייצא לאקסל" icon={<FileDown size={18} />} className="px-2 text-white bg-green-500 hover:bg-green-600 flex-shrink-0 h-[40px]"
                onClick={() => exportTableToExcel(logs)}
              />
              <IconButton text="הוסף תיקון חדש" icon={<Plus size={18} />}className="px-2 text-white bg-blue-500 hover:bg-blue-600 flex-shrink-0 h-[40px]"
                onClick={() => setShowForm(true)}
              />
            </div>

          </div>
        </div>

        {/* Logs Table */}
        <LogsTable />
      </div>
    </main>
  );
};

export default MainSection;
