import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "@/context";
import { useCallback, useEffect, useState } from "react";
import { useEmail } from "@/hooks/useEmail";

const API_URL = import.meta.env.VITE_API_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { token, setToken } = useEmail();
  const [loading, setLoading] = useState(false);

  // Fetch user function
  const fetchUser = useCallback(async (access) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}account/profile/`, {
        headers: { Authorization: `Bearer ${access}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user", err);
      logout(); // optional: logout on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect to fetch user when token exists
  useEffect(() => {
    if (token && !user) {
      fetchUser(token);
    }
  }, [token, user, fetchUser]);

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(""); // clear token from EmailProvider
    localStorage.removeItem("token"); // optional if you save it in localStorage
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    token,
    loading,
    setUser,
    logout, // expose logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
