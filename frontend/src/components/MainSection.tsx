import { useState } from "react";
import Input from "./Input";
import LogsTable from "./LogsTable";

const MainSection = () => {
    const [showForm, setShowForm] = useState<Boolean>(false);

    return (
        <main className="h-screen overflow-x-hidden pt-16" dir="rtl">

            {/* Show Form */}


            <div className="container mx-auto px-4">
                {/* Heading and Actions Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4">
                    <h2 className="text-2xl font-semibold text-nowrap text-gray-800 mb-2 md:mb-0">תיעוד תיקונים</h2>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3  w-full md:w-auto">
                        <Input type="text" placeholder="חיפוש תיקון..." className="mb-2 sm:mb-0 w-full sm:w-48"/>
                        <select className="select select-sm bg-white text-gray-800 focus:ring-2 focus:ring-gray-300 focus:outline-none rounded w-full sm:w-auto">
                            <option disabled selected>סינון לפי</option>
                            <option>שם לקוח</option>
                            <option>דגם מכשיר</option>
                            <option>IMEI</option>
                            <option>מחיר תיקון</option>
                        </select>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-start md:justify-end gap-2 w-full md:w-auto"> {/* Modified this line */}
                        <button className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md text-nowrap sm:whitespace-normal">ייצא לאקסל</button> {/* Modified this line */}
                        <button className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md text-nowrap sm:whitespace-normal">הוסף תיקון חדש</button> {/* Modified this line */}
                    </div>
                </div>

                {/* Table Section */}
                <div className="pt-6">
                    <LogsTable />
                </div>
            </div>
        </main>
    );
};

export default MainSection;