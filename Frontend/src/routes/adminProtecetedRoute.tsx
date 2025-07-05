import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";
const localUrl = import.meta.env.VITE_API_URL

export const AdminProtectedRoutes = () => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${localUrl}/admin/admin-auth`, { withCredentials: true })
            .then((res) => {
                setToken(res.data.token);
            })
            .catch(() => {
                setToken(null);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return token ? <Outlet /> : <Navigate to="/admin/login" />

}


export const AdminPublicRoutes = () => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${localUrl}/admin/admin-auth`, { withCredentials: true })
            .then((res) => {
                setToken(res.data.token);
            })
            .catch(() => {
                setToken(null);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return token ? <Navigate to="/admin/dashboard" /> : <Outlet />;
}