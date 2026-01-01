import { CircleX, Clock2, Plus, Search, SquareChartGantt, TrendingDown } from "lucide-react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";

function Pipeline() {

  const [isForm, setIsform] = useState(false)
  const [name, setName] = useState("")
  const [value, setValue] = useState("")
  const [stage, setStage] = useState("")
  // const [assigned, setAssigned] = useState("")
  const [company, setCompany] = useState("")
  // const [closeData, setCloseData] = useState("")
  // const [lead, setLead] = useState("")
  // const [description, setDescription] = useState("")

  const [item, setItem] = useState([])




  const fetchData = async () => {
    try {

      const data = await fetch("http://localhost:3000/api/pipeline");
      const data1 = await data.json()
      setItem(data1, "get data")

    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {

    fetchData()


  }, [])




  const handle = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/pipeline", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, value, stage, company })
    })

    const result = await res.json()
    console.log("data add", result);

  }


  const open = () => {
    setIsform(true)
  }

  const closeForm = () => {
    setIsform(false)
  }




 





  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "box",
  });

  const style = {
    transform: transform
  }


  return (
    <>
      <div className="p-10 ml-95  w-300   bg-[#202124] ">
        <div className="flex justify-between  ">
          <div className="space-y-4">
            <p className="text-white font-bold text-4xl">Sales Pipeline</p>
            <p className="text-lg text-slate-600 dark:text-slate-400">Track your opportunities and manage deal flow.</p>
          </div>
          <div className="flex items-center gap-10  ">
            <div >
              <p className="text-slate-600 dark:text-slate-400 text-lg font-bold">Total Value</p>
              <h1 className="text-white text-2xl ml-6 font-bold">$1.4M</h1>
            </div>

            <div className="flex flex-col items-end border-l border-[#283039] pl-6">

              <p className="text-slate-600 dark:text-slate-400 text-lg font-bold">Open Deals</p>
              <div className=" text-blue-500 ml-14  ">

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
          <button className="flex bg-blue-500 p-4 font-bold text-white text-lg items-center  rounded-lg">
            <Plus className="" />
            <p onClick={open}>Add Opportunity</p>
          </button>
        </div>


        <div className="overflow-x-auto pb-4 mt-10">
          <div className=" grid grid-cols-3 gap-6">
            {item.map((item) => (
              <div key={item._id}>
                <div className="bg-[#1a1d21] rounded-xl border border-[#283039] p-6 hover:border-[#3a4552] transition-colors h-50">

                  <div className="flex justify-between">
                    <p className="bg-blue-900/30 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {item.stage}
                    </p>
                  </div>

                  <div className="mt-5 space-y-1">
                    <p className="text-lg font-bold text-white">{item.company}</p>
                    <p className="text-slate-400">{item.name}</p>
                  </div>

                  <div className="flex mt-7 justify-between">
                    <h3 className="font-bold text-white text-lg">${item.value}</h3>
                    <div className="flex gap-3">
                      <Clock2 className="text-[#9cabba]" />
                      <p className="text-[#9cabba]">Email follow-up</p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>







      </div>

      {isForm && (
        <form onSubmit={handle} className="fixed top-0 left-0 w-full h-full   backdrop-blur-sm z-40 justify-center items-center flex ">
          <div className="  w-150 h-130   rounded-xl bg-[#1a1d21] border border-[#283039] shadow-2xl transition-all   ">

            <div className="ml-10 mt-10">

              <div className="flex gap-80  items-center  space-y-6">
                <p className="text-white font-bold text-2xl items-center ">Add Opportunity</p>
                <CircleX onClick={closeForm} className="text-[#9cabba] hover:text-white transition-colors mb-4" />
              </div>
              <div className="space-y-7">
                <label className="block text-white font-medium mb-2">Opportunity Name</label>
                <input type="text" placeholder="Enter opportunity name" className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="flex gap-10">
                  <div>
                    <label className="block text-white font-medium mb-2">Deal Value</label>
                    <input type="text" placeholder="Enter deal value" className="w-60 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={value} onChange={(e) => setValue(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Stage</label>
                    <select className="w-60 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={stage} onChange={(e) => setStage(e.target.value)}>
                      <option value="Initial Status">Select Stage</option>
                      <option value="New">New</option>
                      <option value="Inbound">Inbound</option>
                      <option value="Upsel">Upsel</option>
                      <option value="Hot">Hot</option>
                    </select>

                  </div>
                </div>
                <label className="block text-white font-medium mb-2">Company Name</label>
                <input type="text" placeholder=" Enter Company name " className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={company} onChange={(e) => setCompany(e.target.value)} />



                {/* <label className="block text-white font-medium mb-2 uppercase">Initial Status</label>
                <select className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white" value={assigned} onChange={(e) => setAssigned(e.target.value)}>
                  <option value="Initial Status">Select Initial Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Unresponsive">Unresponsive</option>
                </select> */}
                <button type="submit" className="w-130 p-3 rounded-xl bg-blue-500">Submit</button>
              </div>
            </div>
          </div>
        </form>
      )}

    </>
  )
}

export default Pipeline;