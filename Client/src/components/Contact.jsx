import { CircleX, Link2, Mail, Phone, Plus, Search, SquareChartGantt } from "lucide-react";
import { useEffect, useState } from "react";


function Contact() {
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [linkdin, setLinkdin] = useState("")
  const [status, setStatus] = useState("")

  const [openForm, setIsFormOpen] = useState(false)

  const [items1, setItems1] = useState([])





  const fetchData = async () => {
    try {
      const res1 = await fetch('http://localhost:3000/item3');

      const result = await res1.json();
      setItems1(result);
    } catch (error) {
      console.log(error);

    }


  };

  useEffect(() => {



    fetchData();
  }, []);



  const handle = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, number, linkdin, status }),
      });

      if (res.ok) {
        const result = await res.json();
        console.log("result", result);


        await fetchData();


        setFullname("");
        setEmail("");
        setNumber("");
        setLinkdin("");
        setStatus("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };



  const open = () => {
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
  }



  const getPriorityColor = (status) => {
    switch (status) {
      case 'New':
        return 'inline-flex items-center rounded-full bg-blue-400/10 px-2.5 py-0.5 text-base font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20';
      case 'Qualified':
        return 'inline-flex items-center rounded-full bg-green-400/10 px-2.5 py-0.5 text-base font-medium text-green-400 ring-1 ring-inset ring-green-400/20';
      case 'Contacted':
        return 'inline-flex items-center rounded-full bg-yellow-400/10 px-2.5 py-0.5 text-base font-medium text-yellow-400 ring-1 ring-inset ring-yellow-400/20';

      case 'Unresponsive':
        return 'inline-flex items-center rounded-full bg-slate-400/10 px-2.5 py-0.5 text-base font-medium text-slate-400 ring-1 ring-inset ring-slate-400/20';
      default:
        return 'bg-gray-200';
    }
  };




  return (
    <>
      <div className="p-10 ml-95  w-300   bg-[#202124] ">
        <div className="flex justify-between  ">
          <div className="space-y-4">
            <p className="text-white font-bold text-4xl">Contact Database</p>
            <p className="text-lg text-slate-600 dark:text-slate-400">Manage your leads and track sales progress.</p>
          </div>
          <div className="flex items-center gap-10  ">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-bold">Total Leads</p>
              <h1 className="text-white text-2xl ml-9">1,248</h1>
            </div>
            <div className="flex flex-col items-end border-l border-[#283039] pl-6">
              <p className="text-slate-600 dark:text-slate-400 text-lg font-bold">This Month</p>
              <div className="flex text-blue-500 ml-7 items-center">
                <Plus />
                <h2 className="text-2xl ">124</h2>
              </div>
            </div>

          </div>
        </div>
        <div className="flex gap-10 items-center mt-13 justify-between">
          <div className="flex items-center bg-[#283039] rounded-xl border border-gray-600 p-1
               focus:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <button className="text-[#9cabba] pl-3 pr-0">
              <Search />
            </button>
            <input
              type="text"
              placeholder="Search by name, email, or company"
              className="w-170 p-2   focus:outline-none text-white"
            />
          </div>

          <div className="flex flex items-center justify-center rounded-lg h-11 px-4 bg-[#283039] text-white gap-2 hover:bg-[#323b46] transition-colors border border-transparent hover:border-slate-600 p-5">
            <SquareChartGantt />
            <p className="font-bold">Filters</p>
          </div>
          <button className="flex bg-blue-500 p-4 font-bold text-white text-lg items-center gap-5 rounded-lg">
            <Plus />
            <p onClick={open}>Add New Lead</p>
          </button>
        </div>

        <div className="flex gap-5 mt-6">
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white text-slate-900 px-4 transition-colors">
            <span className="text-base font-bold">All Leads</span>
          </button>


          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#283039] hover:bg-[#323b46] px-4 transition-colors border border-transparent hover:border-slate-600">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span className="text-white text-base font-medium">New</span>
          </button>

          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#283039] hover:bg-[#323b46] px-4 transition-colors border border-transparent hover:border-slate-600">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span className="text-white text-base font-medium">Contacted</span>
          </button>

          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#283039] hover:bg-[#323b46] px-4 transition-colors border border-transparent hover:border-slate-600">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="text-white text-base font-medium">Qualified</span>
          </button>

          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#283039] hover:bg-[#323b46] px-4 transition-colors border border-transparent hover:border-slate-600">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <span className="text-white text-base font-medium">Unresponsive</span>
          </button>
        </div>


        <div className="flex gap-40 mt-15" >
          <p className="  text-base font-bold text-[#9cabba] uppercase ">name</p>
          <p className="  text-base font-bold text-[#9cabba] uppercase ">Contact Info</p>
          <p className="  text-base font-bold text-[#9cabba] uppercase ">Lead Status</p>
          <p className="  text-base font-bold text-[#9cabba] uppercase ">Social</p>
          <p className="  text-base font-bold text-[#9cabba] uppercase ">Last Activity</p>
        </div>


        <div className="space-y-6 mt-10 ml-[-10px]">
          {items1.map((item) => (
            <div
              key={item._id}
              className="flex flex-wrap items-center gap-4 w-280 bg-gray-800 p-4  rounded-xl"
            >
              {/* Name & Company */}
              <div className="flex-1 min-w-[200px] ml-[-10px]">
                <h2 className="text-white text-lg font-medium">{item.fullname}</h2>
                <p className="text-[#9cabba] text-sm">Tech Solutions Inc.</p>
              </div>

              {/* Email & Phone */}
              <div className="flex flex-col gap-2 flex-1 min-w-[250px]">
                <div className="flex items-center gap-2">
                  <Mail className="text-[#9cabba] w-5 h-5" />
                  <p className="text-white text-lg">{item.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="text-[#9cabba] w-5 h-5" />
                  <p className="text-[#9cabba] text-lg">{item.number}</p>
                </div>
              </div>

              {/* Status */}
              <div className="flex-1 min-w-[120px]">
                <span className= {`  ${getPriorityColor(item.status)}`}>
                  {item.status}
                </span>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-2 flex-1 min-w-[200px] ml-20">
                <Link2 className="text-[#9cabba] w-5 h-5" />
                <p className="text-[#9cabba] text-lg">{item.linkdin}</p>
              </div>

              {/* Timestamp */}
              <div className="flex-1 min-w-[100px] ml-10">
                <h2 className="text-[#9cabba] text-lg">2 hours ago</h2>
              </div>
            </div>
          ))}
        </div>



      </div>


      {openForm && (
        <form onSubmit={handle} className="fixed top-0 left-0 w-full h-full   backdrop-blur-sm z-40 justify-center items-center flex ">
          <div className="  w-150 h-160   rounded-xl bg-[#1a1d21] border border-[#283039] shadow-2xl transition-all   ">

            <div className="ml-10 mt-10">

              <div className="flex gap-80  items-center  space-y-6">
                <p className="text-white font-bold text-2xl items-center ">Add Quick Task</p>
                <CircleX onClick={closeForm} className="text-[#9cabba] hover:text-white transition-colors mb-4" />
              </div>
              <div className="space-y-7">
                <label className="block text-white font-medium mb-2">FULL NAME</label>
                <input type="text" placeholder="e.g. john Doe" className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                <div className="flex gap-10">
                  <div>
                    <label className="block text-white font-medium mb-2">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-60 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">PHONE NUMBER</label>
                    <input type="text" placeholder="+91 000 0000" className="w-60 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={number} onChange={(e) => setNumber(e.target.value)} />

                  </div>
                </div>
                <label className="block text-white font-medium mb-2">LINKDIN URL</label>
                <input type="text" placeholder=" linkdin.com/in/ username " className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={linkdin} onChange={(e) => setLinkdin(e.target.value)} />



                <label className="block text-white font-medium mb-2 uppercase">Initial Status</label>
                <select className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Initial Status">Select Initial Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Unresponsive">Unresponsive</option>
                </select>
                <button type="submit" className="w-130 p-3 rounded-xl bg-blue-500">Submit</button>
              </div>
            </div>
          </div>
        </form>
      )}

    </>
  )
}

export default Contact;
