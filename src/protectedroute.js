import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DashboardNotFound from "./pages/NotFoundPage/DashboardNotFoundPage";
const ProtectedRoute = ({ children,allowedRoles = [] }) => {
    const token = localStorage.getItem("access_token");

    
    try {

        const decoded = jwtDecode(token);

        // check role
        if(
            allowedRoles.length > 0 &&
            !allowedRoles.includes(decoded.isAdmin)
        ){
            return <DashboardNotFound />
        }

        return children;

    } catch(err){

        localStorage.removeItem("access_token");

        return <Navigate to="/sign-in" replace />;
    }
};

export default ProtectedRoute;