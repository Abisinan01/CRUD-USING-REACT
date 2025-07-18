import axios from "axios";
import { useEffect, useState } from "react";
const localUrl = import.meta.env.VITE_API_URL

export const useAdminAuth = () => {
    const [auth, setAuth] = useState<{ token: string | null, role: string | null }>({
        token: null,
        role: null
    })
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${localUrl}/authenticated`, { withCredentials: true })
            .then((res) => {
                console.log(`Auth data : ${res.data.role}`)
                setAuth({ token: res.data.token, role: res.data.role })
            })
            .catch(() => {
                setAuth({ token: null, role: null })
            })
            .finally(() => setLoading(false));
    }, []);

    return { ...auth, loading }
}