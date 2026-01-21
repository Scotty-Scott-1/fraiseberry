import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    console.log("procted page. refused")
    return <Navigate to="/signin" />;
  }
    console.log("procted page. accepted")
  return children;
};

export default ProtectedRoute;
