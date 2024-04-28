import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


export const AuthGuard = () => {
    const {isLoggedIn} = useAuth();

    return isLoggedIn ? <Outlet/> : <Navigate replace to = {"/Login"}/>
}

export default AuthGuard;