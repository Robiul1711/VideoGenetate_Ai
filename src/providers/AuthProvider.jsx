import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "@/context";
import { useEmail } from "@/hooks/useEmail";
import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

const AuthProvider = ({ children }) => {
  const { token, setToken } = useEmail();

  // Fetch user function
  const fetchUser = async () => {
    if (!token) return null;
    const res = await axios.get(`${API_URL}account/profile/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  // TanStack Query for fetching user
  const {
    data: user,
    isLoading: loading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user", token],
    queryFn: fetchUser,
    enabled: !!token, // only run if token exists
    retry: false,
  });

  // Logout function
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.href = "/auth/sign-in";
  };

  const value = {
    user,
    token,
    loading,
    logout,
    refetchUser: refetch, // in case you want to refresh user manually
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
