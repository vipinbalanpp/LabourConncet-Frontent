
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";



const ProtectedRoute = ({ element, requiredRole }: { element: JSX.Element, requiredRole: string }) => {
    const user = useSelector((state: RootState) => state.user.user);
    if(!user)return  <Navigate to="/login" />;
    const userRole = user.role
    if (userRole !== requiredRole) {
      return <Navigate to="/login" />;
    }
    return element;
  };
  export default ProtectedRoute;