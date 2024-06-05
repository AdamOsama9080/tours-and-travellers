import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';

export default function UpdateandDeleteTour() {
    const [tourData, setTourData] = useState(null);
    const [inputId, setInputId] = useState('');
    const [error, setError] = useState('');
    const [showUpdateForm, setShowUpdateForm] = useState(false); 
    const [included , setIncluded] = useState([]);
    const [excluded , setExcluded] = useState([]);

    const handleSelectIncluded = (selectedOptions) => {
        let selectedValue = [];
    
        for (let i = 0; i < selectedOptions.length; i++) {
            const option = selectedOptions[i];
            if (typeof option === "string") {
                selectedValue.push(option);
            } else if (typeof option === "object") {
                selectedValue.push(option.value);
            }
        }
    
        setTourData({
            ...tourData,
            included: selectedValue
        });
    
        console.log(selectedValue);
    };
    
    const handleSelectExcluded = (selectedOptions) => {

        let selectedValue = [];
        
        for(let i = 0; i < selectedOptions.length; i++) {
            const option = selectedOptions[i];
            if (typeof option === "string") {
                selectedValue.push(option);
            } else if (typeof option === "object") {
                selectedValue.push(option.value);
            }
        }
        
        setTourData({
            ...tourData,
            excluded: selectedValue
        });
        
        console.log(selectedValue);
    };
    
    console.log(included , excluded);
    const handleFindTour = async () => {
        try {
            const response = await axios.get(`https://tours-api-7hh1.onrender.com/tours/tour/${inputId}`);
            if (response.data) {
                const initialTourData = {
                    ...response.data.data,
                    included: response.data.data.included || [],
                    excluded: response.data.data.excluded || []
                };
                setTourData(initialTourData);
                console.log(initialTourData);
                setError('');
                setShowUpdateForm(true);
            } else {
                setError('Tour not found');
                setTourData(null);
                setShowUpdateForm(false);
            }
        } catch (error) {
            setError('Failed to fetch tour');
            setTourData(null);
            setShowUpdateForm(false);
        }
    };    

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'limitNumberOfTravelers') {
            const newValue = parseInt(value);
            const currentLimit = parseInt(tourData.limitNumberOfTravelers);
    
            if (!isNaN(newValue) && newValue >= currentLimit) {
                setTourData({
                    ...tourData,
                    [name]: newValue
                });
            } else {
                console.error("New amount should not be smaller than the current value.");
            }
        }else if(name === "type"){
            const newValue = value;
            setTourData({
                ...tourData,
                [name]: newValue
            })
        } 
        else if (name === 'duration'){
            const newValue = value + ' Days';
            setTourData({
                ...tourData,
                [name]: newValue
            })
        } else if (name === 'price'){
            const newValue = parseInt(value);
            setTourData({
                ...tourData,
                [name]: newValue
            })
        } else if (name === "description") {
            const newValue = value;
            setTourData({
                ...tourData,
                [name]: newValue
            })
        } else if (name === 'details'){
            const newValue = value;
            setTourData({
                ...tourData,
                [name]: newValue
            })
        } else if (name === 'startDate' || name === 'endDate') {
            const startDate = name === 'startDate' ? new Date(value) : new Date(tourData.startDate);
            const endDate = name === 'endDate' ? new Date(value) : new Date(tourData.endDate);
            const duration = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
            setTourData({
                ...tourData,
                [name]: value,
                duration: duration
            });
        } else if (name === 'highlights' || name === 'program') {
            const arrayValue = value.split(',').map(item => item.trim()); 
            setTourData({
                ...tourData,
                [name]: arrayValue
            });
        } else if (name === 'mainImage') {
            setTourData({
                ...tourData,
                mainImage: value,
                images: [value, ...tourData.images.slice(1)] 
            });
        } else if (name.startsWith('image')) {
            const index = parseInt(name.split('-')[1]);
            const updatedImages = [...tourData.images];
            updatedImages[index] = value;
            setTourData({
                ...tourData,
                images: updatedImages
            });
         }
    };
    
    const handleSelectChange = (selectedOption, actionMeta) => {
        if (actionMeta) {
            const { name } = actionMeta;
            const value = selectedOption.map(option => option.value); 
            setTourData({
                ...tourData,
                [name]: value
            });
        }
    };
    
    const handleDelete = async (e) => {
        e.preventDefault();
        const confirmResult = await Swal.fire({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this tour!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
        });

        if (confirmResult.isConfirmed) {
            try {
                const response = await axios.delete(`https://tours-api-7hh1.onrender.com/tours/delete-tour/${tourData._id}`);
                if (response.status === 200) {
                    Swal.fire("Tour Deleted!", "", "success");
                    setTourData(null);
                    setShowUpdateForm(false);
                } else {
                    Swal.fire("Failed to delete tour", "", "error");
                }
            } catch (error) {
                Swal.fire("Failed to delete tour", "", "error");
                console.error('Error:', error);
            }
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedData = {
            description: tourData.description,
            price: tourData.price,
            startDate: tourData.startDate,
            endDate: tourData.endDate,
            startTime: tourData.startTime,
            endTime: tourData.endTime,
            duration: tourData.duration,
            images: [tourData.mainImage,tourData.images[0], tourData.images[1]],
            mainImage: tourData.mainImage,
            type: tourData.type,
            limitNumberOfTravelers: tourData.limitNumberOfTravelers,
            highlights: tourData.highlights,
            details: tourData.details,
            included: tourData.included,
            excluded: tourData.excluded,
            program: tourData.program
        };
    
        console.log("Updated Tour Data:", updatedData);
        const confirmResult = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
            cancelButtonText: "No, cancel!",
        });
    
        if (confirmResult.isConfirmed) {
            try {
                const response = await axios.put(`https://tours-api-7hh1.onrender.com/tours/update-tour/${tourData._id}`, updatedData);
                if (response.status === 200) {
                    Swal.fire("Updated!", "", "success");
                } else {
                    Swal.fire("Failed to update tour", "", "error");
                }
            } catch (error) {
                Swal.fire("Failed to update tour", "", "error");
                console.error('Error:', error);
            }
        }
    };
    
    return (
        <>
        {!showUpdateForm && (
            <div className="col-md-9 m-3">
                <div className='row'>
                <div className='card shadow'>
                        <div className='card-body'>
                            <h5 className="card-title text-center mb-4">Find Tour By ID</h5>
                            <div className="input-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control text-center" 
                                    placeholder="Enter ID..." 
                                    value={inputId}
                                    onChange={(e) => setInputId(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button" onClick={handleFindTour}>
                                        <i className="bi bi-search fs-4 fw-bold"></i>
                                    </button>
                                </div>
                            </div>
                            {error && (
                                <div className="alert alert-danger text-center" role="alert">
                                    {error}
                                </div>
                            )}
                            {tourData && (
                                <>
                                    <div className="alert alert-success text-center" role="alert">
                                        Tour Found!
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {showUpdateForm && ( 
            <div className='col-md-9 m-3'>
                <div className='row'>
                    <div className='card shadow'>
                    <div className='card-body'>
                            <form >
                                <h1 >Update or Delete Tour</h1>
                                    <div className='card shadow m-3 p-3'>
                                        <h5>ID</h5>
                                        <div className="form-group row">
                                            <div className="col-md-12">
                                                <input className='form-control text-center' disabled value={tourData?._id}></input>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='card shadow m-3 p-3'>
                                        <h5 className='fs-4 mb-4'>Title && Type</h5>
                                        <div className="form-group row">
                                            <div className="col-md-6">
                                                <label htmlFor="title" className='fw-bold mb-1 d-block'  >Title</label>
                                                <input type="text" placeholder='Enter Title...' id="title" className="form-control p-2" name='title' value={tourData?.title} disabled/>
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="type" className='fw-bold mb-1 d-block' >Type</label>
                                                <select id="type" className="form-control" placeholder="Select Type" name='type' value={tourData?.type || ''} onChange={handleInputChange}>
    <option value="">Select Type</option>
    <option value="Adventure Tours">Adventure Tours</option>
    <option value="Cultural Tours">Cultural Tours</option>
    <option value="Wildlife Tours">Wildlife Tours</option>
    <option value="Culinary Tours">Culinary Tours</option>
    <option value="Wellness Tours">Wellness Tours</option>
</select>                                       
                                            </div>
                                        </div>
                                    </div>

                                    <div className='card shadow m-3 p-3'>
                                    <h5 className='fs-4 mb-4'>Location && Destination</h5>
                                    <div className="form-group row">
                                        <div className="col-md-6 col-sm-12">
                                            <select id="location" className="form-control" placeholder="Select Location" name='location' disabled value={tourData?.location} >
                                                <option value="Alexandria, Egypt">Alexandria, Egypt</option>
                                                <option value="Aswan, Egypt">Aswan, Egypt</option>
                                                <option value="Cairo, Egypt">Cairo, Egypt</option>
                                                <option value="Hurghada, Egypt">Hurghada, Egypt</option>
                                                <option value="Luxor, Egypt">Luxor, Egypt</option>
                                                <option value="Giza, Egypt">Giza, Egypt</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <input id="destination" className="form-control" placeholder="Enter Destination..." disabled  value={tourData?.destination}></input>
                                        </div>
                                    </div>
                                    </div>

                                    <div className='card shadow m-3 p-3'>
                                    <h5 className='fs-4 mb-4'>Langitude && Longitude</h5>
                                    <div className="form-group row">
                                        <div className="col-md-6 col-sm-12">
                                            <label htmlFor="latitude" className='fw-bold mb-1 d-block'>Langitude</label>
                                            <input type="text" id="Langitude" className="form-control p-2 disabled" disabled name='latitude' value={tourData.latitude}  />
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <label htmlFor="latitude" className='fw-bold mb-1 d-block'>Longitude</label>
                                            <input type="text" id="latitude" className="form-control p-2 disabled" disabled name='longitude' value={tourData.longitude}  />
                                        </div>
                                    </div>
                                    </div>

                                    <div className='card shadow m-3 p-3'>
                                    <h5 className='fs-4 mb-4'>Date</h5>
                                    <div className="form-group row">
                                        <div className="col-md-6 col-sm-12">
                                            <label htmlFor="start-date" className='fw-bold mb-1 d-block'>Start Date</label>
                                            <input type="date" id="start-date" name='startDate' className="form-control p-2" value={tourData.startDate} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} />
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <label htmlFor="end-date" className='fw-bold mb-1 d-block'>End Date</label>
                                            <input type="date" id="end-date" name='endDate' className="form-control p-2" value={tourData.endDate} onChange={handleInputChange} min={tourData.startDate} />
                                        </div>
                                    </div>
                                </div>

                                <div className='card shadow m-3 p-3'>
                                    <h5 className='fs-4 mb-4'>Time</h5>
                                    <div className="form-group row">
                                        <div className="col-md-4 col-sm-12">
                                            <label htmlFor="start-time" className='fw-bold mb-1 d-block'>Start Time</label>
                                            <input type="time" id="start-time" name='startTime' className="form-control p-2" value={tourData.startTime} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <label htmlFor="end-time" className='fw-bold mb-1 d-block'>End Time</label>
                                            <input type="time" id="end-time" name='endTime' className="form-control p-2" value={tourData.endTime} onChange={handleInputChange} />
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <label htmlFor="duration" className='fw-bold mb-1 d-block'>Duration (Days)</label>
                                            <input type="text" id="duration" name='duration' className="form-control p-2" disabled  value={tourData.duration + ' Days'}/>
                                        </div>
                                    </div>
                                </div>

                                <div className='card shadow m-3 p-3'>
                                    <h5 className='fs-4 mb-4'>Images</h5>
                                    <div className="form-group row">
                                        <div className="col-md-4 col-sm-12">
                                            <label htmlFor="image" className='fw-bold mb-1 d-block'>Main Image</label>
                                            <input type="text" id="image" placeholder='Enter Image URL...' name='mainImage' className="form-control p-2" value={tourData.mainImage}  onChange={handleInputChange}/>
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <label htmlFor="image-1" className='fw-bold mb-1 d-block'>Image 1</label>
                                            <input type="text" id="image-1" placeholder='Enter Image URL...' name='image-1' className="form-control p-2" value={tourData.images[1]} onChange={handleInputChange}/>
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <label htmlFor="image-2" className='fw-bold mb-1 d-block'>Image 2</label>
                                            <input type="text" id="image-2" placeholder='Enter Image URL...' name="image-2" className="form-control p-2" value={tourData.images[2]} onChange={handleInputChange}/>
                                        </div>

                                        <div className="col-md-4 col-sm-12 mt-2">
                                            <div className='card shadow mt-1'>
                                            <img src={tourData.mainImage} className="card-img-top img-fluid" alt="Main image" style={{height:"180px"}}/>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-12 mt-2">
                                            <div className='card shadow mt-1'>
                                            <img src={tourData.images[1]} className="card-img-top img-fluid" alt="Main image" style={{height:"180px"}}/>
                                            </div>
                                        </div>

                                        <div className="col-md-4 col-sm-12 mt-2">
                                            <div className='card shadow mt-1'>
                                            <img src={tourData.images[2]} className="card-img-top img-fluid" alt="Main image" style={{height:"180px"}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card shadow m-3 p-3">
                                    <h5 className='fs-4 mb-4'>Price && Amount of Tickets</h5>
                                    <div className="form-group row">
                                        <div className="col-md-6 col-sm-12">
                                            <label htmlFor="price " className='fw-bold mb-1 d-block'>Price</label>
                                            <select id="price" className="form-control p-2"name='price' value={tourData.price} disabled>
                                                <option value="">Select Price</option>
                                                <option value="100">100</option>
                                                <option value="150">150</option>
                                                <option value="200">200</option>
                                                <option value="250">250</option>
                                                <option value="300">300</option>
                                                <option value="350">350</option>
                                                <option value="400">400</option>
                                                <option value="450">450</option>
                                                <option value="500">500</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 col-sm-12"  >
                                            <label htmlFor="amount" className='fw-bold mb-1 d-block' >Amount</label>
                                            <input type="number" id="amount" name='limitNumberOfTravelers' className="form-control p-2" placeholder='Enter Amount' value={tourData.limitNumberOfTravelers} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className="card shadow m-3 p-3">
                                    <h5 className='fs-4 mb-4'>Description && Extra Info</h5>
                                    <div className="form-group row">
                                        <div className="col-md-12 col-sm-12 mb-4">
                                            <label htmlFor="description" className='fw-bold mb-1 d-block'>Description</label>
                                            <textarea id="description" className="form-control p-2" placeholder='Enter Description' name='description' rows={5} value={tourData.description} onChange={handleInputChange}></textarea>
                                        </div>
                                        
                                        <div className='col-md-6 col-sm-12 '>
                                            <Select
                                                key="included"
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                placeholder="Select Included"
                                                name='included'
                                                isMulti
                                                value={tourData.included}
                                                onChange={handleSelectIncluded}
                                                options={[
                                                    { value: 'Accommodation', label: 'Accommodation' },
                                                    { value: 'Meals', label: 'Meals' },
                                                    { value: 'Transportation', label: 'Transportation' },
                                                    { value: 'Activities', label: 'Activities' },
                                                    { value: 'Entrance Fees', label: 'Entrance Fees' },
                                                    { value: 'Guide Services', label: 'Guide Services' },
                                                    { value: 'Travel Insurance', label: 'Travel Insurance' },
                                                    { value: 'Souvenirs', label: 'Souvenirs' },
                                                    { value: 'Special Events', label: 'Special Events' },
                                                    { value: 'Free Time', label: 'Free Time' }
                                                ]}
                                            />
                                        </div>

                                        <div className='col-md-6 col-sm-12'>
                                            <Select
                                                key="excluded"
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                placeholder="Select Excluded"
                                                name='excluded'
                                                isMulti
                                                value={tourData.excluded}
                                                onChange={handleSelectExcluded}
                                                options={[
                                                    { value: 'Accommodation', label: 'Accommodation' },
                                                    { value: 'Meals', label: 'Meals' },
                                                    { value: 'Transportation', label: 'Transportation' },
                                                    { value: 'Activities', label: 'Activities' },
                                                    { value: 'Entrance Fees', label: 'Entrance Fees' },
                                                    { value: 'Guide Services', label: 'Guide Services' },
                                                    { value: 'Travel Insurance', label: 'Travel Insurance' },
                                                    { value: 'Souvenirs', label: 'Souvenirs' },
                                                    { value: 'Special Events', label: 'Special Events' },
                                                    { value: 'Free Time', label: 'Free Time' }
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='card shadow m-3 p-3'>
                                        <h5 className='fs-4 mb-4'>Programs && High lights</h5>
                                        <div className="form-group row">
                                            <div className="col-md-6 col-sm-12 mb-4">
                                                <label htmlFor="Programs" className='fw-bold mb-1 d-block'>Programs</label>
                                                <textarea id="Programs" className="form-control p-2" placeholder='Enter Programs' name='program' rows={5} value={tourData.program} onChange={handleInputChange}></textarea>
                                            </div>
                                            <div className="col-md-6 col-sm-12 mb-4">
                                                <label htmlFor="Highlights" className='fw-bold mb-1 d-block'>Highlights</label>
                                                <textarea id="Highlights" name='highlights' className="form-control p-2" placeholder='Enter Highlights' rows={5} value={tourData.highlights} onChange={handleInputChange}></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-md-12 col-sm-12 mb-4">
                                                <label htmlFor="details" className='fw-bold mb-1 d-block'>Details</label>
                                                <textarea id="details" className="form-control p-2" placeholder='Enter details' name='details' rows={5 } value={tourData.details} onChange={handleInputChange}></textarea>
                                            </div>
                                        </div>
                                        </div>
                                        <div className=''>
                                            <button  class="btn btn-outline-success w-75 mt-3 fs-4 col-md-4 col-sm-12 " data-mdb-ripple-init data-mdb-ripple-color="dark" onClick={handleSubmit}>Update</button>
                                            <button  class="btn btn-outline-danger w-75 mt-3 fs-4 col-md-4 col-sm-12 " data-mdb-ripple-init data-mdb-ripple-color="dark" onClick={handleDelete}>Delete</button>
                                            <button type="submit" className="btn btn-outline-primary w-75 mt-3 fs-4 col-md-4 col-sm-12" data-mdb-ripple-init data-mdb-ripple-color="dark"onClick={() => setShowUpdateForm(false)} >Back</button>                                        
                                        </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    );
}
