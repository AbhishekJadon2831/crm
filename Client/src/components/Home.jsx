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
  ChevronRight
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  
  const firstName = user?.name || "Guest";
  const lastName = user?.lastname || "";

  return (
    <div className="min-h-screen bg-[#0f1113] text-slate-100 flex items-center justify-center p-6 ml-72">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="bg-[#1a1d21]/40 backdrop-blur-3xl border border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Content: Hero Section */}
            <div className="flex-1 p-10 md:p-16 lg:p-20">
              <header className="mb-14">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                    <span className="text-3xl font-black">{firstName.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <h3 className="text-xs font-black text-blue-500 uppercase tracking-[0.3em]">Authorized Access</h3>
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Session Active • Core Workspace</p>
                  </div>
                </div>
              </header>

              <section>
                <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
                  <span className="block text-slate-400 text-3xl font-medium tracking-normal mb-2">Hello,</span>
                  <span className="bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
                    {firstName} {lastName}
                  </span>
                </h1>
                
                <p className="text-xl text-slate-400 max-w-lg leading-relaxed mb-12 border-l-2 border-blue-600/30 pl-6">
                  Your ecosystem is performing <span className="text-white font-bold underline decoration-blue-500 underline-offset-4">optimally</span>. 
                  There are <span className="text-blue-400">3 priority tasks</span> awaiting your review.
                </p>

                <div className="flex flex-wrap gap-5">
                  <button className="group flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                    <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Launch System
                  </button>
                  <button className="flex items-center gap-3 px-8 py-4 bg-white/5 text-slate-300 border border-white/10 font-bold rounded-2xl hover:bg-white/10 hover:text-white transition-all active:scale-95">
                    <BarChart3 size={20} />
                    Intelligence
                  </button>
                </div>
              </section>
            </div>

            {/* Right Content: Quick Actions Panel */}
            <div className="w-full lg:w-[420px] bg-black/20 p-10 lg:p-14 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-8 px-2">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Control Panel</h4>
                <Zap size={14} className="text-yellow-500 fill-yellow-500/20" />
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Edit Profile', icon: <UserCircle size={22} />, desc: 'Configure identity', color: 'text-blue-400' },
                  { label: 'System Settings', icon: <Settings size={22} />, desc: 'Node preferences', color: 'text-slate-400' },
                  { label: 'Integrations', icon: <Zap size={22} />, desc: 'API connectivity', color: 'text-purple-400' },
                  { label: 'Support Hub', icon: <LifeBuoy size={22} />, desc: '24/7 Assistance', color: 'text-green-400' }
                ].map((item) => (
                  <div key={item.label} className="group p-5 bg-white/[0.03] border border-white/5 rounded-3xl hover:bg-white/[0.07] hover:border-white/10 transition-all cursor-pointer flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl bg-[#0f1113] ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-bold text-slate-200 group-hover:text-white transition-colors">{item.label}</p>
                        <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/5">
                 <button className="group w-full flex items-center justify-center gap-2 text-slate-500 hover:text-red-400 font-bold text-sm transition-all duration-300 px-4 py-2 rounded-xl hover:bg-red-400/5">
                    <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Secure De-authorization
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