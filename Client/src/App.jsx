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
 

function App() {
  


  return (
    <>
      <Routes>

        <Route path="/Login" element={<Login />}></Route>

        <Route path="/Register" element={<Register />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/Task" element={<Task />}></Route>

        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/Pipeline" element={<Pipeline />}></Route>
        <Route path="/Revenue" element={<Revenue />}></Route>
         
       



      </Routes>
      
      
    </>
  )
}

export default App
