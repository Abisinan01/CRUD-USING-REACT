import { Outlet, Navigate } from "react-router-dom";
import { useAdminAuth } from "../hooks/useAdminAuth";

export const AdminProtectedRoutes = () => {
    const { token, role, loading } = useAdminAuth()
    if (loading) return <div>Loading...</div>;
    return token && role === 'admin' ? <Outlet /> : <Navigate to="/admin/login" />

}

export const AdminPublicRoutes = () => {
    const { token, role, loading } = useAdminAuth()
    if (loading) return <div>Loading...</div>;
    return token && role === 'admin' ? <Navigate to="/admin/dashboard" /> : <Outlet />;
}