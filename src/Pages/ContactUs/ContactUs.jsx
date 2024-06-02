import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import contactUsImage from '../../Images/a2813d240c7f9487a0548f701294efb0.jpg'; // Import the image
import { colors } from './../../colors';
import Swal from 'sweetalert2';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export default function ContactUs() {
  const user = jwtDecode(localStorage.getItem("token"));

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user.email,
    message: '',
    subject: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/contact/contact', formData);
      Swal.fire({
        icon: 'success',
        text: response.data.message,
        confirmButtonText: 'OK',
        title: 'Success!'
      });
    } catch (error) {
      console.error("Error posting review:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to post review. Please try again later.',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className='position-relative my-5'>
        <div className='black-overlay position-absolute top-0 start-0 w-100 h-100' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}></div>
        <img src={contactUsImage} alt='contactus' className='w-100' style={{ height: '35rem' }} />
        <h2 className='text-center position-absolute top-50 start-50 translate-middle fw-bold text-white' style={{ fontSize: '6rem' }}>Contact Us</h2>
      </div>

      <div className='container-fluid w-75 mt-5'>
        <div className='row text-center'>
          <div className='col-md-4'>
            <i className="bi bi-telephone fs-1 text-white" style={{ padding: '30px', backgroundColor: colors.secondary, borderTopRightRadius: '52px', borderBottomRightRadius: '34px', paddingLeft: '50px', borderTopLeftRadius: '175px', borderBottomLeftRadius: '17px' }}></i>
            <h3 className='fw-bold mt-4'>Phone</h3>
            <p>Call us using our phone <br /> number and get in touch</p>
            <p className='fw-bold' style={{ color: colors.secondary }}><i className='bi bi-telephone text-black-50'></i> +201112675750</p>
          </div>
          <div className='col-md-4'>
            <i className="bi bi-envelope-paper fs-1 text-white" style={{ padding: '30px', backgroundColor: colors.secondary, borderTopRightRadius: '52px', borderBottomRightRadius: '34px', paddingLeft: '50px', borderTopLeftRadius: '175px', borderBottomLeftRadius: '17px' }}></i>
            <h3 className='fw-bold mt-4'>Email</h3>
            <p>Send us an email with whatever <br /> you want.</p>
            <p className='fw-bold' style={{ color: colors.secondary }}><i className='bi bi-envelope-paper text-black-50'></i> adamosama9080@outlook.com</p>
          </div>
          <div className='col-md-4'>
            <i className="bi bi-geo-alt fs-1 text-white" style={{ padding: '30px', backgroundColor: colors.secondary, borderTopRightRadius: '52px', borderBottomRightRadius: '34px', paddingLeft: '50px', borderTopLeftRadius: '175px', borderBottomLeftRadius: '17px' }}></i>
            <h3 className='fw-bold mt-4'>Location</h3>
            <p>Reaching in our location at <br /> cairo, Egypt</p>
            <p className='fw-bold' style={{ color: colors.secondary }}><i className='bi bi-geo-alt text-black-50'></i> 6 <sup>th</sup> October</p>
          </div>
        </div>

        <div className='row mt-5'>
          <div className='col-md-12'>
            <h2 className='fw-bold text-center fs-1 text-capitalize'>leave a message</h2>
            <p className='fw-bold text-center fs-5 text-capitalize text-black-50'>and we will get back to you soon</p>
          </div>
          <form className='form-group col-md-12 mb-5' onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-6'>
                <label className='text-black mt-3 text-capitalize text-left' htmlFor='firstName'>first name</label>
                <input type='text' className='form-control' id='firstName' name='firstName' value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className='col-md-6'>
                <label className='text-black mt-3 text-capitalize text-left' htmlFor='lastName'>last name</label>
                <input type='text' className='form-control' id='lastName' name='lastName' value={formData.lastName} onChange={handleChange} required />
              </div>
              <div className='col-md-12'>
                <label className='text-black mt-3 text-capitalize text-left' htmlFor='email'>email</label>
                <input type='email' className='form-control text-center' id='email' name='email' value={formData.email} onChange={handleChange} required disabled />
              </div>
              <div className='col-md-12'>
                <label className='text-black mt-3 text-capitalize text-left' htmlFor='subject'>subject</label>
                <input type='text' className='form-control' id='subject' name='subject' value={formData.subject} onChange={handleChange} required />
              </div>
              <div className='col-md-12'>
                <label className='text-black mt-3 text-capitalize text-left' htmlFor='message'>message</label>
                <textarea className='form-control' id='message' name='message' rows={10} value={formData.message} onChange={handleChange} required />
              </div>

              <div className='col-md-12'>
                <button type='submit' style={{ backgroundColor: colors.secondary }} className='btn btn-primary mt-3 w-100 text-capitalize fw-bold p-2 fs-5'>Send message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
