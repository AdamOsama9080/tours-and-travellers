import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { FilterationContext } from '../../Contexts/filterationContext';

const Rate = () => {
  const {selectedFilters,setSelectedFilters} = useContext(FilterationContext);

  const [rating, setRating] = useState(0); // Initial rating state

  // const handleratingSelection = (value ,checked) => {
  //   console.log(checked);
  //   setRating(value); // Set the selected rating
  //   onFilterSelect(`${value} Stars rating`,checked); // Call onFilterSelect with selected rating
  // };
  const starsArr = [1,2,3,4,,5];

  return (
    <div className="rate my-2">
      <h5>Rate</h5>
      {
        starsArr.map((el,index)=>{
          return <div>
          <label>
            <input style={{ width: '20px', height: '20px' }}
              type="checkbox" 
               name="rating" 
               onChange={(e) => {
                  setSelectedFilters(old=>({...old,Rate:el}));
               }} 
              checked={selectedFilters.Rate === el}
            />
            <FontAwesomeIcon icon={index >=0 ? solidStar : regularStar } style={{ color: 'gold' }} />
            <FontAwesomeIcon icon={index >=1 ? solidStar : regularStar} style={{ color: 'gold' }} />
            <FontAwesomeIcon icon={index >=2 ? solidStar : regularStar} style={{ color: 'gold' }} />
            <FontAwesomeIcon icon={index >=3 ? solidStar : regularStar} style={{ color: 'gold' }} />
            <FontAwesomeIcon icon={index >=4 ? solidStar : regularStar} style={{ color: 'gold' }} />
          </label>
        </div>

        })
      }
      <div className='my-3' style={{ width:'100%',height:'0.7px',border:'1px solid gray' }}></div>

    </div>
  );
}

export default Rate;