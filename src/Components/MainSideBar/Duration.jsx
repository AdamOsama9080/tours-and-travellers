// import React, { useContext, useState } from 'react';
// import { colors } from '../../colors.js';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
// import { FilterContext } from '../../Contexts/filterationContext.js';
// import { Checkbox } from '@mui/material';

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// const Duration = () => {
//   const { selectedFilters, setSelectedFilters } = useContext(FilterContext);
//   const Durations = [
//     "1 days",
//     "2 days",
//     "3 days",
//     "4 days",
//     "5 days",
//     "7 days",
//     "8 days",
//     "9 days",
//     "10 days",
//     "11 days",
//     "12 days",
//     // Add more Durations here
//   ];

//   const [showMenu, setShowMenu] = useState(true);
//   const [showMore, setShowMore] = useState(false);

//   return (
//     <div className="duration d-flex flex-column my-3" style={{ borderBottom: `1px solid rgba(196, 196, 196, 1)` }}>
//       <div className='d-flex justify-content-between' style={{ cursor: 'pointer' }} onClick={() => setShowMenu(!showMenu)}>
//         <h5 className='fs-4' onClick={() => setShowMenu(!showMenu)} style={{ display: 'flex', alignItems: 'center' }}>
//           Durations{' '}
//         </h5>
//         <span className='' style={{}}>
//           {Durations.length > 0 ? (
//             showMenu ? (
//               <FontAwesomeIcon icon={faAngleDown} />
//             ) : (
//               <FontAwesomeIcon icon={faAngleUp} />
//             )
//           ) : (
//             <FontAwesomeIcon icon={faAngleDown} />
//           )}
//         </span>
//       </div>
//       {showMenu && (
//         <ul style={{ listStyle: 'none', paddingLeft: '0', boxShadow: 'none' }}>
//           {Durations.map((duration, index) => (
//             <li key={index}>
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <Checkbox
//                   sx={{
//                     color: colors.violet,
//                     '&.Mui-checked': {
//                       color: colors.violet
//                     }
//                   }}
//                   onChange={(e) => {
//                     if (e.target.checked) {
//                       setSelectedFilters(old => {
//                         old.Duration = [...old.Duration, duration];
//                         return { ...old, Duration: old.Duration };
//                       });
//                     } else {
//                       setSelectedFilters(old => {
//                         old.Duration = old.Duration.filter(el => el !== duration);
//                         return { ...old, Duration: old.Duration };
//                       });
//                     }
//                     console.log(selectedFilters);
//                   }}
//                   checked={selectedFilters.Duration.includes(duration)}
//                 /> {duration}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Duration;
