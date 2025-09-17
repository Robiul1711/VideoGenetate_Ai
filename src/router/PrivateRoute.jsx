import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // While loading, render a hidden full-screen background
  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen bg-black  z-50"></div>
    );
  }

  // If user is logged in, render children
  if (user) {
    return children;
  }

  // If not logged in, redirect to login
  return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
};

export default PrivateRoute;
