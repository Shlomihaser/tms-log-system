import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

interface User {
    _id: string;
    username: string;
}

interface AuthenticationContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextType>(
    {} as AuthenticationContextType
);

export function useAuthentication() { return useContext(AuthenticationContext); }

const AUTH_PAGES = ["/login"];

export function AuthenticationContextProvider() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const isOnAuthPage = AUTH_PAGES.includes(location.pathname);
    
    // Configure axios with the right settings
    const api = axios.create({ 
        baseURL: import.meta.env.VITE_API_URL + "/api/",
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const login = async (username: string, password: string) => {
        console.log("Logging in with", username, password);
        try {
            const response = await api.post("/auth/login", { username, password });
           
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                toast.success("Login successful!");
                await fetchUser(); // Immediately fetch user after login
                navigate("/");
            } else {
                toast.error(response.data.message || "An unknown error occurred");
            }
        } catch (error: any) {
            if (error.response)
                toast.error(error.response.data.message || "An unknown error occurred");
            else if (error.request) 
                toast.error("Network error, could not connect to server");
            else 
                toast.error("An unknown error occurred");
        }
    };

    const logout = async () => {
        try {
            // Optional: Call logout endpoint if you have one
            // await api.post("/auth/logout");
            localStorage.removeItem("token");
            setUser(null);
            toast.success("Logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
            // Still remove token and user even if API call fails
            localStorage.removeItem("token");
            setUser(null);
        }
    };

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoading(false);
            return;
        }
        
        try {
            const response = await api.get("auth/user", {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            if (response.data) {
                setUser(response.data);
            } else {
                toast.error("Authentication failed");
                localStorage.removeItem("token");
            }
        } catch (error: any) {
            console.error("Fetch user error:", error);
            if (error.response && error.response.status === 401) {
                // Handle unauthorized
                localStorage.removeItem("token");
                toast.error("Session expired. Please login again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [location.pathname]); // Re-fetch when route changes

    let navigateTo = null;
    if (isLoading) navigateTo = <div>Loading...</div>;
    else if (!user && !isOnAuthPage) navigateTo = <Navigate to="/login" />;
    else if (user && isOnAuthPage) navigateTo = <Navigate to="/" />;

    return (
        <AuthenticationContext.Provider value={{ user, login, logout }}>
            {navigateTo}
            <Outlet />
        </AuthenticationContext.Provider>
    );
}