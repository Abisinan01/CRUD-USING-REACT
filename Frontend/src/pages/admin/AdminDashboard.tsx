import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import CreateUserModal from '../../components/CreateUser';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/adminAuthSlice';
import EditUsers from '../../components/EditUsers';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { setUsers } from '../../redux/adminUsersSlice';
const localUrl = import.meta.env.VITE_API_URL

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)
  const [editState, setEditState] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { usersList } = useSelector((state: RootState) => state.adminUsers)

  //MODAL
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openEditModal = () => setShowEditModal(true)
  const closeEditModal = () => setShowEditModal(false)


  const fetchUsers = () => {
    axios
      .get(`${localUrl}/admin/fetch-data`, { withCredentials: true })
      .then((res) => {
        dispatch(setUsers(res.data.users))
      })
      .catch((err) => {
        console.error('Fetch users error', err);
        toast.error('Failed to load users');
      });
  };

  useEffect(fetchUsers, []);

  const handleLogout = () => {
    if (!window.confirm('Do you really want to logout?')) return;
    dispatch(logout(null))
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

  const handleDelete = (userId: string) => {
    if (!window.confirm('Delete this user?')) return;

    axios
      .delete(`${localUrl}/admin/delete/${userId}`, { withCredentials: true })
      .then(() => {
        toast.success('User deleted');
        fetchUsers();
      })
      .catch((err) => {
        console.error('Delete user error', err);
        toast.error('Could not delete user');
      });
  };

  const filteredUsers = usersList.filter((u) =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleEdit = (userId: string) => {
    openEditModal()
    setEditState(userId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white relative overflow-x-hidden">

      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700 shadow-md backdrop-blur-sm bg-black/30 fixed top-0 left-0 right-0 z-40">
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
          Logout
        </button>
      </header>


      <main className="flex justify-center items-start pt-28 px-4">
        <div className="w-full max-w-2xl bg-gray-800/80 rounded-xl shadow-xl p-6 backdrop-blur-md">

          <input
            type="text"
            className="w-full mb-4 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <h3 className="text-lg font-semibold mb-2">All Users</h3>
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {filteredUsers.length ? (
              filteredUsers.map((u) => (
                <div
                  key={u._id}
                  className="flex items-center bg-gray-700/60 p-3 rounded-lg shadow-md"
                >

                  <div className="w-10 h-10 rounded-full border border-purple-400 overflow-hidden mr-3">
                    {u.profile ? (
                      <img
                        src={u.profile}
                        alt={`${u.username} avatar`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-600">
                        <FaUser className="text-xl text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 truncate">
                    <p className="text-sm font-medium truncate">{u.username}</p>
                    <p className="text-xs text-gray-300 truncate">{u.email}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-600 opacity-40 hover:opacity-90 text-white text-xs px-3 py-1 rounded ml-2"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleEdit(u._id)}
                    className="bg-gray-500 opacity-40 hover:bg-violet-600 opacity-90 text-white text-xs px-3 py-1 rounded ml-2"
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No users found.</p>
            )}
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <CreateUserModal show={showModal} onClose={closeModal} />
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <EditUsers show={showEditModal} onClose={closeEditModal} userId={editState} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
