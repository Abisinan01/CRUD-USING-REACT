import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
const localUrl = import.meta.env.VITE_API_URL

export const ProtectedRoutes = () => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios(`${localUrl}/authenticated` , { withCredentials: true })
            .then((res) => {
                console.log('JWT OTKEN : ', res.data.token)
                setToken(res.data.token)
            })
            .catch(err => {
                console.error('Auth check failed', err)
                setToken(null)
            })
            .finally(() => setLoading(false))
    },)

    if (loading) {
        return <div>Loading...</div>
    }
    const isLoggedIn = Boolean(token)
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}


export const PublicRoutes = () => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${localUrl}/authenticated`, { withCredentials: true })
            .then((res) => {
                setToken(res.data.token);
            })
            .catch(() => {
                setToken(null);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    return token ? <Navigate to="/" /> : <Outlet />;
}