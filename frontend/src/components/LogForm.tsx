import Input from './Input';
import { Plus, X } from 'lucide-react';

interface LogFormProps {
  onClose: () => void;
}

const LogForm: React.FC<LogFormProps> = ({ onClose }) => {
  return (
    <div className="bg-white shadow-md p-4 sm:p-6 mb-6 rounded-xl border border-gray-200 w-full md:w-[90%] lg:w-[80%] xl:w-[70%]">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">הוספת תיקון</h2>
      <form className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

          <Input
            label="תאריך"
            type="date"
            name="date"
          />
          <Input
            label="שם לקוח"
            type="text"
            placeholder="הכנס שם לקוח"
            name="name"
            required
          />
          <Input
            label="דגם מכשיר"
            type="text"
            placeholder="הכנס דגם מכשיר"
            name="deviceModel"
            required
          />
          <Input
            label="IMEI"
            type="text"
            placeholder="הכנס IMEI"
            name="imei"
          />
          <Input
            label="תיאור התקלה"
            type="text"
            placeholder="הכנס תיאור תקלה"
            name="faultDescription"
          />
          <Input
            label="תיאור תיקון"
            type="text"
            placeholder="הכנס תיאור תיקון"
            name="repairDescription"
          />
          <Input
            label="מחיר תיקון"
            type="number"
            placeholder="הכנס מחיר תיקון"
            name="fixingPrice"
            required
          />
          <Input
            label="עלות חלקים"
            type="number"
            placeholder="הכנס עלות חלקים"
            name="expense"
          />
          <Input
            label="מספר תיקון"
            type="number"
            placeholder="הכנס מספר תיקון"
            name="id"
          />

          <Input
            label="הערות"
            type="textarea"
            placeholder="הכנס הערות"
            name="comments"
          />



          <div className="col-span-full  flex justify-end mt-4">
            <button type="submit"
              className="flex items-center gap-2 btn btn-sm bg-green-500 hover:bg-green-600 text-white rounded">
                <Plus size={16}/>
              הוסף תיקון
            </button>
            <button type="button"
              onClick={onClose}
              className="flex items-center gap-2 btn btn-sm bg-red-500 hover:bg-red-600 text-white rounded mr-2">
                <X size={16}/>
              בטל
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogForm;