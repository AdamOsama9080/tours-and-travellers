import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function OrganizerCustomService() {
  const [input, setInput] = useState('');
  const [userData, setUserData] = useState(null);
  const [bookingData, setBookingData] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('https://tours-api-7hh1.onrender.com/customservice/details', { input });
      console.log('Response:', response.data);
      console.log('User Data:', response.data.user);
      console.log('Booking Data:', response.data.bookings);

      if (response.data && response.data.user && Array.isArray(response.data.bookings)) {
        Swal.fire({
          title: 'Success!',
          text: 'Details fetched successfully.',
          icon: 'success'
        });

        setUserData(response.data.user);
        setBookingData(response.data.bookings);
      } else {
        Swal.fire({
          title: 'No data found',
          text: 'No details found for the given input.',
          icon: 'warning'
        });

        setUserData(null);
        setBookingData([]);
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while fetching details. Please try again.',
        icon: 'error'
      });

      console.error('Error fetching details:', error);
      setUserData(null);
      setBookingData([]);
    }
  };

  return (
    <div className="col-md-9 m-3">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Tour number OR Email User (example: 1***** or 9KXpF@example.com)"
                  aria-label="Search"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn btn-outline-primary" type="button" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {userData && bookingData.length > 0 ? (
          bookingData.map((booking, index) => (
            <div className='col-md-12' key={index}>
              <div className='card'>
                <div className='card-body'>
                  <p className='fs-4'>Name: {userData.firstName} {userData.lastName}</p>
                  <p className='fs-4'>Email: {userData.email}</p>
                  <p className='fs-4'>TourCode: {booking.tripCode}</p>
                  <p className='fs-4'>isCanceld: {booking.isCanceld.toString()}</p>
                  <p className='fs-4'>No. OF Tickets: {booking.numOfPeople}</p>
                  <button className='btn btn-primary'>Cancel Trip</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-body'>
                <p className='fs-4'>No data found for the given input.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
