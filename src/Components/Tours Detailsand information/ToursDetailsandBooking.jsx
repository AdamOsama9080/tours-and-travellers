import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { colors } from '../../colors';
import { Rating } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';


export default function ToursDetailsandBooking() {
    const [activeTab, setActiveTab] = useState('overview');
    const [tourData, setTourData] = useState(null); 
    const [relatedTour, setRelatedTour] = useState([]);
    const [visibleTours, setVisibleTours] = useState(3); 
    const [tourReviews, setTourReviews] = useState([]);
    const [tourRate, setTourRate] = useState(0);
    const [excellentRate, setExcellentRate] = useState(0);
    const [veryGoodRate, setVeryGoodRate] = useState(0);
    const [averageRate, setAverageRate] = useState(0);
    const [goodRate, setGoodRate] = useState(0);
    const [poorRate, setPoorRate] = useState(0);
    const [tourQuality, setTourQuality] = useState("");
    const [profilePicture , setProfilePicture] = useState(null);


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        reviewTitle: '',
        reviewText: '',
        guideRating: 0,
        locationRating: 0,
        cleanlinessRating: 0,
        serviceRating: 0,
        transportationRating: 0
    });

    const user = jwtDecode(localStorage.getItem('token'));
    console.log(user.id);
    
    const navigate = useNavigate();
    
    const { tourId } = useParams();
    console.log('this is the tour id =>', tourId);
    
    function handleTabClick(tab) {
        setActiveTab(tab);
    }
    
    useEffect(() => {
        axios.get(`http://localhost:2000/tours/tour/${tourId}`)
        .then(response => {
            console.log('Response:', response);
            const tourInfo = response.data.data;
            console.log('Tour Info:', tourInfo);
            setTourData(tourInfo);
        })
        .catch(error => {
            console.error("Error fetching tour data:", error);
        });
    }, [tourId]);
    
    console.log(tourData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRatingChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const calculateAverageRating = () => {
        const totalRatings = Object.values(formData).filter(value => typeof value === 'number').reduce((acc, curr) => acc + curr, 0);
        const totalCategories = Object.keys(formData).length - 4; // Subtracting name, email, reviewTitle, reviewText
        return totalRatings / totalCategories;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const response = await axios.post('http://localhost:2000/reviews/review', {
                name: formData.name,
                email: formData.email,
                guideRating: formData.guideRating,
                locationRating: formData.locationRating,
                cleanlinessRating: formData.cleanlinessRating,
                serviceRating: formData.serviceRating,
                transportationRating: formData.transportationRating,
                userId: user.id,
                tourId: tourId,
                reviewText: formData.reviewText,
                reviewTitle: formData.reviewTitle,
                rating: calculateAverageRating()
            });
            console.log("Review posted:", response.data);
            setFormData({
                name: '',
                email: '',
                reviewTitle: '',
                reviewText: '',
                guideRating: 0,
                locationRating: 0,
                cleanlinessRating: 0,
                serviceRating: 0,
                transportationRating: 0
            });
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your review has been submitted.',
            });
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again later.',
            });
        }
    }


    useEffect(() => {
        if (tourData) {
            axios.post(`http://localhost:2000/tours/related-tours`, {
                location: tourData.location
            }).then(response => {
                console.log('Response:', response);
                setRelatedTour(response.data.data);
            }).catch(error => {
                console.error("Error fetching related tours:", error);
            });
        }
    }, [tourData]);

    useEffect(() => {
        const fetchProfilePicture = async () => {
          if (user && user.email) {
            try {
              const response = await axios.post('http://localhost:2000/register/profile', {
                email: user.email,
              }, {
                responseType: 'arraybuffer' // This is important for handling binary data
              });
              
              const blob = new Blob([response.data], { type: 'image/png' });
              const imageUrl = URL.createObjectURL(blob);
              setProfilePicture(imageUrl);
            } catch (error) {
              console.error("Error fetching profile picture:", error);
            }
          }
        };
    
        fetchProfilePicture();
      }, [user]);

    console.log(relatedTour);
    useEffect(() => {
        axios.get(`http://localhost:2000/reviews/reviews/tour/${tourId}`)
            .then(response => {
                console.log('Response:=====>', response.data);
                const tourReviewsData = response.data;
                console.log('Tour Info:', tourReviewsData);

                let totalRating = 0;
                let excellentTotalRating = 0;
                let veryGoodTotalRating = 0;
                let averageTotalRating = 0;
                let goodTotalRating = 0;
                let poorTotalRating = 0;
                let excellentCount = 0;
                let veryGoodCount = 0;
                let averageCount = 0;
                let goodCount = 0;
                let poorCount = 0;
                let tourQuality = "" ; 

                for (let i = 0; i < tourReviewsData.length; i++) {
                    const rating = tourReviewsData[i].rating;
                    totalRating += rating;


                    
                    
                    switch (Math.floor(rating)) {
                        case 5:
                            excellentTotalRating += rating;
                            excellentCount++;
                            break;
                        case 4:
                            veryGoodTotalRating += rating;
                            veryGoodCount++;
                            break;
                        case 3:
                            averageTotalRating += rating;
                            averageCount++;
                            break;
                        case 2:
                            goodTotalRating += rating;
                            goodCount++;
                            break;
                        default:
                            poorTotalRating += rating;
                            poorCount++;
                            break;
                    }
                }

                const averageRating = totalRating / tourReviewsData.length;
                const excellentAverageRating = excellentCount > 0 ? excellentTotalRating / excellentCount : 0;
                const veryGoodAverageRating = veryGoodCount > 0 ? veryGoodTotalRating / veryGoodCount : 0;
                const averageAverageRating = averageCount > 0 ? averageTotalRating / averageCount : 0;
                const goodAverageRating = goodCount > 0 ? goodTotalRating / goodCount : 0;
                const poorAverageRating = poorCount > 0 ? poorTotalRating / poorCount : 0;
                
                switch (Math.floor(averageRating)) {
                    case 5:
                        tourQuality = "Excellent";
                        break;
                    case 4:
                        tourQuality = "Very Good";
                        break;
                    case 3:
                        tourQuality = "Average";
                        break;
                    case 2:
                        tourQuality = "Good";
                        break;
                    default:
                        tourQuality = "Poor";
                        break;
                }
                setTourQuality(tourQuality);
                
                setTourRate(averageRating);
                setExcellentRate(excellentAverageRating);
                setVeryGoodRate(veryGoodAverageRating);
                setAverageRate(averageAverageRating);
                setGoodRate(goodAverageRating);
                setPoorRate(poorAverageRating);
                
                setTourReviews(tourReviewsData); // Set tourReviews to the array of reviews only
            })
            .catch(error => {
                console.error("Error fetching tour reviews :", error);
            });
    }, [tourId]);
    
    console.log(tourReviews);

    const handleBookNowClick = () => {
        if (!tourData) return; 

        axios.get(`http://localhost:2000/tours/tour/${tourId}`)
            .then(response => {
                const tourInfo = response.data.data;
                const emptyPlaces = tourInfo.emptyPlaces;

                Swal.fire({
                    title: "Enter number of travelers",
                    input: "number",
                    inputAttributes: {
                        autocapitalize: "off",
                        min: 1,
                        max: Math.min(5, emptyPlaces), // Maximum number of travelers (up to 5 or available empty places)
                        step: 1
                    },
                    showCancelButton: true,
                    confirmButtonText: "Submit",
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        const numberOfTravelers = parseInt(result.value);
                        if (numberOfTravelers <= emptyPlaces && numberOfTravelers > 0) {
                            navigate(`/BookingVisa`, { state: { numberOfTravelers ,tourId: tourId } });
                        } else {
                            Swal.fire({
                                title: "Invalid number of travelers",
                                text: "Please enter a valid number of travelers (1 to " + Math.min(5, emptyPlaces) + ").",
                                icon: "error",
                                confirmButtonText: "OK"
                            });
                        }
                    }
                });
            })
            .catch(error => {
                console.error("Error fetching tour data:", error);
            });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const renderStars = (rating) => {
        const goldStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        const stars = [];

        for (let i = 0; i < goldStars; i++) {
            stars.push(<i key={i} className="bi bi-star-fill" style={{ color: 'gold' }}></i>);
        }

        if (hasHalfStar) {
            stars.push(<i key="half" className="bi bi-star-half" style={{ color: 'gold' }}></i>);
        }

        const remainingStars = 5 - goldStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<i key={i + goldStars + (hasHalfStar ? 1 : 0)} className="bi bi-star" style={{ color: 'grey' }}></i>);
        }

        return stars;
    };
    const handleShowMoreClick = () => {
        setVisibleTours(prevVisibleTours => prevVisibleTours + 3);
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await axios.delete(`http://localhost:2000/reviews/review`, {
                data: {
                    userId: user.id,
                    reviewId: reviewId
                }
            });
            console.log("Review deleted:", response.data);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your review has been deleted.',
            });
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again later.',
            });
        }
    };

    if (!tourData) {
        return <div>Loading...</div>;
    }

    



    return (
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
                                            {tourData.title}
                                        </h2>
                                        <div className=''>
                                            {renderStars(tourData.rating)}
                                            <span className='ms-3' style={{ color: colors.primary }}>({tourData.reviews.length} reviews) </span>
                                        </div>
                                        <div className='text-black-50 fw-bold'>
                                            <i className="bi bi-geo-alt-fill me-1" ></i>
                                            <span style={{ color: colors.primary }}>{tourData.location}</span>
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
                                                    <img src={tourData.mainImage} className='w-100 h-50' alt='image1' style={{ borderRadius: '10px' }} />
                                                </div>
                                                <div className='col-lg-6 d-none d-md-block'>
                                                    <div className='row'>
                                                        <div className='col-md-6'>
                                                            <img src={tourData.images[0]} className='w-100 h-25 gap-1 pb-1' alt='image2' style={{ borderRadius: '10px' }} />
                                                            <img src={tourData.images[1]} className='w-100 h-25 gap-1 pt-1' alt='image2' style={{ borderRadius: '10px' }} />
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <img src={tourData.images[2]} className='w-100 h-25 gap-1 pb-1' alt='image4' style={{ borderRadius: '10px' }} />
                                                            <img src={tourData.mainImage} className='w-100 h-25 gap-1 pt-1' alt='image4' style={{ borderRadius: '10px' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='row p-4'>
                                    <div className='col-md-9'>
                                        <h4 className='fw-bold fs-4' style={{ color: colors.secondary }}>{(tourData.price-(1-(tourData.discountPercentage/100)))} EGY</h4>
                                        <p className='text-black-50 fs-6'>Total</p>
                                    </div>
                                    <div className='col-md-3'>
                                        <button className='btn text-white w-100' style={{ backgroundColor: colors.secondary }} onClick={handleBookNowClick}>Book Now</button>
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
                                    <p className='fs-6 text-black-50'>{tourData.destination}</p>
                                </div>
                                <div className='col-md-12' style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                                    <h6 className='fs-5 fw-bold pt-3' style={{ color: colors.secondary, cursor: 'pointer' }}>Date</h6>
                                    <p className='fs-6 text-black-50'>{formatDate(tourData.startDate)}</p>
                                </div>
                                <div className='col-md-12' style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                                    <h6 className='fs-5 fw-bold pt-3' style={{ color: colors.secondary, cursor: 'pointer' }}>Time</h6>
                                    <p className='fs-6 text-black-50'>{tourData.startTime}</p>
                                </div>
                                <div className='col-md-12'>
                                    <h6 className='fs-5 fw-bold pt-3' style={{ color: colors.secondary, cursor: 'pointer' }}>Group</h6>
                                    <p className='fs-6 text-black-50'>{tourData.totalTravelers} Travelers</p>
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
                                {
                                    activeTab === 'overview' &&(
                                        <div>
                                        <div className='col-md-12 mt-5'>
                                            <div className='row p-3'>
                                                <div className='col-md-3 d-flex'>
                                                    <i className="bi bi-clock fw-bold me-3" style={{fontSize:'2rem'}}></i>
                                                    <div>
                                                        <h6 className='fs-6 fw-bold'>Duration</h6>
                                                        <p className='fs-6 text-black-50'>{tourData.duration}</p>
                                                    </div>
            
                                                </div>
                                                <div className='col-md-3 d-flex'>
                                                    <i className="bi bi-backpack fw-bold me-3" style={{fontSize:'2rem'}}></i>
                                                    <div>
                                                        <h6 className='fs-6 fw-bold'>Tour Type</h6>
                                                        <p className='fs-6 text-black-50'>{tourData.type}</p>
                                                    </div>
                                                </div>
                                                <div className='col-md-3 d-flex'>
                                                <i class="bi bi-people fw-bold me-3" style={{fontSize:'2rem'}}></i>
                                                <div>
                                                    <h6 className='fs-6 fw-bold'>Group Size</h6>
                                                    <p className='fs-6 text-black-50'>{tourData.totalTravelers} peoples</p>
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
                                            <p className='fs-6 text-black-50'>{tourData.description}</p>
                                        </div>
            
                                        <div className='col-md-12  p-3'>
                                            <h2 className='fs-1 fw-bold text-capitalize'>
                                                highlights
                                            </h2>
                                            <ul>
                                                {tourData.highlights.map((highlight, index) => (
                                                    <li key={index} className='fs-6 text-black-50'>{highlight}</li>
                                                ))}
                                            </ul>
                                        </div>
            
                                        <div className='col-md-12 p-3'>
                                            <h2 className='fs-1 fw-bold text-capitalize'>
                                                included / excluded
                                            </h2>
                                            <div className='col-md-12 d-flex'>
                                                <div className='col-md-6'>
                                                    {tourData.included.map((included, index) => (
                                                        <div key={index} className=''>
                                                            <i className="bi bi-check fw-bold fs-4 me-2" style={{color: colors.secondary}}></i>
                                                            <span className='text-black  fs-6 text-capitalize'>{included}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className='col-md-6'>
                                                    {tourData.excluded.map((excluded, index) => (
                                                        <div key={index} className=''>
                                                            <i className="bi bi-x-lg text-danger  fw-bold fs-4 me-2" ></i>
                                                            <span className='text-black  fs-6 text-capitalize'>{excluded}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    )}

                                {
                                    activeTab === 'program' && (
                                        <div>
                                        {
                                            tourData.program.map((program, index) => (
                                                <div key={index} className='col-md-12 p-3' style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                                                    <div className='d-flex align-items-center '>
                                                        <i className={`bi bi-${index + 1}-circle fw-bold me-3`} style={{ color: colors.secondary, fontSize: '5rem' }}></i>
                                                        <h4 className='font-capitalize'>{program}</h4>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        </div>
                                )}


                                {
                                    activeTab === 'reviews' && (
                                <div>
                                    <div className='card'>
                                        <div className='row align-items-center'>
                                            <div className='col-md-5 fs-2 fw-bold border-right' style={{ borderRight: '4px solid rgba(0,0,0,0.1)' }}>
                                                <p className='text-align-left' style={{ color: colors.secondary }}>{tourRate}/5</p>
                                                <p className='text-black'>{tourQuality}</p>
                                                <div className='d-flex m-3 ms-0 fs-5'>
                                                    {renderStars(tourRate)}
                                                    <div className='text-black-50 ms-3'>({tourReviews.length} Reviews)</div>
                                                </div>
                                            </div>

                                            <div className='col-md-7 border-bottom-1'>
                                                <div className='d-flex align-items-baseline w-75 justify-content-around'>
                                                    <div className='col-md-3'>
                                                        <p className=' me-4 fs-5 text-black-50'>Excellent</p>
                                                    </div>
                                                    <div className="progress col-md-7" style={{height: '15px'}}>
                                                        <div className="progress-bar " role="progressbar" style={{width: `${excellentRate}%`, backgroundColor: colors.secondary}}  />
                                                    </div>
                                                    <div className='col-md-1'>
                                                        <p className='fw-bold ms-3' style={{color:colors.secondary}} >{excellentRate}</p>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-baseline w-75 justify-content-around'>
                                                    <div className='col-md-3'>
                                                        <p className=' me-4 fs-5 text-black-50'>Very Good</p>
                                                    </div>
                                                    <div className="progress col-md-7" style={{height: '15px'}}>
                                                        <div className="progress-bar " role="progressbar" style={{width: `${veryGoodRate}%`, backgroundColor: colors.secondary}}  />
                                                    </div>
                                                    <div className='col-md-1'>
                                                        <p className='fw-bold ms-3' style={{color:colors.secondary}} >{veryGoodRate}</p>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-baseline w-75 justify-content-around'>
                                                    <div className='col-md-3'>
                                                        <p className=' me-4 fs-5 text-black-50'>Average</p>
                                                    </div>
                                                    <div className="progress col-md-7" style={{height: '15px'}}>
                                                        <div className="progress-bar " role="progressbar" style={{width: `${averageRate}%`, backgroundColor: colors.secondary}}  />
                                                    </div>
                                                    <div className='col-md-1'>
                                                        <p className='fw-bold ms-3' style={{color:colors.secondary}} >{averageRate}</p>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-baseline w-75 justify-content-around'>
                                                    <div className='col-md-3'>
                                                        <p className=' me-4 fs-5 text-black-50'>Good</p>
                                                    </div>
                                                    <div className="progress col-md-7" style={{height: '15px'}}>
                                                        <div className="progress-bar " role="progressbar" style={{width: `${goodRate}%`, backgroundColor: colors.secondary}}  />
                                                    </div>
                                                    <div className='col-md-1'>
                                                        <p className='fw-bold ms-3' style={{color:colors.secondary}} >{goodRate}</p>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-baseline w-75 justify-content-around'>
                                                    <div className='col-md-3'>
                                                        <p className=' me-4 fs-5 text-black-50'>Poor</p>
                                                    </div>
                                                    <div className="progress col-md-7" style={{height: '15px'}}>
                                                        <div className="progress-bar " role="progressbar" style={{width: `${poorRate}%`, backgroundColor: colors.secondary}}  />
                                                    </div>
                                                    <div className='col-md-1'>
                                                        <p className='fw-bold ms-3' style={{color:colors.secondary}} >{poorRate}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <p className='w-100 text-center fw-bold fs-5 text-black-50'>250 reviews on this Tour-Showing 1 to 2</p>


                                    {tourReviews.length > 0 ? (
                                    tourReviews.map((review, index) => (
                                        <div className='review' key={index} style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                                            <div className='row p-3'>
                                                <div className='col-md-4 d-flex align-items-center'>
                                                {user && user.id === review.userId._id && (
                                                        <>
                                                            <img src={profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="rounded-circle text-center me-3 img-fluid" alt='profile-picture' style={{ height: '150px', width: '150px' }} />

                                                        </>
                                                    )}
                                                    <div className='ms-2'>
                                                        <p className='text-black fw-bold fs-5 m-0 text-capitalize'>{review.userId.firstName} {review.userId.lastName} </p>
                                                        <p className='text-black-50 m-0'>{formatDate(review.reviewDate)}</p>
                                                        <div className='m-0'>
                                                            {[...Array(Math.floor(review.rating))].map((_, i) => (
                                                                <i key={i} className="bi bi-star-fill" style={{ color: 'gold' }}></i>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-md-8 text-left'>
                                                    <p className='fs-5 fw-bold text-end m-0 me-5'>helpful <i className="bi bi-hand-thumbs-up" style={{ color: colors.secondary }}></i></p>
                                                    {user && user.id === review.userId._id && (
                                                        <>
                                                            <p className='fs-5 fw-bold text-end m-0 me-5 mt-2'>Edit <i className="bi bi-pencil"></i></p>
                                                            <p className='fs-5 fw-bold text-end m-0 me-5 mt-2' onClick={() => handleDeleteReview(review._id)}>Delete <i className="bi bi-trash3 text-danger"></i></p>
                                                        </>
                                                    )}
                                                </div>

                                                <div className='col-md-12'>
                                                    <div className='mt-3'>
                                                        <h5>{review.reviewTitle}</h5>
                                                        <p className='text-black-50'>{review.reviewText}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center mt-3">No reviews available.</div>
                                )}

                                    <div className='add-review'>

                                        <div className='fs-4 mt-4 fw-bold'>
                                            Leave a reveiew
                                        </div>

                                        <p className='fw-bold text-black-50 mt-2 mb-0'>Your e-mail address will not be show to other</p>

                                        <div className=''>
                                        <form className='form-group' onSubmit={handleSubmit} >
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <input type="text" className='form-control p-4 fs-5 my-3' placeholder='Name' name="name" value={formData.name} onChange={handleChange} required />
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <input type="email" className='form-control p-4 fs-5 my-3' placeholder='Email' name="email" value={formData.email} onChange={handleChange} required />
                                                    </div>
                                                    <div className='col-md-12'>
                                                        <input type="text" className='form-control p-4 fs-5 ' placeholder='Give your review a title' name="reviewTitle" value={formData.reviewTitle} onChange={handleChange} required />
                                                    </div>
                                                    <div className='card col-md-6 m-0 my-3'>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className='fs-6 fw-bold text-black-50'>Guide</p>
                                                            <Rating name="guideRating" value={formData.guideRating} onChange={(event, newValue) => handleRatingChange("guideRating", newValue)} style={{ color: "gold" }} />
                                                        </div>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className='fs-6 fw-bold text-black-50'>Location</p>
                                                            <Rating name="locationRating" value={formData.locationRating} onChange={(event, newValue) => handleRatingChange("locationRating", newValue)} style={{ color: "gold" }} />
                                                        </div>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className='fs-6 fw-bold text-black-50'>Cleanliness</p>
                                                            <Rating name="cleanlinessRating" value={formData.cleanlinessRating} onChange={(event, newValue) => handleRatingChange("cleanlinessRating", newValue)} style={{ color: "gold" }} />
                                                        </div>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className='fs-6 fw-bold text-black-50'>Service</p>
                                                            <Rating name="serviceRating" value={formData.serviceRating} onChange={(event, newValue) => handleRatingChange("serviceRating", newValue)} style={{ color: "gold" }} />
                                                        </div>
                                                        <div className='d-flex justify-content-between'>
                                                            <p className='fs-6 fw-bold text-black-50'>Transportation</p>
                                                            <Rating name="transportationRating" value={formData.transportationRating} onChange={(event, newValue) => handleRatingChange("transportationRating", newValue)} style={{ color: "gold" }} />
                                                        </div>
                                                    </div>

                                                    <div className='col-md-6'>
                                                        <textarea rows={7} type="text" className='form-control p-4 fs-5 my-3' placeholder='Write your review' name="reviewText" value={formData.reviewText} onChange={handleChange} required />
                                                    </div>
                                                </div>

                                                <div className='d-flex justify-content-end'>
                                                    <button type="submit" className='btn btn-warning px-5 text-white rounded-2 col-md-3' style={{ backgroundColor: colors.secondary }}>Post review</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>




                                    
                                </div> 
                            )}


                           {
                               activeTab === 'questions' && (
                                <div className='Quetions'>
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
                            </div>
                               )
                           }


                            </div>
                        </div>
                    </div>
                </div>






                    <div className='related-tour'>
                        <h2 className='fw-bold fs-1 text-center col-md-12 mt-4 mb-4'>
                            Related Tours
                        </h2>

                        <div className='row'>
                            {relatedTour.slice(0, visibleTours).map((tour, index) => (
                                <div className='col-md-4 d-flex justify-content-center' key={index}>
                                    <div className="card p-0 w-75">
                                        <div className='position-relative'>
                                            <img src={tour.mainImage} className="card-img-top img-fluid" alt="..." style={{ height: "300px" }} />
                                            <i className="bi bi-bookmark fw-lighter fw-bold position-absolute end-0 text-white" style={{ fontSize: '3rem', top: "-13px", right: "15px", cursor: "pointer" }}></i>
                                            {tour.Featured && (
                                                <p className='position-absolute translate-middle fw-bold text-white fs-5 px-2 py-1 text-capitalize rounded-2' style={{ backgroundColor: colors.secondary, top: "2rem", left: "4rem" }}>featured</p>
                                            )}
                                            {
                                                tour.disscount && (
                                                    <p className='position-absolute translate-middle fw-bold text-white fs-5 px-2 py-1  rounded-2 bg-danger' style={{ top: "5rem", left: "3rem" }}>-80 %</p>
                                                )
                                            }
                                        </div>
                                        <div className="card-body">
                                            <div className='d-flex fs-6'>
                                                <i className="bi bi-geo-alt me-3"></i>
                                                <p className='text-capitalize'>{tour.location}</p>
                                            </div>

                                            <div className='border-bottom'>
                                                <div className='fw-bold fs-5'>{tour.description}</div>
                                                <div className='d-flex m-3 ms-0'>
                                                    {renderStars(tour.rating)}

                                                    <div className='text-black-50 ms-3'>({tour.reviews.length} Reviews)</div>
                                                </div>
                                            </div>

                                            <div className='d-flex justify-content-between mt-3'>
                                                <div className=''>
                                                    <div className='d-flex flex-row-reverse'>
                                                        <del className='fw-bold text-black-50 '>{tour.price}</del>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <p>From</p>
                                                        <p className='ms-3 fw-bold fs-4 mb-0' style={{ color: colors.secondary }}>{(tour.price-(1-tour.disscount)*tour.price)} EGY</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className='text-black-50 m-0'><i className="bi bi-clock"></i> {tour.duration}</p>
                                                    <p className='text-black-50 m-0'><i className="bi bi-check2"></i> free cancellation</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {relatedTour.length > visibleTours && (
                                <div className='d-flex justify-content-end'>
                                    <div>
                                        <p className='fs-5 pe-5' style={{ color: colors.secondary, cursor: "pointer" }} onClick={handleShowMoreClick}>Show More</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                    </div>
            </div>
            <Footer></Footer>
        </>
    )
}
