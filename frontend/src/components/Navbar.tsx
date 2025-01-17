import { Link } from "react-router-dom";
import TmsLogo from "../assets/tms-logo.jpeg";

const Navbar = () => {
  return ( <header className="border-b fixed w-full top-0 z-40">

      <div className="container mx-auto px-4 h-16">

        <div className="flex items-center h-full">

            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <img src={TmsLogo} alt="Tms Logo" className="h-10 rounded-md" />
              <h1 className="text-2xl font-bold">TMS Log System</h1>
            </Link>
        
        </div>

      </div>

    </header>);
};

export default Navbar;