import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    

    useEffect(() => {
        const token = localStorage.getItem("token")? true : false;
        if (token) {
            setIsLoggedIn(true);
            fetchProfile(token);
        }
    }, []);


    

    const fetchProfile = async (token) => {
        try {
            const res = await fetch("http://localhost:3000/profile", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (data?.user) {
                setUser(data.user);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Profile fetch failed:", error);
            setIsLoggedIn(false);
        }
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
    };


    

    return (
        <AuthContext.Provider
            value={{ user, isLoggedIn, setUser, setIsLoggedIn, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
