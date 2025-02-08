export const safeParseFloat = (value: string | number | undefined): number => {
    if (value === undefined || value === null) return 0;
  
    const parsedValue =
      typeof value === "string" ? parseFloat(value) : Number(value);
  
    return isNaN(parsedValue) ? 0 : parsedValue;
};

export const formatDate = (date: Date) : string =>{
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}