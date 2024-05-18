import React, { useState } from 'react';

export default function CreateOrganizerEmail() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthdate: '',
        email: ''
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:2000/organizers/register', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    setSuccess(true);
                    setTimeout(() => setSuccess(false), 3000);
                    return response.json();
                } else {
                    throw new Error('Registration failed!');
                }
            })
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5 shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center">Organizer Registration Form</h2>
                            <form id="registrationForm" onSubmit={handleSubmit}>
                                <div className="form-group mb-2">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Enter first name"
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Enter last name"
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="birthdate">Birthdate</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="birthdate"
                                        name="birthdate"
                                        value={formData.birthdate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                    />
                                </div>
                                <div className="row">
                                    <div className="text-center col-md-12">
                                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                    </div>
                                </div>
                            </form>
                            {success && (
                                <div id="alertSuccess" className="alert alert-success mt-3" role="alert">
                                    Registration successful!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
