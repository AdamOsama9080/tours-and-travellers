import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import { FilterContext } from '../../Contexts/filterationContext';
import { Checkbox } from '@mui/material';
import { colors } from '../../colors.js';

const Rate = () => {
  const { selectedFilters, setSelectedFilters } = useContext(FilterContext);
  const [rating, setRating] = useState(0); // Initial rating state
  const [showRatingOptions, setShowRatingOptions] = useState(true); // State to control visibility of rating options
  const [showMenu, setShowMenu] = useState(true);

  const handleCheckboxChange = (value) => {
    setRating(value); // Set the selected rating
    setSelectedFilters(old => ({ ...old, Rate: value }));
  };

  const starsArr = [1, 2, 3, 4, 5];
  const maxRating = 5;

  return (
    <div className="rate d-flex flex-column my-3">
            <div className='d-flex justify-content-between'>
      <h5 className='fs-4' onClick={() => setShowMenu(!showMenu)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            Rate
          </h5>
          <span className='' style={{ cursor: 'pointer' }} onClick={() => setShowMenu(!showMenu)}>
            {starsArr.length > 0 ? (
              showMenu ? (
                <FontAwesomeIcon icon={faAngleDown} />
              ) : (
                <FontAwesomeIcon icon={faAngleUp} />
              )
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </span>
      </div>
      {showMenu && (
        <ul style={{ listStyle: 'none', paddingLeft: '0', boxShadow: 'none' }}>
          {starsArr.map((value, index) => (
            <li key={index}>
              <div style={{ display: 'flex', alignItems: 'center', color: 'gold' }}>
                <Checkbox
                  sx={{
                    color: colors.violet,
                    '&.Mui-checked': {
                      color: colors.violet
                    }
                  }}
                  onChange={() => handleCheckboxChange(value)}
                  checked={selectedFilters.Rate === value}
                />
                {[...Array(value)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={solidStar} style={{ color: 'gold' }} />
                ))}
                {[...Array(maxRating - value)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={regularStar} style={{ color: 'gold' }} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Rate;
