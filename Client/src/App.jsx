// import { useState } from 'react'

import './App.css'

import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Task from './components/Task';
import Contact from './components/Contact';
import Pipeline from './components/Pipeline';
import Revenue from './components/Revenue';
import { ToastContainer } from 'react-toastify';
import Setting from './components/Setting';
// import Profile from './components/Profile';
import Layout from './components/Layout';

function App() {





  return (
    <>
      <ToastContainer />

      <Routes>

        <Route path="/Login" element={<Login />}></Route>

        <Route path="/Register" element={<Register />}></Route>
        <Route element={<Layout />}>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/Task" element={<Task />}>

          </Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/Pipeline" element={<Pipeline />}></Route>
          <Route path="/Revenue" element={<Revenue />}></Route>
          <Route path="/Setting" element={<Setting />}></Route>
        </Route>

        {/* <Route path="/Profile" element={<Profile />}></Route> */}





      </Routes>



    </>
  )
}

export default App
