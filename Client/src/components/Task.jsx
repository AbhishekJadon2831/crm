import { BadgePlus, Calendar, CalendarDays, CircleCheck, CircleCheckBig, CircleX, Clock, Crown, Plus, Search, ShieldAlert, SquareChartGantt, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import image from "../assets/profile.jpg"
import image1 from "../assets/person.jpg"
import { toast } from "react-toastify";

function Task() {
  const [name1, setName] = useState("")
  const [task, setTask] = useState("")
  const [secondtask, setSecondtask] = useState("")
  const [date, setDate] = useState("")
  const [priority, setPriority] = useState("")
  const [discription, setDiscription] = useState("")

  const [item, setItem] = useState([])


  const [isFormOpen, setIsFormOpen] = useState(false)



  const open = () => {
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
  }






  const handle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name1, task, secondtask, date, priority, discription }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed", errorData);
        toast.error(errorData || "faild")
        return;
      }

      toast.success("Submit successfull")


    } catch (error) {
      console.error("Error updating task:", error);
    }
  };


  const fetchdata = async () => {
    try {
      const data = await fetch("http://localhost:3000/api/data/item")
      const data1 = await data.json()
      setItem(data1)


    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    fetchdata()
  }, [])

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


  return (
    <>
      <div className="p-10 ml-95  w-305   bg-[#202124] ">
        <div className="flex justify-between  ">
          <div className="space-y-4">
            <p className="text-white font-bold text-4xl">Tasks Management</p>
            <p className="text-lg text-slate-600 dark:text-slate-400">Track your daily activities, follow-ups, and reminders.</p>
          </div>
          <div className="flex items-center gap-10  ">

            <div>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-bold">Pending</p>
              <h1 className="text-white text-lg ml-9 font-bold ">24</h1>
            </div>


            <div className=" flex flex-col  items-end border-l border-[#283039]">
              <p className="text-slate-600 dark:text-slate-400 text-lg font-bold">Completed Today</p>
              <h1 className=" font-bold text-2xl ml-34 text-blue-500">8</h1>
            </div>
            <div className=" items-end border-l border-[#283039] pl-6">
              <p className="text-slate-600 dark:text-slate-400 text-lg font-bold">Overdue</p>
              <div className=" text-blue-500 ml-7 ">

                <h2 className="text-2xl text-red-400 font-bold ">3</h2>
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
          <button
            className="flex bg-blue-500 p-4 font-bold text-white text-lg items-center gap-5 rounded-lg"
            onClick={open}
          >
            <BadgePlus className="w-6 h-6" />
            <span>Add New Task</span>
          </button>

        </div>

        <div className="flex gap-5 mt-6">
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white text-slate-900 px-4 transition-colors">
            <span className="text-base font-bold">All Tasks</span>
          </button>


          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#283039] hover:bg-[#323b46] px-4 transition-colors border border-transparent hover:border-slate-600">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span className="text-white text-base font-medium">High Priority</span>
          </button>

          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#283039] hover:bg-[#323b46] px-4 transition-colors border border-transparent hover:border-slate-600">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span className="text-white text-base font-medium">Due Today</span>
          </button>

          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#283039] hover:bg-[#323b46] px-4 transition-colors border border-transparent hover:border-slate-600">
            <Crown className="w-4 h-4 text-yellow-400" />
            <span className="text-white text-base font-medium">upcoming</span>
          </button>

          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#283039] hover:bg-[#323b46] px-4 transition-colors border border-transparent hover:border-slate-600">
            <CircleCheck className="w-4 h-4 text-green-400" />
            <span className="text-white text-base font-medium">Completed</span>
          </button>
        </div>


        <div className="mt-5">
          {/* Headers */}
          <div className="flex gap-25 px-5 py-3 bg-[#283039] rounded-t-lg">
            <p className="w-60 text-base font-bold text-[#9cabba] uppercase">Task Description</p>
            <p className="w-40 text-base font-bold text-[#9cabba] uppercase">Related To</p>
            <p className="w-32 text-base font-bold text-[#9cabba] uppercase">Due Date</p>
            <p className="w-24 text-base font-bold text-[#9cabba] uppercase">Priority</p>
            <p className="w-24 text-base font-bold text-[#9cabba] uppercase">Owner</p>
          </div>

          {/* Task Items */}
          <div className=" overflow-hidden">
            {item.map((task) => (
              <div
                key={task._id}
                className="flex    items-center p-5 border-b border-[#283039] bg-[#21272e] hover:bg-[#283039] transition-colors"
              >
                {/* Task Description */}
                <div className="w-60 space-y-1">
                  <p className="text-white text-lg font-bold">{task.task}</p>
                  <p className="text-slate-400 text-sm">{task.secondtask}</p>
                </div>

                {/* Related To */}
                <div className="w-50 flex  ml-23 gap-3">
                  <img src={image1} alt="image" className="w-10 h-10 rounded-full"/>
                  <div>
                    <p className="text-white text-base font-bold ">{task.name1}</p>
                    <p className="text-slate-400 text-sm truncate">{task.discription}</p>
                  </div>
                </div>


                <div className="w-45 flex items-center gap-2 ml-10 ">
                  <CalendarDays  className="w-4 h-4 text-slate-400" />
                  <p className="text-slate-400 text-sm">Due {task.date}</p>
                </div>

                {/* Priority */}
                <div className="w-24 ml-14">
                  <p className={`text-center text-sm px-2 py-1 rounded-md font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </p>
                </div>

                {/* Owner */}
                <div className="w-10 h-10 ml-30">
                  <img src={image} alt="image" className="rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>












      </div>


      {isFormOpen && (
        <form onSubmit={handle} className="fixed top-0 left-0 w-full h-full   backdrop-blur-sm z-40 justify-center items-center flex ">
          <div className="  w-150 h-160   rounded-xl bg-[#1a1d21] border border-[#283039] shadow-2xl transition-all   ">

            <div className="ml-10 mt-10">

              <div className="flex gap-80  items-center  space-y-6">
                <p className="text-white font-bold text-2xl items-center ">Add Quick Task</p>
                <CircleX onClick={closeForm} className="text-[#9cabba] hover:text-white transition-colors mb-4" />
              </div>
              <div className="space-y-7">
                <label className="block text-white font-medium mb-2"> NAME</label>
                <input type="text" placeholder=" enter name #402" className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={name1} onChange={(e) => setName(e.target.value)} />
                <div className="flex gap-10">
                  <div>
                    <label className="block text-white font-medium mb-2">FIRST TASK</label>
                    <input type="text" placeholder="enter first task" className="w-60 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={task} onChange={(e) => setTask(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">SECOND TASK</label>
                    <input type="text" placeholder="enter second task" className="w-60 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={secondtask} onChange={(e) => setSecondtask(e.target.value)}>

                    </input>
                  </div>
                </div>
                <div className="flex gap-10">
                  <div>
                    <label className="block text-white font-medium mb-2">DUE DATE</label>
                    <input type="time" className="w-60 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={date} onChange={(e) => setDate(e.target.value)} />
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
                <label className="block text-white font-medium mb-2"> TASK DISCRIPTION</label>
                <input type="text" placeholder=" enter tesk discription " className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={discription} onChange={(e) => setDiscription(e.target.value)} />
                <button type="submit" className="w-130 p-3 rounded-xl bg-blue-500">Submit</button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

export default Task;