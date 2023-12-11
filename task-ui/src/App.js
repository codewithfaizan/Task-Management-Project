import React from 'react'
import "./component/style/general.css"
import Navbar from './component/Navbar'
import Login from './component/Login'
import Registration from './component/Registration'
import { Routes, Route, useLocation } from 'react-router-dom';
import TaskFrame from './component/TaskFrame';
import Task from './component/Task'
import Layout from './component/Layout';
import RequireAuth from './component/RequireAuth';
import CreateTask from './component/CreateTask';



const App = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Layout />}>

          {/* {Public Routes} */}
          <Route path="/" element={<TaskFrame/>} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />

          {/* {Private Routes} */}
          <Route element={<RequireAuth />}>
            <Route path="/createtask" element={<CreateTask />} />
          </Route>

        </Route>

      </Routes>
    </>
  )
}

export default App
