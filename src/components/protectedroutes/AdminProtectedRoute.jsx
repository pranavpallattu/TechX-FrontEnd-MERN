/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem("existingUser")) || null;
  const isAdmin = user?.role === "admin";

  return isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminProtectedRoute;
