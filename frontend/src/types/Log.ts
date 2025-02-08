interface Log {
  _id: string;
  name: string;
  date: Date;
  deviceModel: string;
  imei: string;
  faultDescription: string;
  repairDescription: string;
  fixingPrice: number;
  expense: number;
  profit: number;
  completed?: boolean;
  fixNumber: number;
  tableColor: string;
  comments: string;
}

export default Log;