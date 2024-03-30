import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { colors } from '../../colors'

export default function ToursDetailsandBooking() {
    const [activeTab, setActiveTab] = useState('overview');

    function handleTabClick(tab) {
        setActiveTab(tab);
    }

    return (
        // <div>ToursDetailsandBooking</div>
        <>
            <Navbar></Navbar>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-9 col-sm-12'>
                        <div className='card shadow p-0'>
                            <div className='card-body p-0'>
                                <div className='row'>
                                    <div className='col-md-11 p-4 '>
                                        <h2 className='fw-bold' style={{ color: colors.secondary }} >
                                            Full-Day Tour Giza Great Pyramids, Sphinx,Memphis, and Saqqara
                                        </h2>
                                        <div className=''>
                                            <i className="bi bi-star-fill" style={{ color: 'gold' }}></i>
                                            <i className="bi bi-star-fill" style={{ color: 'gold' }}></i>
                                            <i className="bi bi-star-fill" style={{ color: 'gold' }}></i>
                                            <i className="bi bi-star-fill" style={{ color: 'gold' }}></i>
                                            <i className="bi bi-star-fill" style={{ color: 'gold' }}></i>
                                            <span style={{ color: colors.primary }}>(250 reviews) </span>
                                        </div>
                                        <div>
                                            <i className="bi bi-geo-alt-fill" ></i>
                                            <span style={{ color: colors.primary }}>cairo Egypt</span>
                                        </div>
                                    </div>
                                    <div className='col-md-1 position-relative'>
                                        <i className="bi bi-bookmark fs-1 position-absolute text-black-50 " style={{ top: '-13px !important', fontSize: '3rem !important' }}></i>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='row'>
                                            <div className='col-md-3 col-3'>
                                                <img src="../../Images/image1.png" alt='image1' />
                                            </div>
                                            <div className='col-md-3 col-3'>
                                                <img src="../../Images/image2.png" alt='image2' />
                                            </div>
                                            <div className='col-md-3 col-3'>
                                                <img src="../../Images/image3.png" alt='image3' />
                                            </div>
                                            <div className='col-md-3 col-3'>
                                                <img src="../../Images/image4.png" alt='image4' />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row p-4'>
                                    <div className='col-md-9'>
                                        <h4 className='fw-bold fs-4' style={{ color: colors.secondary }}>500 EGY</h4>
                                        <p className='text-black-50 fs-6'>Total</p>
                                    </div>
                                    <div className='col-md-3'>
                                        <button className='btn btn-primary w-100'>Book Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-3 col-sm-12'>
                        <div className='card shadow'>
                            <div className='card-body p-0'>
                                <div className='col-md-12' style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                                    <h6 className='fs-5 fw-bold pt-3' style={{ color: colors.secondary, cursor: 'pointer' }}>Destination</h6>
                                    <p className='fs-6 text-black-50'>Cairo , Egypt</p>
                                </div>
                                <div className='col-md-12' style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                                    <h6 className='fs-5 fw-bold pt-3' style={{ color: colors.secondary, cursor: 'pointer' }}>Date</h6>
                                    <p className='fs-6 text-black-50'>Cairo , Egypt</p>
                                </div>
                                <div className='col-md-12' style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                                    <h6 className='fs-5 fw-bold pt-3' style={{ color: colors.secondary, cursor: 'pointer' }}>Time</h6>
                                    <p className='fs-6 text-black-50'>Cairo , Egypt</p>
                                </div>
                                <div className='col-md-12'>
                                    <h6 className='fs-5 fw-bold pt-3' style={{ color: colors.secondary, cursor: 'pointer' }}>Group</h6>
                                    <p className='fs-6 text-black-50'>Cairo , Egypt</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='card shadow'>
                            <div className='card-body p-0'>
                                <div className='col-md-8'>
                                    <div className='row'>
                                        <div className='col-md-3 text-center text-capitalize'>
                                            <h6 className={`fs-5 fw-bold p-3 user-select-none ${activeTab === 'overview' ? 'selected-tab' : ''}`} style={{ color: colors.secondary, cursor: 'pointer', borderBottom: activeTab === 'overview' ? '5px solid gold' : 'none' }} onClick={() => handleTabClick('overview')}>overview</h6>
                                        </div>
                                        <div className='col-md-3 text-center text-capitalize'>
                                            <h6 className={`fs-5 fw-bold p-3 user-select-none ${activeTab === 'program' ? 'selected-tab' : ''}`} style={{ color: colors.secondary, cursor: 'pointer', borderBottom: activeTab === 'program' ? '5px solid gold' : 'none' }} onClick={() => handleTabClick('program')}>program</h6>
                                        </div>
                                        <div className='col-md-3 text-center text-capitalize'>
                                            <h6 className={`fs-5 fw-bold p-3 user-select-none ${activeTab === 'reviews' ? 'selected-tab' : ''}`} style={{ color: colors.secondary, cursor: 'pointer', borderBottom: activeTab === 'reviews' ? '5px solid gold' : 'none' }} onClick={() => handleTabClick('reviews')}>reviews</h6>
                                        </div>
                                        <div className='col-md-3 text-center text-capitalize'>
                                            <h6 className={`fs-5 fw-bold p-3 user-select-none ${activeTab === 'questions' ? 'selected-tab' : ''}`} style={{ color: colors.secondary, cursor: 'pointer', borderBottom: activeTab === 'questions' ? '5px solid gold' : 'none' }} onClick={() => handleTabClick('questions')}>Questions and politics</h6>
                                        </div>
                                    </div>
                                </div>
                                {/* <div>
                            <div className='col-md-12 mt-5'>
                                <div className='row p-3'>
                                    <div className='col-md-3 d-flex'>
                                        <i className="bi bi-clock fw-bold me-3" style={{fontSize:'2rem'}}></i>
                                        <div>
                                            <h6 className='fs-6 fw-bold'>Duration</h6>
                                            <p className='fs-6 text-black-50'>10 Days</p>
                                        </div>

                                    </div>
                                    <div className='col-md-3 d-flex'>
                                        <i className="bi bi-backpack fw-bold me-3" style={{fontSize:'2rem'}}></i>
                                        <div>
                                            <h6 className='fs-6 fw-bold'>Tour Type</h6>
                                            <p className='fs-6 text-black-50'>Daily Tour</p>
                                        </div>
                                    </div>
                                    <div className='col-md-3 d-flex'>
                                    <i class="bi bi-people fw-bold me-3" style={{fontSize:'2rem'}}></i>
                                    <div>
                                        <h6 className='fs-6 fw-bold'>Group Size</h6>
                                        <p className='fs-6 text-black-50'>6 peoples</p>
                                    </div>
                                    </div>
                                    <div className='col-md-3 d-flex'>
                                        <i className="bi bi-translate fw-bold me-3" style={{fontSize:'2rem'}}></i>
                                        <div>
                                            <h6 className='fs-6 fw-bold'>Languages</h6>
                                            <p className='fs-6 text-black-50'>English + 2more</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-12 mt-3 p-3'>
                                <h2 className='fs-1 fw-bold text-capitalize'>
                                    About this tour
                                </h2>
                                <p className='fs-6 text-black-50'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore alias, voluptas fugit, officiis deleniti similique sit perspiciatis fugiat provident, unde minus consequuntur ducimus quae distinctio animi est libero magnam totam ipsam! Explicabo, quia nulla. Dolorem, a rem? Molestias dolor ratione dolorum mollitia sapiente aliquam voluptatem dolorem, labore quo asperiores id, quia excepturi eius minima eum quasi quas iure accusamus facilis at iusto voluptate nemo blanditiis! Laudantium mollitia veritatis quam nam, nulla placeat cupiditate quis aliquam error facere harum soluta saepe, excepturi vero optio voluptate, aperiam non officia. Placeat excepturi iusto voluptatibus, harum voluptatem odit ab, nesciunt consequatur enim, incidunt totam hic accusamus aperiam quo rerum minus veritatis tempora. Non tempore labore, repellat dolorum impedit mollitia odit eos amet sit quod perspiciatis dolore suscipit quos, nemo dolores molestiae assumenda ad ipsa voluptatum odio laborum blanditiis aliquid! Aut minima sint pariatur inventore accusamus magnam sed veritatis consequuntur. Labore, cumque neque! Veritatis ipsum molestiae a vel asperiores aperiam necessitatibus ullam quos delectus officia exercitationem, repellendus libero debitis nam modi obcaecati reiciendis, ab quidem in possimus. Earum, fugiat nam quia ad quod numquam blanditiis officiis cupiditate assumenda autem, error, dolorem molestiae quisquam voluptates expedita soluta quas excepturi ipsa facilis mollitia ipsum itaque at eaque.</p>
                            </div>

                            <div className='col-md-12  p-3'>
                                <h2 className='fs-1 fw-bold text-capitalize'>
                                    highlights
                                </h2>
                                <ul>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                    <li>Lorem ipsum dolor sit amet.</li>
                                </ul>
                            </div>

                            <div className='col-md-12 p-3'>
                                <h2 className='fs-1 fw-bold text-capitalize'>
                                    included / excluded
                                </h2>
                                <div className='col-md-12 d-flex'>
                                    <div className='col-md-6'>
                                        <div className=''>
                                            <i className="bi bi-check fw-bold fs-4 me-2" style={{color: colors.secondary}}></i>
                                            <span className='text-black  fs-6 text-capitalize'>private  transport</span> 
                                        </div>
                                        <div className=''>
                                            <i className="bi bi-check fw-bold fs-4 me-2" style={{color: colors.secondary}}></i>
                                            <span className='text-black  fs-6 text-capitalize'>private  transport</span> 
                                        </div>
                                        <div className=''>
                                            <i className="bi bi-check fw-bold fs-4 me-2" style={{color: colors.secondary}}></i>
                                            <span className='text-black  fs-6 text-capitalize'>private  transport</span> 
                                        </div>
                                        <div className=''>
                                            <i className="bi bi-check fw-bold fs-4 me-2" style={{color: colors.secondary}}></i>
                                            <span className='text-black  fs-6 text-capitalize'>private  transport</span> 
                                        </div>
                                        <div className=''>
                                            <i className="bi bi-check fw-bold fs-4 me-2" style={{color: colors.secondary}}></i>
                                            <span className='text-black  fs-6 text-capitalize'>private  transport</span> 
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className=''>
                                            <i className="bi bi-x-lg text-danger  fw-bold fs-4 me-2" ></i>
                                            <span className='text-black  fs-6 text-capitalize'>private  transport</span> 
                                        </div>
                                        <div className=''>
                                            <i className="bi bi-x-lg text-danger  fw-bold fs-4 me-2" ></i>
                                            <span className='text-black  fs-6 text-capitalize'>private  transport</span> 
                                        </div>
                                        <div className=''>
                                            <i className="bi bi-x-lg text-danger  fw-bold fs-4 me-2" ></i>
                                            <span className='text-black  fs-6 text-capitalize'>private  transport</span> 
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div> */}

                                {/* <div>
                                    <div className='col-md-12 p-3' style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                                        <div className='d-flex align-items-center '>
                                            <i class="bi bi-1-circle fw-bold me-3" style={{ color: colors.secondary, fontSize: '5rem' }}></i>
                                            <h4 className='font-capitalize'>Departing</h4>
                                        </div>
                                    </div>
                                    <div className='col-md-12 p-3' style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                                        <div className='d-flex align-items-center '>
                                            <i class="bi bi-2-circle fw-bold me-3" style={{ color: colors.secondary, fontSize: '5rem' }}></i>
                                            <h4 className='font-capitalize'>BreakFast</h4>
                                        </div>
                                    </div>
                                    <div className='col-md-12 p-3' style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                                        <div className='d-flex align-items-center '>
                                            <i class="bi bi-3-circle fw-bold me-3" style={{ color: colors.secondary, fontSize: '5rem' }}></i>
                                            <h4 className='font-capitalize'>pyramids of giza</h4>
                                        </div>
                                    </div>
                                    <div className='col-md-12 p-3' >
                                        <div className='d-flex align-items-center '>
                                            <i class="bi bi-4-circle fw-bold me-3" style={{ color: colors.secondary, fontSize: '5rem' }}></i>
                                            <h4 className='font-capitalize'>saqqara</h4>
                                        </div>
                                    </div>
                                </div> */}


                                <div>
                                    <div className='card'>
                                        <div className='row'>
                                            <div className='col-md-5 fs-2 fw-bold border-right'>
                                                <p className='text-align-left' style={{ color: colors.secondary }}>5/5</p>
                                                <p className='text-black'>Excellent</p>
                                                <div className='d-flex m-3 ms-0 fs-5'>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>

                                                    <div className='text-black-50 ms-3'>(250 Reviews)</div>
                                                </div>
                                            </div>

                                            <div className='col-md-7'>
                                                <div className='d-flex align-items-baseline'>
                                                    <p className='fw-bold me-4 fs-5 text-black-50'>Excellent</p>
                                                    <div className="progress w-100" style={{height: '15px'}}>
                                                        <div className="progress-bar" role="progressbar" style={{width: '25%', backgroundColor: colors.secondary}}  />
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-baseline'>
                                                    <p className='fw-bold me-4 fs-5 text-black-50'>Very Good </p>
                                                    <div className="progress w-100" style={{height: '15px'}}>
                                                        <div className="progress-bar" role="progressbar" style={{width: '25%', backgroundColor: colors.secondary}}  />
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-baseline'>
                                                    <p className='fw-bold me-4 fs-5 text-black-50'>Average</p>
                                                    <div className="progress w-100" style={{height: '15px'}}>
                                                        <div className="progress-bar" role="progressbar" style={{width: '25%', backgroundColor: colors.secondary}}  />
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-baseline'>
                                                    <p className='fw-bold me-4 fs-5 text-black-50'>Good</p>
                                                    <div className="progress w-100" style={{height: '15px'}}>
                                                        <div className="progress-bar" role="progressbar" style={{width: '25%', backgroundColor: colors.secondary}}  />
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-baseline'>
                                                    <p className='fw-bold me-4 fs-5 text-black-50'>Boor</p>
                                                    <div className="progress w-100" style={{height: '15px'}}>
                                                        <div className="progress-bar" role="progressbar" style={{width: '25%', backgroundColor: colors.secondary}}  />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>






                    <div className='related-tour'>
                        <h2 className='fw-bold fs-1 text-center col-md-12 mt-4 mb-4'>
                            Related Tours
                        </h2>

                        <div className='row'>
                            <div className='col-md-4 d-flex justify-content-center '>
                                <div class="card p-0 w-75">
                                    <div className='position-relative'>
                                        <img src="https://i.pinimg.com/564x/9c/70/7b/9c707b0ffd93a9a3268815dbed5b2fb0.jpg" class="card-img-top img-fluid" alt="..." style={{height:"300px" }}/>
                                        <i class="bi bi-bookmark fw-lighter fw-bold position-absolute end-0 text-white " style={{ fontSize: '3rem' , top:"-13px" , right:"15px" , cursor:"pointer"}}></i>
                                        <p className='position-absolute translate-middle fw-bold text-white fs-5 px-2 py-1 text-capitalize rounded-2' style={{backgroundColor:colors.secondary , top:"2rem" , left:"4rem"}}>featured</p>
                                        <p className='position-absolute translate-middle fw-bold text-white fs-5 px-2 py-1  rounded-2 bg-danger' style={{ top:"5rem" , left:"3rem"}}>-80 %</p>
                                    </div>
                                    <div class="card-body">
                                        <div className='d-flex fs-6'>
                                        <i class="bi bi-geo-alt me-3"></i>
                                        <p className='text-capitalize'>cairo, egypt</p>
                                        </div>

                                        <div className='border-bottom'>
                                            <div className='fw-bold fs-5'>Lorem ipsum, dolor sit amet consectetur adipisicing.</div>
                                                <div className='d-flex m-3 ms-0'>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>

                                                    <div className='text-black-50 ms-3'>(250 Reviews)</div>
                                                </div>
                                        </div>

                                        <div className='d-flex justify-content-between mt-3'>
                                            <div className=''>
                                                <div className='d-flex flex-row-reverse'>
                                                    <del className='fw-bold text-black-50 '>1100</del>
                                                </div>
                                                <div className='d-flex align-items-center'>
                                                    <p>From</p>
                                                    <p className='ms-3 fw-bold fs-4' style={{color:colors.secondary}}>EGY 1000</p>
                                                </div>
                                            </div>

                                            <div >
                                                <p className='text-black-50'><i class="bi bi-clock"></i> 10 days</p>
                                                <p className='text-black-50'><i class="bi bi-check2"></i> free cancellation</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4 d-flex justify-content-center'>
                                <div class="card p-0 w-75">
                                    <div className='position-relative'>
                                        <img src="https://i.pinimg.com/564x/9c/70/7b/9c707b0ffd93a9a3268815dbed5b2fb0.jpg" class="card-img-top img-fluid" alt="..." style={{height:"300px" }}/>
                                        <i class="bi bi-bookmark fw-lighter fw-bold position-absolute end-0 text-white " style={{ fontSize: '3rem' , top:"-13px" , right:"15px" , cursor:"pointer"}}></i>
                                        <p className='position-absolute translate-middle fw-bold text-white fs-5 px-2 py-1 text-capitalize rounded-2' style={{backgroundColor:colors.secondary , top:"2rem" , left:"4rem"}}>featured</p>
                                        <p className='position-absolute translate-middle fw-bold text-white fs-5 px-2 py-1  rounded-2 bg-danger' style={{ top:"5rem" , left:"3rem"}}>-80 %</p>
                                    </div>
                                    <div class="card-body">
                                        <div className='d-flex fs-6'>
                                        <i class="bi bi-geo-alt me-3"></i>
                                        <p className='text-capitalize'>cairo, egypt</p>
                                        </div>

                                        <div className='border-bottom'>
                                            <div className='fw-bold fs-5'>Lorem ipsum, dolor sit amet consectetur adipisicing.</div>
                                                <div className='d-flex m-3 ms-0'>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>

                                                    <div className='text-black-50 ms-3'>(250 Reviews)</div>
                                                </div>
                                        </div>

                                        <div className='d-flex justify-content-between mt-3'>
                                            <div className=''>
                                                <div className='d-flex flex-row-reverse'>
                                                    <del className='fw-bold text-black-50 '>1100</del>
                                                </div>
                                                <div className='d-flex align-items-center'>
                                                    <p>From</p>
                                                    <p className='ms-3 fw-bold fs-4' style={{color:colors.secondary}}>EGY 1000</p>
                                                </div>
                                            </div>

                                            <div >
                                                <p className='text-black-50'><i class="bi bi-clock"></i> 10 days</p>
                                                <p className='text-black-50'><i class="bi bi-check2"></i> free cancellation</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4 d-flex justify-content-center'>
                                <div class="card p-0 w-75">
                                    <div className='position-relative'>
                                        <img src="https://i.pinimg.com/564x/9c/70/7b/9c707b0ffd93a9a3268815dbed5b2fb0.jpg" class="card-img-top img-fluid" alt="..." style={{height:"300px" }}/>
                                        <i class="bi bi-bookmark fw-lighter fw-bold position-absolute end-0 text-white " style={{ fontSize: '3rem' , top:"-13px" , right:"15px" , cursor:"pointer"}}></i>
                                        <p className='position-absolute translate-middle fw-bold text-white fs-5 px-2 py-1 text-capitalize rounded-2' style={{backgroundColor:colors.secondary , top:"2rem" , left:"4rem"}}>featured</p>
                                        <p className='position-absolute translate-middle fw-bold text-white fs-5 px-2 py-1  rounded-2 bg-danger' style={{ top:"5rem" , left:"3rem"}}>-80 %</p>
                                    </div>
                                    <div class="card-body">
                                        <div className='d-flex fs-6'>
                                        <i class="bi bi-geo-alt me-3"></i>
                                        <p className='text-capitalize'>cairo, egypt</p>
                                        </div>

                                        <div className='border-bottom'>
                                            <div className='fw-bold fs-5'>Lorem ipsum, dolor sit amet consectetur adipisicing.</div>
                                                <div className='d-flex m-3 ms-0'>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    <i class="bi bi-star-fill" style={{color:'gold'}}></i>

                                                    <div className='text-black-50 ms-3'>(250 Reviews)</div>
                                                </div>
                                        </div>

                                        <div className='d-flex justify-content-between mt-3'>
                                            <div className=''>
                                                <div className='d-flex flex-row-reverse'>
                                                    <del className='fw-bold text-black-50 '>1100</del>
                                                </div>
                                                <div className='d-flex align-items-center'>
                                                    <p>From</p>
                                                    <p className='ms-3 fw-bold fs-4' style={{color:colors.secondary}}>EGY 1000</p>
                                                </div>
                                            </div>

                                            <div >
                                                <p className='text-black-50'><i class="bi bi-clock"></i> 10 days</p>
                                                <p className='text-black-50'><i class="bi bi-check2"></i> free cancellation</p>
                                            </div>
                                        </div>

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
