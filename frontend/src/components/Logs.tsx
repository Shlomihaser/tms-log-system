import { useState, ChangeEvent } from 'react';
import LogForm from './LogForm';
import LogsTableDisplay from './LogsTable';
import Log from '../types/Log';


const Logs = () => {
  
  const [logs, setLogs] = useState<Log[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newLog, setNewLog] = useState<Log>({
    id: 0,
    name: '',
    date: new Date(),
    deviceModel: '',
    imei: '',
    faultDescription: '',
    repairDescription: '',
    fixingPrice: 0,
    expense: 0,
    profit: 0,
    completed: false,
    comments: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    if (name === 'fixingPrice' || name === 'expense') {
      setNewLog((prevLog) => ({ ...prevLog,
        profit: parseFloat((Number(newLog.fixingPrice) - Number(newLog.expense)).toFixed(2)),
      }));
    }
  };

  const addLog = (e: React.FormEvent) => {
    e.preventDefault();
    setLogs([...logs, { ...newLog}]);
    setNewLog({
      id: 0,
      name: '',
      date: new Date(),
      deviceModel: '',
      imei: '',
      faultDescription: '',
      repairDescription: '',
      fixingPrice: 0,
      expense: 0,
      profit: 0,
      completed: false,
      comments: '',
    });
    setShowForm(false);
  };

  return (
    <div className="h-screen overflow-x-hidden" dir="rtl">

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 ">
          <div className="w-full max-w-2xl p-4">
            <LogForm
              newLog={newLog}
              setNewLog={setNewLog}
              addLog={addLog}
              onClose={() => setShowForm(false)}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
      )}
      
      <div className="flex items-start justify-center pt-20 px-4">
        <div className="w-full max-w-7xl">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2"></div>
          </div>

          <div className="flex flex-row items-center justify-between gap-10 p-2">
            <div className="flex item-center gap-5">
              <h2 className="text-2xl font-semibold text-gray-800">
                תיעוד תיקונים
              </h2>
              <input
                type="text"
                placeholder="חיפוש תיקון..."
                className="input input-sm w-48 bg-white text-gray-800 focus:ring-2 focus:ring-gray-300  focus:outline-none rounded "
              />
              <select
                className="select select-sm bg-white text-gray-800 focus:ring-2 focus:ring-gray-300  focus:outline-none rounded"
              >
                <option disabled selected>
                  סינון לפי
                </option>
                <option>שם לקוח</option>
                <option>דגם מכשיר</option>
                <option>IMEI</option>
                <option>מחיר תיקון</option>
              </select>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              {showForm ? 'הסתר טופס' : 'הוסף תיקון חדש'}
            </button>
          </div>

          <LogsTableDisplay/>
        </div>
      </div>
    </div>
  );
};

export default Logs;