import Input from "./Input";
import { Plus, X } from "lucide-react";
import IconButton from "./IconButton";
import { useRef, useState, useEffect } from "react";
import Log from "../types/Log";
import { useLogStore } from "../store/useLogStore";

interface LogFormProps {
  currentLog?: Log;
  title: string;
  onClose: VoidFunction;
}

const LogForm: React.FC<LogFormProps> = ({ currentLog, title, onClose }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { addLog, editLog } = useLogStore();

  const [date, setDate] = useState<string>(
      currentLog?.date ? currentLog.date.toString().split("T")[0] : new Date().toString().split("T")[0]
  );
  const [name, setName] = useState<string>(currentLog?.name || "");
  const [deviceModel, setDeviceModel] = useState<string>(currentLog?.deviceModel || "");
  const [imei, setImei] = useState<string>(currentLog?.imei || "");
  const [faultDescription, setFaultDescription] = useState<string>(currentLog?.faultDescription || "");
  const [repairDescription, setRepairDescription] = useState<string>(currentLog?.repairDescription || "");
  const [fixingPrice, setFixingPrice] = useState<number>(currentLog?.fixingPrice || 0);
  const [expense, setExpense] = useState<number>(currentLog?.expense || 0);
  const [comments, setComments] = useState<string>(currentLog?.comments || "");
  const [id, setId] = useState<number>(currentLog?.id || 0);

    useEffect(() => {
        if(currentLog){
            setDate(currentLog.date ? currentLog.date.toString().split("T")[0] :  new Date().toString().split("T")[0]);
            setName(currentLog.name || "");
            setDeviceModel(currentLog.deviceModel || "");
            setImei(currentLog.imei || "");
            setFaultDescription(currentLog.faultDescription || "");
            setRepairDescription(currentLog.repairDescription || "");
            setFixingPrice(currentLog.fixingPrice || 0);
            setExpense(currentLog.expense || 0);
            setComments(currentLog.comments || "");
            setId(currentLog.id || 0)

        }
    }, [currentLog]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) {
      return;
    }
      const newLog: Log = {
          date: new Date(date),
          name: name,
          deviceModel: deviceModel,
          imei: imei,
          faultDescription: faultDescription,
          repairDescription: repairDescription,
          fixingPrice: parseFloat(fixingPrice.toString()),
          expense: parseFloat(expense.toString()),
          comments: comments,
          id: parseInt(id.toString()),
          profit: parseFloat(fixingPrice.toString()) - parseFloat(expense.toString()),
      };

      if(currentLog){
          await editLog(newLog);
      }else{
         await addLog(newLog);
      }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-xl border border-gray-200 w-full max-h-[90vh] overflow-y-auto sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {title}
        </h2>
        <form ref={formRef} className="space-y-2" onSubmit={handleSubmit}>
          <div className="space-y-2  sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
             <Input
              label="תאריך"
              type="date"
              name="date"
               value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              label="שם לקוח"
              type="text"
              placeholder="הכנס שם לקוח"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="דגם מכשיר"
              type="text"
              placeholder="הכנס דגם מכשיר"
              name="deviceModel"
              value={deviceModel}
              onChange={(e) => setDeviceModel(e.target.value)}
              required
            />
            <Input
              label="IMEI"
              type="text"
              placeholder="הכנס IMEI"
              name="imei"
              value={imei}
              onChange={(e) => setImei(e.target.value)}
            />
            <Input
              label="תיאור התקלה"
              type="text"
              placeholder="הכנס תיאור תקלה"
              name="faultDescription"
              value={faultDescription}
              onChange={(e) => setFaultDescription(e.target.value)}
            />
            <Input
              label="תיאור תיקון"
              type="text"
              placeholder="הכנס תיאור תיקון"
              name="repairDescription"
              value={repairDescription}
              onChange={(e) => setRepairDescription(e.target.value)}
            />
            <Input
              label="מחיר תיקון"
              type="number"
              placeholder="הכנס מחיר תיקון"
              name="fixingPrice"
              value={fixingPrice}
              onChange={(e) => setFixingPrice(Number(e.target.value))}
              required
            />
            <Input
              label="עלות חלקים"
              type="number"
              placeholder="הכנס עלות חלקים"
              name="expense"
              value={expense}
              onChange={(e) => setExpense(Number(e.target.value))}
            />
              <Input
              label="מספר תיקון"
              type="number"
              placeholder="הכנס מספר תיקון"
              name="id"
              value={id}
              onChange={(e) => setId(Number(e.target.value))}
            />
            <Input
              label="הערות"
              type="textarea"
              placeholder="הכנס הערות"
              name="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
          <div className="col-span-full flex justify-end mt-4">
            <IconButton
              icon={<Plus size={16} />}
              text={currentLog ? "ערוך תיקון" : "הוסף תיקון" }
              className="bg-green-500 hover:bg-green-600"
            />
            <IconButton
              onClick={onClose}
              icon={<X size={16} />}
              text="בטל"
              className="bg-red-500 hover:bg-red-600 mr-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogForm;