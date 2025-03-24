import { useState } from "react";
import TmsLogo from "../assets/tms-logo.jpeg";
import Input from "../components/common/Input";
import { useAuthentication } from "../contexts/AuthenticationContextProvider";

const LoginPage = () => {

  const { login } = useAuthentication();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-xl shadow-2xl w-96">
        {/* Company Logo */}
        <div className="flex justify-center mb-6">
          <img src={TmsLogo} alt="Company Logo" className="h-16 rounded-full" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <Input 
              label="Username" 
              type="name" 
              name="username" 
              placeholder="Enter your username" 
              className="w-full bg-gray-700 text-white border border-gray-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <Input 
              label="Password" 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              className="w-full bg-gray-700 text-white border border-gray-600 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              required 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Sign In Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
