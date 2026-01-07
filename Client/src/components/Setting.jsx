import { useState, useEffect } from "react";
import { useAuth } from "./Context/AuthContext";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { FiCamera } from "react-icons/fi";

function Setting() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (user?.avatar) {
            setPreview(user.avatar);
        }
    }, [user?.avatar]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-black">
                <p className="text-lg font-medium">Please log in to view your profile.</p>
            </div>
        );
    }

    function log() {
        logout();
        navigate("/login");
    }






    return (
        <div className="    ml-90    bg-[#111418] w-305">

            <div className="space-y-4 ml-5 p-12">
                <p className="text-white font-bold text-4xl">Settings</p>
                <p className="text-lg text-slate-600 dark:text-slate-400">Manage your preferences and integrations.</p>
            </div>

            <div className="flex">
                <div className="space-y-2 ml-18 mt- p-12 ">
                    <p className="text-white font-bold text-2xl">Profile Information</p>
                    <p className="text-lg text-slate-600 dark:text-slate-400">Update your photo and personal details here.</p>
                </div>

                <div className="flex justify-center item-center gap-5 bg-blue-500 w-50 h-20 text-white font-bold text-lg ">
                    <LogOut className="mt-8 text-lg"/>
                    <button onClick={log}>LogOut</button>
                </div>
            </div>
            <div className="  rounded-3xl ml-30    p-8 bg-[#1a1d21] justify-around   border border-[#283039] rounded-xl p-6 text-gray-800 w-250">

                <div className=" flex  justify-around">
                    <div className="">
                        <img
                            className="w-24 h-24 rounded-full border-4 border-gradient-to-br from-blue-400 to-purple-500 shadow-lg object-cover"
                            src={preview || user.avatar || "https://i.pravatar.cc/150?u=user"}
                            alt="User avatar"
                        />


                    </div>

                    <div className="space-y-15">


                        <div className="flex gap-7 item-center ">
                            <div className="">

                                <label className="text-lg font-medium text-[#9cabba] ">First Name</label>
                                <div type="text" className="w-100 bg-[#283039] border-transparent focus:border-primary focus:ring-0 rounded-lg text-white text-sm py-4.5 px-4 placeholder-[#5c6b7a]">
                                    {user.name}
                                </div>
                            </div>

                            <div>


                                <label className="text-lg font-medium text-[#9cabba]">Last Name</label>
                                <div type="text" className="w-100 bg-[#283039] border-transparent focus:border-primary focus:ring-0 rounded-lg text-white text-sm py-4.5 px-4 placeholder-[#5c6b7a]">
                                    {user.lastname}
                                </div>
                            </div>


                        </div>

                        <div>

                            <label className="text-lg font-medium text-[#9cabba]">Email Address</label>
                            <div className="w-206 bg-[#283039] border-transparent focus:border-primary focus:ring-0 rounded-lg text-white text-sm py-4.5 px-4 placeholder-[#5c6b7a]">
                                {user.workEmail}
                            </div>

                        </div>


                        <div>

                            <label className="text-lg font-medium text-[#9cabba]">Bio</label>
                            <div className="w-206 bg-[#283039] border-transparent focus:border-primary focus:ring-0 rounded-lg text-white text-sm py-15 px-4 placeholder-[#5c6b7a]">

                            </div>

                        </div>

                    </div>








                </div>


                {/* Buttons */}
                <div className="mt-15 space-y-4 ml-182">                    <button
                    className="w-50 text-lg cursor-pointer py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow hover:scale-105 transition-transform"
                >
                    Save Changes
                </button>
                    {/* <button
                        onClick={log}
                        className="w-full cursor-pointer py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl shadow hover:scale-105 transition-transform"
                    >
                        🚪 Logout
                    </button> */}

                </div>
            </div>
        </div>
    );
}

export default Setting;
