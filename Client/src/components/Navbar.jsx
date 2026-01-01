import { Link } from "react-router-dom";
import image from "../assets/simple.jpg"
import { BrickWall, CalendarDays, CircleCheck, CircleCheckBig, CircleUserRound, DollarSign, LayoutDashboard, Plus, Settings, ShieldQuestionMark, TrendingUp,Clock, Video, CircleX } from "lucide-react"


 

 
function Navbar() {
  

    return (
      <>
           <div className=" bg-[#202124] p-10 h-183 w-96 top-0 fixed   ">
             


             <div className="space-y-4  ml-10 ">

                 <div className="flex gap-5  items-center ">
                     <img src={image} alt="image" className="w-15 h-15  rounded-full" />
                     <p className="text-white font-bold text-2xl ">SalesCRM</p>
                 </div>
                 <Link to="/Dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#283039] transition-colors group">
                     <LayoutDashboard className="w-10 text-slate-600 dark:text-slate-400 group-hover:text-white" />
                     <p className="text-slate-600 dark:text-slate-400 text-lg group-hover:text-white">Dashboard</p>
                 </Link>
                 <Link to="/Contact" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#283039] transition-colors group">
                     <CircleUserRound className="w-10 text-slate-600 dark:text-slate-400 group-hover:text-white" />
                     <p className="text-slate-600 dark:text-slate-400 text-lg group-hover:text-white">Contacts</p>
                 </Link>
                 <Link to="/Pipeline" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#283039] transition-colors group">
                     <BrickWall className="w-10 text-slate-600 dark:text-slate-400 group-hover:text-white" />
                     <p className="text-slate-600 dark:text-slate-400 text-lg group-hover:text-white">Pipeline</p>
                 </Link>
                 <Link to="/Revenue" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#283039] transition-colors group">
                     <ShieldQuestionMark className="w-10 text-slate-600 dark:text-slate-400 group-hover:text-white" />
                     <p className="text-slate-600 dark:text-slate-400 text-lg group-hover:text-white">Revenue</p>
                 </Link>
                 <Link to="/Task" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#283039] transition-colors group">
                     <CircleCheck className="w-10 text-slate-600 dark:text-slate-400" group-hover:text-white/>
                     <p className="text-slate-600 dark:text-slate-400 text-lg group-hover:text-white">Tasks</p>
                 </Link>
             </div>
             <div className="mt-20 ml-10">
                 <div className="flex items-center flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#283039] transition-colors group">
                     <Settings className="w-10 text-slate-600 dark:text-slate-400 group-hover:text-white" />
                     <p className="text-slate-600 dark:text-slate-400 text-lg group-hover:text-white">Settings</p>
                 </div>

                 <div className="flex items-center gap-5 mt-13 text-lg">
                     <img src={image} alt="image" className="w-10   h-10 rounded-full bg-slate-700 bg-cover bg-center" />
                     <div>
                         <span className="text-white">Alex Morgan</span><br />
                         <span className="text-slate-600 dark:text-slate-400">Alex Sales Lead</span>
                     </div>
                 </div>
             </div>
         </div>
      </>
    )
  }
  
  export default Navbar;
  