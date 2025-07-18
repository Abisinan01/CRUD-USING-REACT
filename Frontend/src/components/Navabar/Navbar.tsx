import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../redux/store';
import { logout } from '../../redux/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
const localUrl = import.meta.env.VITE_API_URL

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.auth)
    console.log(user?.username, "Usersdata")
    const handleLogout = () => {
        if (!window.confirm("Are you confirm?")) return
        dispatch(logout(null))
        axios
            .post(`${localUrl}/logout`, {}, { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message || 'User logout');
                navigate('/login');
            })
            .catch((err) => {
                console.log('Logout Error', err);
                toast.error('Logout failed');
            });
    };
    return (
        <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700 shadow-md backdrop-blur-sm bg-black/30 fixed top-0 left-0 right-0 z-40">
            <h1 className="text-lg md:text-xl font-semibold text-white">USER PROFILE</h1>

            <button
                className="bg-slate-600 border border-gray-400 hover:bg-red-500 text-white opacity-80 hover:opacity-100 px-2 py-1 rounded-md text-sm md:text-base transition duration-200"
                onClick={handleLogout}
            >
                Sign out
            </button>
        </nav>
    )
}

export default Navbar