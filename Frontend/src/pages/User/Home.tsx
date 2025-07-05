import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../redux/authSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  console.log(user?.username, "Usersdata")

  const [data, setData] = useState({
    username: '',
    email: '',
    profile: '',
  });

  const handleLogout = () => {
    if (!window.confirm("Are you confirm?")) return
    dispatch(logout(null))
    axios
      .post(`http://localhost:3000/logout`, {}, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message || 'User logout');
        navigate('/login');
      })
      .catch((err) => {
        console.log('Logout Error', err);
        toast.error('Logout failed');
      });
  };

  useEffect(() => {
    if (!user) {
      axios
        .get(`http://localhost:3000/fetch-data`, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            const userData = res.data.user;
            dispatch(login(userData));
            setData({
              username: userData.username,
              email: userData.email,
              profile: userData.profile,
            });
          }
        })
        .catch((err) => {
          console.log("Fetch error:", err);
          toast.error("Failed to fetch user data");
        });
    } else {
      setData({
        username: user.username,
        email: user.email,
        profile: user.profile,
      });
    }
  }, [user]);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black min-h-screen flex flex-col items-center justify-center text-white px-4 py-8">
      <button
        className="flex items-center absolute top-10 right-10 bg-red-500 opacity-60 hover:opacity-90 px-3 py-1 rounded-md text-sm md:text-base"
        onClick={handleLogout}
      >
        Sign out
      </button>

      <div className="w-full max-w-lg relative">
        <div className="mt-12 md:mt-16 mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-handwriting">Welcome {data.username}</h1>
        </div>

        <div className="bg-gray-800/80 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all">
          <div className="flex flex-col sm:flex-row items-center p-4 sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="w-20 h-20 rounded-full border-2 border-violet-600 overflow-hidden">
              {data.profile ? (
                <img
                  src={data.profile}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-700">
                  <FaUser className="text-4xl text-gray-400" />
                </div>
              )}
            </div>
            <p className="text-lg font-handwriting">{data?.username}</p>
            <button
              className="px-3 py-1 bg-transparent hover:bg-violet-900 border border-gray-600 rounded text-sm font-handwriting"
              onClick={() => navigate('/profile')}
            >
              Profile
            </button>
          </div>

          <div className="border-t border-gray-600" />

          <div className="p-4 bg-gray-800/80 text-left">
            <p className="font-handwriting">
              Email : <span className="font-bold">{data.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
