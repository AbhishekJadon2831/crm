import { Link, useLocation } from "react-router-dom";
import image from "../assets/simple.jpg";
import { 
  BrickWall, 
  CircleUserRound, 
  LayoutDashboard, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useAuth } from "./Context/AuthContext";

function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  // Helper function to check active route
  const isActive = (path) => location.pathname === path;

  const linkClass = (path) => `
    flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
    ${isActive(path) 
      ? "bg-blue-600/10 text-blue-500 shadow-[inset_0_0_10px_rgba(37,99,235,0.1)]" 
      : "text-slate-400 hover:bg-white/5 hover:text-white"}
  `;

  return (
    <nav className="fixed top-0 left-0 h-screen w-90 bg-[#16171a] border-r border-white/5 flex flex-col justify-between p-6 z-50">
      
      {/* Top Section: Logo & Links */}
      <div className="space-y-8">
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20">
            <img src={image} alt="Logo" className="w-8 h-8 rounded-md object-cover" />
          </div>
          <span className="text-white font-black text-xl tracking-tight uppercase">
            Sales<span className="text-blue-500">CRM</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4 mb-4">
            Main Menu
          </p>

          {user?.role === "user" && (
            <Link to="/Home" className={linkClass("/Home")}>
              <LayoutDashboard className={`w-5 h-5 ${isActive("/Home") ? "text-blue-500" : "text-slate-400 group-hover:text-white"}`} />
              <span className="font-semibold">Home</span>
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to="/Dashboard" className={linkClass("/Dashboard")}>
              <LayoutDashboard className={`w-5 h-5 ${isActive("/Dashboard") ? "text-blue-500" : "text-slate-400 group-hover:text-white"}`} />
              <span className="font-semibold">Dashboard</span>
            </Link>
          )}

          <Link to="/Contact" className={linkClass("/Contact")}>
            <CircleUserRound className={`w-5 h-5 ${isActive("/Contact") ? "text-blue-500" : "text-slate-400 group-hover:text-white"}`} />
            <span className="font-semibold">Contacts</span>
          </Link>

          {user?.role === "user" && (
            <Link to="/Pipeline" className={linkClass("/Pipeline")}>
              <BrickWall className={`w-5 h-5 ${isActive("/Pipeline") ? "text-blue-500" : "text-slate-400 group-hover:text-white"}`} />
              <span className="font-semibold">Pipeline</span>
            </Link>
          )}
        </div>
      </div>

      {/* Bottom Section: User & Settings */}
      <div className="space-y-4">
        <div className="pt-4 border-t border-white/5">
          <Link to="/Setting" className={linkClass("/Setting")}>
            <Settings className={`w-5 h-5 ${isActive("/Setting") ? "text-blue-500" : "text-slate-400 group-hover:text-white"}`} />
            <span className="font-semibold">Settings</span>
          </Link>
        </div>

        {/* User Profile Card */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 mt-2">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <img
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500/20"
                src={user?.image1 || "https://ui-avatars.com/api/?name=" + user?.name}
                alt="User"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#16171a] rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-white font-bold truncate text-sm">{user?.name} {user?.lastname}</p>
              <p className="text-slate-500 text-xs truncate capitalize">{user?.role || "Member"}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;