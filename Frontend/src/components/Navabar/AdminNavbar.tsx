import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import axios from 'axios';
import { clearList } from '../../redux/adminUsersSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CreateUserModal from '../Modal/CreateUser';
import { logout } from '../../redux/authSlice';
const localUrl = import.meta.env.VITE_API_URL

const Navbar = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const handleLogout = () => {
        if (!window.confirm('Do you really want to logout?')) return;
        dispatch(logout(null))
        dispatch(clearList())
        axios
            .post(`${localUrl}/admin/logout`, {}, { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message || 'Logged out');
                navigate('/admin/login');
            })
            .catch((err) => {
                console.error('Logout error', err);
                toast.error('Logout failed');
            });
    };
    return (
        <>
            <nav className="flex justify-between items-center px-6 py-4 border-b border-gray-700 shadow-md backdrop-blur-sm bg-black/30 fixed top-0 left-0 right-0 z-40">
                <button
                    onClick={openModal}
                    className="bg-gray-600 border border-gray-500 px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition"
                >
                    + Create User
                </button>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded-md text-sm hover:bg-red-600 transition"
                >
                    SIGN OUT
                </button>
            </nav>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <CreateUserModal show={showModal} onClose={closeModal} />
                </div>
            )}
        </>
    )
}

export default Navbar