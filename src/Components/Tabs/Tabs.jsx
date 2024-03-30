
import React, { useState } from 'react';



import "./Tabs.modules.css";
import Overview from '../Overview/Overview';
import Questions from '../Questions/Questions';
import Reviews from '../ReviewsComponent/Reviews';


function Tabs() {
   
  const [selectedButton, setSelectedButton] = useState('Overview'); 

  const handleButtonClick = (value) => {
    setSelectedButton(value);
  };


   

  let content;
  if (selectedButton === 'Overview') {
    content = (
      <div>
        <Overview ></Overview>
      </div>
    );
  } 
   else if (selectedButton === 'Review') {
    content = (
      <div>
        <Reviews></Reviews>
      </div>
    );
  } else if (selectedButton === 'Questiones') {
    content = (
   <div>
    <Questions></Questions>
   </div>
    );
  }

  return (
    <div className='container'>
      <div className='btn-group-container mx-3 '>
        <div className='btn-group'>
        <button className={`${selectedButton === 'Overview' ? 'underLine' : ''} btn btn-light`} onClick={() => handleButtonClick('Overview')}>
  Overview
</button>
<button className={`${selectedButton === 'Review' ? 'underLine' : ''} btn btn-light`} onClick={() => handleButtonClick('Review')}>
  Review
</button>
<button className={`${selectedButton === 'Questiones' ? 'underLine' : ''} btn btn-light`} onClick={() => handleButtonClick('Questiones')}>
  Questions
</button>

        
        </div>
        <div className='content'>
        {content}
      </div>
      </div>
      
    </div>
  );
}

export default Tabs;

