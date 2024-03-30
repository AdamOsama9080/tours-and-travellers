import React, { useEffect, useState } from 'react';
import { colors } from '../../colors.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from '@mui/material';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Services = ({onFilterSelect,onRemoveFilter, initialSelectedValues}) => {
    const Services = ["Adittional Tour", "Hoursing","samll group","any thing"];
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
      <div className="services d-flex flex-column">
        <div className="d-flex justify-content-between">
        <h5 className='' onClick={() => setShowMenu(!showMenu)} style={{ display: 'flex', alignItems: 'center' }}>
    Services{' '}
    
  </h5>
  <span className='' style={{ }}>
      {Services.length > 0 ? (
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
        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
          {Services.slice(0, showMore ? Services.length : 3).map((service, index) => (
            <li key={index}>
              <label>
                <input style={{ width: '20px', height: '20px' }}
                 type="checkbox"
                  value={service}
                  onChange={(e) => onFilterSelect(service,e.target.checked)} // Call handleDurationSelection on change

                  /> {service}
              </label>
            </li>
          ))}
        </ul>
      )}
      {Services.length > 3 && (
        <a   style={{ color:colors.violet , cursor: 'pointer' }} className='text-decoration-none' onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </a>
      )}
          <div className='my-3' style={{ width:'100%',height:'0.7px',border:'1px solid gray' }}></div>

    </div>
    );
}

export default Services;
