import { EmailContext } from "@/context";
import { useState, useEffect } from "react";

const EmailProvider = ({ children }) => {
  // Initialize token from localStorage if it exists
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  // Update localStorage whenever token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token"); // Remove token on logout
    }
  }, [token]);

  return (
    <EmailContext.Provider
      value={{ email, setEmail, resetToken, setResetToken, token, setToken }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export default EmailProvider;
