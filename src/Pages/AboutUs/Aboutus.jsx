import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import contactUsImage from '../../Images/contactus/046cb4bad5b2fec8655e41a6c1c0b06f.jpg'; 
import { colors } from './../../colors';

export default function Aboutus() {
  return (
    // <div>ContactUs</div>
    <>
      <Navbar />
        <div className='position-relative my-5'>
        <div className='black-overlay position-absolute top-0 start-0 w-100 h-100' style={{backgroundColor:' rgba(0, 0, 0, 0.3)'}}></div>
          <img src={contactUsImage} alt='contactus' className='w-100' style={{height:'35rem' }} />
          <h2 className='text-center position-absolute top-50 start-50 translate-middle fw-bold text-white' style={{fontSize:'6rem'}}>About Us</h2>
        </div>
      <div className='container-fluid'>
        <div className='row w-75 mx-auto'>
          <div className='col-md-12'>
            <h2 className='fw-bold'>About the company</h2>
            <p>Welcome to Trollii, your ultimate travel companion. We offer a comprehensive one-stop-shop for all your travel needs. Our user-friendly platform allows you to book flights, hotels, tours, cars, and cruises with ease. Our mission is to make your travel experience as hassle-free and convenient as possible. We understand that everyone has different needs and preferences, which is why we offer a wide range of options to choose from. Whether you're looking for a budget-friendly option or something more luxurious, we have you covered. With our reliable and efficient service, we ensure that your travel plans are tailored to your specific needs. Trust us to take the stress out of planning your next adventure and book with Trollii today.</p>
          </div>
          <div className='col-md-12'>
            <h2 className='fw-bold mb-5'>Our mission</h2>
            <div className='row'>
              <div className='col-md-3 text-center'>
                <i class="bi bi-life-preserver fs-1 text-white" style={{padding:'30px' ,backgroundColor:colors.secondary , borderTopRightRadius:'52px' , borderBottomRightRadius:'34px', paddingLeft:'50px',borderTopLeftRadius:'175px' , borderBottomLeftRadius:'17px' }}></i>
                <h3 className='fw-bold mt-4'>Services</h3>
                <p>We offer best services and help center 24/7</p>
              </div>
              <div className='col-md-3 text-center'>
              <i class="bi bi-emoji-smile fs-1 text-white" style={{padding:'30px' ,backgroundColor:colors.secondary , borderTopRightRadius:'52px' , borderBottomRightRadius:'34px', paddingLeft:'50px',borderTopLeftRadius:'175px' , borderBottomLeftRadius:'17px' }}></i>
                <h3 className='fw-bold mt-4'>Enjoy the world</h3>
                <p>More than 10000 tours travel with best services</p>
              </div>
              <div className='col-md-3 text-center'>
                <i class="bi bi-hand-index-thumb fs-1 text-white" style={{padding:'30px' ,backgroundColor:colors.secondary , borderTopRightRadius:'52px' , borderBottomRightRadius:'34px', paddingLeft:'50px',borderTopLeftRadius:'175px' , borderBottomLeftRadius:'17px' }}></i>
                <h3 className='fw-bold mt-4'>Rerserve Now</h3>
                <p>Feel free to resreve the activity you want.</p>
              </div>
              <div className='col-md-3 text-center'>
                <i class="bi bi-x-octagon fs-1 text-white" style={{padding:'30px' ,backgroundColor:colors.secondary , borderTopRightRadius:'52px' , borderBottomRightRadius:'34px', paddingLeft:'50px',borderTopLeftRadius:'175px' , borderBottomLeftRadius:'17px' }}></i>
                <h3 className='fw-bold mt-4'>Free cancellation</h3>
                <p>Don’t be afraid tocancle your bookings.</p>
              </div>
            </div>
          </div>

          <div className='col-md-12'>
            <h2 className='fw-bold mt-4'>What our clinets say about us</h2>
            <div className='row mb-5'>
              <div className='col-md-4 mt-3'>
                <div className='card shadow'>
                  <div className='card-body '>
                    <div className='d-flex mb-3 align-items-center'>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="rounded-circle text-center me-3 img-fluid" alt='profile-picture' style={{height: '90px', width: '90px'}}/>
                      <div className='ms-2'>
                        <h5>Max Payne</h5>
                        <p>Cairo, Egypt</p>
                      </div>
                    </div>
                    <div className='mb-3'>
                      Trollii is such an amazing website to book travles tours from it, usually I’m travel every month and in every country I book the tours from here. Good service. best prices, free cancellition, etc. Thanks Trollii. 
                    </div>
                    <div className='rating'>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-4 mt-3'>
                <div className='card shadow'>
                  <div className='card-body '>
                    <div className='d-flex mb-3 align-items-center'>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="rounded-circle text-center me-3 img-fluid" alt='profile-picture' style={{height: '90px', width: '90px'}}/>
                      <div className='ms-2'>
                        <h5>Max Payne</h5>
                        <p>Cairo, Egypt</p>
                      </div>
                    </div>
                    <div className='mb-3'>
                      Trollii is such an amazing website to book travles tours from it, usually I’m travel every month and in every country I book the tours from here. Good service. best prices, free cancellition, etc. Thanks Trollii. 
                    </div>
                    <div className='rating'>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-4 mt-3'>
                <div className='card shadow'>
                  <div className='card-body '>
                    <div className='d-flex mb-3 align-items-center'>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className="rounded-circle text-center me-3 img-fluid" alt='profile-picture' style={{height: '90px', width: '90px'}}/>
                      <div className='ms-2'>
                        <h5>Max Payne</h5>
                        <p>Cairo, Egypt</p>
                      </div>
                    </div>
                    <div className='mb-3'>
                      Trollii is such an amazing website to book travles tours from it, usually I’m travel every month and in every country I book the tours from here. Good service. best prices, free cancellition, etc. Thanks Trollii. 
                    </div>
                    <div className='rating'>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                      <i class="bi bi-star-fill" style={{color:'gold'}}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
