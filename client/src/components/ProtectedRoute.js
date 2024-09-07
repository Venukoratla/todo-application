import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const token = sessionStorage.getItem("token");
  return token ? children : null;
};

export default ProtectedRoute;
