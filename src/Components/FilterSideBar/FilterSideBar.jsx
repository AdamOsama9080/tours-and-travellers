import React, { useState } from 'react'
import SideBar from '../MainSideBar/MainSideBar';
import { CgClose } from "react-icons/cg";
import { FaBarsProgress } from "react-icons/fa6";
import './FilterSideBar.modules.css';
export default function FilterSideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>
      <button className='btn btn-outline-secondary' onClick={toggleSidebar}><FaBarsProgress/> Filters</button>
            <div className={`filter-sidebar ${sidebarOpen ? 'open' : ''}`} >
            <div className='slider-header fw-bolder fs-1 m-3 text-start'><span className='close-sidebar' onClick={toggleSidebar}><CgClose className='fw-bolder fs-1'/></span> Sort and Filters</div>
                <SideBar/>
            </div>
    </div>
  )
}
