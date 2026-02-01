import React from 'react';
import { useAuth } from './Context/AuthContext';
import { 
  Rocket, 
  BarChart3, 
  UserCircle, 
  Settings, 
  Zap, 
  LifeBuoy, 
  LogOut,
  ChevronRight,
  Activity,
  ShieldCheck,
  Cpu
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  
  const firstName = user?.name || "Guest";
  const lastName = user?.lastname || "";

  return (
    <div className="min-h-screen bg-[#0f1113] text-slate-100 flex items-center justify-center p-4 md:p-8 lg:ml-72 transition-all duration-500">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="bg-[#1a1d21]/40 backdrop-blur-3xl border border-white/5 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden hover:border-white/10 transition-colors duration-500">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Content Area */}
            <div className="flex-1 p-8 md:p-14 lg:p-20">
              <header className="mb-14">
                <div className="flex items-center gap-5">
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative h-16 w-16 bg-[#1a1d21] border border-white/10 rounded-2xl flex items-center justify-center text-white shadow-2xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <span className="text-3xl font-black bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">
                        {firstName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-ping"></div>
                      <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">System Online</h3>
                    </div>
                    <p className="text-slate-500 text-xs font-bold tracking-wider mt-1">CORE-ACCESS-GRANTED</p>
                  </div>
                </div>
              </header>

              <section>
                <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
                  <span className="block text-slate-500 text-xl font-mono tracking-[0.3em] uppercase mb-4 opacity-70">Welcome Back,</span>
                  <span className="bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
                    {firstName} {lastName}
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mb-12 border-l-2 border-blue-600/30 pl-6">
                  Your neural bridge is <span className="text-white font-bold">stable</span>. 
                  Intelligence nodes report <span className="text-blue-400">3 sync points</span> requiring your authorization.
                </p>

                <div className="flex flex-wrap gap-5">
                  <button className="group flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-[0_20px_40px_-12px_rgba(37,99,235,0.4)] active:scale-95">
                    <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Launch System
                  </button>
                  <button className="flex items-center gap-3 px-8 py-4 bg-white/5 text-slate-300 border border-white/10 font-bold rounded-2xl hover:bg-white/10 hover:text-white transition-all active:scale-95">
                    <BarChart3 size={20} />
                    Analytics
                  </button>
                </div>
              </section>
            </div>

            {/* Right Control Panel Area */}
            <div className="w-full lg:w-[420px] bg-black/40 backdrop-blur-2xl p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col">
              
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-yellow-500 fill-yellow-500/20" />
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Quick Controls</h4>
                </div>
              
              </div>
              
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { icon: <UserCircle size={20}/>, label: "Profile", color: "text-blue-400" },
                  { icon: <Settings size={20}/>, label: "Settings", color: "text-slate-400" },
                  { icon: <ShieldCheck size={20}/>, label: "Security", color: "text-emerald-400" },
                  { icon: <LifeBuoy size={20}/>, label: "Support", color: "text-purple-400" },
                ].map((item, idx) => (
                  <button key={idx} className="flex flex-col items-start gap-3 p-5 bg-white/5 border border-white/5 rounded-[1.5rem] hover:bg-white/10 hover:border-white/10 transition-all group text-left">
                    <div className={`${item.color} p-2 bg-black/20 rounded-lg group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-300 tracking-wide">{item.label}</span>
                  </button>
                ))}
              </div>

              
              <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-3xl p-6 mb-8">
                 <div className="flex items-center gap-3 mb-4">
                    <Cpu size={16} className="text-blue-500" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Environment Status</span>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Latent Capacity</span>
                      <span className="font-mono text-blue-400">98.2%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[98%]" />
                    </div>
                 </div>
              </div>

              <div className="mt-auto pt-8 border-t border-white/5">
                 <button className="group w-full flex items-center justify-center gap-3 text-slate-500 hover:text-red-400 font-bold text-sm transition-all duration-300 px-6 py-4 rounded-2xl hover:bg-red-400/10 border border-transparent hover:border-red-400/20">
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Terminate Session
                 </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;