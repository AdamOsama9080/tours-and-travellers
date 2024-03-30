import React, { useState } from 'react';
import { SiOpenstreetmap } from "react-icons/si";
import "./ToggleSlider.modules.css";
import { CgClose } from "react-icons/cg";
import { useContext } from 'react';
import { DataToShowContext } from '../../Contexts/dataToShow';
import { useEffect } from 'react';
export default function ToggleButtonSlider() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { FullData, setFullData } = useContext(DataToShowContext);
  const toggleSidebar = (value) => {
    let sortedData;
    if (value === "topRated") {
      sortedData = handleRange([...FullData], "rating"); 
    }else if(value === "mostPopular"){
      sortedData = handleRange([...FullData], "reviews"); 
    }else{
      sortedData = handleRange([...FullData], "price"); 
    }
    setFullData(sortedData);
    setSidebarOpen(!sidebarOpen);
  };
  const handleRange = (arr, prop) => {
    if(prop === "rating"){
      return [...arr].sort((a, b) => b[prop] - a[prop]); 
    }else if(prop === "reviews"){
      return [...arr].sort((a, b) => b[prop].length - a[prop].length); 
    }else{
      return [...arr].sort((a, b) => a[prop] - b[prop]); 

    }
  }
  useEffect(() => {
    console.log(FullData); 
  }, [FullData]);
    return (
        <>
            <button className='btn btn-outline-secondary' onClick={()=>{toggleSidebar()}}><SiOpenstreetmap/> Map View</button>
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} >
            <div className='slider-header fw-bolder fs-1 m-3 text-start'><span className='close-sidebar' onClick={()=>{toggleSidebar()}}><CgClose className='fw-bolder fs-1'/></span> Map View</div>
                <ul className='bg-light h-100 py-5'>
                    <button className='btn btn-link d-block my-3 w-100 text-dark fs-3' onClick={()=>{toggleSidebar("topRated")}}>Top Rated</button><hr className='w-75 m-auto'></hr>
                    <button className='btn btn-link d-block my-3 w-100 text-dark fs-3' onClick={()=>{toggleSidebar("mostPopular")}}>Most popular</button><hr className='w-75 m-auto'></hr>
                    <button className='btn btn-link d-block my-3 w-100 text-dark fs-3' onClick={()=>{toggleSidebar("cheapest")}}>Cheapest</button>
                </ul>
            </div>

        </>
    )
}
