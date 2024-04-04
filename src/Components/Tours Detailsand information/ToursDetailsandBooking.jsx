import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { colors } from '../../colors'
import { Rating } from '@mui/material';

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
                                            <span className='ms-3' style={{ color: colors.primary }}>(250 reviews) </span>
                                        </div>
                                        <div className='text-black-50 fw-bold'>
                                            <i className="bi bi-geo-alt-fill me-1" ></i>
                                            <span style={{ color: colors.primary }}>cairo Egypt</span>
                                        </div>
                                    </div>
                                    <div className='col-md-1 position-relative '>
                                        <i className="bi bi-bookmark fs-1 position-absolute text-black-50 " style={{ top: '-13px !important', fontSize: '3rem !important' }}></i>
                                    </div>
                                </div>
                                <div style={{ height: '550px' }}>
                                    <div className='row'>
                                        <div className='col-md-12' style={{ height: '400px !important' }}>
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <img src="https://i.pinimg.com/236x/1f/1e/80/1f1e80a8c3d561346588d15c33ab2d1b.jpg" className='w-100 h-50' alt='image1' style={{ borderRadius: '10px' }} />
                                                </div>
                                                <div className='col-lg-6 d-none d-md-block'>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <img src="https://i.pinimg.com/236x/be/20/65/be2065f863d9f8236b727e206a1ec06a.jpg" className='w-100 h-25 gap-1 pb-1' alt='image2' style={{ borderRadius: '10px' }} />
                                                            <img src="https://i.pinimg.com/236x/be/20/65/be2065f863d9f8236b727e206a1ec06a.jpg" className='w-100 h-25 gap-1 pt-1' alt='image2' style={{ borderRadius: '10px' }} />
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <img src="https://i.pinimg.com/236x/8c/4e/9d/8c4e9d4f1c16c0f732afbc43953c8e83.jpg" className='w-100 h-25 gap-1 pb-1' alt='image4' style={{ borderRadius: '10px' }} />
                                                            <img src="https://i.pinimg.com/236x/8c/4e/9d/8c4e9d4f1c16c0f732afbc43953c8e83.jpg" className='w-100 h-25 gap-1 pt-1' alt='image4' style={{ borderRadius: '10px' }} />
                                                        </div>
                                                    </div>
                                                </div>
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
                                        <button className='btn text-white  w-100' style={{ backgroundColor: colors.secondary }}>Book Now</button>
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


                                {/* <div>
                                    <div className='card'>
                                        <div className='row align-items-center'>
                                            <div className='col-md-5 fs-2 fw-bold border-right' style={{ borderRight: '4px solid rgba(0,0,0,0.1)' }}>
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

                                            <div className='col-md-7 border-bottom-1'>
                                                <div className='d-flex align-items-baseline w-75 justify-content-around'>
                                                    <div className='col-md-2'>
                                                        <p className='fw-bold me-4 fs-5 text-black-50'>Excellent</p>
                                                    </div>
                                                    <div className="progress col-md-7" style={{height: '15px'}}>
                                                        <div className="progress-bar " role="progressbar" style={{width: '25%', backgroundColor: colors.secondary}}  />
                                                    </div>
                                                    <div className='col-md-1'>
                                                        <p className='fw-bold ms-3' style={{color:colors.secondary}} >70</p>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-baseline w-75 justify-content-around'>
                                                    <div className='col-md-2'>
                                                        <p className='fw-bold me-4 fs-5 text-black-50'>Very Good</p>
                                                    </div>
                                                    <div className="progress col-md-7" style={{height: '15px'}}>
                                                        <div className="progress-bar " role="progressbar" style={{width: '25%', backgroundColor: colors.secondary}}  />
                                                    </div>
                                                    <div className='col-md-1'>
                                                        <p className='fw-bold ms-3' style={{color:colors.secondary}} >70</p>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-baseline w-75 justify-content-around'>
                                                    <div className='col-md-2'>
                                                        <p className='fw-bold me-4 fs-5 text-black-50'>Average</p>
                                                    </div>
                                                    <div className="progress col-md-7" style={{height: '15px'}}>
                                                        <div className="progress-bar " role="progressbar" style={{width: '25%', backgroundColor: colors.secondary}}  />
                                                    </div>
                                                    <div className='col-md-1'>
                                                        <p className='fw-bold ms-3' style={{color:colors.secondary}} >70</p>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-baseline w-75 justify-content-around'>
                                                    <div className='col-md-2'>
                                                        <p className='fw-bold me-4 fs-5 text-black-50'>Good</p>
                                                    </div>
                                                    <div className="progress col-md-7" style={{height: '15px'}}>
                                                        <div className="progress-bar " role="progressbar" style={{width: '25%', backgroundColor: colors.secondary}}  />
                                                    </div>
                                                    <div className='col-md-1'>
                                                        <p className='fw-bold ms-3' style={{color:colors.secondary}} >70</p>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-baseline w-75 justify-content-around'>
                                                    <div className='col-md-2'>
                                                        <p className='fw-bold me-4 fs-5 text-black-50'>Boor</p>
                                                    </div>
                                                    <div className="progress col-md-7" style={{height: '15px'}}>
                                                        <div className="progress-bar " role="progressbar" style={{width: '25%', backgroundColor: colors.secondary}}  />
                                                    </div>
                                                    <div className='col-md-1'>
                                                        <p className='fw-bold ms-3' style={{color:colors.secondary}} >70</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <p className='w-100 text-center fw-bold fs-5 text-black-50'>250 reviews on this Tour-Showing 1 to 2</p>

                                    <div className='review' style={{borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                                        <div className='row p-3'>
                                            <div className='col-md-4 d-flex align-items-center'>
                                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="rounded-circle text-center me-3 img-fluid" alt='profile-picture' style={{height: '150px', width: '150px'}}/>
                                                <div className='ms-2'>
                                                    <p className='text-black fw-bold fs-5 m-0'>Adam Osama</p>
                                                    <p className='text-black-50 m-0'>Aug  12 2022</p>
                                                    <div className='m-0'>
                                                        <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                        <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                        <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                        <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                        <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='col-md-8'>
                                                <p className='fs-5 fw-bold text-end m-0 me-5'>helpful <i class="bi bi-heart-fill" style={{color:colors.secondary}}></i></p>
                                            </div>

                                            <div className='col-md-12'>
                                                <div className='mt-3'>
                                                    <h5>It was an amazing Tour!</h5>
                                                    <p className='text-black-50'>
                                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus ducimus beatae consequatur, dicta eum dolorem natus quidem! Eveniet, iusto cumque! Quisquam qui nihil nostrum nulla fugiat officiis voluptates totam eum dolor optio repellendus explicabo, deserunt odit quidem autem similique eaque facere aspernatur reiciendis. Neque magnam iste facilis, reprehenderit numquam eveniet animi alias incidunt pariatur optio amet quod nostrum labore quos vitae. Nesciunt voluptate corporis ullam pariatur in impedit magnam maxime hic fugit sequi at, officiis reiciendis. Quibusdam fugiat corrupti est reiciendis neque nihil asperiores dolor quis deserunt aspernatur libero quidem iusto voluptates explicabo harum veniam illo dolores cum, dolorum ducimus nostrum illum! Facere dolorum incidunt delectus. Debitis obcaecati est consectetur sed in, nulla quaerat iste cupiditate fuga repellendus! Velit libero quae ullam, eum illum consequatur ipsa dolorem autem nihil harum quisquam iste, necessitatibus repudiandae veritatis ex error aut laudantium accusantium adipisci vitae magnam aliquam voluptas itaque. Quam iste ipsam fugiat perspiciatis quis incidunt placeat voluptates maiores tenetur, consectetur quae, animi unde saepe ducimus esse, nemo qui dolore aut. Reiciendis iste recusandae omnis perspiciatis corrupti consectetur itaque harum odio officia, rerum asperiores, ratione soluta sapiente. Iusto repellendus recusandae doloribus magni. Repellat omnis necessitatibus rerum quaerat ipsam autem doloribus natus velit officia?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='add-review'>

                                        <div className='fs-4 mt-4 fw-bold'>
                                            Leave a reveiew
                                        </div>

                                        <p className='fw-bold text-black-50 mt-2 mb-0'>Your e-mail address will not be show to other</p>

                                        <div className=''>
                                            <form className='form-group'>

                                                <div className='row'>
                                                        <div className='col-md-6'>
                                                            <input type="text" className='form-control p-4 fs-5 my-3' placeholder='Name'></input>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <input type="email" className='form-control p-4 fs-5 my-3' placeholder='Email'></input>
                                                        </div>
                                                        <div className='col-md-12'>
                                                            <input type="text" className='form-control p-4 fs-5 ' placeholder='Give your review a title'></input>
                                                        </div>

                                                        <div className='card col-md-6 m-0 my-3'>
                                                            <div className='d-flex justify-content-between'>
                                                                <p className='fs-6 fw-bold text-black-50'>Guide</p>
                                                                <Rating name="simple-controlled" value="2"  style={{color:"gold"}}/>
                                                            </div>
                                                            <div className='d-flex justify-content-between'>
                                                                <p className='fs-6 fw-bold text-black-50'>Location</p>
                                                                <Rating name="simple-controlled" value="2"  style={{color:"gold"}}/>
                                                            </div>
                                                            <div className='d-flex justify-content-between'>
                                                                <p className='fs-6 fw-bold text-black-50'>Cleanliness</p>
                                                                <Rating name="simple-controlled" value="2"  style={{color:"gold"}}/>
                                                            </div>
                                                            <div className='d-flex justify-content-between'>
                                                                <p className='fs-6 fw-bold text-black-50'>Service</p>
                                                                <Rating name="simple-controlled" value="2"  style={{color:"gold"}}/>
                                                            </div>
                                                            <div className='d-flex justify-content-between'>
                                                                <p className='fs-6 fw-bold text-black-50'>Transportaion</p>
                                                                <Rating name="simple-controlled" value="2"  style={{color:"gold"}}/>
                                                            </div>
                                                        </div>

                                                        <div className='col-md-6'>
                                                            <textarea rows={7} type="text" className='form-control p-4 fs-5 my-3' placeholder='Write your review'></textarea>
                                                        </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>

                                    
                                </div> */}


                                {/* <div className='Quetions'>
                                    <div className=''>
                                        <h2 className='fw-bold fs-1'>What tourists ask about the tour ?</h2>
                                    </div>
                                    <div className='row'>
                                        <div className='card  col-md-11'>
                                            <h3 className='fw-bold'><i class="bi bi-chat-left me-3 text-black-50"></i>Do you offer hotel transfers?</h3>
                                            <p className='fw-bold w-75 mt-2 text-black-50'>Hotel transfers are included in the price of this tour, however you can set your hotel location in advance. In this case a tour operator representative will be at the hotel to pickup you you. All you need to do is just to set the hotel location in the checkout page which we’ll ask you to put your location.</p>
                                        </div>
                                        <div className='card col-md-11'>
                                            <h3 className='fw-bold'><i class="bi bi-chat-left me-3 text-black-50"></i>Do you offer accessiblity staffs.</h3>
                                        </div>
                                    </div>
                                    <div className='col-md-6' style={{borderTop:"1px solid rgba(0,0,0,0.1)"}}>
                                        <h2 className='fw-bold fs-1 pt-3'>Cancellation policy</h2>
                                    </div>                                
                                    <div>
                                        <p className='text-black-50'>You can cancel up to 24 hours in advance of the experience for a full refund.</p>
                                        <ul>
                                            <li className='text-black-50'>For a full refund, you must cancel at least 24 hours before the experience’s start time.</li>
                                            <li className='text-black-50'>If you cancel less than 24 hours before the experience’s start time, the amount you paid will not be refunded.</li>
                                            <li className='text-black-50'>Any changes made less than 24 hours before the experience’s start time will not be accepted.</li>
                                        </ul>
                                    </div>
                                </div> */}


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
