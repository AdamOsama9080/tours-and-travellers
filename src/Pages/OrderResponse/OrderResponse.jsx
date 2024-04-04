import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { colors } from '../../colors'

export default function OrderResponse() {
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
                                    <h3>Your order was submitted successfully!</h3>
                                    <p className='m-0'>Booking details has been sent to exmaple@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div>
                                <p className='text-black-50 fw-bold'>
                                    Booking Number:  <strong className='text-black'>5483</strong>
                                </p>
                                <p className='text-black-50 fw-bold'>
                                    Booking Date:  <strong className='text-black'>Aug20 2022</strong>
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
                                <h4 className='' style={{ color: colors.primary }}>Full-Day Tour Giza Great Pyramids,<br></br>Sphinx, Memphis, and saqqara</h4>
                                <p><i class="bi bi-geo-alt"></i> cairo, Egypt</p>
                                <p><i class="bi bi-people"></i>4 traveler</p>
                                <div className='d-flex align-items-center'>
                                    <p><i class="bi bi-clock"></i> 3 Days</p>
                                    <p><i class="bi bi-calendar-event"></i>08/13/2022</p>
                                </div>

                                <div className='d-flex align-items-center'>
                                    <i class="bi bi-check-lg fw-bold me-1 fs-5" style={{ color: colors.secondary, fontWeight: 'bold' }}></i>
                                    <p className='m-0'>Free cancellation before 8:00 AM <br></br>(local time) on Aug 15, 2022</p>
                                </div>
                            </div>

                        </div>
                            <hr></hr>
                            <div>
                                <h4>Travellers</h4>
                                <p className='fw-bold text-black-50 m-0'>traveler Name</p>
                                <p className='fw-bold text-black-50 m-0'>traveler Name</p>
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
                            <p className='fw-bold fs-5 '>500 EGY</p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <p className='fw-bold fs-5 text-black-50'>Discount</p>
                            <p className='fw-bold fs-5 '>50% </p>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <p className='fw-bold fs-5 text-black-50'>Tax</p>
                            <p className='fw-bold fs-5 '>500 EGY</p>
                        </div>
                        <hr></hr>
                        <div className='d-flex align-items-center justify-content-between'>
                            <p className='fw-bold fs-5 text-black-50 m-0'>Total</p>
                            <p className='fw-bold fs-5 m-0 fs-4 ' style={{ color: colors.secondary }}>500 EGY</p>
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
