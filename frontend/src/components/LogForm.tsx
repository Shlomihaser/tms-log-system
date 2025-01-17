import React, { Dispatch, SetStateAction, ChangeEvent } from 'react';
import Input from './Input';
import Log from '../assets/types/Log';


interface LogFormProps {
  newLog: Log;
  setNewLog: Dispatch<SetStateAction<Log>>;
  addLog: (e: React.FormEvent) => void;
  onClose: () => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const LogForm: React.FC<LogFormProps> = ({ newLog, addLog, onClose, handleInputChange }) => {
  return (
    <div className="bg-white shadow-md p-6 mb-6 rounded-xl border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">הוספת תיקון</h2>
      <form onSubmit={addLog} className="space-y-2">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          
          <Input
            label="תאריך"
            type="date"
            name="date"
            value={newLog.date}
            onChange={(e) => handleInputChange({ target: { name: 'date', value: new Date(e.target.value) } })}
          />
          <Input
            label="שם לקוח"
            type="text"
            placeholder="הכנס שם לקוח"
            name="name"
            value={newLog.name}
            onChange={handleInputChange}
            required
          />
          <Input
            label="דגם מכשיר"
            type="text"
            placeholder="הכנס דגם מכשיר"
            name="deviceModel"
            value={newLog.deviceModel}
            onChange={handleInputChange}
            required
          />
          <Input
            label="IMEI"
            type="text"
            placeholder="הכנס IMEI"
            name="imei"
            value={newLog.imei}
            onChange={handleInputChange}
          />
          <Input
            label="תיאור התקלה"
            type="text"
            placeholder="הכנס תיאור תקלה"
            name="faultDescription"
            value={newLog.faultDescription}
            onChange={handleInputChange}
          />
          <Input
            label="תיאור תיקון"
            type="text"
            placeholder="הכנס תיאור תיקון"
            name="repairDescription"
            value={newLog.repairDescription}
            onChange={handleInputChange}
          />
          <Input
            label="מחיר תיקון"
            type="number"
            placeholder="הכנס מחיר תיקון"
            name="fixingPrice"
            value={newLog.fixingPrice}
            onChange={handleInputChange}
            required
          />
          <Input
            label="עלות חלקים"
            type="number"
            placeholder="הכנס עלות חלקים"
            name="expense"
            value={newLog.expense}
            onChange={handleInputChange}
          />
          <Input
            label="הערות"
            type="textarea"
            placeholder="הכנס הערות"
            name="comments"
            value={newLog.comments}
            onChange={handleInputChange}
          />
          <Input
            label="מספר תיקון"
            type="number"
            placeholder="הכנס מספר תיקון"
            name="id"
            value={newLog.id}
            onChange={handleInputChange}
          />

          <div className="col-span-3 md:col-span-4 flex justify-end">
            <button type="submit"
              className="btn btn-sm bg-green-500 hover:bg-green-600 text-white rounded">
              הוסף תיקון
            </button>
            <button type="button"
              onClick={onClose}
              className="btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded mr-2">
              בטל
            </button>
          </div>


        </div>
      </form>
    </div>
  );
};

export default LogForm;