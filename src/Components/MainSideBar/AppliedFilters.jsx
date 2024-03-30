import React, { useContext } from 'react';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FilterationContext } from '../../Contexts/filterationContext.js';
import { useEffect } from 'react';
import { DataToShowContext } from '../../Contexts/dataToShow.js';
import { colors } from './../../colors';

const AppliedFilters = ({filterLength}) => {
  const { selectedFilters, setSelectedFilters } = useContext(FilterationContext);
  const {
    setFillterData,
  } = useContext(DataToShowContext);
  const handleRemoveFilter = (index) => {

  };
  useEffect(()=>{
    setFillterData(selectedFilters);
  },[selectedFilters])

  return (
    <div>
      <div className="applied-filters" style={{borderBottom: `1px solid rgba(196, 196, 196, 1)` , borderTop: `1px solid rgba(196, 196, 196, 1)`}}>
        <p className='text-align-start fw-bold mt-3' style={{color: colors.secondary}}>Filters</p>
        <p className='text-black-50 mb-0'>34/<span className='fw-bold'>{filterLength}</span></p>
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
  );
}

export default AppliedFilters;
