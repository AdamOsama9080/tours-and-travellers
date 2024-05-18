import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { colors } from '../../colors'
import { useLocation } from 'react-router-dom';

export default function OrderResponse() {
    const location = useLocation();
    const bookingResponse = location.state?.bookingResponse;
    console.log(bookingResponse);

    if (!bookingResponse) {
        return <div>Loading...</div>;
    }

    const renderTravelerNames = () => {
        return bookingResponse.travelers.map((traveler, index) => (
            <p key={index} className='fw-bold text-black-50 m-0'>
                Traveler Name: {traveler['firstname-' + index]} {traveler['lastname-' + index]}
            </p>
        ));
    };

    const formatDateLikeMonDDYYYY = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };
    
    const formatDateLikeDD_MM_YYYY = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();
        return `${day} - ${month} - ${year}`;
    };
  return (
    // <div>OrderResponse</div>
    <>
    <Navbar></Navbar>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-12'>
                <div className='card p-5'>
                    {/* <div className='d-flex align-items-center justify-content-center'>
                    </div> */}
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='d-flex align-items-center justify-content-center'>
                            <i class="bi bi-check-circle-fill"style={{color:colors.secondary , fontSize:'4rem'}}></i>
                                <div className='ms-3'>
                                    <h3>Your order was submitted and add to cart successfully!</h3>
                                    <p className='m-0'>Booking details has been sent to {bookingResponse.user.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div>
                                <p className='text-black-50 fw-bold'>
                                    Booking Number:  <strong className='text-black'>{bookingResponse.tripCode}</strong>
                                </p>
                                <p className='text-black-50 fw-bold'>
                                    Booking Date:  <strong className='text-black'>{formatDateLikeMonDDYYYY(bookingResponse.tour.startDate)}</strong>
                                </p>
                                <p className='text-black-50 fw-bold'>
                                    Payment Method:  <strong className='text-black'>Credit card</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h4>Activity Details</h4>
                        <div className='row align-items-center'>
                            <div className='col-md-4'>
                                <img src=''/>
                            </div>
                            <div className='col-md-8'>
                                <h4 className='' style={{ color: colors.primary }}>{bookingResponse.tour.description}</h4>
                                <p><i class="bi bi-geo-alt"></i> {bookingResponse.tour.location}</p>
                                <p><i class="bi bi-people me-2"></i>{bookingResponse.travelers.length} traveler</p>
                                <div className='d-flex align-items-center'>
                                    <p><i class="bi bi-clock me-2"></i>{bookingResponse.tour.duration}</p>
                                    <p><i class="bi bi-calendar-event mx-2"></i>{formatDateLikeMonDDYYYY(bookingResponse.tour.startDate)}</p>
                                </div>

                                <div className='d-flex align-items-center'>
                                    <i class="bi bi-check-lg fw-bold me-1 fs-5" style={{ color: colors.secondary, fontWeight: 'bold' }}></i>
                                    <p className='m-0'>Free cancellation before {bookingResponse.tour.startTime} <br></br>(local time) on {formatDateLikeDD_MM_YYYY(bookingResponse.tour.startDate)}</p>
                                </div>
                            </div>

                        </div>
                            <hr></hr>
                            <div>
                                <h4>Travellers</h4>
                                {renderTravelerNames()}
                            </div>
                            <hr></hr>
                            <div>
                                <h4>Pickup location</h4>
                                <p className='fw-bold text-black-50 '>I will seelct my pickup location later</p>
                            </div>
                            <hr></hr>
                            <div>
                                <h4>Other details</h4>
                                <p className='fw-bold text-black-50 m-0'>Special requirements: chair</p>
                                <p className='fw-bold text-black-50 m-0'>Tour language: English - Guide</p>
                            </div>  
                    </div>
                </div>

                
            </div>

            <div className='col-md-4'>
                <div className='card'>
                    <div className='card-body'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <p className='fw-bold fs-5 text-black-50'>Adult Price</p>
                            <p className='fw-bold fs-5 '>{bookingResponse.tour.price} EGY</p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <p className='fw-bold fs-5 text-black-50'>Discount</p>
                            <p className='fw-bold fs-5 '>0% </p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <p className='fw-bold fs-5 text-black-50'>Tax</p>
                            <p className='fw-bold fs-5 '>0 EGY</p>
                        </div>
                        <hr></hr>
                        <div className='d-flex align-items-center justify-content-between'>
                            <p className='fw-bold fs-5 text-black-50 m-0'>Total</p>
                            <p className='fw-bold fs-5 m-0 fs-4 ' style={{ color: colors.secondary }}>{bookingResponse.tour.price} EGY</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
    </>
  )
}
