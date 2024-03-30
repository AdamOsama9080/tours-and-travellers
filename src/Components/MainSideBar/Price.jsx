// import React, { useContext, useState } from "react";
// import Slider from "@mui/material/Slider";
// import { FilterContext } from "../../Contexts/filterationContext";
// // import { colors } from "../../colors.js";
// import { colors } from './../../colors';

// const Price = () => {
//   const [minPrice, setMinPrice] = useState(10);
//   const [maxPrice, setMaxPrice] = useState(300);
//   const { setSelectedFilters } = useContext(FilterContext);

//   const formatPrice = (price) => {
//     return price === 300 ? `${price}` : price;
//   };

//   return (
//     <div className="selector w-100 my-4" style={{borderBottom: `1px solid rgba(196, 196, 196, 1)`}}>
//       <h5 className="fs-4 mb-3">Price</h5>
//       <div className="price-slider">
//       <div className="d-flex align-items-center justify-content-between w-100 mb-3">  
//               <div>
//             <h6 className="fs-6 fw-bold">From</h6>
//             <div
//               style={{
//                 border: `solid 3px ${colors.secondary}`, 
//                 height: "55px",
//                 borderRadius: "5px",
//               }}
//               className="d-flex align-items-center justify-content-around w-100 p-3 "
//             >
//               <div className="me-2 fw-bold">EGP:</div>
//               <div className="fw-bold">{formatPrice(minPrice)}</div>
//             </div>
//           </div>
//           <div>
//           <h6 className="fs-6 fw-bold">To</h6>
//             <div
//               style={{
//                 border: `solid 3px ${colors.secondary}`, 
//                 height: "55px",
//                 borderRadius: "5px",
//               }}
//               className="d-flex align-items-center justify-content-around w-100 p-3 "
//             >
//               <div className="me-2 fw-bold">EGP:</div>
//               <div className="fw-bold">{formatPrice(maxPrice)}</div>
//             </div>
//           </div>
//         </div>
//         <Slider
//           value={[minPrice, maxPrice]}
//           min={10}
//           max={300}
//           step={5}
//           className="mb-3"
//           onChange={(e, newValue) => {
//             setMinPrice(newValue[0]);
//             setMaxPrice(newValue[1]);
//             setSelectedFilters((old) => ({
//               ...old,
//               Price: { min: newValue[0], max: newValue[1] },
//             }));
//           }}
//           valueLabelDisplay="auto"
//           aria-labelledby="range-slider"
//           style={{ width: "100%" ,color:colors.violet}}
//         />
//       </div>
//     </div>
//   );
// };

// export default Price;
