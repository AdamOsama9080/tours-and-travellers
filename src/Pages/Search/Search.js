// import React from "react";
// // import TourSlider from "../../Components/TourSlider/TourSlider";
// import ToggleButtonGroup from "../../Components/ToggleButtonGroup/ToggleButtonGroup";
// import ToggleButtonSlider from "../../Components/ToggleButtonGroup/ToggleButtonSlider";
// import ToursCard from "../../Components/ToursCard/ToursCard";
// import { Col, Container, Row } from "react-bootstrap";
// import SideBar from "../../Components/MainSideBar/MainSideBar";
// import FilterSideBar from "../../Components/FilterSideBar/FilterSideBar";
// import { ModalProvider } from "../../Contexts/pypalContext";
// import PayPalButtonComponent from "../../Components/PaymentDetails/PaymentDetails";
// import { DataToShowContext } from "../../Contexts/dataToShow";
// import { useContext } from "react";
// import { FilterationContext } from "../../Contexts/filterationContext";
// import { FcSearch } from "react-icons/fc";
// import { colors } from "../../colors";
// import Navbar from "../../Components/Navbar/Navbar";
// import SearchCard from "../../Components/SearchCard/SearchCard";
// import Footer from "../../Components/Footer/Footer";
// import axios from "axios";

// import { useState } from "react";
// import { useEffect } from "react";

// export default function Search({ location }) {
//   const searchData = location.state.searchData; 
//   console.log("searchpage", searchData)
//   // const { selectedFilters } = useContext(FilterationContext);
//   // const {
//   //   FullData,
//   //   setFullData,
//   //   setData,
//   //   filteredData,
//   //   setFillteredData,
//   //   setFillterData,
//   // } = useContext(DataToShowContext);
//   // useEffect(() => {
//   //   if (localStorage.getItem("searchData")) {
//   //     let data = JSON.parse(localStorage.getItem("searchData"));
//   //     data = {
//   //       ...data,
//   //       destination: `${
//   //         data.destination.charAt(0).toUpperCase() + data.destination.slice(1)
//   //       }, Egypt`,
//   //     };
//   //      axios.post("https://apis-2-4nek.onrender.com/tours/filter-trips", data)
//   //     .then((response) => {
//   //       setFullData(old=>{
//   //         return response.data.data;
//   //       });
//   //       localStorage.removeItem('searchData');
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error sending data to API:", error);
//   //     });
//   //   }else if(localStorage.getItem("selectCity")){
//   //     let data = JSON.parse(localStorage.getItem("selectCity"));
//   //     axios.get(`https://apis-2-4nek.onrender.com/tours/tours`)
//   //     .then(res => {
//   //       setFullData(res.data.data.filter(el=> el.location === data));
//   //       console.log(res.data.data.filter(el=> el.location === data));
//   //       localStorage.removeItem('selectCity');
//   //     })
//   //   }
//   //   else{
//   //     axios.get(`https://apis-2-4nek.onrender.com/tours/tours`)
//   //     .then(res => {
//   //       setFullData(res.data.data);
//   //     })
//   //   }
//   // }, []);
//   return (
//     // <div>
//     //   <ModalProvider>
//     //     <Navbar />
//     //     <SearchCard />
//     //     <Container fluid>
//     //       <Row>
//     //         <Col className=" d-none d-md-block col-md-3">
//     //           <SideBar />
//     //         </Col>
//     //         <Col className="col-12 col-md-9">
//     //           <div className="d-none d-md-block">
//     //             <ToggleButtonGroup />
//     //           </div>
//     //           <div className="d-md-none my-3">
//     //             <Row>
//     //               <Col className="col-6 text-end">
//     //                 <FilterSideBar />
//     //               </Col>
//     //               <Col className="col-6 text-start">
//     //                 <ToggleButtonSlider />
//     //               </Col>
//     //             </Row>
//     //           </div>
//     //           {filteredData === undefined ? (
//     //             <div className="d-flex flex-column justify-content-center align-items-center">
//     //               <FcSearch className="fs-1 fw-bolder" size={300} />{" "}
//     //               <h5 className="fst-italic" style={{ color: colors.violet }}>
//     //                 No Result Like Filters{" "}
//     //               </h5>
//     //             </div>
//     //           ) : filteredData.length === 0 ? (
//     //             FullData.map((el, index) => {
//     //               return <ToursCard key={index} tour={el} />;
//     //             })
//     //           ) : (
//     //             filteredData.map((el, index) => {
//     //               return <ToursCard key={index} tour={el} />;
//     //             })
//     //           )}
//     //         </Col>
//     //       </Row>
//     //     </Container>
//     //     <PayPalButtonComponent />
//     //     <Footer />
//     //   </ModalProvider>
//     // </div>
//     <>

//     </>
//   );
// }


import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import SearchCard from "../../Components/SearchCard/SearchCard";
import SideBar from "../../Components/MainSideBar/MainSideBar";
import TourCard from "../../Components/TourCard/TourCard";
import { colors } from "../../colors";
import { DataToShowContext } from "../../Contexts/dataToShow";
import { useFilterContext } from "../../Contexts/filterationContext";
import Swal from "sweetalert2";
import {jwtDecode} from "jwt-decode";

const Search = () => {
  const { selectedFilters } = useFilterContext();
  const [tours, setTours] = useState([]);
  const [activeTab, setActiveTab] = useState('Recommended');
  const [filteredTours , setFilteredTours] = useState([]);
  const user = jwtDecode(localStorage.getItem("token"));


  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("http://localhost:2000/tours/tours");
        setTours(response.data.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    let filteredTours = tours.filter(tour => {
      if (selectedFilters.Duration.length > 0 && !selectedFilters.Duration.includes(`${tour.duration}`)) {
        return false;
      }

      if (selectedFilters.Departs.length > 0) {
        const departsWithCountry = selectedFilters.Departs.map(depart => `${depart}, Egypt`);
        if (!departsWithCountry.map(depart => tour.location.toLowerCase().includes(depart.toLowerCase())).includes(true)) {
          return false;
        }
      }

      if (
        selectedFilters.Price.min > 0 &&
        selectedFilters.Price.max > 0 &&
        (tour.price < selectedFilters.Price.min || tour.price > selectedFilters.Price.max)
      ) {
        return false;
      }

      if (selectedFilters.Rate > 0 && tour.rating !== selectedFilters.Rate) {
        return false;
      }

      return true;
    });

    setFilteredTours(filteredTours);
  }, [selectedFilters, tours]);

  
  const handleTabClick = (tab) => {
    let sortedTours = [...tours];

    switch (tab) {
      case 'Recommended':
        sortedTours.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        break;
      case 'Top Rating':
        sortedTours.sort((a, b) => b.rating - a.rating);
        break;
      case 'Most Popular':
        sortedTours.sort((a, b) => b.reviews.length - a.reviews.length);
        break;
      case 'Cheapest':
        sortedTours.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }

    setTours(sortedTours);
    setActiveTab(tab);
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-md-12">
            <SearchCard/>
            <div className="row">
              <div className="col-md-3 bg-transparent">
                <div className="card shadow text-center">
                  <div className="card-body">
                    <div className="text-center" style={{fontSize: '5rem'}}>
                      <i className="bi bi-luggage mb-4" style={{ color: colors.secondary }}></i>
                    </div>
                    <h4 style={{ color: colors.secondary }} className="fw-bold fs-3">
                      Free Cancellation
                    </h4>
                    <p className="text-black-50 mt-3">
                      Change of plans? No problem. Cancel up to 24 hours before your activity starts for a full refund.
                    </p>
                  </div>
                </div>
                <SideBar filterLength={tours.length} searchFilterlength ={filteredTours.length}/>
              </div>
              <div className="col-md-9">
                <div className="card bg-white p-0">
                  <ul className="nav fw-bold col-md-12" style={{ justifyContent: 'space-around' }}>
                    <li
                      className={`col-md-3 text-center p-2 py-3  border-end-3 ${activeTab === 'Recommended' ? 'border-bottom border-5 border-warning' : ''}`}
                      style={{ color: colors.primary ,cursor:'pointer' }}
                      onClick={() => handleTabClick('Recommended')}
                    >
                      Recommended
                    </li>
                    <li
                      className={`col-md-3 text-center p-2 py-3 ${activeTab === 'Top Rating' ? 'border-bottom border-5 border-warning' : ''}`}
                      style={{ color: colors.primary ,cursor:'pointer' }}
                      onClick={() => handleTabClick('Top Rating')}
                    >
                      Top Rating
                    </li>
                    <li
                      className={`col-md-3 text-center p-2 py-3 ${activeTab === 'Most Popular' ? 'border-bottom border-5 border-warning' : ''}`}
                      style={{ color: colors.primary ,cursor:'pointer' }}
                      onClick={() => handleTabClick('Most Popular')}
                    >
                      Most Popular
                    </li>
                    <li
                      className={`col-md-3 text-center p-2 py-3 ${activeTab === 'Cheapest' ? 'border-bottom border-5 border-warning' : ''}`}
                      style={{ color: colors.primary ,cursor:'pointer' }}
                      onClick={() => handleTabClick('Cheapest')}
                    >
                      Cheapest
                    </li>
                  </ul>
                </div>
                {filteredTours.length > 0 ? (
                  filteredTours.map((tour, index) => (
                    <TourCard key={index} tourData={tour}  />
                  ))
                ) : (
                  tours.map((tour, index) => (
                    <TourCard key={index} tourData={tour}  />
                  ))
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
