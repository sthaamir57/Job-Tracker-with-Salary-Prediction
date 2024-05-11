import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from '../Sidebar';

function Layout() {
  return (
    <div className='flex flex-row h-screen w-screen overflow-hidden bg-neutral-900'>
        <Sidebar />
        <div className='p-4 w-full overflow-y-scroll'>{<Outlet />}</div>
    </div>
  )
}

export default Layout