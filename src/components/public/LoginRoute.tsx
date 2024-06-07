// components/LoginRoute.js
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Login from "../../pages/Login";


const LoginRoute = () => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? <Navigate to="/" /> : <Login />;
};

export default LoginRoute;
