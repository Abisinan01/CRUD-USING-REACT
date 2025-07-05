import React, { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import * as Yup from 'yup';
import type { FormData } from '../../interfaces/formDatas';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [successMsg, setSuccessMsg] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate()

    const passwordRegex =
        /[A-Za-z\d@$!%*?&]{6,}/;

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email format"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(
                passwordRegex,
                "Password must contain at least one digit, one uppercase, one lowercase and one symbol"
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required")
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

    console.log(formData.password, "Password")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            console.log("Submitted data:", formData);

            axios.post("http://localhost:3000/sign-up-form", { formData })
                .then(response => {
                    console.log(response)
                    if (response.data.status === false) {
                        toast.error("User already exists")
                        return
                    }
                    toast.success("Sign up successfully done");
                    navigate('/login')
                })
                .catch(error => {
                    console.log("Axios error :", error)
                    toast.error("Failed to submit the form!");
                })

            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
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
                <div className="bg-black rounded-sm w-[400px] max-w-md p-10 flex flex-col items-center">
                    <span className="text-white text-2xl font-mono mb-6">SIGN UP</span>
                    <form
                        className="flex flex-col items-center w-full space-y-4"
                        onSubmit={handleSubmit}
                        noValidate
                        >

                        <div className="w-full">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                            )}
                        </div>

                        <div className="w-full">
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="w-full">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div className="w-full">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>
                        <div className="text-white text-[13px] relative right-12">
                            If you have already an Account?{" "}
                            <a
                                onClick={() => navigate('/login')}
                                style={{ cursor: 'pointer', color: 'blue' }}
                            >
                                Login
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded hover:opacity-90 transition"
                        >
                            Create Account
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
    );
};

export default Signup;
