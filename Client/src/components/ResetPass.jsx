import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft, Lock, Mail, ShieldCheck, Eye, EyeOff } from "lucide-react";
import image1 from "../assets/10241279.jpg";

const Reset = () => {
  const [workEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/resetpass", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workEmail, password, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Verification failed");
        return;
      }

      toast.success("Security credentials updated");
      navigate("/Setting");  
    } catch (error) {
      toast.error("Server connection error");
    }

    setEmail("")
    setPassword("")
    setNewPassword("")
  };

  return (
    <div className="min-h-screen bg-[#0f1113] flex items-center justify-center px-4 font-sans">
      
      {/* Decorative Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl bg-[#1a1d21] border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side - Form */}
        <div className="p-8 md:p-14 lg:p-16 flex flex-col justify-center">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate("/Setting")}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 group w-fit"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold">Back to Profile</span>
          </button>

          <div className="mb-10">
            <div className="bg-blue-600/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="text-blue-500" size={28} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Reset Password
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Update your security credentials to keep your account safe.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type="email"
                  value={workEmail}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#0f1113] border border-white/5 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Current Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0f1113] border border-white/5 text-white pl-12 pr-12 py-4 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 text-blue-500">New Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  type={showPass ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full bg-[#0f1113] border border-blue-500/20 text-white pl-12 pr-12 py-4 rounded-2xl focus:outline-none focus:border-blue-500 transition-all font-medium shadow-[0_0_15px_rgba(37,99,235,0.05)]"
                  placeholder="Create new password"
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] mt-4"
            >
              Update Credentials
            </button>
          </form>
        </div>

        {/* Right Side - Image with Overlay */}
        <div className="hidden md:block relative overflow-hidden">
          <img
            src={image1}
            alt="Security"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay to blend image with dark theme */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1d21] via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 right-12">
            <div className="bg-black/20 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
              <p className="text-white font-bold text-lg">Account Security</p>
              <p className="text-slate-300 text-sm mt-1">Always use a combination of numbers, symbols, and letters for a stronger password.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;