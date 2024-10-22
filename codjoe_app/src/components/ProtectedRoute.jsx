import { Navigate } from "react-router-dom";
import { useCodjoeData } from "../context/CodjoeContext";
import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode'



export const ProtectedRoute = ({ children }) => {
    const { user } = useCodjoeData();
    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};

export const ProtectedAdminRoute = ({ children }) => {
    const { user } = useCodjoeData();

    if (!user) {
        // if (role === 'admin') {
        // }
        // return console.log('role to loginnn');
        return <Navigate to="/login" />

    }

    if (user) {
        const role = jwtDecode(user)?.user.role

        if (role === 'admin') {
            console.log('xxxxxxxrole = admin');
            return children

        } else if (role === 'user') {
            console.log('xxxxxxxxrole = user');
            return <Navigate to="/" />

        } else {
            return <Navigate to="/" />
        }

    }




    // return children;


}