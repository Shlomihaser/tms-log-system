
import Log from "../types/Log";
import { useLogStore } from "../store/useLogStore";

const LogsTable = () => {
    const { logs } = useLogStore();

    return(<div className="bg-white shadow-md p-6 rounded-xl border border-gray-200">

          <div className="overflow-x-auto">

            <table className="table table-compact w-full">
                
                {/* Table Headers */}
              <thead className="text-gray-800">
                <tr>
                  <th>תאריך</th>
                  <th>שם לקוח</th>
                  <th>דגם מכשיר</th>
                  <th>IMEI</th>
                  <th>תיאור תקלה</th>
                  <th>תיאור תיקון</th>
                  <th>מחיר תיקון</th>
                  <th>עלות חלקים</th>
                  <th>רווח</th>
                  <th>מספר תיקון</th>
                  <th>הערות</th>
                </tr>
              </thead>

                {/* Table Content */}
              <tbody className="text-gray-700">
                {logs.map((log :Log) => (
                  <tr key={log.id}>
                    <td>{log.date.toLocaleDateString()}</td>
                    <td>{log.name}</td>
                    <td>{log.deviceModel}</td>
                    <td>{log.imei}</td>
                    <td>{log.faultDescription}</td>
                    <td>{log.repairDescription}</td>
                    <td>{log.fixingPrice}</td>
                    <td>{log.expense}</td>
                    <td>{log.profit}</td>
                    <td>{log.id}</td>
                    <td>{log.comments}</td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
          
        </div>)
}

export default LogsTable;