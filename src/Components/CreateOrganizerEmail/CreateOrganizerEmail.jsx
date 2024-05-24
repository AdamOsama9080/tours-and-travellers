import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';

const validationSchema = yup.object({
    firstName: yup
        .string()
        .min(3, 'First Name must be at least 3 characters')
        .max(15, 'First Name must be at most 15 characters')
        .required('First Name is required'),
    lastName: yup
        .string()
        .min(3, 'Last Name must be at least 3 characters')
        .max(15, 'Last Name must be at most 15 characters')
        .required('Last Name is required'),
    birthdate: yup
        .date()
        .test(
            'age',
            'You must be at least 21 years old',
            function(value) {
                const today = new Date();
                const birthDate = new Date(value);
                const age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    return age - 1 >= 21;
                }
                return age >= 21;
            }
        )
        .required('Birthdate is required'),
    email: yup
        .string()
        .email('Invalid email format')
        .matches(/@organizer\.com$/, 'Email must end with @organizer.com')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    active: yup
        .string()
        .oneOf(['Active', 'Not Active'], 'Invalid status')
        .required('Active status is required')
});

export default function CreateOrganizerEmail() {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            birthdate: '',
            email: '',
            password: '',
            active: 'Not Active'
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
            axios.post('http://localhost:2000/organizers/register', values)
                .then(response => {
                    if (response.status === 201) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Registration successful!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        console.log(response.data);
                    } else {
                        throw new Error('Registration failed!');
                    }
                })
                .catch(error => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Registration failed!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.error('Error:', error);
                });
        }
    });

    return (
        <div className='col-md-9 g-4'>
            <div className='row'>
                <div className="col-md-12">
                    <div className="card mt-5 shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center">Organizer Registration Form</h2>
                            <form id="registrationForm" onSubmit={formik.handleSubmit}>
                                <div className="form-group mb-2">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter first name"
                                    />
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <div className="text-danger">{formik.errors.firstName}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter last name"
                                    />
                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <div className="text-danger">{formik.errors.lastName}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="birthdate">Birthdate</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="birthdate"
                                        name="birthdate"
                                        value={formik.values.birthdate}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.birthdate && formik.errors.birthdate ? (
                                        <div className="text-danger">{formik.errors.birthdate}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter email"
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-danger">{formik.errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="password">Password</label> {/* Added password input */}
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter password"
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-danger">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="active">Active Status</label>
                                    <select
                                        className="form-control"
                                        id="active"
                                        name="active"
                                        value={formik.values.active}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Not Active">Not Active</option>
                                    </select>
                                    {formik.touched.active && formik.errors.active ? (
                                        <div className="text-danger">{formik.errors.active}</div>
                                    ) : null}
                                </div>
                                <div className="row">
                                    <div className="text-center col-md-12">
                                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                    </div>
                                </div>
                            </form>
                            {/* {formik.isSubmitting && formik.isValid && (
                                <div id="alertSuccess" className="alert alert-success mt-3" role="alert">
                                    Registration successful!
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
