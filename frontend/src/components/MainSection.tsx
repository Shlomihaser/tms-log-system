import { useState } from "react";
import Input from "./Input";
import LogsTable from "./LogsTable";
import LogForm from "./LogForm";

const MainSection = () => {
    const [showForm, setShowForm] = useState<boolean>(false);
    const [filterOption, setFilterOption] = useState<string | null>(null);


    return (
        <main className="h-screen overflow-x-hidden pt-16" dir="rtl">

            {/* Overlay and Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <LogForm onClose={() => setShowForm(false)} />
                </div>
            )}


            <div className="container mx-auto px-4">
                {/* Heading and Actions Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4">

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3  w-full md:w-auto">
                        <Input name="search-log" type="text" placeholder="חיפוש תיקון..." className="mb-2 sm:mb-0 w-full sm:w-48" />

                        {/* Search By Date */}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-start md:justify-end gap-2 w-full md:w-auto">
                        <button
                            className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md text-nowrap sm:whitespace-normal"
                        >
                            ייצא לאקסל
                        </button>
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md text-nowrap sm:whitespace-normal">
                            הוסף תיקון חדש
                        </button>
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