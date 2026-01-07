import { CircleX, Link2, Mail, Phone, Plus, Search, SquareChartGantt } from "lucide-react";
import { useEffect, useState } from "react";

function Contact() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [linkdin, setLinkdin] = useState("");
  const [status, setStatus] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [openForm, setIsFormOpen] = useState(false);
  const [ismodel, setIsmodel] = useState(false);
  const [items1, setItems1] = useState([]);
  const [assignedSalesperson, setAssignedSalesperson] = useState("");
  const [lastActivity, setLastActivity] = useState("Any Time");
  const [companyName, setCompanyName] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    New: false,
    Contacted: false,
    Qualified: false,
    Unresponsive: false,
  });

  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filterStatus !== "all") {
        queryParams.append("status", filterStatus);
      }
      if (lastActivity !== "Any Time") {
        queryParams.append("lastActivity", lastActivity);
      }
      if (assignedSalesperson) {
        queryParams.append("salesperson", assignedSalesperson);
      }
      if (companyName) {
        queryParams.append("company", companyName);
      }
      const res1 = await fetch(`http://localhost:3000/item3?${queryParams.toString()}`);
      const result = await res1.json();
      setItems1(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterStatus, lastActivity, assignedSalesperson, companyName]);

  const handleSubmit = async (e) => {
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

  const open = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);
  const openModel = () => setIsmodel(true);
  const closeModel = () => setIsmodel(false);

  const getPriorityColor = (status) => {
    switch (status) {
      case "New":
        return "inline-flex items-center rounded-full bg-blue-400/10 px-2.5 py-0.5 text-base font-medium text-blue-400 ring-1 ring-inset ring-blue-400/20";
      case "Qualified":
        return "inline-flex items-center rounded-full bg-green-400/10 px-2.5 py-0.5 text-base font-medium text-green-400 ring-1 ring-inset ring-green-400/20";
      case "Contacted":
        return "inline-flex items-center rounded-full bg-yellow-400/10 px-2.5 py-0.5 text-base font-medium text-yellow-400 ring-1 ring-inset ring-yellow-400/20";
      case "Unresponsive":
        return "inline-flex items-center rounded-full bg-slate-400/10 px-2.5 py-0.5 text-base font-medium text-slate-400 ring-1 ring-inset ring-slate-400/20";
      default:
        return "bg-gray-200";
    }
  };

  const handleCheckboxChange = (filterName) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
    const newFilterStatus = Object.keys(selectedFilters)
      .filter((key) => selectedFilters[key])
      .join(",");
    setFilterStatus(newFilterStatus || "all");
  };

  const clearFilters = () => {
    setSelectedFilters({
      New: false,
      Contacted: false,
      Qualified: false,
      Unresponsive: false,
    });
    setFilterStatus("all");
    setLastActivity("Any Time");
    setAssignedSalesperson("");
    setCompanyName("");
  };

  const filteredItems = items1;

  return (
    <>
      {/* Main Content */}
      <div className="p-10 ml-95 w-300 bg-[#202124]">
        {/* Header */}
        <div className="flex justify-between">
          <div className="space-y-4">
            <p className="text-white font-bold text-4xl">Contact Database</p>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Manage your leads and track sales progress.
            </p>
          </div>
          <div className="flex items-center gap-10">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-bold">
                Total Leads
              </p>
              <h1 className="text-white text-2xl ml-9">1,248</h1>
            </div>
            <div className="flex flex-col items-end border-l border-[#283039] pl-6">
              <p className="text-slate-600 dark:text-slate-400 text-lg font-bold">
                This Month
              </p>
              <div className="flex text-blue-500 ml-7 items-center">
                <Plus />
                <h2 className="text-2xl">124</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-10 items-center mt-13 justify-between">
          <div className="flex items-center bg-[#283039] rounded-xl border border-gray-600 p-1 focus:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            <button className="text-[#9cabba] pl-3 pr-0">
              <Search />
            </button>
            <input
              type="text"
              placeholder="Search by name, email, or company"
              className="w-170 p-2 focus:outline-none text-white"
            />
          </div>
          <div className="flex items-center justify-center rounded-lg h-11 px-4 bg-[#283039] text-white gap-2 hover:bg-[#323b46] transition-colors border border-transparent hover:border-slate-600 p-5">
            <SquareChartGantt />
            <button onClick={openModel} className="font-bold">
              Filters
            </button>
          </div>
          <button
            onClick={open}
            className="flex bg-blue-500 p-4 font-bold text-white text-lg items-center gap-5 rounded-lg"
          >
            <Plus />
            <p>Add New Lead</p>
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-5 mt-6">
          <button
            onClick={() => setFilterStatus("all")}
            className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${filterStatus === "all"
                ? "bg-white text-slate-900"
                : "bg-[#283039] text-white hover:bg-[#323b46]"
              }`}
          >
            <span className="text-base font-bold">All Leads</span>
          </button>
          <button
            onClick={() => {
              setSelectedFilters({ ...selectedFilters, New: true });
              setFilterStatus("New");
            }}
            className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${filterStatus === "New"
                ? "bg-blue-400/20 text-blue-400"
                : "bg-[#283039] text-white hover:bg-[#323b46]"
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span className="text-base font-medium">New</span>
          </button>
          <button
            onClick={() => {
              setSelectedFilters({ ...selectedFilters, Contacted: true });
              setFilterStatus("Contacted");
            }}
            className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${filterStatus === "Contacted"
                ? "bg-yellow-400/20 text-yellow-400"
                : "bg-[#283039] text-white hover:bg-[#323b46]"
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span className="text-base font-medium">Contacted</span>
          </button>
          <button
            onClick={() => {
              setSelectedFilters({ ...selectedFilters, Qualified: true });
              setFilterStatus("Qualified");
            }}
            className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${filterStatus === "Qualified"
                ? "bg-green-400/20 text-green-400"
                : "bg-[#283039] text-white hover:bg-[#323b46]"
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <span className="text-base font-medium">Qualified</span>
          </button>
          <button
            onClick={() => {
              setSelectedFilters({ ...selectedFilters, Unresponsive: true });
              setFilterStatus("Unresponsive");
            }}
            className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${filterStatus === "Unresponsive"
                ? "bg-slate-400/20 text-slate-400"
                : "bg-[#283039] text-white hover:bg-[#323b46]"
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <span className="text-base font-medium">Unresponsive</span>
          </button>
        </div>

        {/* Table Headers */}
        <div className="flex gap-40 mt-15">
          <p className="text-base font-bold text-[#9cabba] uppercase">Name</p>
          <p className="text-base font-bold text-[#9cabba] uppercase">
            Contact Info
          </p>
          <p className="text-base font-bold text-[#9cabba] uppercase">
            Lead Status
          </p>
          <p className="text-base font-bold text-[#9cabba] uppercase">Social</p>
          <p className="text-base font-bold text-[#9cabba] uppercase">
            Last Activity
          </p>
        </div>

        {/* Table Rows */}
        <div className="space-y-6 mt-10 ml-[-10px]">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="flex flex-wrap items-center gap-4 w-280 bg-gray-800 p-4 rounded-xl"
            >
              <div className="flex-1 min-w-[200px] ml-[-10px]">
                <h2 className="text-white text-lg font-medium">{item.fullname}</h2>
                <p className="text-[#9cabba] text-sm">Tech Solutions Inc.</p>
              </div>
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
              <div className="flex-1 min-w-[120px]">
                <span className={getPriorityColor(item.status)}>{item.status}</span>
              </div>
              <div className="flex items-center gap-2 flex-1 min-w-[200px] ml-20">
                <Link2 className="text-[#9cabba] w-5 h-5" />
                <p className="text-[#9cabba] text-lg">{item.linkdin}</p>
              </div>
              <div className="flex-1 min-w-[100px] ml-10">
                <h2 className="text-[#9cabba] text-lg">2 hours ago</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Lead Form */}
      {openForm && (
        <form
          onSubmit={handleSubmit}
          className="fixed top-0 left-0 w-full h-full backdrop-blur-sm z-40 justify-center items-center flex"
        >
          <div className="w-150 h-160 rounded-xl bg-[#1a1d21] border border-[#283039] shadow-2xl transition-all">
            <div className="ml-10 mt-10">
              <div className="flex gap-80 items-center space-y-6">
                <p className="text-white font-bold text-2xl items-center">
                  Add Quick Task
                </p>
                <CircleX
                  onClick={closeForm}
                  className="text-[#9cabba] hover:text-white transition-colors mb-4"
                />
              </div>
              <div className="space-y-7">
                <label className="block text-white font-medium mb-2">
                  FULL NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
                <div className="flex gap-10">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-60 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">
                      PHONE NUMBER
                    </label>
                    <input
                      type="text"
                      placeholder="+91 000 0000"
                      className="w-60 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                </div>
                <label className="block text-white font-medium mb-2">
                  LINKDIN URL
                </label>
                <input
                  type="text"
                  placeholder="linkedin.com/in/username"
                  className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                  value={linkdin}
                  onChange={(e) => setLinkdin(e.target.value)}
                />
                <label className="block text-white font-medium mb-2 uppercase">
                  Initial Status
                </label>
                <select
                  className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Initial Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Unresponsive">Unresponsive</option>
                </select>
                <button
                  type="submit"
                  className="w-130 p-3 rounded-xl bg-blue-500 text-white"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Filter Modal */}
      {ismodel && (
        <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm z-40 justify-center items-center flex">
          <div className="w-150 h-160 rounded-xl bg-[#1a1d21] border border-[#283039] shadow-2xl transition-all">
            <div className="ml-10 mt-10">
              <div className="flex gap-80 items-center space-y-6">
                <p className="text-white font-bold text-2xl">Filter Leads</p>
                <CircleX
                  onClick={closeModel}
                  className="text-[#9cabba] hover:text-white transition-colors mb-4"
                />
              </div>
              <div className="space-y-6">
                <div className="flex justify-around">
                  <label className="flex items-center text-base text-white">
                    <input
                      type="checkbox"
                      checked={selectedFilters.New}
                      onChange={() => handleCheckboxChange("New")}
                      className="mr-2 scale-150"
                    />
                    New
                  </label>
                  <label className="flex items-center text-base text-white">
                    <input
                      type="checkbox"
                      checked={selectedFilters.Contacted}
                      onChange={() => handleCheckboxChange("Contacted")}
                      className="mr-2 scale-150"
                    />
                    Contacted
                  </label>
                </div>
                <div className="flex justify-around">
                  <label className="flex items-center text-base text-white">
                    <input
                      type="checkbox"
                      checked={selectedFilters.Qualified}
                      onChange={() => handleCheckboxChange("Qualified")}
                      className="mr-2 scale-150"
                    />
                    Qualified
                  </label>
                  <label className="flex items-center text-base text-white">
                    <input
                      type="checkbox"
                      checked={selectedFilters.Unresponsive}
                      onChange={() => handleCheckboxChange("Unresponsive")}
                      className="mr-2 scale-150"
                    />
                    Unresponsive
                  </label>
                </div>
              </div>
              <div className="space-y-7">
                <label className="block text-white font-medium mb-2">
                  Last Activity
                </label>
                <select
                  className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                  value={lastActivity}
                  onChange={(e) => setLastActivity(e.target.value)}
                >
                  <option value="Any Time">Any Time</option>
                  <option value="Last 7 Days">Last 7 Days</option>
                  <option value="Last 30 Days">Last 30 Days</option>
                </select>
                <label className="block text-white font-medium mb-2">
                  COMPANY NAME
                </label>
                <input
                  type="text"
                  placeholder="Filter by company name"
                  className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <label className="block text-white font-medium mb-2">
                  Assigned Salesperson
                </label>
                <select
                  className="w-130 p-3 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                  value={assignedSalesperson}
                  onChange={(e) => setAssignedSalesperson(e.target.value)}
                >
                  <option value="">All Salespersons</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                </select>
              </div>
              <div className="flex justify-around ml-[-30px] gap- mt-10">
                <button
                  onClick={clearFilters}
                  className="w-60 p-3 rounded-xl bg-gray-500 text-white"
                >
                  Clear All
                </button>
                <button
                  onClick={() => {
                    closeModel();
                    fetchData();
                  }}
                  className="w-60 p-3 rounded-xl bg-blue-500 text-white"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contact;
