import React from "react";
import { colors } from "../../colors";
import PieChart from "../../Components/PieChart/PieChart";
import ColumnChart from "../../Components/ColumnChart/ColumnChart";
import SplineChart from "../../Components/SplineChart/SplineChart";
import SideBarOrganizer from "../../Components/SidebarOrganizer/SideBarOrganizer";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const user = jwtDecode(localStorage.getItem("token"));

  return (
    <>
      
      <div className="col-md-9">
          <div className='row'>
        <div className='col-md-12 my-4 ms-2' style={{textAlign:"left"}}>
          <h1 className='fs-1 fw-bold' style={{color: colors.secondary}}>Good Morning,<span>{user.firstName}</span>! </h1>
          <p className='fw-bold mt-2 text-black fs-5 '>let's set up your website</p>
         </div>

                {/* <div className='card shadow'>
                    <div className='card-body'>

                    </div>
                </div> */}
        {/* <SideBarOrganizer></SideBarOrganizer> */}

          <div className="col-md-6 p-2 col-sm-12">
            <PieChart></PieChart>
          </div>

          <div className="col-md-6 p-2 col-sm-12">
            <ColumnChart></ColumnChart>
          </div>

          <div className="col-md-12 mt-3 p-2 col-sm-12">
            <SplineChart></SplineChart>
          </div>
          </div>
          </div>   
    </>
  )

}
