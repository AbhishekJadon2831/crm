import { useEffect, useState } from "react";
import {
  CircleUserRound,
  TrendingUp,
  DollarSign,
  ArrowUpRight
} from "lucide-react";

function Dashboard() {
    
  const [items, setItems] = useState([]);

 

  const fetchResult = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/leads/pipeline");
      const data = await res.json();
      setItems(data);
      console.log(data);
      
    } catch (error) {
      console.log("Error fetching pipeline:", error);
    }
  };

  const close = items.filter((i) => i.stage === "CLOSED").length;

  useEffect(() => {
     
    fetchResult();
  }, []);

  return (

    <div className="min-h-screen bg-[#0f1113] text-slate-100 font-sans selection:bg-blue-500/30 ml-90">
      <div className="p-8 lg:p-12 max-w-[1400px] mx-auto">
        
         
        <header className="mb-14 flex flex-col md:flex-row justify-between items-end md:items-center border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              <p className="text-blue-500 font-bold text-xs uppercase tracking-[0.3em]">System Live</p>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tighter bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
              Executive Dashboard
            </h1>
            <p className="text-slate-500 mt-3 text-lg font-medium">
              Intelligence overview for <span className="text-white">Alex</span>
            </p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-bold">Current Status</p>
            <p className="text-sm font-mono text-slate-300">Operational • 100% Sync</p>
          </div>
        </header>

        {/* ===== STATS GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Total Leads Card */}
          <div className="group relative bg-[#1a1d21]/50 border border-white/5 rounded-3xl p-8 transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)] overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="text-blue-500 w-5 h-5" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <CircleUserRound className="text-blue-500 w-8 h-8" />
              </div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Total Lead</p>
              <div className="flex items-baseline gap-2 mt-2">
                <p className="text-5xl font-bold tracking-tight">{items.length}</p>
                <span className="text-blue-500 text-xs font-bold">+12%</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-blue-500/5 blur-3xl rounded-full"></div>
          </div>

          {/* Total Pipeline Card */}
          <div className="group relative bg-[#1a1d21]/50 border border-white/5 rounded-3xl p-8 transition-all duration-500 hover:border-yellow-500/50 hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.2)] overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="text-yellow-500 w-5 h-5" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp className="text-yellow-500 w-8 h-8" />
              </div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Pipeline</p>
              <div className="flex items-baseline gap-2 mt-2">
                <p className="text-5xl font-bold tracking-tight">{items.length}</p>
                <span className="text-yellow-500 text-xs font-bold">Active</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-yellow-500/5 blur-3xl rounded-full"></div>
          </div>

          
          <div className="group relative bg-[#1a1d21]/50 border border-white/5 rounded-3xl p-8 transition-all duration-500 hover:border-green-500/50 hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.2)] overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="text-green-500 w-5 h-5" />
            </div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <DollarSign className="text-green-500 w-8 h-8" />
              </div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Revenue Stage</p>
              <div className="flex items-baseline gap-2 mt-2">
                <p className="text-5xl font-bold tracking-tight">{close}</p>
                <span className="text-green-500 text-xs font-bold">Closed</span>
              </div>
            </div>
            <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-green-500/5 blur-3xl rounded-full"></div>
          </div>

        </div>

         
        <div className="mt-12 text-center">
          <p className="text-slate-600 text-[10px] uppercase tracking-[0.4em] font-black">
            Data refreshes automatically every session
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;