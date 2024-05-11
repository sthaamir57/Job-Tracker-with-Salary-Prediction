import React from 'react'
import { FcBullish } from 'react-icons/fc'
import { BiSolidDashboard } from "react-icons/bi";
import { SiGoogleanalytics } from "react-icons/si";
import { PiStarFourFill } from "react-icons/pi";
import { NavLink } from 'react-router-dom'

function Sidebar() {
    const linkClasses = 'flex items-center mb-3 hover:bg-neutral-700 hover:no-underline rounded p-3 text-neutral-100 text-xs w-36'

  return (
    <div className='bg-neutral-900 flex flex-col w-48 p-2 border-r border-neutral-800'>
        <div className="flex items-center px-1 py-3">
            <FcBullish fontSize={24}/>
            <span className='text-lg font-semibold text-cyan-300'>Job Tracker</span>
        </div>
        <nav className='flex flex-col mt-2'>
            <NavLink className={(e)=>`${e.isActive ? "bg-neutral-700" : ""} ${linkClasses}`} to="/"><span className='text-xl mr-2'><BiSolidDashboard /></span>Board</NavLink>
            <NavLink className={(e)=>`${e.isActive ? "bg-neutral-700" : ""} ${linkClasses}`} to="/statistics"><span className='text-xl mr-2'><SiGoogleanalytics /></span>Statistics</NavLink>
            <NavLink className={(e)=>`${e.isActive ? "bg-neutral-700" : ""} ${linkClasses}`} to="/predict"><span className='text-xl mr-2'><PiStarFourFill /></span>Predict</NavLink>
        </nav>
    </div>
  )
}

export default Sidebar