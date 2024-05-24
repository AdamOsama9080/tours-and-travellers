import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import Swal from 'sweetalert2';

export default function CreateTour() {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [destinations, setDestinations] = useState([]);
    const [selectedIncludedOptions, setSelectedIncludedOptions] = useState([]);
    const [selectedExcludedOptions, setSelectedExcludedOptions] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        destination: '',
        description: '',
        price: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        duration: '',
        mainImage: '',
        type: '',
        limitNumberOfTravelers: 0,
        highlights: [],
        details: '',
        included: [],
        excluded: [],
        program: [],
        latitude: 0,
        longitude: 0,
        images: [],
    });

    useEffect(() => {
        if (selectedLocation) {
            fetchCoordinates(selectedLocation);
        }
    }, [selectedLocation]);

    const handleSelectIncluded = (selectedOptions) => {
        setSelectedIncludedOptions(selectedOptions.map(option => option.value));
    };

    const handleSelectExcluded = (selectedOptions) => {
        setSelectedExcludedOptions(selectedOptions.map(option => option.value));
    };
    
    const fetchCoordinates = async (location) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setFormData(prevState => ({
                    ...prevState,
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lon)
                }));
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
    };
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        if (name === "description" || name === "details" || name === "price" || name === "limitNumberOfTravelers" || name === "title" || name === "type") {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else if (name === 'startDate' || name === 'endDate') {
            const startDate = name === 'startDate' ? new Date(value) : new Date(formData.startDate);
            const endDate = name === 'endDate' ? new Date(value) : new Date(formData.endDate);
            const duration = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
                duration: duration
            }));
        } else if (name === 'startTime' || name === 'endTime') {
            const startTime = name === 'startTime' ? new Date(value) : new Date(formData.startTime);
            const endTime = name === 'endTime' ? new Date(value) : new Date(formData.endTime);
            const duration = Math.floor((endTime - startTime) / (1000 * 60));
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
                duration: duration
            }));
        } else if (name === "highlights" || name === "program") {
            const arrayValue = value.split('\n').filter(line => line.trim() !== '');
            setFormData(prevState => ({
                ...prevState,
                [name]: arrayValue
            }));
        } else if (name === 'mainImage' || name === 'image-1' || name === 'image-2') {
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
                images: [
                    prevState.mainImage,
                    prevState['image-1'],
                    prevState['image-2']
                ]
            }));
        }
    };
    
    
    
    
    const handleSubmit =async (event) => {
        event.preventDefault();
    
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
    
        const { startDate, endDate } = formData;
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
    
        if (startDateObj < currentDate) {
            alert('Start date cannot be in the past.');
            return;
        }
    
        if (endDateObj < startDateObj) {
            alert('End date cannot be smaller than start date.');
            return;
        }
    
        const durationInMilliseconds = endDateObj.getTime() - startDateObj.getTime();
        const durationInDays = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24));
    
        setFormData({ ...formData, duration: durationInDays });
    
        const tourData = {
            ...formData,
            duration: durationInDays,
            included: selectedIncludedOptions,
            excluded: selectedExcludedOptions,
            location: selectedLocation,
            destination: formData.destination,
        };
    
        console.log('Submitted Tour Data:', tourData);

    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const url = 'http://localhost:2000/tours/create-tours';
                const response = await axios.post(url, tourData);
                console.log('Response:', response.data);
                Swal.fire("Saved!", "", "success");
            } catch (error) {
                console.error('Error:', error);
                Swal.fire("Error", "Failed to save changes", "error");
            }
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
    };

    const handleLocationChange = (event) => {
        const selectedLocation = event.target.value;
        setSelectedLocation(selectedLocation);
    
        let destinationOptions = [];
    
        switch (selectedLocation) {
            case 'Aswan, Egypt':
                destinationOptions = ['High Dam', 'Nubian Village', 'Philae Temple'];
                break;
            case 'Cairo, Egypt':
                destinationOptions = ['Egyptian Museum', 'Khan El Khalili Bazaar', 'Cairo Tower'];
                break;
            case 'Alexandria, Egypt':
                destinationOptions = ['Bibliotheca Alexandrina', 'Qaitbay Citadel', 'Montaza Palace'];
                break;
            case 'Luxor, Egypt':
                destinationOptions = ['Karnak Temple', 'Valley of the Kings', 'Luxor Temple'];
                break;
            case 'Giza, Egypt':
                destinationOptions = ['Great Sphinx', 'Saqqara Necropolis', 'Memphis'];
                break;
            case `Hurghada, Egypt`:
                destinationOptions = ['Giftun Island', 'Mahmya Island', 'Hurghada Marina'];
                break;
            default:
                break;
        }
    
        setDestinations(destinationOptions);
    
        setFormData(prevState => ({
            ...prevState,
            location: selectedLocation,
            destination: '' // Clear destination when location changes
        }));
    };
    
    const handleDestinationChange = (event) => {
        const selectedDestination = event.target.value;
            setFormData(prevState => ({
            ...prevState,
            destination: selectedDestination
        }));
    };
    const { latitude, longitude } = formData;

    return (
        <>
            <div className="col-md-9 m-3">
                <div className='row'>
                    <div className='card shadow'>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit}>
                                <h1>Create Tour</h1>
                                <div className='card shadow m-3 p-3'>
                                    <h5 className='fs-4 mb-4'>Title && Type</h5>
                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <input type="text" placeholder='Enter Title...' id="title" className="form-control p-2" name='title' onChange={handleInputChange} required  />
                                        </div>
                                        <div className="col-md-6">
                                            <select id="type" className="form-control p-2" placeholder="Select Type" name='type' onChange={handleInputChange} required >
                                                <option value="">Select Type</option>
                                                <option value="dventure Tours">dventure Tours</option>
                                                <option value="Cultural Tours">Cultural Tours</option>
                                                <option value="Wildlife Tours">Wildlife Tours</option>
                                                <option value="Culinary Tours:">Culinary Tours:</option>
                                                <option value="Wellness Tours">Wellness Tours</option>
                                            </select>                                        
                                        </div>
                                    </div>
                                </div>

                                <div className='card shadow m-3 p-3'>
                                    <h5 className='fs-4 mb-4'>Location && Destination</h5>
                                    <div className="form-group row">
                                        <div className="col-md-6 col-sm-12">
                                            <select id="location" className="form-control" placeholder="Select Location" name='location' value={selectedLocation} onChange={handleLocationChange}>
                                                <option value="">Select Location</option>
                                                <option value="Alexandria, Egypt">Alexandria, Egypt</option>
                                                <option value="Aswan, Egypt">Aswan, Egypt</option>
                                                <option value="Cairo, Egypt">Cairo, Egypt</option>
                                                <option value="Hurghada, Egypt">Hurghada, Egypt</option>
                                                <option value="Luxor, Egypt">Luxor, Egypt</option>
                                                <option value="Giza, Egypt">Giza, Egypt</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            {destinations.length > 0 && (
                                                <select id="destination" className="form-control " name='destination' value={formData.destination} onChange={handleDestinationChange} required>
                                                    <option value="">Select Destination</option>
                                                    {destinations.map((destination, index) => (
                                                        <option key={index} value={destination}>{destination}</option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>

                                    </div>
                                </div>

                                <div className='card shadow m-3 p-3'>
                                    <h5 className='fs-4 mb-4'>Langitude && Longitude</h5>
                                    <div className="form-group row">
                                        <div className="col-md-6 col-sm-12">
                                            <label htmlFor="latitude">Latitude </label>
                                            <input type="text" id="Latitude" className="form-control p-2 disabled" disabled name='latitude' value={latitude} />
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <label htmlFor="latitude">Longitude</label>
                                            <input type="text" id="longitude" className="form-control p-2 disabled" disabled name='longitude' value={longitude} />
                                        </div>
                                    </div>
                                </div>

                                <div className='card shadow m-3 p-3'>
                                    <h5 className='fs-4 mb-4'>Date</h5>
                                    <div className="form-group row">
                                        <div className="col-md-6 col-sm-12">
                                            <label htmlFor="start-date">Start Date</label>
                                            <input type="date" id="start-date" name='startDate' className="form-control p-2" onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-md-6 col-sm-12">
                                            <label htmlFor="end-date">End Date</label>
                                            <input type="date" id="end-date" name='endDate' className="form-control p-2" onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                </div>

                                <div className='card shadow m-3 p-3'>
                                    <h5 className='fs-4 mb-4'>Time && Duration</h5>
                                    <div className="form-group row">
                                        <div className="col-md-4 col-sm-12">
                                            <label htmlFor="start-time">Start Time</label>
                                            <input type="time" id="start-time" name='startTime' className="form-control p-2" onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <label htmlFor="end-time">End Time</label>
                                            <input type="time" id="end-time" name='endTime' className="form-control p-2" onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <label htmlFor="duration">Duration (Days)</label>
                                            <input type="text" id="duration" name='duration' className="form-control p-2" value={formData.duration} disabled />
                                        </div>
                                    </div>
                                </div>

                                <div className='card shadow m-3 p-3'>
                                    <h5 className='fs-4 mb-4 '>Images URL</h5>
                                    <div className="form-group row">
                                        <div className="col-md-4 col-sm-12">
                                            <input type="text" id="image" placeholder='Enter Main Image URL...' name='mainImage' className="form-control p-2" onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <input type="text" id="image-1" placeholder='Enter First Image URL...' name='image-1' className="form-control p-2" onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-md-4 col-sm-12">
                                            <input type="text" id="image-2" placeholder='Enter Second Image URL...' name="image-2" className="form-control p-2" onChange={handleInputChange} required/>
                                        </div>
                                    </div>
                                </div>

                                <div className="card shadow m-3 p-3">
                                    <h5 className='fs-4 mb-4'>Price && Amount of Tickets</h5>
                                    <div className="form-group row">
                                        <div className="col-md-6 col-sm-12">
                                            <select id="price" className="form-control p-2"name='price' onChange={handleInputChange} required>
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

                                        <div className="col-md-6 col-sm-12" style={{textAlign:"left"}} >
                                            <input type="number" id="amount" name='limitNumberOfTravelers' className="form-control p-2" placeholder='Enter Amount of Tickets' onChange={handleInputChange} required/>
                                        </div>
                                    </div>
                                </div>

                                <div className="card shadow m-3 p-3">
                                    <h5 className='fs-4 mb-4'>Description && Extra Info</h5>
                                    <div className="form-group row">
                                        <div className="col-md-12 col-sm-12 mb-4">
                                            <textarea id="description" className="form-control p-2" placeholder='Enter Description' name='description' rows={5} onChange={handleInputChange} required></textarea>
                                        </div>
                                        <div className='col-md-6 col-sm-12 '>
                                            <Select
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                placeholder="Select Included"
                                                name='included'
                                                onChange={handleSelectIncluded}
                                                required
                                                isMulti
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
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                placeholder="Select Excluded"
                                                name='excluded'
                                                onChange={handleSelectExcluded}
                                                isMulti
                                                required
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
                                            <textarea id="Programs" className="form-control p-2" placeholder='Enter Programs' name='program' rows={5} onChange={handleInputChange} required></textarea>
                                        </div>
                                        <div className="col-md-6 col-sm-12 mb-4">
                                            <textarea id="Highlights" name='highlights' className="form-control p-2" placeholder='Enter Highlights' rows={5} onChange={handleInputChange} required></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-12 col-sm-12 mb-4">
                                            <textarea id="details" className="form-control p-2" placeholder='Enter details' name='details' rows={5 } onChange={handleInputChange} required></textarea>
                                        </div>

                                    </div>
                                </div>
                                <button type="submit" class="btn btn-outline-primary w-75 mt-3 fs-3" data-mdb-ripple-init data-mdb-ripple-color="dark">Create Tour</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
