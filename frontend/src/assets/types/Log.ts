interface Log {
  id: number;
  name: string;
  date: Date;
  deviceModel: string;
  imei: string;
  faultDescription: string;
  repairDescription: string;
  fixingPrice: number;
  expense: number;
  profit: number;
  completed: boolean;
  comments: string;
}

export default Log;