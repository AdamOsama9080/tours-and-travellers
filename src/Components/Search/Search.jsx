import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function SearchComponent() {
    const [destination, setDestination] = useState('');
    const [travellers, setTravellers] = useState('1');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');

    const handleDestinationChange = (value) => {
        setDestination(value);
    };

    const handleTravellersChange = (value) => {
        setTravellers(value);
    };

    const handleCheckInChange = (e) => {
        setCheckIn(e.target.value);
    };

    const handleCheckOutChange = (e) => {
        setCheckOut(e.target.value);
    };

    const handleSearch = () => {
        // Handle search functionality here
        console.log('Destination:', destination);
        console.log('Travellers:', travellers);
        console.log('Check-In:', checkIn);
        console.log('Check-Out:', checkOut);
    };

    return (
        <div className='container'>
            <div style={{ borderRadius: '20px' }} className="p-4 shadow my-4 ">
                <section className="search container py-5">
                    <div className="row">
                        <div className="col-md-3">
                            <label htmlFor="destination" className="form-label">Destination</label>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-destination">
                                    {destination || "Select Destination"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleDestinationChange('Option 1')}>Option 1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDestinationChange('Option 2')}>Option 2</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDestinationChange('Option 3')}>Option 3</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="travellers" className="form-label">Travellers</label>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-travellers">
                                    {travellers || "Select Travellers"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => handleTravellersChange("1")}>1 Adult</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleTravellersChange("2")}>2 Adults</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleTravellersChange("2+1")}>2 Adults, 1 Child</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleTravellersChange("3+")}>3 Adults or More</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="check-in" className="form-label">Check-In</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="check-in"
                                value={checkIn}
                                onChange={handleCheckInChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="check-out" className="form-label">Check-Out</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="check-out"
                                value={checkOut}
                                onChange={handleCheckOutChange}
                            />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col text-center">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSearch}
                            >
                                Search Tours
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SearchComponent;
