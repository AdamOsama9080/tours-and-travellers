import React from 'react';
import { colors } from './../../colors';

const Program = () => {
  return (
    <div className='container'>
      <h2 className='text-start'>Program</h2>

      <div className='text-center position-relative mb-5' style={{width: '80px',color:colors.violet, height: '80px',  borderRadius: '50%', border: '2px solid ',borderColor:colors.violet, fontWeight: 'bold', display: 'flex', alignItems: 'center',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>1</div>
<div className='myline position-absolute' style={{width: '1px',height: '48px',border: '1px dotted ',borderColor:colors.violet,top: '254px',left: '170px'}}></div>
      
      <div className='text-center position-relative mb-5' style={{width: '80px', height: '80px',  borderRadius: '50%', border: '2px solid ',borderColor:colors.violet, fontWeight: 'bold', display: 'flex', alignItems: 'center',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>2</div>
<div className='myline position-absolute' style={{width: '1px',height: '49px',border: '1px dotted ',borderColor:colors.violet,top: '127px',left: '170px'}}></div>
      
      <div className='text-center position-relative mb-5' style={{width: '80px', height: '80px',  borderRadius: '50%', border: '2px solid ', borderColor:colors.violet,fontWeight: 'bold', display: 'flex', alignItems: 'center',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>3</div>
      <div className='myline position-absolute' style={{width: '1px',height: '50px',border: '1px dotted ',borderColor:colors.violet,top: '300px',left: '170px'}}></div>

      <div className='text-center position-relative mb-5' style={{width: '80px', height: '80px',  borderRadius: '50%', border: '2px solid ', borderColor:colors.violet,fontWeight: 'bold', display: 'flex', alignItems: 'center',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>4</div>

      
    </div>
  );
};

export default Program;
