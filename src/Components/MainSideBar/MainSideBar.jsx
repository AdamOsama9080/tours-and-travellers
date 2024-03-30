import React, { useContext, useEffect, useState } from 'react';
import { faTimesCircle, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FilterContext } from '../../Contexts/filterationContext.js';
import { DataToShowContext } from '../../Contexts/dataToShow.js';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { colors } from '../../colors.js';
import DestinationsSection from './DestinationsSection.jsx';
import Duration from './Duration.jsx';
import Rate from './Rate.jsx';
import Price from './Price.jsx';
import Slider from "@mui/material/Slider";
import { Checkbox } from '@mui/material';
import { useFilterContext } from '../../Contexts/filterationContext.js';


const SideBar = ({ filterLength , searchFilterlength }) => {
  // const { selectedFilters, setSelectedFilters } = useContext(FilterContext);
  const { setFillterData } = useContext(DataToShowContext);

  const { selectedFilters, setSelectedFilters } = useFilterContext();
  const [showMenu, setShowMenu] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(300);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setFillterData(selectedFilters);
  }, [selectedFilters]);
  
  const handleCheckboxChange = (filterCategory, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterCategory]: prevFilters[filterCategory].includes(value)
        ? prevFilters[filterCategory].filter(item => item !== value)
        : [...prevFilters[filterCategory], value]
    }));
  };

  const handleRemoveFilter = (filterCategory, value) => {
    setSelectedFilters(old => {
      const updatedFilters = { ...old };
      updatedFilters[filterCategory] = updatedFilters[filterCategory].filter(el => el !== value);
      return updatedFilters;
    });
  };

  const formatPrice = (price) => {
    return price === 300 ? `${price}` : price;
  };

  const handlePriceChange = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
    setSelectedFilters(old => ({
      ...old,
      Price: { min: newValue[0], max: newValue[1] },
    }));
  };

  const handleRatingChange = (value) => {
    setRating(value);
    setSelectedFilters(old => ({ ...old, Rate: value }));
  };

  const Departs = [
    "Siwa Oasis",
    "Aswan",
    "Sharm El Sheikh",
    "Dahab",
    "Luxor",
    "Alexandria"
  ];

  const Durations = [
    "1 days",
    "2 days",
    "3 days",
    "4 days",
    "5 days",
    "7 days",
    "8 days",
    "9 days",
    "10 days",
    "11 days",
    "12 days",
    // Add more Durations here
  ];

  const starsArr = [1, 2, 3, 4, 5];

  const maxRating = 5;

  return (
    <div style={{ textAlign: 'left' }} id="mainsidebar">
      <div className="p-4 pt-5">
      <div>
      <div className="applied-filters" style={{borderBottom: `1px solid rgba(196, 196, 196, 1)` , borderTop: `1px solid rgba(196, 196, 196, 1)`}}>
        <p className='text-align-start fw-bold mt-3' style={{color: colors.secondary}}>Filters</p>
        <p className='text-black-50 mb-0'>{searchFilterlength}/<span className='fw-bold'>{filterLength}</span></p>
        <p className='text-align-start fw-bold fs-5 m-0'>Apllied filters</p>
        <ul style={{boxShadow: 'none'}}>
          {
            selectedFilters.Destinations.map((value, index) => (
              <div className='d-flex align-items-center justify-content-between m-2' style={{backgroundColor: colors.violet,borderRadius: '25px'}}>
                <li style={{  listStyle: 'none' }} className=' m-2  text-light  p-2  ' key={index}>
                {value}
                </li>
                <span style={{color:colors.background}} className='mx-2' onClick={()=>{
                   setSelectedFilters(old=>{
                     old.Destinations = old.Destinations.filter(el=>el!== value);
                     return {...old , Destinations:old.Destinations};
                   })
                 }}><FontAwesomeIcon icon={faTimesCircle} onClick={() => handleRemoveFilter(index)} /> </span>

              </div>

            ))}
          {
            selectedFilters.Departs.map((value, index) => (
              <li style={{ backgroundColor: colors.violet, listStyle: 'none', borderRadius: '25px' }} className=' m-2 position-relative text-light d-inline-block p-2 fw-bolder ' key={index}>
                {value}<span className='mx-2'><FontAwesomeIcon icon={faTimesCircle} onClick={()=>{
                  setSelectedFilters(old=>{
                    old.Departs = old.Departs.filter(el=>el!== value);
                    return {...old , Departs:old.Departs};
                  })
                }}/> </span>

              </li>
            ))
          }
          {
            selectedFilters.Duration.map((value, index) => (
              <li style={{ backgroundColor: colors.violet, listStyle: 'none', borderRadius: '25px' }} className=' m-2 position-relative text-light d-inline-block p-2 fw-bolder ' key={index}>
                {value}<span className='mx-2'><FontAwesomeIcon icon={faTimesCircle}  onClick={()=>{
                  setSelectedFilters(old=>{
                    old.Duration = old.Duration.filter(el=>el!== value);
                    return {...old , Duration:old.Duration};
                  })
                }}/> </span>

              </li>
            ))
          }
          {
            selectedFilters.Rate === 0 || <li style={{ backgroundColor: colors.violet, listStyle: 'none', borderRadius: '25px' }} className=' m-2 position-relative text-light d-inline-block p-2 fw-bolder '>
              {selectedFilters.Rate} Stars rating<span className='mx-2' onClick={()=>{
                setSelectedFilters({...selectedFilters , Rate:0})
              }}><FontAwesomeIcon icon={faTimesCircle} /> </span>

            </li>
          }
          {
            selectedFilters.Price.min === 10 && selectedFilters.Price.max === 300 ||  selectedFilters.Price.min === 0 && selectedFilters.Price.max === 0? <></>
             :  <li style={{ backgroundColor: colors.violet, listStyle: 'none', borderRadius: '25px' }} className=' m-2 position-relative text-light d-inline-block p-2 fw-bolder '>
             EGP {selectedFilters.Price.min} - EGP {selectedFilters.Price.max}  <span className='mx-2' onClick={()=>{
              setSelectedFilters({...selectedFilters , Price:{min:0 , max: 0}})
             }}><FontAwesomeIcon icon={faTimesCircle} /> </span> 
            </li>
          }
        </ul>
      </div>
    </div>

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
                  onChange={() => handleCheckboxChange("Departs", depart)} // Pass both filterCategory and value
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

        {/* <DepartsFromSection /> */}
        <div className="selector w-100 my-4" style={{borderBottom: `1px solid rgba(196, 196, 196, 1)`}}>
      <h5 className="fs-4 mb-3">Price</h5>
      <div className="price-slider">
      <div className="d-flex align-items-center justify-content-between w-100 mb-3">  
              <div>
            <h6 className="fs-6 fw-bold">From</h6>
            <div
              style={{
                border: `solid 3px ${colors.secondary}`, 
                height: "55px",
                borderRadius: "5px",
              }}
              className="d-flex align-items-center justify-content-around w-100 p-3 "
            >
              <div className="me-2 fw-bold">EGP:</div>
              <div className="fw-bold">{formatPrice(minPrice)}</div>
            </div>
          </div>
          <div>
          <h6 className="fs-6 fw-bold">To</h6>
            <div
              style={{
                border: `solid 3px ${colors.secondary}`, 
                height: "55px",
                borderRadius: "5px",
              }}
              className="d-flex align-items-center justify-content-around w-100 p-3 "
            >
              <div className="me-2 fw-bold">EGP:</div>
              <div className="fw-bold">{formatPrice(maxPrice)}</div>
            </div>
          </div>
        </div>
        <Slider
          value={[minPrice, maxPrice]}
          min={10}
          max={300}
          step={5}
          className="mb-3"
          onChange={(e, newValue) => {
            setMinPrice(newValue[0]);
            setMaxPrice(newValue[1]);
            setSelectedFilters((old) => ({
              ...old,
              Price: { min: newValue[0], max: newValue[1] },
            }));
          }}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          style={{ width: "100%" ,color:colors.violet}}
        />
      </div>
    </div>
        {/* <Price /> */}
        
    <div className="duration d-flex flex-column my-3" style={{ borderBottom: `1px solid rgba(196, 196, 196, 1)` }}>
      <div className='d-flex justify-content-between' style={{ cursor: 'pointer' }} onClick={() => setShowMenu(!showMenu)}>
        <h5 className='fs-4' onClick={() => setShowMenu(!showMenu)} style={{ display: 'flex', alignItems: 'center' }}>
          Durations{' '}
        </h5>
        <span className='' style={{}}>
          {Durations.length > 0 ? (
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
          {Durations.map((duration, index) => (
            <li key={index}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  sx={{
                    color: colors.violet,
                    '&.Mui-checked': {
                      color: colors.violet
                    }
                  }}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedFilters(old => {
                        old.Duration = [...old.Duration, duration];
                        return { ...old, Duration: old.Duration };
                      });
                    } else {
                      setSelectedFilters(old => {
                        old.Duration = old.Duration.filter(el => el !== duration);
                        return { ...old, Duration: old.Duration };
                      });
                    }
                    console.log(selectedFilters);
                  }}
                  checked={selectedFilters.Duration.includes(duration)}
                /> {duration}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
        {/* <Duration /> */}
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
              onChange={() => handleRatingChange(value)}
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

        {/* <Rate /> */}
      </div>
    </div>
  );
}

export default SideBar;
