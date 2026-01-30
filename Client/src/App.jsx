// import { useState } from 'react'

import './App.css'

import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

import Contact from './components/Contact';
import Pipeline from './components/Pipeline';

import { ToastContainer } from 'react-toastify';
import Setting from './components/Setting';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Reset from './components/ResetPass';
import Home from './components/Home';
import { useAuth } from './components/Context/AuthContext';






function App() {

  const { user } = useAuth()






  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Reset" element={<Reset />} />

        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Pipeline" element={<Pipeline />} />
            <Route path="/Setting" element={<Setting />} />
          </Route>
        </Route>
      </Routes>




    </>
  )
}

export default App
