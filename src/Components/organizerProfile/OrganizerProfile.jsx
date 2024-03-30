import React from 'react'

export default function OrganizerProfile() {
  return (
    // <div>OrganizerProfile</div>
    <>
        <div className='col-md-9 g-4'>
            <div className='row'>
              <div className='col-md-12 '>
                <div className='card shadow  '>
                  <div className='card-body'>
                    <div className='text-center'>

                    <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' className='rounded-circle text-center m-3 img-fluid' alt='Profile img .... 'style={{height:"200px" , width:"200px"}} />
                    </div>
                    <hr />
                    <p className='fs-4 mb-4 p-2' style={{textAlign:"left"}}><strong>Name:</strong> {localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</p>
                    <hr />
                    <p className='fs-4 mb-4 p-2' style={{textAlign:"left"}}><strong>Email:</strong> {localStorage.getItem('email')}</p>
                    <hr />
                    <p className='fs-4 mb-4 p-2' style={{textAlign:"left"}}><strong>Role:</strong> {localStorage.getItem('role')} </p>
                    <hr />
                    <p className='fs-4 mb-4 p-2' style={{textAlign:"left"}}><strong>ID:</strong> {localStorage.getItem('id')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}
