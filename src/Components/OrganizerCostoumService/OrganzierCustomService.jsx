import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function OrganizerCustomService() {
  const [input, setInput] = useState('');
  const [userData, setUserData] = useState(null);
  const [bookingData, setBookingData] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:2000/customservice/details', { input });
      console.log(response);

      if (response.data && response.data.user && Array.isArray(response.data.booking)) {
        Swal.fire({
          title: 'Success!',
          text: 'Details fetched successfully.',
          icon: 'success'
        });

        setUserData(response.data.user);
        setBookingData(response.data.data.booking);
      } else {
        Swal.fire({
          title: 'No data found',
          text: 'No details found for the given input.',
          icon: 'warning'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while fetching details. Please try again.',
        icon: 'error'
      });

      console.error('Error fetching details:', error);
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

        {userData && bookingData.length > 0 && bookingData.map((booking, index) => (
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
        ))}

        {userData && bookingData.length === 0 && (
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-body'>
                <p className='fs-4'>No bookings found for this user.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
