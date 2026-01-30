import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [fileName, setFileName] = useState('No file chosen');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile(token);
      setIsLoggedIn(true);
    } else {
      setLoading(false);
    }
  }, []);


  const fetchProfile = async (token) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/profile", {
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



  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    fetchProfile(token);
    console.log(user?.role);
    
    if (user?.role === "admin") {
      navigate("/Dashboard")
    } else {
      navigate("/Home")
    }


  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  };


  const updateImage = async (image) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3000/api/auth/update-image", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image }),
      });

      const data = await res.json();

      if (data) {

        setUser(prevUser => ({
          ...prevUser,
          image1: data.profileImage,
        }));
      }
    } catch (err) {
      console.error("Error updating image:", err);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        setUser,
        updateImage,
        setIsLoggedIn,
        logout,
        login,
        loading,
        fileName, setFileName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
