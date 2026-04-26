import { Navigate } from "react-router-dom";
import { LONG_LIVE_TOKEN } from "../constants/constants";
import { getCookie } from "../utils/cookie-helper";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({component, allowedRoles}) => {
    const token = getCookie(LONG_LIVE_TOKEN);
    const {user,loading} = useAuth();
    
    if(loading){
        return null;
    }

    if(!token || !user){
        return <Navigate to={"/login"} replace={true}/>
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/404" replace />;
    }

    return component;
}