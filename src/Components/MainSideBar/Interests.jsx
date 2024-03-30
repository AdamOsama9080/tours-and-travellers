import React, { useEffect, useState } from 'react';
import { colors } from '../../colors.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from '@mui/material';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Interests = ({onFilterSelect,onRemoveFilter, initialSelectedValues}) => {

    const Interests = [
      "Food",
      "Photography",
      "Nature",
      "anything"
      // Add more Interests here
    ];
    const [selectedValues, setSelectedValues] = useState(initialSelectedValues || []); // Initialize selectedValues state with initialSelectedValues

    const [showMenu, setShowMenu] = useState(true);
    const [showMore, setShowMore] = useState(false);
  
    useEffect(() => {
      setSelectedValues(initialSelectedValues || []); // Update selectedValues state when initialSelectedValues change
    }, [initialSelectedValues]);
    
    const handleDurationSelection = (value) => {
      const isChecked = selectedValues.includes(value);
      if (isChecked) {
        // Remove from applied filters
        const updatedFilters = selectedValues.filter(item => item !== value);
        setSelectedValues(updatedFilters); // Update selected values state
        onRemoveFilter(updatedFilters); // Notify parent component to remove filter
      } else {
        // Add to applied filters
        const updatedFilters = [...selectedValues, value];
        setSelectedValues(updatedFilters); // Update selected values state
        onFilterSelect(updatedFilters); // Notify parent component to add filter
      }
    };

    return (
      <div className="duration d-flex flex-column">
     <div className="d-flex justify-content-between">
        <h5 className='' onClick={() => setShowMenu(!showMenu)} style={{ display: 'flex', alignItems: 'center' }}>
    Interests{' '}
    
  </h5>
  <span className='' style={{ }}>
      {Interests.length > 0 ? (
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
        <ul style={{ listStyle: 'none', paddingLeft: '0',boxShadow:'none' }}>
          {Interests.slice(0, showMore ? Interests.length : 3).map((interest, index) => (
            <li key={index}>
               <Checkbox
  {...label}
  value={interest}
  
  sx={{
    color: colors.violet,
          '&.Mui-checked': {
            color: colors.violet
          }
  }}
  onChange={() => handleDurationSelection(interest)}
/>
{interest}
            </li>
          ))}
        </ul>
      )}
      {Interests.length > 3 && (
        <a style={{ color:colors.violet , cursor: 'pointer' }} className='text-decoration-none' onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </a>
      )}
          <div className='my-3' style={{ width:'100%',height:'0.7px',border:'1px solid gray' }}></div>

    </div>
    );
}

export default Interests;
