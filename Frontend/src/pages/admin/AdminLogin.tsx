import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import type { FormData } from '../../interfaces/formDatas';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/adminAuthSlice';
const localUrl = import.meta.env.VITE_API_URL

const AdminLogin = () => {
    const [formData, setFormData] = useState<Omit<FormData, "confirmPassword">>({
        username: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const passwordRegex =
        /[A-Za-z\d@$!%*?&]{6,}/;

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Please enter valid username or emailId"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(
                passwordRegex,
                "Password must contain at least one digit, one uppercase, one lowercase and one symbol"
            )
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            console.log("Submitted data:", formData);
            
            axios.post(`${localUrl}/admin/admin-login-form`, { formData }, { withCredentials: true })
                .then(response => {
                    console.log(response)
                    if (!response.data.success) {
                        toast.error(response.data.message);
                        return
                    }
                    toast.success('Logged successfully')
                    dispatch(login(response.data.user))
                    navigate('/admin/dashboard')
                })
                .catch(error => {
                    console.log("Axios error :", error)
                    toast.error("Failed to submit the form!");
                })

            setFormData({
                username: "",
                email: "",
                password: ""
            });
            setErrors({});

        } catch (error: any) {
            if (error.inner) {
                const newErrors: Record<string, string> = {};
                error.inner.forEach((err: any) => {
                    if (err.path) newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
                toast.error("Validation failed!")
            }
        }
    };

    return (
        <div className="bg-black w-screen h-screen flex items-center justify-center">
            <div className="p-[1px] bg-gradient-to-r from-neutral-500 via-blue-700 to-neutral-800 rounded-sm">
                <div className="bg-black rounded-sm w-[400px] h-auto max-w-md p-10 flex flex-col items-center">
                    <span className="text-white text-2xl font-mono mb-6">ADMIN LOGIN</span>

                    <form className="flex flex-col items-center w-full space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Email or username"
                            name="username"
                            value={formData.username || formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1 relative right-10">{errors.username}</p>
                        )}

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}


                        <button
                            type="submit"
                            className="w-full py-2 bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded hover:opacity-90 transition"
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center w-full px-4 py-2 border border-neutral-400 text-white rounded hover:opacity-90 transition"
                        >
                            <FcGoogle className="w-5 h-5 mr-2" />
                            <span className="font-medium">Sign in with Google</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin