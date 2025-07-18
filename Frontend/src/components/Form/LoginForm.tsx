import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import type { FormData } from '../../interfaces/formDatas';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { validationSchemaLogin } from '../../utils/formValidation';
import type { AppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/middlewares/loginMiddleware'


const LoginForm = () => {
    const [formData, setFormData] = useState<Omit<FormData, "confirmPassword">>({
        username: "",
        email: "",
        password: "",
        role: "user"
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

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
            await validationSchemaLogin.validate(formData, { abortEarly: false });
            console.log("Submitted data:", formData);

            await dispatch(loginUser(formData))
            navigate('/')

            setFormData({
                username: "",
                email: "",
                password: "",
                role: 'user'
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
        <div className="p-[1px] bg-gradient-to-r from-neutral-500 via-blue-700 to-neutral-800 rounded-sm">
            <div className="bg-black rounded-sm w-[400px] h-auto max-w-md p-10 flex flex-col items-center">
                <span className="text-white text-2xl font-mono mb-6">LOGIN</span>

                <form className="flex flex-col items-center w-full space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        name='username'
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

                    <div className="text-white text-[13px] relative right-14">
                        If you haven't an account?{" "}
                        <a
                            onClick={() => navigate('/signup')}
                            style={{ cursor: 'pointer', color: 'blue' }}
                        >
                            Sign up
                        </a>
                    </div>

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
    )
}

export default LoginForm