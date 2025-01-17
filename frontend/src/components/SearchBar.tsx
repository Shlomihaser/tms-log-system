import Input from './Input';


const SearchBar = () => {
    return (
        <div className="flex items-center gap-5">
            <Input
                type="text"
                placeholder="חיפוש תיקון..."
            />
            <select className="select select-sm bg-white text-gray-800 focus:ring-2 focus:ring-gray-300  focus:outline-none rounded">
                <option disabled selected>סינון לפי</option>
                <option>שם לקוח</option>
                <option>דגם מכשיר</option>
                <option>IMEI</option>
                <option>מחיר תיקון</option>
            </select>
        </div>
    );
};

export default SearchBar;