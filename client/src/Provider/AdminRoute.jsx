import { Navigate } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner></LoadingSpinner>;
  if (role === "admin") return children;

  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
