import { Outlet, Navigate } from "react-router-dom";
import { useAdminAuth } from "../hooks/useAdminAuth";

export const ProtectedRoutes = () => {
    const { token, role, loading } = useAdminAuth()

    if (loading) return <div>Loading...</div>;

    return token && role === 'user' ? <Outlet /> : <Navigate to="/login" replace />
}

export const PublicRoutes = () => {
    const { token, role, loading } = useAdminAuth()

    if (loading) return <div>Loading...</div>;
    
    return token && role === 'user' ? <Navigate to="/" /> : <Outlet />;
}