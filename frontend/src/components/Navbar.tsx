import { Link } from "react-router-dom";
import TmsLogo from "../assets/tms-logo.jpeg";

const Navbar = () => {
  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >

      <div className="container mx-auto px-4 h-16">

        <div className="h-full">

          <div className="flex items-center gap-8">
            <Link to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <img src={TmsLogo} alt="Tms Logo" className="w-[20px]"/>
              </div>
              <h1 className="text-lg font-bold">Tms Log System</h1>
            </Link>
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;