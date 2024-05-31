import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { colors } from '../../colors';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


export default function BookingVisa() {
    const [tourInfo, setTourInfo] = useState(null);
    const [numberOfTravelers, setNumberOfTravelers] = useState(0);
    const [travelerData, setTravelerData] = useState([]);
    const [paymentOption, setPaymentOption] = useState('payNow');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const user = jwtDecode(localStorage.getItem("token"));

    const location = useLocation();
    const userId = user.id;
    const userEmail = user.email;

    console.log(userId);
    console.log(userEmail);
    console.log(coupon); 

    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.tourId) {
            axios.get(`http://localhost:2000/tours/tour/${location.state.tourId}`)
                .then(response => {
                    setNumberOfTravelers(location.state.numberOfTravelers);
                    setTourInfo(response.data.data);
                })
                .catch(error => {
                    console.error("Error fetching tour data:", error);
                });
        }
    }, [location.state]);

    const handlePaymentOptionChange = (option) => {
        setPaymentOption(option);
    };

    const handleBooking = () => {
        axios.post(`http://localhost:2000/booking`, {
            user: userId,
            tour: location.state.tourId,
            travelers: travelerData,
            numOfPeople: location.state.numberOfTravelers
        })
            .then(response => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 3000
                });
                navigate('/OrderResponse', { state: { bookingResponse: response.data } });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message
                });
            });
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedTravelerData = [...travelerData];
        updatedTravelerData[index] = { ...updatedTravelerData[index], [name]: value };
        setTravelerData(updatedTravelerData);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    };

    const getOffer = () => {
        axios.post('http://localhost:2000/coupon/validate-coupon', { code: coupon, email: userEmail })
            .then(response => {
                if (response.data.valid) {
                    setDiscount(response.data.discount);
                    Swal.fire({
                        title: "Coupon Applied",
                        icon: "success",
                        width: 600,
                        padding: "3em",
                        color: "#716add",
                        background: "#fff url(/images/trees.png)",
                        backdrop: `
                            rgba(0,0,123,0.4)
                            url("/images/nyan-cat.gif")
                            left top
                            no-repeat
                        `
                    });
                } else {
                    Swal.fire({
                        title: "Invalid Coupon",
                        text: "The coupon code is not valid.",
                        icon: "error",
                        width: 600,
                        padding: "3em",
                        color: "#716add",
                        background: "#fff url(/images/trees.png)",
                        backdrop: `
                            rgba(0,0,123,0.4)
                            url("/images/nyan-cat.gif")
                            left top
                            no-repeat
                        `
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error",
                    text: "An error occurred while validating the coupon.",
                    icon: "error",
                    width: 600,
                    padding: "3em",
                    color: "#716add",
                    background: "#fff url(/images/trees.png)",
                    backdrop: `
                        rgba(0,0,123,0.4)
                        url("/images/nyan-cat.gif")
                        left top
                        no-repeat
                    `
                });
            });
    };
    

    if (!tourInfo) {
        return <div>Loading...</div>;
    }

    const travelerSections = [];
    for (let i = 0; i < numberOfTravelers; i++) {
        travelerSections.push(
            <div className='row' key={i}>
                <h4 className='fw-bold mt-4'>Traveler {i + 1} (Adult)</h4>
                <div className='col-md-6'>
                    <label htmlFor={`firstname-${i}`} className='text-black fw-bold'>First Name</label>
                    <input type="text" className='form-control' id={`firstname-${i}`} name={`firstname-${i}`} onChange={(event) => handleInputChange(i, event)} />
                </div>
                <div className='col-md-6'>
                    <label htmlFor={`lastname-${i}`} className='text-black fw-bold'>Last Name</label>
                    <input type="text" className='form-control' id={`lastname-${i}`} name={`lastname-${i}`} onChange={(event) => handleInputChange(i, event)} />
                </div>
            </div>
        );
    }

    const totalPrice = tourInfo.price * numberOfTravelers;
    const discountedPrice = totalPrice - (totalPrice * (discount / 100));
    

    return (
        <>
            <Navbar></Navbar>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='card '>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <i className='bi bi-1-circle me-3' style={{ color: colors.secondary, fontSize: ' 4rem' }}></i>
                                            <div>
                                                <h3 className='fw-bold' style={{ color: colors.primary }}>
                                                    Contact Us
                                                </h3>
                                                <p className='m-0' style={{ color: colors.primary }}>We’ll use this information to sent you confirmation and updates about your booking.</p>
                                            </div>

                                            <div ></div>
                                        </div>
                                        <div className='col-md-12'>
                                            <div className='card bg-secondary.bg-gradient m-0' style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                                <div className='d-flex justify-content-between'>
                                                    <p className='fs-4 text-black m-0'>Sign in <strong>as a Guest</strong></p>
                                                    <p className='fs-4 fw-bold m-0' style={{ color: colors.secondary }}>
                                                        Login
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-12'>
                                            <form className='form-group'>
                                                <div className='row'>
                                                    <div className='col-md-6 mt-3'>
                                                        <label htmlFor="firstname" className='text-black fw-bold'>First Name</label>
                                                        <input type="text" className='form-control' />
                                                    </div>
                                                    <div className='col-md-6 mt-3'>
                                                        <label htmlFor="lastname" className='text-black fw-bold'>Last Name</label>
                                                        <input type="text" className='form-control' />
                                                    </div>
                                                    <div className='col-md-6 mt-3'>
                                                        <label htmlFor="email" className='text-black fw-bold'>Email</label>
                                                        <input type="email" className='form-control' />
                                                    </div>
                                                    <div className='col-md-6 mt-3'>
                                                        <label htmlFor="phonenumber" className='text-black fw-bold'>Phone Number</label>
                                                        <input type="tel" className='form-control' />
                                                    </div>
                                                    <div className='col-md-12 mt-4'>
                                                        <div class="form-check d-flex align-items-center p-0">
                                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" className='me-2' style={{ width: '1.5rem', height: '1.5rem' }} />
                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                Get emails with special offers, inspiration, tips, and other updates from <br></br> Trollii. You can unsubscribe at any time.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <div className='d-flex align-items-center'>
                                            <i className='bi bi-2-circle me-3' style={{ color: colors.secondary, fontSize: ' 4rem' }}></i>
                                            <div>
                                                <h3 className='fw-bold' style={{ color: colors.primary }}>
                                                    Activity Details
                                                </h3>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-md-5'>
                                                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className='w-100 rounded-3 h-100' alt="..." />
                                            </div>

                                            <div className='col-md-7'>
                                                <h4 className='fw-bold' >{tourInfo.description}</h4 >
                                                <p className='fw-bold  text-black-50 '><i class="bi bi-geo-alt"></i> {tourInfo.location}</p>
                                                <p className='fw-bold  text-black-50 '><i class="bi bi-people"></i> {tourInfo.totalTravelers} travellers</p>
                                                <div className='d-flex align-items-center'>
                                                    <i class="bi bi-check-lg fw-bold me-1 fs-5" style={{ color: colors.secondary, fontWeight: 'bold' }}></i>
                                                    <p className='fw-bold  text-black-50 m-0 '>Free cancellation before {tourInfo.startTime} AM (local time) <br></br>on {formatDate(tourInfo.startDate)}</p>
                                                </div>
                                                <p className='fw-bold  text-black-50 m-0'>This tour is hosted by a business</p>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <form className='form-group'>
                                                {
                                                    travelerSections
                                                }
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='card'>
                                    <div className='d-flex align-items-center'>
                                        <i className='bi bi-3-circle me-3' style={{ color: colors.secondary, fontSize: ' 4rem' }}></i>
                                        <div>
                                            <h3 className='fw-bold' style={{ color: colors.primary }}>
                                                Payment Details
                                            </h3>
                                        </div>
                                    </div>
                                    <h3>Choose a payment date</h3>
                                    <div className='card p-0 '>
                                        <div className='p-4 ' style={{ borderBottom: '3px solid lightgray' }} >
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentOption"
                                                    id="payNow"
                                                    value="payNow"
                                                    style={{ width: '1.5rem', height: '1.5rem' }}
                                                    checked={paymentOption === 'payNow'}
                                                    onChange={() => handlePaymentOptionChange('payNow')}
                                                />
                                                <label
                                                    className="form-check-label fw-bold fs-5 ms-2"
                                                    htmlFor="payNow"
                                                    style={{ color: colors.secondary }}
                                                >
                                                    Pay now
                                                </label>
                                            </div>

                                        </div>
                                        <div className='p-4 ' style={{ borderBottom: '3px solid lightgray' }} >
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentOption"
                                                    id="addToItinerary"
                                                    value="addToItinerary"
                                                    style={{ width: '1.5rem', height: '1.5rem' }}
                                                    checked={paymentOption === 'addToItinerary'}
                                                    onChange={() => handlePaymentOptionChange('addToItinerary')}
                                                />
                                                <label
                                                    className="form-check-label fw-bold fs-5 ms-2"
                                                    htmlFor="addToItinerary"
                                                >
                                                    Add to Travel Itinerary
                                                </label>
                                            </div>

                                        </div>

                        {paymentOption === 'payNow' && (
                            <div className='p-4' style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                <div className='row'>
                                    <form className='form-group'>
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <label className='form-check-label fw-bold fs-6 mt-4 mb-1'>Cardholder Name</label>
                                                <input type='text' className='form-control'></input>
                                            </div>
                                            <div className='col-md-12'>
                                                <label className='form-check-label fw-bold fs-6 mt-4 mb-1'>Card Number</label>
                                                <input type='text' className='form-control'></input>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='row'>
                                                    <div className='col-md-5'>
                                                        <label className='form-check-label fw-bold fs-6 mt-4 mb-1'>Expiration date</label>
                                                        <input type='text' className='form-control' placeholder='MM'></input>
                                                    </div>
                                                    <div className='col-md-2 text-center fw-bold mt-4'>
                                                        <br className=''></br>
                                                        /
                                                    </div>
                                                    <div className='col-md-5'>
                                                        <label className='mt-4 mb-1'></label>
                                                        <input type='text' className='form-control' placeholder='YY'></input>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <label className='form-check-label fw-bold fs-6 mt-4 mb-1'>CVV</label>
                                                <input type='text' className='form-control'></input>
                                            </div>
                                            <div className='col-md-12'>
                                                <div className="form-check mt-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="saveCardInfo"
                                                        id="saveCardInfo"
                                                        style={{ width: '1.5rem', height: '1.5rem' }}
                                                    />
                                                    <label
                                                        className="form-check-label fs-5 ms-2"
                                                        htmlFor="saveCardInfo"
                                                        style={{ color: colors.primary }}
                                                    >
                                                        Save the card information for future use
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                        <div className='p-4 py-2' style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                            Add things to Travel Itinerary no extra fees. <strong>You'll be charged the amount 2 days before the trip date</strong>. You can pay or cancel at any time before then. Learn more
                        </div>
                    </div>

                    <hr className='my-4'></hr>

                    {paymentOption === 'payNow' && (
                        <div>
                            <h3 className=''>Choose a payment method</h3>

                            <div className='card p-0'>
                                <div className='p-4 ' style={{ borderBottom: '3px solid lightgray' }}>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id="payWithCard"
                                            value="payWithCard"
                                            style={{ width: '1.5rem', height: '1.5rem' }}
                                        />
                                        <label
                                            className="form-check-label fw-bold fs-5 ms-2"
                                            htmlFor="payWithCard"
                                            style={{ color: colors.secondary }}
                                        >
                                            Pay with Card
                                        </label>
                                    </div>
                                </div>
                                <div className='p-4 '>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id="payWithPayPal"
                                            value="payWithPayPal"
                                            style={{ width: '1.5rem', height: '1.5rem' }}
                                        />
                                        <label className="form-check-label fw-bold fs-5 ms-2" htmlFor="payWithPayPal" style={{ color: colors.secondary }}>
                                            Pay with PayPal
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='text-center'>
                        <button onClick={handleBooking} className='w-75 btn btn-primary p-3 fw-bold' style={{ backgroundColor: colors.secondary }}>Book Now</button>
                    </div>
                </div>
            </div>
        </div>


                    </div>
                    <div className='col-md-4'>
                        <div className='card'>
                            <div className='card-body p-0'>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <img src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt='...' className='w-100 h-100 rounded-4' />
                                    </div>
                                    <div className='col-md-8'>
                                        <h5 className='fw-bold mb-1' style={{ color: colors.primary }}>{tourInfo.description}</h5>
                                        <p className='fw-bold m-0'><i class="bi bi-geo-alt"></i> {tourInfo.location}</p>
                                        <p className='fw-bold m-0'><i class="bi bi-people"></i> {tourInfo.totalTravelers} travellers</p>
                                        <p className='fw-bold fs-4 m-0'>{tourInfo.price} EGY</p>
                                    </div>
                                </div>

                                <div >
                                    <h4 className='fw-bold mt-3'>Date</h4>
                                    <p className='fw-bold  text-black-50 '>{formatDate(tourInfo.startDate)} to {formatDate(tourInfo.endDate)}<span className='fw-bold ms-3' style={{ color: colors.secondary }}></span></p>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <i class="bi bi-check-lg fw-bold" style={{ color: colors.secondary }}></i>
                                    <p className='fw-bold text-black-50 m-0 ms-2'>Free cancellation {tourInfo.startTime} (local time) on {formatDate(tourInfo.startDate)}</p>
                                </div>
                                <hr></hr>
                                <div className='row'>
                                    {/* <form> */}
                                        <div className='row'>
                                            <div className='col-md-12'>
                                                <label htmlFor="firstname" className='text-black fw-bold mb-3'>Coupoun Code</label>
                                                <div className='d-flex align-items-center'>

                                                    <input type="text" className='form-control rounded-5 p-3' style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} placeholder='Enter coupon code' value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                                    <button className='btn btn-primary rounded-3 w-100 ms-2 p-3 fw-bold' style={{ backgroundColor: colors.secondary }} onClick={getOffer}>Apply</button>

                                                </div>
                                            </div>
                                        </div>
                                    {/* </form> */}
                                </div>
                                <hr></hr>

                                <div className='row'>

                                    <div className='col-md-12'>
                                        <div className='d-flex align-items-center justify-content-between'>

                                            <p className='fw-bold text-black-50 m-0 '>Traveler</p>
                                            <p className='fw-bold text-black-50 m-0 '>{tourInfo.price} EGY</p>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <p className='fw-bold m-0 text-black-50 fs-5'>Pay amount</p>
                                            <p className='fw-bold m-0 fs-4' style={{ color: colors.secondary }}>EGP {tourInfo.price*numberOfTravelers}</p>
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
