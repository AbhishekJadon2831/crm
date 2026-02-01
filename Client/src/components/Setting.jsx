import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { LogOut, Camera, Mail, User, ShieldCheck, PenLine } from "lucide-react";


function Setting() {
    const { user, logout, updateImage, editData, setEditData } = useAuth();
    const navigate = useNavigate();
    console.log(user);








    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1113] text-white">
                <div className="animate-pulse bg-blue-500/20 p-4 rounded-full mb-4">
                    <ShieldCheck size={48} className="text-blue-500" />
                </div>
                <p className="text-xl font-bold tracking-tight">Security Protocol: Please Login</p>
                <button onClick={() => navigate("/login")} className="mt-6 px-8 py-3 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition-all">Go to Login</button>
            </div>
        );
    }

    const changeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetpassword = () => {
        navigate("/reset")
    }

    const log = () => {
        logout();
        navigate("/login");
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };


    return (
        <div className="min-h-screen bg-[#0f1113] text-slate-200 ml-72">
            <div className="p-8 lg:p-12 max-w-5xl mx-auto">


                <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-8">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tight">Settings</h1>
                        <p className="text-slate-500 mt-2 font-medium">Manage your digital identity and account security.</p>
                    </div>
                    <button
                        onClick={log}
                        className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all active:scale-95"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[#1a1d21] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center">
                            <div className="relative group cursor-pointer">
                                <img
                                    className="w-32 h-32 rounded-3xl border-4 border-[#0f1113] shadow-2xl object-cover transition-transform group-hover:scale-105"
                                    src={user?.image1 || "https://ui-avatars.com/api/?name=" + user?.name}
                                    alt="User"
                                />
                                <label htmlFor="fileInput" className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera className="text-white" size={24} />
                                </label>
                                <input type="file" id="fileInput" onChange={changeImage} className="hidden" />
                            </div>

                            <h2 className="mt-6 text-2xl font-bold text-white">{user.name} {user.lastname}</h2>
                            <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mt-1">Enterprise User</p>

                            <div className="w-full mt-8 pt-6 border-t border-white/5 space-y-4">
                                <div className="flex items-center gap-3 text-slate-400 text-sm">
                                    <Mail size={16} className="text-slate-600" />
                                    <span className="truncate">{user.workEmail}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: DETAILED SETTINGS */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#1a1d21] border border-white/5 rounded-3xl p-8">
                            <div className="flex items-center gap-2 mb-8">
                                <User size={20} className="text-blue-500" />
                                <h3 className="text-xl font-bold text-white">Personal Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">First Name</label>
                                    <input
                                        name="name"
                                        value={editData.name}
                                        onChange={handleChange}
                                        className="bg-[#0f1113] border border-white/5 text-white rounded-2xl p-4 font-bold w-full"
                                    />

                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Last Name</label>
                                    <input
                                        name="lastname"
                                        value={editData.lastname}
                                        onChange={handleChange}
                                        className="bg-[#0f1113] border border-white/5 text-white rounded-2xl p-4 font-bold w-full"
                                    />

                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Work Email</label>
                                    <input
                                        name="workEmail"
                                        value={editData.workEmail}
                                        onChange={handleChange}
                                        className="bg-[#0f1113] border border-white/5 text-white rounded-2xl p-4 font-bold w-full"
                                    />

                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 flex justify-between items-center">
                                        Profile Bio
                                        <PenLine size={12} className="text-blue-500" />
                                    </label>
                                    <textarea
                                        className="bg-[#0f1113] border border-white/5 text-slate-300 rounded-2xl p-4 text-sm w-full focus:outline-none focus:border-blue-500 transition-colors h-28"
                                        placeholder="Briefly describe your role and expertise..."
                                    ></textarea>
                                </div>
                            </div>

                            <div onClick={resetpassword} className="mt-10  pt-8 border-t border-white/5 flex flex-wrap gap-4">

                                <button className="px-6 py-3 bg-white/5 cursor-pointer text-slate-300 border border-white/10 font-bold rounded-xl hover:bg-white/10 transition-all text-sm">
                                    Reset Password
                                </button>
                            </div>


                        </div>

                        {/* ADDITIONAL SECTION (Optional) */}
                        <div className="bg-gradient-to-r from-blue-600/10 to-transparent border border-blue-500/20 rounded-3xl p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 rounded-2xl">
                                    <ShieldCheck className="text-blue-500" size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold">Two-Factor Authentication</p>
                                    <p className="text-xs text-slate-400">Secure your account with 2FA protection.</p>
                                </div>
                            </div>
                            <button className="text-xs font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors">Enable</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;