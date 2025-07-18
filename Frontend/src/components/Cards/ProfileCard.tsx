import axios from 'axios';
import React, { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { AppDispatch, RootState } from '../../redux/store';
import { editProfile } from '../../redux/authSlice';
const CLOUDNARY_URL = import.meta.env.VITE_API_URL_CLOUDNARY
const localUrl = import.meta.env.VITE_API_URL

const ProfileCard = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        profile: '',
    });

    const dispatch = useDispatch<AppDispatch>()
    const { user } = useSelector((state: RootState) => state.auth)
    const [previewPic, setPreviewPic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const imgFileRef = useRef<File | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (file: File): Promise<string | null> => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'profile_images');

        try {
            const res = await axios.post(
                CLOUDNARY_URL,
                data
            );
            return res.data.secure_url;
        } catch (err) {
            console.error('Image upload error:', err);
            toast.error('Failed to upload image');
            return null;
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        console.log(file, "file")

        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Only JPG, PNG, or WEBP images are allowed');
            return;
        }

        imgFileRef.current = file;
        setPreviewPic(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        let profilePicUrl = data.profile;

        if (imgFileRef.current) {
            const uploadedUrl = await handleImageUpload(imgFileRef.current);
            if (!uploadedUrl) {
                setIsLoading(false);
                return;
            }
            profilePicUrl = uploadedUrl;
        }

        const updatedUser = { ...data, profile: profilePicUrl };

        axios
            .post(`${localUrl}/profile`, updatedUser, {
                withCredentials: true,
            })
            .then((res) => {
                if (res.status !== 200) {
                    toast.error('Updation failed')
                }
                console.log("Update profile :", res.data)
                dispatch(editProfile(res.data.user))
                toast.success('Profile updated');
                navigate('/');
            })
            .catch((err) => {
                console.error('Profile update error:', err);
                toast.error('Profile update failed');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (user) {
            setData({
                name: user.username,
                email: user.email,
                profile: user.profile,
            });
            setPreviewPic(user.profile);
        }
    }, [user]);


    return (
        <div className="bg-gray-800/80 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-white text-center mb-6">Edit Profile</h2>
            <div >
                <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full border-2 border-violet-600 overflow-hidden">
                        {previewPic || data?.profile ? (
                            <img
                                src={previewPic || data?.profile}
                                alt="avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-700">
                                <FaUser className="text-4xl text-gray-400" />
                            </div>
                        )}

                    </div>

                    <label htmlFor="profile" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 cursor-pointer">
                        <IoIosAdd className="text-[50px] text-violet-700 relative left-6 top-3" />
                        <input
                            id="profile"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={data?.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>

                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={`bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        onClick={()=>navigate('/')}
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard