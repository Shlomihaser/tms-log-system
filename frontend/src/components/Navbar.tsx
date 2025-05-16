import { Link } from "react-router-dom";
import TmsLogo from "../assets/tms-logo.jpeg";
import { LogOut, User } from "lucide-react";
import { useAuthentication } from "../contexts/AuthenticationContextProvider";

const Navbar = () => {
  const { user, logout } = useAuthentication();

  return (
    <header className="border-b fixed w-full top-0 z-40 ">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center h-full">
          <Link
            to="/"
            className="flex items-center p-3 gap-3 hover:opacity-80 transition-all"
          >
            <img
              src={TmsLogo}
              alt="Tms Logo"
              className="h-8 sm:h-10 rounded-md"
            />

            <h1 className="text-xl sm:text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
              TMS Log System
            </h1>
          </Link>
        </div>

        {/* User and Logout Section */}
        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User size={18} />
              <span className="hidden sm:inline">{user.username}</span>
            </div>
            
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-red-50 text-red-600 rounded-md border border-gray-200 transition-all"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;