
import { useEffect, useState } from "react";
import image from "../assets/simple.jpg"
import { BrickWall, CalendarDays, CircleCheck, CircleCheckBig, CircleUserRound, DollarSign, LayoutDashboard, Plus, Settings, ShieldQuestionMark, TrendingUp, Clock, Video, CircleX, SquarePen } from "lucide-react"
import { toast } from 'react-toastify';
function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name1, setName] = useState("")
  const [date, setdate] = useState("")
  const [priority, setPriority] = useState("")
  const [company, setCompany] = useState("")
  const [item, setItem] = useState([])
  const [editform, setEditform] = useState(false)
  const [editingId, setEditingId] = useState(null);




  const handle1 = async (e) => {
    e.preventDefault();





    try {
      const response = await fetch(`http://localhost:3000/edit/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name1, date, priority, company }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Failed", data);
        toast.error(data.message || "faild");
        return;
      }

      toast.success("Change successfull")




      const updatedTask = await response.json();
      setItem(item.map((i) => (i._id === editingId ? updatedTask : i)));
      setEditform(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  const open = (item) => {

    setEditform(true);
    setEditingId(item._id);
    setName(item.name1 || "");
    setdate(item.date || "");
    setPriority(item.priority || "");
    setCompany(item.company || "");
  };





  const close = () => {
    setEditform(false)
  }



  const fetchData = async () => {
    try {
      const res1 = await fetch('http://localhost:3000/item');

      const result = await res1.json();
      setItem(result);
    } catch (error) {
      setError(error.message);
    }


  };

  useEffect(() => {



    fetchData();
  }, []);



  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };



  const handle = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/task", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      }, body: JSON.stringify({ name1, date, priority, company }),


    });

    if (res.ok) {
      fetchData()
      const data = await res.json()
      console.log("chack", data);
    }


    if (!res.ok) {
      toast.error(data.message || "faild");
      return;
    }

    toast.success("Submit successfull")

    // setIsFormOpen(false)




  }




  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-red-400 text-base font-bold bg-red-400/10 px-2 py-0.5 rounded';
      case 'Mediun':
        return 'text-yellow-400 text-base font-bold bg-yellow-400/10 px-2 py-0.5 rounded';
      case 'Low':
        return 'text-blue-400 text-base font-bold bg-blue-400/10 px-2 py-0.5 rounded';
      default:
        return 'bg-gray-200';
    }
  };






  // bg-[#202124]
  return (

    <>

      <div className="">

        <div className="w-300 ml-95 bg-[#202124] ">
          <div className="p-10 w-full ">
            <div className="flex justify-between  ">
              <div className="space-y-4">
                <p className="text-white font-bold text-4xl">Main Dashboard</p>
                <p className="text-lg text-slate-600 dark:text-slate-400">Welcome back, Alex. Here's your day at a glance.</p>
              </div>
              <div className="flex items-center gap-2 bg-blue-500 px-4 py-2 h-15   rounded-lg">
                <Plus className="text-white w-5" />
                <button className="text-white font-bold text-lg" onClick={openForm}>Add Quick Task</button>
              </div>
            </div>


            <div className="flex justify-between mt-8 bg-[#202124] ">
              <div className=" bg-[#1a1d21] rounded-xl border border-[#283039] p-6   hover:border-[#3a4552] transition-colors w-92 ">


                <div className="flex justify-between">
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Active Deals Value
                  </p >
                  <DollarSign className="bg-green-400/10 text-green-400 rounded-full p-1.5 flex items-center justify-center h-10 w-7" />

                </div>

                <div className="flex gap-4 mt-7">
                  <div className="space-y-6 ">
                    <p className="text-4xl font-bold text-white">
                      $142,500
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 ">vs. last month</p>
                  </div>
                  <div className="text-green-400 text-sm font-medium flex mt-3  ">
                    <TrendingUp className="" />
                    <p className="text-lg ">12%</p>
                  </div>
                </div>





              </div>
              <div className=" bg-[#1a1d21] rounded-xl border border-[#283039] p-6   hover:border-[#3a4552] transition-colors w-92 ">


                <div className="flex justify-between">
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Meetings This Week
                  </p >
                  <CalendarDays className="bg-blue-400/10 text-blue-400 rounded-full p-1.5 flex items-center justify-center h-10 w-7" />

                </div>

                <div className="flex  mt-7">
                  <div className="space-y-6 ">
                    <p className="text-4xl font-bold text-white">
                      18
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 ">vs. last month</p>
                  </div>
                  <div className=" text-sm font-medium flex mt-4  ">

                    <p className="text-lg text-slate-600 dark:text-slate-400 ">scheduled</p>
                  </div>
                </div>





              </div>
              <div className=" bg-[#1a1d21] rounded-xl border border-[#283039] p-6   hover:border-[#3a4552] transition-colors w-92">


                <div className="flex justify-between">
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Active Deals Value
                  </p >
                  <BrickWall className="bg-purple-400/10 text-purple-400 rounded-full p-1.5 flex items-center justify-center h-10 w-7" />


                </div>

                <div className="flex  mt-7">
                  <div className="space-y-6 ">
                    <p className="text-4xl font-bold text-white">
                      78%
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 ">vs. last month</p>
                  </div>
                  <div className="text-green-400 text-sm font-medium flex mt-3  ">

                    <p className="text-lg text-slate-600 dark:text-slate-400">achieved</p>
                  </div>
                </div>







              </div>

            </div>

            <div className="flex justify-between mt-10">
              <p className="text-2xl text-white font-bold">Action Center</p>
              <p className="text-[#9cabba] hover:text-white text-lg font-medium">View Calendar</p>
            </div>
            <div className="flex justify-between p-5 border-b border-[#283039] flex items-center justify-between bg-[#21272e] mt-10">
              <div className="flex items-center gap-3">
                <CircleCheckBig className="text-blue-500 " />
                <p className="text-white text-lg font-bold">Tasks Due Today</p>
              </div>
              <p className="bg-[#283039] text-white text-base px-2 py-1 rounded-md font-medium ">5 Pending</p>
            </div>



            <div>
              {item.map((item) => (

                <div
                  key={item._id}
                  className="flex justify-between p-5 border-b border-[#283039] items-center bg-[#21272e] mt-5"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CircleCheckBig className="text-blue-500" />
                      <p className="text-white text-lg font-bold">{item.name1}</p>
                    </div>
                    <div className="flex gap-3 items-center ml-8">
                      <img
                        src={item.image}
                        alt="User"
                        className="w-5 h-5 rounded-full"
                      />

                      <p className="text-slate-600 dark:text-slate-400 font-serif">
                        {item.company}
                      </p>
                      <Clock className="w-5 text-slate-600 dark:text-slate-400" />
                      <p className="text-slate-600 dark:text-slate-400 font-serif">
                        Due {item.date}
                      </p>
                    </div>



                  </div>
                  <p className={` ml-130   text-base px-2 py-1 rounded-md font-medium ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </p>
                  <div>
                    <SquarePen onClick={() => open(item)} className="text-slate-600 dark:text-slate-400" />
                  </div>
                </div>
              ))}
            </div>





          </div>
        </div>
      </div>

      {isFormOpen && (
        <form onSubmit={handle} className="fixed top-0 left-0 w-full h-full   backdrop-blur-sm z-40 justify-center items-center flex ">
          <div className="  w-150 h-130   rounded-xl bg-[#1a1d21] border border-[#283039] shadow-2xl transition-all   ">

            <div className="ml-10 mt-10">

              <div className="flex gap-80  items-center  space-y-6">
                <p className="text-white font-bold text-2xl items-center ">Add Quick Task</p>
                <CircleX onClick={closeForm} className="text-[#9cabba] hover:text-white transition-colors mb-4" />
              </div>
              <div className="space-y-7">
                <label className="block text-white font-medium mb-2">TASK DESRCIPTION</label>
                <input type="text" placeholder="Follow up on proposal #402" className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={name1} onChange={(e) => setName(e.target.value)} />
                <div className="flex gap-10">
                  <div>
                    <label className="block text-white font-medium mb-2">DUE DATE</label>
                    <input type="date" className="w-60 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={date} onChange={(e) => setdate(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">PRIORITY</label>
                    <select className="w-60 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={priority} onChange={(e) => setPriority(e.target.value)}>
                      <option value="select">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Mediun">Mediun</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                <label className="block text-white font-medium mb-2">COMPANY NAME</label>
                <input type="text" placeholder=" company name " className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={company} onChange={(e) => setCompany(e.target.value)} />
                <button type="submit" className="w-130 p-3 rounded-xl bg-blue-500">Submit</button>
              </div>
            </div>
          </div>
        </form>
      )}






      {editform && (
        <form onSubmit={handle1} className="fixed top-0 left-0 w-full h-full   backdrop-blur-sm z-40 justify-center items-center flex ">
          <div className="  w-150 h-130   rounded-xl bg-[#1a1d21] border border-[#283039] shadow-2xl transition-all   ">

            <div className="ml-10 mt-10">

              <div className="flex gap-80  items-center  space-y-6">
                <p className="text-white font-bold text-2xl items-center ">Add Quick Task</p>
                <CircleX onClick={close} className="text-[#9cabba] hover:text-white transition-colors mb-4" />
              </div>
              <div className="space-y-7">
                <label className="block text-white font-medium mb-2">TASK DESRCIPTION</label>
                <input type="text" placeholder="Follow up on proposal #402" className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={name1} onChange={(e) => setName(e.target.value)} />
                <div className="flex gap-10">
                  <div>
                    <label className="block text-white font-medium mb-2">DUE DATE</label>
                    <input type="date" className="w-60 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={date} onChange={(e) => setdate(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">PRIORITY</label>
                    <select className="w-60 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={priority} onChange={(e) => setPriority(e.target.value)}>
                      <option value="select">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Mediun">Mediun</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
                <label className="block text-white font-medium mb-2">COMPANY NAME</label>
                <input type="text" placeholder=" company name " className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={company} onChange={(e) => setCompany(e.target.value)} />
                <button type="submit" className="w-130 p-3 rounded-xl bg-blue-500">Submit</button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default Dashboard
