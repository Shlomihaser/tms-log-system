import { useState } from "react";
import  useLogStore  from "../store/useLogStore";
import Log from "../types/Log";
import toast from "react-hot-toast";
import { logSchema,LogSchemaType } from "../lib/validationSchemas";

interface UseLogFormProps {
  currentLog?: Log;
  onClose: VoidFunction;
}

const useLogForm = ({ currentLog, onClose }: UseLogFormProps) => {
  const { addLog, editLog } = useLogStore();

  const initialDate = currentLog?.date ? currentLog.date : new Date();

  const [date, setDate] = useState<Date>(initialDate);
  const [name, setName] = useState<string>(currentLog?.name || "");
  const [deviceModel, setDeviceModel] = useState<string>(currentLog?.deviceModel || "");
  const [imei, setImei] = useState<string>(currentLog?.imei || "");
  const [faultDescription, setFaultDescription] = useState<string>(currentLog?.faultDescription || "");
  const [repairDescription, setRepairDescription] = useState<string>(currentLog?.repairDescription || "");
  const [fixingPrice, setFixingPrice] = useState<number>(currentLog?.fixingPrice || 0);
  const [expense, setExpense] = useState<number>(currentLog?.expense || 0);
  const [comments, setComments] = useState<string>(currentLog?.comments || "");
  const [fixNumber, setFixNumber] = useState<number>(currentLog?.fixNumber || 0);

  const handleLogSubmit = async (logData: LogSchemaType) => {
    try {
      logSchema.parse(logData);
      if (currentLog) {
        await editLog({ ...currentLog, ...logData });
        toast.success("Log updated successfully");
      } else {
        await addLog(logData as Log);
        toast.success("Log created successfully");
      }
      onClose();
    } catch (error: any) {
      if (error.errors) {
        error.errors.forEach((e: any) => toast.error(e.message));
      } else {
        toast.error("Failed to submit log. Please check the form data.");
        console.error("Submission error:", error);
      }
    }
    
  };

  return {
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
  };
};

export default useLogForm;