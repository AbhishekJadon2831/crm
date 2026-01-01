import { ArrowDownToLine, BrickWall, CalendarDays, ChartBarStacked, DollarSign, Plus, Search, SquareChartGantt, TrendingDown, TrendingUp, Trophy } from "lucide-react";


function Revenue() {


  return (
    <>
      <div className="p-10 ml-95  w-300 bg-[#202124] ">
        <div className="flex justify-between  ">
          <div className="space-y-4">
            <p className="text-white font-bold text-4xl">Revenue Overview</p>
            <p className="text-lg text-slate-600 dark:text-slate-400">Monitor sales performance, track targets, and analyze revenue streams.</p>
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
        <div className=" flex items-center mt-13 justify-between">

          <div className="flex gap-5  items-center">
            <div className="  bg-[#283039] rounded-lg  h-15 px-3 border border-transparent hover:border-slate-600 transition-colors flex justify-ceneter item-center  ">
              <CalendarDays className="mt-4 text-slate-600 dark:text-slate-400" />


              <select className="p-3 text-white font-bold focus:outline-none cursor-pointer">
                <option value="This Month">This Month</option>
                <option value="This Month">This Year</option>
                <option value="This Month">Last Month</option>
                <option value="This Month">This Quarter</option>
              </select>




            </div>

            <div className=" bg-[#283039] rounded-lg h-15 px-3 border border-transparent hover:border-slate-600 transition-colors flex justify-ceneter item-center">
              <ChartBarStacked className="mt-4 text-slate-600 dark:text-slate-400" />

              <select className="p-3 text-white font-bold focus:outline-none cursor-pointer">
                <option value="This Month">All Categories</option>
                <option value="This Month">Enterprise</option>
                <option value="This Month">SMB</option>
                <option value="This Month">Consulting</option>
              </select>
            </div>
          </div>

          <div className="flex items-cente gap-5">
            <div className="flex  items-center justify-center rounded-lg h-11 px-4 bg-[#283039] text-white gap-2 hover:bg-[#323b46] transition-colors border border-transparent hover:border-slate-600 p-7">
              <ArrowDownToLine />
              <p className="font-bold">Export Report</p>
            </div>
            <button className="flex bg-blue-500 p-3 font-bold text-white text-lg items-center gap-5 rounded-lg">
              <Plus />
              <p>Add New Lead</p>
            </button>
          </div>



        </div>


        <div className="flex justify-between mt-8 bg-[#202124] gap-5">
          <div className=" bg-[#1a1d21] rounded-xl border border-[#283039] p-6 h-40   hover:border-[#3a4552] transition-colors w-70  ">


            <div className="">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Total Revenue
              </p >


            </div>

            <div className="flex  item-center">
              <div className="space-y-6 ">
                <p className="text-3xl font-bold text-white">
                  $124,500
                </p>
                <p className="text-slate-600 dark:text-slate-400 ">vs. $115,050 last period</p>
              </div>
              <div className="text-green-400 gap-1 h-7 ml-[-25px] mt-2 text-green-400 flex items-center bg-green-400/10 px-1.5 py-0.5 rounded">
                <TrendingUp className="w-4 h-4" />
                <p className="text-base ">8.2%</p>
              </div>
            </div>





          </div>
          <div className=" bg-[#1a1d21] rounded-xl border border-[#283039] p-6 h-40   hover:border-[#3a4552] transition-colors w-70 ">


            <div className=" ">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Sales Target
              </p >


            </div>

            <div className="flex gap-3 item-center">
              <div className="space-y-6 ">
                <p className="text-3xl font-bold text-white">
                  $150,000
                </p>
                <div className="w-57 bg-[#283039] mt-10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: "83%" }}></div>
                </div>

              </div>
              <div className=" ml-[-100px] font-medium  mt-2  ">

                <p className="text-base text-slate-600 dark:text-slate-400 ">83% </p><br />
                <p className="text-base text-slate-600 dark:text-slate-400 mt-[-28px]" > Reached</p>
              </div>
            </div>





          </div>
          <div className=" bg-[#1a1d21] rounded-xl border border-[#283039] p-6   hover:border-[#3a4552] transition-colors w-70 h-40">


            <div className="flex justify-between">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Deals Won
              </p >



            </div>

            <div className="flex  ">
              <div className="space-y-6 ">
                <p className="text-3xl font-bold text-white">
                  18
                </p>
                <p className="text-slate-600 dark:text-slate-400 ">5 deals in pipeline</p>
              </div>
              <div className="text-green-400 text-sm font-medium flex mt-3 ml-[-80px]  ">

                <p className="text-base font-medium text-green-400 flex items-center bg-green-400/10 px-1.5 py-0.5 h-6 rounded">+3</p>
              </div>
            </div>







          </div>





          <div className=" bg-[#1a1d21] rounded-xl border border-[#283039] p-6   hover:border-[#3a4552] transition-colors w-70 h-40">


            <div className="flex justify-between">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Avg. Deal Size
              </p >



            </div>

            <div className="flex  ">
              <div className="space-y-6 ">
                <p className="text-3xl font-bold text-white">
                  $6,916
                </p>
                <p className="text-slate-600 dark:text-slate-400 ">vs. $7,050 last period</p>
              </div>
              <div className="text-xs font-medium text-red-400 ml-[-40px] flex gap-1 mt-2 items-center bg-red-400/10 px-1.5 py-0.5 rounded h-7">
                <TrendingDown className="w-4 h-4" />

                <p className="text-red-400 text-base">2.1%</p>
              </div>
            </div>







          </div>



        </div>

        <div className="flex gap-5 mt-10">

          <div className="lg:col-span-2 bg-[#1a1d21] w-180 rounded-xl border border-[#283039] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-white text-lg font-bold">Revenue Performance</h1>
              <div className="flex items-center gap-2">
                <span className=" text-base text-[#9cabba]">Revenue</span>
                <span className=" text-base text-[#9cabba]">Projection</span>
              </div>

            </div>

            <div className="relative h-65 w-full flex items-end justify-between gap-2 sm:gap-4 px-2">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
                <div className="w-full h-px bg-[#283039] border-t border-dashed border-[#283039]"></div>
                <div className="w-full h-px bg-[#283039] border-t border-dashed border-[#283039]"></div>
                <div className="w-full h-px bg-[#283039] border-t border-dashed border-[#283039]"></div>
                <div className="w-full h-px bg-[#283039] border-t border-dashed border-[#283039]"></div>
                <div className="w-full h-px bg-[#283039]"></div>

              </div>




              <div className="relative z-10  bg-primary/20 hover:bg-blue-500 rounded-t transition-all group flex flex-col justify-end h-[34%]">
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                  $24k

                </div>
              </div>
              <div className="relative z-10 w-130 bg-blue-500/20 hover:bg-blue-500 rounded-t transition-all group flex flex-col justify-end h-[42%]">
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">$32k</div>
              </div>

              <div className="relative z-10 w-130 bg-blue-500/20 hover:bg-blue-500 rounded-t transition-all group flex flex-col justify-end h-[31%]">
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                  $21k

                </div>

              </div>


              <div className="relative z-10 w-130 bg-blue-500/20 hover:bg-blue-500 rounded-t transition-all group flex flex-col justify-end h-[55%]">
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                  $45k

                </div>

              </div>


              <div className="relative z-10 w-130 bg-blue-500/20 hover:bg-blue-500 rounded-t transition-all group flex flex-col justify-end h-[68%]">
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                  $58k

                </div>

              </div>


              <div className="relative z-10 w-130 bg-blue-500/20 hover:bg-blue-500 rounded-t transition-all group flex flex-col justify-end h-[45%]">
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                  $35k

                </div>

              </div>


              <div className="relative z-10 w-130 bg-blue-500/20 hover:bg-blue-500 rounded-t transition-all group flex flex-col justify-end h-[85%]">
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                  $65k

                </div>

              </div>






              <div className="relative z-10 w-130 border border-dashed border-[#9cabba] bg-transparent rounded-t group flex flex-col justify-end h-[90%] opacity-50">

              </div>





            </div>
          </div>

          <div>
            <div className="bg-[#1a1d21] rounded-xl w-100 h-68 space-y-5 border border-[#283039] p-6  ">
              <h3 className="text-white text-lg font-bold mb-4">Revenue by Category</h3>

              <div className="flex justify-between text-sm mb-1">
                <span className="text-white text-lg">Enterprise</span>
                <span className="text-[#9cabba] text-lg">$84,000 (68%)</span>


              </div>

              <div className="w-83 bg-[#283039]  h-2.5 mt-1 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: "70%" }}></div>
              </div>


              <div className="flex justify-between text-sm mb-1">
                <span className="text-white text-lg">SMB</span>
                <span className="text-[#9cabba] text-lg">$28,500 (23%)</span>


              </div>

              <div className="w-83 bg-[#283039]  h-2.5 mt-1 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: "23%" }}></div>
              </div>



              <div className="flex justify-between text-sm mb-1">
                <span className="text-white text-lg">Consulting</span>
                <span className="text-[#9cabba] text-lg">$12,000 (9%)</span>


              </div>

              <div className="w-83 bg-[#283039]  h-2.5 mt-1 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full" style={{ width: "10%" }}></div>
              </div>


            </div>

            <div className="bg-gradient-to-br  mt-5 from-[#1a1d21] to-[#21272e] rounded-xl border border-[#283039] p-6 shadow-sm">
              <div className="flex gap-5 item-center font-bold">
              <Trophy className="text-yellow-400"/>
              <h3 className="text-white text-lg font-bold uppercase tracking-wide">Top Product</h3>
              </div>
              <p className="text-white text-2xl font-bold mt-5">Clude Suite Pro</p>
              <p className="text-[#9cabba] text-lg mt-1">Generated $45,200 this quarter</p>

            </div>

          </div>

        </div>



      </div>
    </>
  )
}

export default Revenue;
