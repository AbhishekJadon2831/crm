import { useState } from "react";
import image from "../assets/groth.jpg";

import { FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from 'react-toastify';
import { useAuth } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [workEmail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handle = async (e) => {
        e.preventDefault();
        const res2 = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ workEmail, password }),
        });
        const data2 = await res2.json();

        if (!res2.ok) {
            toast.error(data2.message || "Invalid user");
            return;
        }

        localStorage.setItem("token", data2.token);
        toast.success("Login successful");
        login(data2.token);
    };

    return (
        <div className="flex min-h-screen bg-gray-900 font-sans">
            {/* Left Side: Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 lg:px-32 py-12">
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10">
                        <h2 className="text-blue-500 font-black text-2xl tracking-tighter uppercase mb-8">SalesForce One</h2>
                        <h1 className="text-white text-4xl font-extrabold mb-3">Welcome Back</h1>
                        <p className="text-gray-400 text-lg">Enter your credentials to access your dashboard.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handle}>
                        <div className="space-y-5">
                            <div className="relative">
                                <label className="block text-gray-300 font-semibold mb-2 text-sm">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="name@company.com"
                                        value={workEmail}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-4 pr-12 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all"
                                    />
                                    <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-2xl" />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-gray-300 font-semibold mb-2 text-sm">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-4 pr-12 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white transition-all"
                                    />
                                    <div 
                                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-white"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                           
                           
                        </div>

                        <div className="space-y-4 pt-2">
                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]">
                                Sign In
                            </button>
                            
                           
                        </div>

                        <div className="flex justify-center gap-2 pt-4">
                            <p className="text-gray-400">Don't have an account?</p>
                            <p onClick={() => navigate("/Register")} className="text-blue-500 font-bold cursor-pointer hover:underline underline-offset-4">
                                Sign up for a trial
                            </p>
                        </div>
                    </form>
                </div>
            </div>
 
            <div className="hidden lg:block relative w-1/2">
                <img 
                    src={image} 
                    alt="Background" 
                    className="absolute inset-0 w-full h-full object-cover" 
                />
               
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent opacity-30"></div>
            </div>
        </div>
    );
}

export default Login;