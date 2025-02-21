

/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RoleBasedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true }); // Redirect without an alert
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

export default RoleBasedRoute;
