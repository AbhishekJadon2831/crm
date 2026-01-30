import { useState } from "react";
import image from "../assets/google.png";
import image1 from "../assets/register.jpg";
import { FiUser, FiMail, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle dono ke liye
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    
    // Simple validation check
    if (password !== confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, lastname, workEmail, password, confirmpassword }),
    });
    const data = await res.text();

    if (!res.ok) {
      toast.error(data.message || "Register Failed");
    } else {
      toast.success("Registration successful");
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 font-sans overflow-hidden">
      
      {/* Left Side: Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-20 lg:px-28 py-10 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-white text-3xl font-extrabold tracking-tight">Create your account</h2>
            <p className="text-gray-400 mt-2">Start your 14-day free trial.</p>
          </div>

          <form className="space-y-5" onSubmit={handle}>
            {/* Names Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-gray-400 text-sm font-medium mb-1.5">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3.5 pl-4 pr-10 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white transition-all"
                />
              </div>
              <div className="relative">
                <label className="block text-gray-400 text-sm font-medium mb-1.5">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full p-3.5 pl-4 pr-10 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white transition-all"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-gray-400 text-sm font-medium mb-1.5">Work Email</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                className="w-full p-3.5 pl-4 pr-10 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white transition-all"
              />
              <FiMail className="absolute right-3 top-10 text-gray-500" />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-gray-400 text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3.5 pl-4 pr-10 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white transition-all"
                />
                <div 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </div>
              </div>
            </div>

            {/* Confirm Password Field (Eye Added Here) */}
            <div className="relative">
              <label className="block text-gray-400 text-sm font-medium mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  className="w-full p-3.5 pl-4 pr-10 rounded-xl bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none text-white transition-all"
                />
                <div 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg group mt-2"
            >
              <span>Create Account</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center text-gray-400 text-sm mt-4">
              Already have an account?{" "}
              <button type="button" onClick={() => navigate("/Login")} className="text-blue-500 font-bold hover:underline">
                Login
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side: Image Section */}
      <div className="hidden lg:block relative w-1/2">
        <img src={image1} alt="Promotional" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent opacity-60"></div>
      </div>
    </div>
  );
};

export default Register;