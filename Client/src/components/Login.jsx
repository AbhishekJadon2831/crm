import { useState } from "react";
import image from "../assets/groth.jpg"
import image1 from "../assets/unnamed (1).png"
import image2 from "../assets/google.png"
import { FiMail, FiEye } from "react-icons/fi";


const Login = () => {

    const [workEmail, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const handle = async (e) => {
        e.preventDefault();
        const res2 = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ workEmail, password }),
        });
        const data2 = await res2.json();
        console.log("Login response:", data2);

    }

    return <>




        <div className=" flex">
            <div className="bg-gray-900 w-200 ">
                <div className="ml-40 mt-20">

                    <div className="space-y-10">
                        <p className="text-white font-bold text-2xl  ">SalesForse One</p>
                        <div className="space-y-5">
                            <p className="text-white text-2xl font-bold">Welcome Back</p>
                            <p className="mt-2 text-lg   text-slate-600 dark:text-slate-400">Enter your credentials to access your dashboard.</p>
                        </div>
                    </div>

                    <form className=" space-y-10 mt-15" onSubmit={handle}>

                        <div className="relative">
                            <label className="block text-white font-medium mb-2"> Email address</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={workEmail}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-110 p-4  rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                            />
                            <FiMail className="absolute left-98 top-12 text-gray-400 text-[30px]" />
                        </div>

                        <div className="relative">
                            <label className="block text-white font-medium mb-2">Password</label>
                            <input
                                type="password"
                                placeholder=" enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-110 p-4  rounded-xl bg-gray-800 border border-gray-600 focus:border-blue-500 focus:outline-none text-white"
                            />
                            <FiEye className="absolute left-98 top-12 text-gray-400 text-[30px]" />

                        </div>
                        <div className="flex gap-47">
                            <span className="text-white text-lg">
                                Remember me</span>

                            <span className="font-semibold text-primary hover:text-blue-400 text-blue-500 text-lg">
                                Forgot Password?
                            </span>
                        </div>

                        <button type="submit" className="bg-blue-500 w-110 p-4 rounded-xl font-bold text-white text-[20px]">Sign in </button>
              

                        <div className="flex bg-blue-500 w-110 p-5 gap-5 rounded-xl bg-gray-800 border border-gray-600 text-white font-bold justify-center items-center">
                            <img src={image2} alt="image" className="w-5" />
                            <button className=" "> Google </button>



                        </div>

                        <div className="flex gap-2 ml-10">
                            <p className="text-white text-lg">Don't have an account? </p>
                            <p className="text-blue-500 text-lg font-bold">Sign up for a trial</p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="relative">
                <img src={image} alt="image" className="w-200 h-230" />
                <div className="absolute space-y-20  top-130 left-1/2 transform -translate-x-1/2 -translate-y-1/2  space-y-9    text-center  w-full  ">



                    <div className="">
                        <p className="text-white text-3xl font-bold">"SalesForce One transformed how our<br /> team tracks revenue. The interface is<br /> simply the fastest on the market.".</p>
                    </div>
                    <div className="    w-125 space-y-4 ml-37 ">


                        <div className="ml-7 flex gap-2 ">
                            <img src={image1} alt="" className="w-10 rounded-3xl" />
                            <div className="">
                                <p className="text-white font-bold text-1xl">Marcus Chen</p>
                                <p className="text-slate-300 font-bold">VP of Sales, TechCorp</p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>


        </div>


    </>

}

export default Login;