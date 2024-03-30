import React, { useContext, useState } from 'react';
import { colors } from '../../colors.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FilterationContext } from '../../Contexts/filterationContext.js';
import { Checkbox } from '@mui/material';

const DepartsFromSection = () => {
  const { selectedFilters, setSelectedFilters } = useContext(FilterationContext);
  const Departs = [
    "Siwa Oasis",
    "Aswan",
    "Sharm El Sheikh",
    "Dahab",
    "Luxor",
    // "Aswan",
    "Alexandria"
    // Add more Departs here
  ];
  const [showMenu, setShowMenu] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const handleCheckboxChange = (depart) => {
    setSelectedFilters(old => {
      if (!old.Departs.includes(depart)) {
        return { ...old, Departs: [...old.Departs, depart] };
      } else {
        return { ...old, Departs: old.Departs.filter(el => el !== depart) };
      }
    });
  };

  return (
    <div className="destination d-flex flex-column mt-3" style={{borderBottom: `1px solid rgba(196, 196, 196, 1)`}}>
      <div className='d-flex justify-content-between'>
      <h5 className='fs-4' onClick={() => setShowMenu(!showMenu)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            Location{' '}
          </h5>
          <span className='' style={{ cursor: 'pointer' }} onClick={() => setShowMenu(!showMenu)}>
            {Departs.length > 0 ? (
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
          {Departs.slice(0, showMore ? Departs.length : 3).map((depart, index) => (
            <li key={index}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                sx={{
                  color: colors.violet,
                  '&.Mui-checked': {
                    color: colors.violet
                  }
                }}
                  onChange={() => handleCheckboxChange(depart)}
                  checked={selectedFilters.Departs.includes(depart)}
                />
                {depart}
              </div>
            </li>
          ))}
        </ul>
      )}
      {Departs.length > 3 && (
        <a style={{ color: colors.violet, cursor: 'pointer' }} className='text-decoration-none mb-3' onClick={() => setShowMore(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </a>
      )}
    </div>
  );
}

export default DepartsFromSection;
