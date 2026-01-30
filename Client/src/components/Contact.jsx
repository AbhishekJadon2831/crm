import { CircleX, Mail, Phone, Plus, Search, SquareChartGantt, MessageSquare, User, Clock, ChevronRight, X, Edit3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "./Context/AuthContext";

function Contact() {
  const { user } = useAuth();
  const [items1, setItems1] = useState([]);
  const [assigneeItem, setAssigneeItem] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");




  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [assignee, setAssignee] = useState("");
  const [openForm, setIsFormOpen] = useState(false);
  const [openForm1, setIsFormOpen1] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (user) {
      fetchdata();
      fetchAssignee();
    }
  }, [user]);


  const fetchdata = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/leads/item3");
      const result = await res.json();
      if (user?.role === "admin") {
        setItems1(result);


      } else {
        const userTasks = result.filter(task => task.assignee === user?.name);
        setItems1(userTasks);
      }
    } catch (error) { console.error("Fetch error:", error); }
  };

  const fetchAssignee = async () => {
    try {
      const data = await fetch("http://localhost:3000/api/leads/api/assignee/item");
      const data1 = await data.json();
      setAssigneeItem(data1);
    } catch (error) { console.log(error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode && selectedLead) {

      const res = await fetch(`http://localhost:3000/lead/${selectedLead._id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ fullname, email, number, assignee })
      });

      const updatedLead = await res.json();



      setItems1(prev =>
        prev.map(item =>
          item._id === updatedLead._id ? updatedLead : item
        )
      );


      setSelectedLead(updatedLead);

    } else {

      const res = await fetch("http://localhost:3000/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ fullname, email, number, assignee })
      });

      const newLead = await res.json();


      setItems1(prev => [newLead, ...prev]);
    }


    setFullname("");
    setEmail("");
    setNumber("");
    setAssignee("");
    setEditMode(false);

    setIsFormOpen(false);
    setIsFormOpen1(false);
  };






  const getStatusColor = (status) => {
    switch (status) {
      case "NEW":
        return "text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded font-bold";
      case "CONTACTED":
        return "text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded font-bold";
      case "INTERESTED":
        return "text-green-400 bg-green-400/10 px-2 py-0.5 rounded font-bold";
      case "CLOSED":
        return "text-red-400 bg-red-400/10 px-2 py-0.5 rounded font-bold";
      case "Lost":
        return "text-gray-400 bg-red-400/10 px-2 py-0.5 rounded font-bold";
      default:
        return "text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded font-bold";
    }
  };



  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3000/api/leads/upload-excel", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        
        setItems1(prev => [...result.leads, ...prev]);
      }

    } catch (err) {
      console.error(err);
      alert("Excel upload failed");
    }
  };





  const timeAgo = (date) => {
    if (!date) return "Just now";
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now - past) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return past.toLocaleDateString();
  };

  const filteredItem = items1.filter((task) => {
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      task.fullname?.toLowerCase().includes(search) ||
      task.email?.toLowerCase().includes(search) ||
      task.number?.includes(search);

    const matchesStatus = statusFilter
      ? task.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });


  return (
    <div className="min-h-screen bg-[#0f1113] ml-[340px] p-10 font-sans text-white">


      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Contact Database</h1>
          <p className="text-slate-500 font-medium">Click a lead to view full information.</p>
        </div>
        <div className="flex gap-4">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleExcelUpload}
            className="hidden"
            id="excelUpload"
          />
          {user?.role === "admin" && (
            <label
              htmlFor="excelUpload"
              className="group relative flex items-center gap-3 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 active:scale-95"
            >

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20" height="20"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:-translate-y-1 transition-transform duration-300"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>

              <span className="tracking-wide"> Excel File</span>


              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </label>
          )}


          <div className="bg-[#1a1d21] border border-white/5 px-6 py-3 rounded-2xl shadow-xl">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Leads</p>
            <h2 className="text-white text-2xl font-bold">{items1.length}</h2>
          </div>

        </div>
      </div>


      <div className="flex gap-4 items-center mb-8 bg-[#1a1d21]/50 p-3 rounded-3xl border border-white/5 backdrop-blur-md">
        <div className="flex-1 flex items-center bg-[#0f1113] rounded-2xl border border-white/10 px-4 group focus-within:border-blue-500/50 transition-all">
          <Search className="text-slate-600 group-focus-within:text-blue-500" size={20} />
          <input
            type="text"
            placeholder="Search by name, email or number..."
            className="w-full p-4 bg-transparent outline-none text-white text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {user?.role === "admin" && (
          <button onClick={() => setIsFormOpen(true)} className="flex cursor-pointer items-center gap-2 px-8 h-[58px] bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
            <Plus size={20} /> Add New Lead
          </button>
        )}


        <div className="flex flex-col gap-2">

          <label className="text-xs font-semibold text-white/40 uppercase tracking-widest ml-1">
            Filter by Status
          </label>

          <div className="relative group">

            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-white/40 group-focus-within:text-blue-400 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none w-full bg-[#0f1113] border border-white/10 pl-11 pr-10 py-3 rounded-xl text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all hover:bg-white/5"
            >
              <option value="" className="bg-[#0f1113]">All Statuses</option>
              <option value="NEW" className="bg-[#0f1113]">New Leads</option>
              <option value="CONTACTED" className="bg-[#0f1113]">Contacted</option>
              <option value="INTERESTED" className="bg-[#0f1113]">Interested</option>
              <option value="CLOSED" className="bg-[#0f1113]">Closed</option>
              <option value="Lost" className="bg-[#0f1113]">Lost</option>
            </select>


            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/30 group-hover:text-white/60">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>




      </div>

      <div className="flex gap-6 items-start">


        <div className={`transition-all duration-500 space-y-4 ${selectedLead ? 'w-1/2' : 'w-full'}`}>
          {filteredItem.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedLead(item)}
              className={`group flex items-center gap-100 justify-between p-5 rounded-[2rem] border transition-all duration-300 cursor-pointer ${selectedLead?._id === item._id
                ? 'bg-blue-600/10 border-blue-500 ring-1 ring-blue-500/20'
                : 'bg-[#1a1d21] border-white/5 hover:bg-[#1e2227] hover:border-blue-500/30'
                }`}
            >
              <div className="flex items-center gap-5 ">
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white font-black text-xl border border-white/10 transition-all ${selectedLead?._id === item._id ? 'bg-blue-600' : 'bg-slate-800'}`}>
                  {item.fullname?.charAt(0)}
                </div>
                <div>
                  <h2 className="text-white text-lg font-bold group-hover:text-blue-400 transition-colors">{item.fullname}</h2>
                  <p className="text-xs text-slate-500 font-medium">{item.email}</p>


                </div>
                <div >


                </div>
              </div>
              <div className="flex gap-10">
                <p className={`text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </p>

                <ChevronRight size={20} className={`text-slate-600 transition-transform ${selectedLead?._id === item._id ? 'translate-x-1 text-blue-500' : ''}`} />
              </div>
            </div>
          ))}
        </div>


        {selectedLead && (
          <div className="w-1/2 sticky top-10 bg-[#1a1d21] border border-white/10 rounded-[2.5rem] overflow-hidden animate-in slide-in-from-right-10 duration-300 shadow-2xl">

            <div className="h-28 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
              <button onClick={() => setSelectedLead(null)} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-all">
                <X size={20} />
              </button>
              <div className="absolute -bottom-10 left-8 h-24 w-24 bg-[#0f1113] rounded-3xl p-1">
                <div className="h-full w-full bg-slate-800 rounded-[1.2rem] flex items-center justify-center text-3xl font-black text-blue-500 border border-white/5">
                  {selectedLead.fullname?.charAt(0)}
                </div>
              </div>
            </div>

            {/* Detail Body */}
            <div className="pt-16 p-8 space-y-8">
              <div>
                <h2 className="text-3xl font-black text-white">{selectedLead.fullname}</h2>
                <span className="flex items-center gap-2 text-slate-500 text-xs mt-1 font-bold">
                  <Clock size={14} /> Created {timeAgo(selectedLead.createdAt)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">

                <div className="col-span-2 flex justify-between items-center px-1">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Lead Details</span>
                  <p className={`text-xs font-medium ${getStatusColor(selectedLead.status)}`}>
                    {selectedLead.status}
                  </p>
                </div>


                <div className="bg-[#0f1113] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-sm font-medium text-slate-200 truncate">{selectedLead.email}</p>
                </div>


                <div className="bg-[#0f1113] p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-sm font-medium text-slate-200">{selectedLead.number}</p>
                </div>


                <div className="bg-[#0f1113] p-4 rounded-2xl border border-white/5 col-span-2 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Assignee</p>
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                      <User size={14} strokeWidth={3} /> {selectedLead.assignee || "Unassigned"}
                    </div>
                  </div>

                </div>
              </div>


              <div className="flex gap-3">
                {user?.role === "admin" ? (

                  <button onClick={() => {
                    setEditMode(true);
                    setSelectedLead(selectedLead);
                    setIsFormOpen1(true);

                    setFullname(selectedLead.fullname);
                    setEmail(selectedLead.email);
                    setNumber(selectedLead.number);
                    setAssignee(selectedLead.assignee || "");
                  }} className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20">
                    <Edit3 size={18} /> Edit Lead
                  </button>
                ) : (

                  <>
                    <button
                      onClick={() => window.location.href = `tel:${selectedLead.number}`}
                      className="flex-1 bg-white text-black font-black py-4 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                      <Phone size={18} /> Call
                    </button>
                    <button
                      onClick={() => window.open(`https://wa.me/${selectedLead.number.replace(/\D/g, '')}`)}
                      className="p-4 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-2xl hover:bg-emerald-500/20 transition-all"
                    >
                      <MessageSquare size={20} />
                    </button>
                    <button
                      onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${selectedLead.email}`)}
                      className="p-4 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-2xl hover:bg-blue-500/20 transition-all"
                    >
                      <Mail size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>


      {openForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-[#1a1d21] w-full max-w-lg rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-blue-600/10 to-transparent">
              <h2 className="text-2xl font-black text-white ">Add New Lead</h2>
              <X onClick={() => setIsFormOpen(false)} className="text-slate-500 hover:text-white cursor-pointer" />
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <input required placeholder="Full Name" className="w-full bg-[#0f1113] border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-blue-500/50" value={fullname} onChange={e => setFullname(e.target.value)} />
              <input required type="email" placeholder="Email Address" className="w-full bg-[#0f1113] border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-blue-500/50" value={email} onChange={e => setEmail(e.target.value)} />
              <input required placeholder="Phone Number" className="w-full bg-[#0f1113] border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-blue-500/50" value={number} onChange={e => setNumber(e.target.value)} />
              <select className="w-full cursor-pointer bg-[#0f1113] border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-blue-500/50" value={assignee} onChange={e => setAssignee(e.target.value)}>
                <option value="">Select Assignee</option>
                {assigneeItem.map(a => <option key={a._id} value={a.name}>{a.name}</option>)}
              </select>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl text-white font-bold shadow-xl shadow-blue-600/20 transition-all cursor-pointer">Create Lead Profile</button>
            </form>
          </div>
        </div>
      )}






      {openForm1 && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-[#1a1d21] w-full max-w-lg rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-blue-600/10 to-transparent">
              <h2 className="text-2xl font-black text-white ">Add New Lead</h2>
              <X onClick={() => setIsFormOpen1(false)} className="text-slate-500 hover:text-white cursor-pointer" />
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <input required placeholder="Full Name" className="w-full bg-[#0f1113] border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-blue-500/50" value={fullname} onChange={e => setFullname(e.target.value)} />
              <input required type="email" placeholder="Email Address" className="w-full bg-[#0f1113] border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-blue-500/50" value={email} onChange={e => setEmail(e.target.value)} />
              <input required placeholder="Phone Number" className="w-full bg-[#0f1113] border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-blue-500/50" value={number} onChange={e => setNumber(e.target.value)} />
              <select className="w-full bg-[#0f1113] cursor-pointer border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-blue-500/50" value={assignee} onChange={e => setAssignee(e.target.value)}>
                <option value="">Select Assignee</option>
                {assigneeItem.map(a => <option key={a._id} value={a.name}>{a.name}</option>)}
              </select>
              <button type="submit" className="cursor-pointer w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl text-white font-bold shadow-xl shadow-blue-600/20 transition-all">Update Lead </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;