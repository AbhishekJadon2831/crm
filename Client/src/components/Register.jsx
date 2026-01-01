import { useState } from "react";
import image from "../assets/google.png";
import image1 from "../assets/unnamed.png";
import image2 from "../assets/unnamed (1).png";
import { FiUser, FiMail, FiEye, FiArrowRight, } from "react-icons/fi";
import { ChartNoAxesCombined, Star } from "lucide-react"
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [name, setName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();


  const handle = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, workEmail, password, confirmpassword }),
    });
    const data = await res.text();
    console.log(data);
  };

  const check = () => {
    navigate("/Login")
  }

  return (
    <div className="flex display-none h-screen ">

      <div className="bg-gray-900  w-1/2 p-10 overflow-y-auto">
        <p className="text-white text-2xl font-bold mb-2 ml-55">Create your account</p>
        <p className="text-gray-400 mb-6 ml-40">
          Start your 14-day free trial. No credit card required.
        </p>


        <div className="ml-30">
          <button className="bg-black w-110 p-5  rounded-xl  flex items-center justify-center gap-2">
            <img src={image} alt="Google" className="w-6" />
            <p className="text-white ">Sign up with Google</p>
          </button>
          <p className="text-gray-400 text-center mt-2">Or sign up with email</p>
        </div>

        <form className="space-y-6 ml-30" onSubmit={handle}>
          <div className="relative">

            <label className="block text-white font-medium mb-2">Full Name</label>


            <input
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-110 p-4 rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"

            />
            <FiUser className="absolute left-98 top-11 text-gray-400 text-[30px]" />

          </div>

          <div className="relative">
            <label className="block text-white font-medium mb-2">Work Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={workEmail}
              onChange={(e) => setWorkEmail(e.target.value)}
              className="w-110 p-4  rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
            />
            <FiMail className="absolute left-98 top-12 text-gray-400 text-[30px]" />
          </div>

          <div className="relative">
            <label className="block text-white font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-110 p-4  rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
            />
            <FiEye className="absolute left-98 top-12 text-gray-400 text-[30px]" />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat your password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              className="w-110 p-4  rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
            />

          </div>
          <div className="relative">

            <button
              type="submit"
              className="bg-blue-600 w-110 p-4 text-[20px]  rounded-xl text-white font-bold hover:bg-blue-700 transition"
            >
              Create Account
            </button>
            <FiArrowRight className="absolute left-75 top-5 text-white text-[30px]" />
          </div>
          <div className="ml-30 flex gap-1">
            <p className="text-white"> Already have an account?</p>
            <span className="text-blue-500 font-bold" onClick={check}>Login</span>
          </div>
        </form>
      </div>


      <div className="  relative">
        <img
          src={image1}
          alt="Promotional"
          className=" w-200 h-172"
        />
        <div className="absolute top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2  space-y-9    text-center  w-full  ">
          <ChartNoAxesCombined className="bg-blue-500 w-20 h-20 p-2 rounded-xl ml-90 " />

          <div className="">
            <p className="text-white  text-5xl font-bold">Track revenue.</p>
            <p className="text-white  text-5xl font-bold">Close more deals.</p>
          </div>
          <div className="">
            <p className="text-white text-2xl">Join over 10,000 sales professionals who use <br />
              SalesPro to organize leads, track pipelines, and<br />
              crush their quotas.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 w-125 space-y-4 ml-37 ">
            <div className="flex gap-2 ml-7">
              <span><Star className="w-5 text-yellow-400" /></span>
              <span><Star className="w-5 text-yellow-400" /></span>
              <span><Star className="w-5 text-yellow-400" /></span>
              <span><Star className="w-5 text-yellow-400" /></span>
              <span><Star className="w-5 text-yellow-400" /></span>
            </div>
            <div className="">
              <p className="text-slate-200 text-1xl mb-4">"SalesPro transformed how our team operates. The<br />
                insights are incredible and the interface is blazing fast."
              </p>
            </div>
            <div className="ml-7 flex gap-2">
              <img src={image2} alt="" className="w-10 rounded-3xl" />
              <div className="">
                <p className="text-white font-semibold text-sm">Marcus Chen</p>
                <p className="text-slate-400 text-xs">VP of Sales, TechCorp</p>
              </div>
            </div>
          </div>

        </div>

      </div>



    </div>
  );
};

export default Register;
