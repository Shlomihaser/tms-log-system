import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet, useLocation } from "react-router-dom";

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

const AUTH_PAGES = ["/login"];

export function useAuthentication() {
    return useContext(AuthenticationContext);
}

export function AuthenticationContextProvider() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const isOnAuthPage = AUTH_PAGES.includes(location.pathname);
    const api = axios.create({ baseURL: import.meta.env.VITE_API_URL + "/api/" });

    const login = async (username: string, password: string) => {
        try {
            const response = await api.post("/auth/login", { username, password });
           
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                toast.success("Login successful!");
            } else 
                toast.error(response.data.message || "An unknown error occurred");
           
        } catch (error: any) {
            if (error.response)
                toast.error(error.response.data.message || "An unknown error occurred");
            else if (error.request) 
                toast.error("Network error, could not connect to server");
            else 
                toast.error("An unknown error occurred");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        toast.success("Logged out successfully");
    };

    const fetchUser = async () => {
        try {
            const response = await api.get("auth/user", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            if (!response.data) toast.error("Authentication failed");
            setUser(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoading(false);
            return;
        }
        if (user) return;
        fetchUser();
    }, [user, location.pathname]);

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
