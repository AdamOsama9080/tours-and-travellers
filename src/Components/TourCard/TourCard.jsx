import React, { useState, useEffect } from 'react';
import { colors } from '../../colors';
import Duration from './../MainSideBar/Duration';
import { useNavigate } from 'react-router-dom'; 
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from '../../Contexts/authContext ';

export default function TourCard({ tourData }) {
    const [showMore, setShowMore] = useState(false);
    const [savedTours, setSavedTours] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate(); 
    const { user } = useAuth();
    
    useEffect(() => {
        axios
          .get(`https://tours-api-7hh1.onrender.com/favourits/get-favourits/${user.id}`)
          .then((response) => {
            const favoriteTours = response.data.map(favorite => favorite.tour._id);
            console.log(favoriteTours);
            setSavedTours(favoriteTours);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    }, []);

    const handleSaveToggle = async (id) => {
        try {
            const isSaved = savedTours.includes(id); 
            const url = isSaved 
                ? `https://tours-api-7hh1.onrender.com/favourits/remove-favourit` 
                : `https://tours-api-7hh1.onrender.com/favourits/add-favourit`;

            const response = await axios.post(url, {
                userId: user.id,
                tourId: id,
            });

            console.log("Response:", response.data);

            if (isSaved) {
                setSavedTours(savedTours.filter(tourId => tourId !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Tour removed from favorites successfully.',
                });
            } else {
                setSavedTours([...savedTours, id]);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Tour added to favorites successfully.',
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `An error occurred while ${isSaved ? 'removing' : 'adding'} the tour to favorites.`,
            });
        }
    };

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const text = tourData.description;
    const truncatedText = showMore ? text : text.slice(0, 400) + "...";

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const renderStars = (rating) => {
        const goldStars = Math.round(rating);
        const greyStars = 5 - goldStars;
        const stars = [];

        for (let i = 0; i < goldStars; i++) {
            stars.push(<i key={i} className="bi bi-star-fill" style={{ color: 'gold' }}></i>);
        }

        for (let i = 0; i < greyStars; i++) {
            stars.push(<i key={i + goldStars} className="bi bi-star-fill" style={{ color: 'grey' }}></i>);
        }

        return stars;
    };

    const handleSelectTour = (tourId) => {
        console.log("Selected Tour ID:", tourId);
        const tourDetailsUrl = `/tours/${tourId}`;
        navigate(tourDetailsUrl);
    };

    return (
        <div className="card shadow mb-3 p-0 position-relative">
            <div className="row g-0" style={{ height: '50%' }}>
                <div className="col-md-4 position-relative">
                    <div className='position-absolute p-1 px-2 text-white' style={{ backgroundColor: colors.secondary, borderRadius: '5px', top: '1rem', left: '1rem' }}>
                        {tourData.Featured ? "Featured" : null}
                    </div>
                    <div className='position-absolute p-1 px-2 text-white bg-danger' style={{ borderRadius: '5px', top: '4rem', left: '1rem' }}>-{tourData.discountPercentage}%</div>
                    <img src={tourData.mainImage} className=" rounded-start w-100" style={{ height:"375px"}} alt="...fffffffffffffffffffffffff" />
                </div>
                <div className="col-md-8">
                    <div className="card-body p-0">
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className="postcard__text text-black p-4">
                                    <p className='text-black-50 fs-6 m-0 mb-1'><i className="bi bi-geo-alt"></i><span>{tourData.location}</span></p>
                                    <h6 className="postcard__title blue fs-5" style={{ color: colors.secondary }}>{tourData.title}</h6>
                                    <div className="postcard__subtitle small">
                                        <time dateTime={tourData.startDate + ' ' + tourData.endDate} className="py-2">
                                            <i className="fas fa-calendar-alt mr-2 me-2" />
                                            {formatDateString(tourData.startDate)} - {formatDateString(tourData.endDate)}
                                        </time>
                                        <div className='py-2'>
                                            {renderStars(tourData.rating)}
                                            <span className='ms-2 fw-bold text-black-50'>({tourData.reviews.length} Reviews)</span>
                                        </div>
                                    </div>
                                    <div className="postcard__bar" />

                                    <div>
                                        <div className="postcard__preview-txt fs-6 text-black-50">
                                            {truncatedText}
                                            {text.length > 100 && (
                                                <span className="btn-link" onClick={toggleShowMore}>
                                                    {showMore ? ' Show less' : '... Show more'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <div className='mt-3'>
                                        <span className='text-black me-2 fw-bold'><i className="bi bi-clock me-2"></i>{tourData.duration}</span>
                                        <span className='text-black ms-2 me-2 fw-bold'><i className="bi bi-check2"></i> Free Cancellation</span>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-4 d-flex flex-column justify-content-between align-items-center  '>
                                <div className="fs-1 text-black-50 position-relative p-0 m-0">
                                    <i
                                        className={`bi bi-bookmark-fill position-absolute ${savedTours.includes(tourData._id) ? 'text-warning' : ''}`}
                                        style={{ top: '-13px', cursor: 'pointer' }}
                                        onClick={() => handleSaveToggle(tourData._id)}
                                    ></i>
                                </div>
                                <div className='m-3'>

                                    <div className='pb-2 align-items-end'>
                                        <span>From</span>
                                        <div className='fw-bold fs-3' style={{ color: '#000' }}>EGP {(tourData.price * (1 - tourData.discountPercentage / 100))}</div>
                                        <div className='text-danger fw-bold'>{(tourData.price - (tourData.price * (1 - tourData.discountPercentage / 100)))} Savings <del className='text-black-50 fw-bold'>{tourData.price}</del></div>
                                    </div>
                                    <button className='btn w-100 mt-3' style={{ backgroundColor: '#5F41B2', color: '#fff' }} onClick={() => handleSelectTour(tourData._id)}>Select Tour</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
