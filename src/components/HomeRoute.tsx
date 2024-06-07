
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import { RootState } from "../redux/store";

const HomeRoute = () => {
    const user = useSelector((state: RootState) => state.user.user);
    console.log(user);
    
    if(!user){
      return <Home/>
    }
    if(user !== null){
      const userRole = user.role
   
    
    
      switch (userRole) {
      case "WORKER":
        return <Navigate to="/worker/dashboard" />;
      case "ADMIN":
        return <Navigate to="/admin/dashboard" />;
      default:
        return <Home />;
    } }
  };
  export default HomeRoute;