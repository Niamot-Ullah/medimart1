import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation, useNavigate } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation()
  if (loading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default PrivateRoute;
