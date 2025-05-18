import { useRef } from "react";

import Input from "./common/Input";
import Textarea from "./common/TextArea";
import IconButton from "./common/IconButton";

import Log from "../types/Log";
import useLogForm from "../hooks/useLogForm";
import { Plus, X } from "lucide-react";
import { safeParseFloat } from "../lib/utils";

interface LogFormProps {
  currentLog?: Log;
  title: string;
  onClose: VoidFunction;
}

const LogForm = ({ currentLog, title, onClose }: LogFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    date, setDate,
    name, setName,
    deviceModel, setDeviceModel,
    imei, setImei,
    faultDescription, setFaultDescription,
    repairDescription, setRepairDescription,
    fixingPrice, setFixingPrice,
    expense, setExpense,
    comments, setComments,
    fixNumber, setFixNumber,
    handleLogSubmit,
  } = useLogForm({ currentLog, onClose });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    const parsedFixingPrice = safeParseFloat(fixingPrice);
    const parsedExpense = safeParseFloat(expense);

    const newLog = {
      date: new Date(date),
      name,
      deviceModel,
      imei,
      faultDescription,
      repairDescription,
      fixingPrice: parsedFixingPrice,
      expense: parsedExpense,
      fixNumber,
      comments,
      profit: parsedFixingPrice - parsedExpense,
    };
    await handleLogSubmit(newLog);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-xl border border-gray-200 w-full max-h-[90vh] overflow-y-auto sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-2">
          {/* Inputs */}
          <div className="space-y-2  sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <Input
              label="תאריך"
              type="date"
              name="date"
              value={date instanceof Date && !isNaN(date.getTime())
                ? date.toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0]
              }
              onChange={(e) => {
                const newDate = e.target.value ? new Date(e.target.value) : new Date();
                setDate(newDate);
              }}
            />
            <Input label="שם לקוח" type="text" name="name" placeholder="הכנס שם לקוח" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="דגם מכשיר" type="text" name="deviceModel" placeholder="הכנס דגם מכשיר" value={deviceModel} onChange={(e) => setDeviceModel(e.target.value)} required />
            <Input label="IMEI" type="text" name="imei" placeholder="הכנס IMEI" value={imei} onChange={(e) => setImei(e.target.value)} />
            <Input label="תיאור התקלה" type="text" name="faultDescription" placeholder="הכנס תיאור תקלה" value={faultDescription} onChange={(e) => setFaultDescription(e.target.value)} />
            <Input label="תיאור תיקון" type="text" name="repairDescription" placeholder="הכנס תיאור תיקון" value={repairDescription} onChange={(e) => setRepairDescription(e.target.value)} />
            <Input label="מחיר תיקון" type="number" name="fixingPrice" placeholder="הכנס מחיר תיקון" value={fixingPrice} onChange={(e) => setFixingPrice(Number(e.target.value))} required />
            <Input label="עלות חלקים" type="number" name="expense" placeholder="הכנס עלות חלקים" value={expense} onChange={(e) => setExpense(Number(e.target.value))} />
            <Input label="מספר תיקון" type="number" name="id" placeholder="הכנס מספר תיקון" value={fixNumber} onChange={(e) => setFixNumber(Number(e.target.value))} />
            <Textarea label="הערות" name="comments" placeholder="הכנס הערות" value={comments} onChange={(e) => setComments(e.target.value)} />
          </div>

          {/* Buttons */}
          <div className="col-span-full flex justify-end mt-4">
            <IconButton icon={<Plus size={16} />} text={currentLog ? "ערוך תיקון" : "הוסף תיקון"} className="py-2 px-2 text-white bg-green-500 hover:bg-green-600" />
            <IconButton icon={<X size={16} />} text="בטל" onClick={onClose} className="py-2 px-2 text-white  bg-red-500 hover:bg-red-600 mr-2" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogForm;
