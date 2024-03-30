import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import "./ToggleButtonGroup.modules.css";
import { useContext } from 'react';
import { DataToShowContext } from '../../Contexts/dataToShow';

function ToggleButtonGroup() {
  const { FullData, setFullData } = useContext(DataToShowContext);
  const { t } = useTranslation();
  const [selectedButton, setSelectedButton] = useState('');

  const handleButtonClick = (value) => {
    setSelectedButton(value);
    let sortedData;
    if (value === "topRated") {
      sortedData = handleRange([...FullData], "rating"); 
    }else if(value === "mostPopular"){
      sortedData = handleRange([...FullData], "reviews"); 
    }else{
      sortedData = handleRange([...FullData], "price"); 
    }
    setFullData(sortedData);
  };

  const handleRange = (arr, prop) => {
    if(prop === "rating"){
      return [...arr].sort((a, b) => b[prop] - a[prop]); 
    }else if(prop === "reviews"){
      return [...arr].sort((a, b) => b[prop].length - a[prop].length); 
    }else{
      return [...arr].sort((a, b) => a[prop] - b[prop]); 

    }
  }

  useEffect(() => {
    console.log(FullData); 
  }, [FullData]);

  return (
    <div className='btn-group-container mx-3 rounded-pill'>
      <div className='btn-group'>
        <div className='vertical-divider'></div>
        <button className={`${selectedButton === 'topRated' ? 'underLine' : ''} btn btn-light`} onClick={() => handleButtonClick('topRated')}>
          {t('ToggleButtonGroup.topRated')}
        </button>
        <div className='vertical-divider'></div>
        <button className={`${selectedButton === 'mostPopular' ? 'underLine' : ''} btn btn-light`} onClick={() => handleButtonClick('mostPopular')}>
          {t('ToggleButtonGroup.mostPopular')}
        </button>
        <div className='vertical-divider'></div>
        <button className={`${selectedButton === 'cheapest' ? 'underLine' : ''} btn btn-light`} onClick={() => handleButtonClick('cheapest')}>
          {t('ToggleButtonGroup.cheapest')}
        </button>
      </div>
    </div>
  );
}

export default ToggleButtonGroup;
