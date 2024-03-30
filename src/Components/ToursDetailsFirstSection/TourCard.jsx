// import React, { useContext, useEffect, useState } from "react";
// import "./TourCard.modules.css";
// import { colors } from "../../colors";
// import { FaRegStar } from "react-icons/fa6";
// import { FaStarHalfAlt } from "react-icons/fa";
// import { FaStar } from "react-icons/fa6";
// import { GrLocation } from "react-icons/gr";
// import { IoIosBookmark } from "react-icons/io";
// import { ModalContext } from "../../Contexts/pypalContext";
// import { LuLoader } from "react-icons/lu";
// import { TourdetailsContext } from "../../Contexts/TourdetailsContext";

// export default function TourCard() {
//   const { tour } = useContext(TourdetailsContext);
//   const [ratingIsFractions, setRatingIsFractions] = useState(false);
//   const starsArr = [1, 2, 3, 4, 5];
//   const { setShowModal } = useContext(ModalContext);

//   useEffect(() => {
//     if (Math.ceil(tour.rating) !== tour.rating) {
//       setRatingIsFractions(true);
//     }
//   }, []);
//   if (tour.images === undefined)
//     return (
//       <div className="d-flex justify-content-center align-items-center h-100">
//         <LuLoader className="m-auto fw-bolder fs-1" />
//       </div>
//     );
//   return (
//     <>
//       <div className="tour-details-card-container container text-start border rounded my-5 shadow-sm">
//         {/* Card Header Section */}
//         <div className="tour-details-card-header row mb-2">
//           <h2 className="fw-bolder" style={{ color: colors.secondary }}>
//             {tour.title}
//           </h2>
//           <div>
//             {starsArr.map((el) => {
//               if (el <= tour.rating) {
//                 return <FaStar className="fw-bolder fs-5 text-warning" />;
//               } else if (ratingIsFractions === true) {
//                 if (Math.ceil(tour.rating) === el) {
//                   return (
//                     <FaStarHalfAlt className="fw-bolder fs-5 text-warning" />
//                   );
//                 }
//               } else {
//                 return <FaRegStar className="fw-bolder fs-5 text-warning" />;
//               }
//             })}
//           </div>
//           <div className="fw-bolder text-secondary mt-2 fs-5">
//             <GrLocation className="fw-bolder fs-5" /> {tour.location}
//           </div>
//           <div className="card-bookmark-container text-secondary">
//             <IoIosBookmark className="card-bookmark fs-1" />
//           </div>
//         </div>
//         {/* Card Images Section */}
//         <div className="tour-details-card-images row mx-1 shadow-sm">
//           <div
//             className="tour-details-card-first-image col col-6"
//             style={{ height: "20rem" }}
//           >
//             <img
//               src={tour.images[0]}
//               className="w-100"
//               alt="cardImgs"
//               style={{ height: "20rem" }}
//             />
//           </div>
//           <div className="tour-details-card-other-images col col-6">
//             <div className="row">
//               {tour.images.slice(1).map((el, index) => {
//                 if (index < tour.images.slice(1).length - 1) {
//                   return (
//                     <div className="col col-6">
//                       <img
//                         src={el}
//                         className="w-100"
//                         alt="cardImgs"
//                         style={{ height: "20rem" }}
//                       />
//                     </div>
//                   );
//                 } else {
//                   if (tour.images.slice(1).length % 2 === 0) {
//                     return (
//                       <div className="col col-6">
//                         <img
//                           src={el}
//                           className="w-100"
//                           alt="cardImgs"
//                           style={{ height: "20rem" }}
//                         />
//                       </div>
//                     );
//                   } else {
//                     return (
//                       <div className="col col-12">
//                         <img
//                           src={el}
//                           className="w-100"
//                           alt="cardImgs"
//                           style={{ height: "20rem" }}
//                         />
//                       </div>
//                     );
//                   }
//                 }
//               })}
//             </div>
//           </div>
//         </div>
//         {/* Card Price Details Section */}
//         <div className="row px-5 py-3">
//           <div className="col col-8">
//             <div className="fw-bolder fs-3" style={{ color: colors.violet }}>
//               EGP {tour.price}
//             </div>
//             <div className="fw-bold fs-4">Total</div>
//           </div>
//           <div className="col col-4 text-end">
//             <button
//               className="btn w-50 btn- m-2 p-1 fs-5 fw-bolder mt-3"
//               onClick={() => setShowModal(true)}
//               style={{ color: "white", backgroundColor: colors.violet }}
//             >
//               Book now
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import "./TourCard.modules.css";
import { colors } from "../../colors";
import { FaRegStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { IoIosBookmark } from "react-icons/io";
import { ModalContext } from "../../Contexts/pypalContext";
import { useTranslation } from "react-i18next";
import { LuLoader } from "react-icons/lu";
import { TourdetailsContext } from "../../Contexts/TourdetailsContext";

export default function TourCard() {
  const { t } = useTranslation();
  const { tour } = useContext(TourdetailsContext);
  const [ratingIsFractions, setRatingIsFractions] = useState(false);
  const starsArr = [1, 2, 3, 4, 5];
  const { setShowModal } = useContext(ModalContext);

  useEffect(() => {
    if (Math.ceil(tour.rating) !== tour.rating) {
      setRatingIsFractions(true);
    }
  }, []);
  if (tour.images === undefined)
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <LuLoader className="m-auto fw-bolder fs-1" />
      </div>
    );
  return (
    <>
      <div className="tour-details-card-container container text-start border rounded my-5 shadow-sm">
        {/* Card Header Section */}
        <div className="tour-details-card-header row mb-2">
          <h2 className="fw-bolder" style={{ color: colors.secondary }}>
            {tour.title}
          </h2>
          <div>
            {starsArr.map((el) => {
              if (el <= tour.rating) {
                return <FaStar className="fw-bolder fs-5 text-warning" />;
              } else if (ratingIsFractions === true) {
                if (Math.ceil(tour.rating) === el) {
                  return (
                    <FaStarHalfAlt className="fw-bolder fs-5 text-warning" />
                  );
                }
              } else {
                return <FaRegStar className="fw-bolder fs-5 text-warning" />;
              }
            })}
          </div>
          <div className="fw-bolder text-secondary mt-2 fs-5">
            <GrLocation className="fw-bolder fs-5" /> {tour.location}
          </div>
          <div className="card-bookmark-container text-secondary">
            <IoIosBookmark className="card-bookmark fs-1" />
          </div>
        </div>
        {/* Card Images Section */}
        <div className="tour-details-card-images row mx-1 shadow-sm">
          <div
            className="tour-details-card-first-image col col-6"
            style={{ height: "20rem" }}
          >
            <img
              src={tour.images[0]}
              className="w-100"
              alt="cardImgs"
              style={{ height: "20rem" }}
            />
          </div>
          <div className="tour-details-card-other-images col col-6">
            <div className="row">
              {tour.images.slice(1).map((el, index) => {
                if (index < tour.images.slice(1).length - 1) {
                  return (
                    <div className="col col-6">
                      <img
                        src={el}
                        className="w-100"
                        alt="cardImgs"
                        style={{ height: "20rem" }}
                      />
                    </div>
                  );
                } else {
                  if (tour.images.slice(1).length % 2 === 0) {
                    return (
                      <div className="col col-6">
                        <img
                          src={el}
                          className="w-100"
                          alt="cardImgs"
                          style={{ height: "20rem" }}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div className="col col-12">
                        <img
                          src={el}
                          className="w-100"
                          alt="cardImgs"
                          style={{ height: "20rem" }}
                        />
                      </div>
                    );
                  }
                }
              })}
            </div>
          </div>
        </div>
        {/* Card Price Details Section */}
        <div className="row px-5 py-3">
          <div className="col col-8">
            <div className="fw-bolder fs-3" style={{ color: colors.violet }}>
              EGP {tour.price}
            </div>
            <div className="fw-bold fs-4">{t("tours.total")}</div>
          </div>
          <div className="col col-4 text-end">
            <button
              className="btn w-50 btn- m-2 p-1 fs-5 fw-bolder mt-3"
              onClick={() => setShowModal(true)}
              style={{ color: "white", backgroundColor: colors.violet }}
            >
              {t("tours.bookNow")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
