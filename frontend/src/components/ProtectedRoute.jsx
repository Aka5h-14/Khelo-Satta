import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import context from "./MyContext";
import { checkAuthStatus } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, setIsAuthenticated, API } = useContext(context);
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isAuth = await checkAuthStatus(API);
        if (isAuth.isAuthenticated) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
} 