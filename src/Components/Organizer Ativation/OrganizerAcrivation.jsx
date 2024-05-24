import axios from 'axios'
import React, { useEffect, useState } from 'react'



export default function OrganizerAcrivation() {
    const [ orgnaizers , setOrganizers ] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:2000/organizers/organizers')
        .then(response =>{
            console.log(response.data)
            setOrganizers(response.data)
        }).catch(error =>{
            console.error(error)
        })
    },[])

    const ActivationToggle = (id , status) => {
        axios.patch(`http://localhost:2000/organizers/organizers/toggle-activation/${id}`)
        .then(response=>{
            setOrganizers(orgnaizers.map((organizer)=>
               organizer._id === id ? { ...organizer , active : !status } : organizer 
            ))
        }).catch(error=>{
            console.error(error)
        })
    }

  return (
    // <div>OrganizerAcrivation</div>
    <>
        <div className="col-md-9">
            <div className='row'>
                {orgnaizers.map(organizer => (
                    <div className='col-md-12' key={organizer._id}>
                        <div className='card shadow mb-4'>
                            <div className='card-body'>
                                <div className=''>
                                    <p className='fs-4'>Name : {organizer.firstName} {organizer.lastName}</p>
                                    <p className='fs-4'>Email : {organizer.email}</p>
                                    <p className='fs-4'>Activation : {organizer.active ? 'Is Active' : 'Not Active'}</p>
                                    <button
                                        className={`btn mt-3 ${organizer.active ? 'btn-danger' : 'btn-success'}`}
                                        onClick={() => ActivationToggle(organizer._id, organizer.active)}
                                    >
                                        {organizer.active ? 'Deactivate' : 'Activate'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}
