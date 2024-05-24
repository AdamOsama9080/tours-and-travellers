import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Discounts() {
    const [formData, setFormData] = useState({
        discountStartDate: '',
        discountEndDate: '',
        discountPercentage: '',
        location: 'All Tour',
        duration: 0
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const calculateDuration = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const timeDiff = endDate - startDate;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        return daysDiff;
    };

    useEffect(() => {
        if (formData.discountStartDate && formData.discountEndDate) {
            const duration = calculateDuration(formData.discountStartDate, formData.discountEndDate);
            setFormData((prevData) => ({
                ...prevData,
                duration: duration
            }));
        }
    }, [formData.discountStartDate, formData.discountEndDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            location: formData.location,
            discountPercentage: parseInt(formData.discountPercentage),
            discountStartDate: new Date(formData.discountStartDate).toISOString(),
            discountEndDate: new Date(formData.discountEndDate).toISOString()
        };
        axios.post('http://localhost:2000/tours/discount-tours', payload)
            .then(response => {
                if (response.data.success) {
                    setSuccess(true);
                    setTimeout(() => setSuccess(false), 3000);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Discount added successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log(response.data);
                } else {
                    throw new Error(response.data.message || 'Failed to add discount!');
                }
            })
            .catch(error => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: error.message || 'Failed to add discount!',
                    showConfirmButton: false,
                    timer: 1500
                });
                console.error('Error:', error);
            });
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className='col-md-9 g-4'>
            <div className='row'>
                <div className="col-md-12">
                    <div className="card mt-5 shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center">Add Discount</h2>
                            <form id="discountForm" onSubmit={handleSubmit}>
                                <div className="form-group mb-2">
                                    <label htmlFor="discountStartDate">Start Date</label>
                                    <input type="date" className="form-control" id="discountStartDate" name="discountStartDate" value={formData.discountStartDate} onChange={handleChange} min={today}/>
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="discountEndDate">End Date</label>
                                    <input type="date" className="form-control" id="discountEndDate" name="discountEndDate" value={formData.discountEndDate} onChange={handleChange} min={formData.discountStartDate} />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="discountPercentage">Discount Percentage</label>
                                    <input type="number" className="form-control" id="discountPercentage" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} placeholder="Enter discount percentage"/>
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="location">Location</label>
                                    <select className="form-control" id="location" name="location" value={formData.location} onChange={handleChange}>
                                        <option value="All Tour">All Tour</option>
                                        <option value="Giza, Egypt">Giza, Egypt</option>
                                        <option value="Luxor, Egypt">Luxor, Egypt</option>
                                        <option value="Aswan, Egypt">Aswan, Egypt</option>
                                        <option value="Alexandria, Egypt">Alexandria, Egypt</option>
                                    </select>
                                </div>
                                <div className="form-group mb-2">
                                    <label>Duration (Days):</label>
                                    <p>{formData.duration}</p>
                                </div>
                                <div className="row">
                                    <div className="text-center col-md-12">
                                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
