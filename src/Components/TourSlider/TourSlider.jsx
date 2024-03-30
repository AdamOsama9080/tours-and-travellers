import React, { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "./TourSlider.modules.css";
const TourSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      src: "https://s3-alpha-sig.figma.com/img/7c6e/076f/903bff951d83f0909879dc98c06d90ea?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=INKOTmQwfzyd9g-hakZZ2lf2YsQtA3wecBExnDS12yyCd1K5NZMaQuqiS4cOFlBGCW-clYNqh9GfAxgoxfkO~B9WF33S00ZRuOLU3tjKag4vrjNf9OqZvJaDiQ2JyYthzZxKDLotR1pU-3rLYKF-yzvq3roqZF9JiHLnvf5Z~BXfQhPjdgvtVrDki3a9PmDFziGSZxJ1yenh-nBihxwlCU73XIV2NQFyrtPzzzDL1uwUrL2CMu2jw~oWCKzne6XNXCn6cOkdqqrltExAJfMGRdwdo-sjoYOZt-QPoNrnruGCAeJ7hisb0FDjknzYtbkL63i0EghYNSEhkt-uTZXyZA__",
      text: "Full day tour",
    },
    {
      src: "https://s3-alpha-sig.figma.com/img/e6ca/407c/79d6180656f385e48fa5b231259035a6?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qAKc4IhtXoww3Txm-VbpTvsMSviuO0S-ba6JGyz1Y6at1YxAU~1AFGuwNgnjj~z1wvvMYqqoCF8HpPgqZ164hpfA~ajp6lZ0XnEE2jJLkD-YMKPwfEjGiKE-~4miR8pAPnbuY5-V7ETJblNda8yapCg~YTVxveONozVtWBHDoMfBergm1vKnh3gv--g5nTp7pjj0C77jTyMmyEM0hCwUO5Ox3a4uZdlpBSqjP8uIm4IKW6EWScuzxA0RCcDL7hJr0txX-CA~8KLbcsgBuTn6iyVHVjuvLi7qnMtEhnKMkoP6DlR3ILx1EMFv3Al9GZPm16N4VMVMnc5eK5vvG8WgWw__",
      text: "multi day tour",
    },
    {
      src: "https://s3-alpha-sig.figma.com/img/42e2/341b/44521a0c38265b1c54b44a3e0e539461?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UCi4Wn2VGNM-sc3Cw0SPfRI5QkMykOw~xyY2cCQEPy4jp0yfw3cpauKWFmkuxMOW9Hi0eZ4HMWnTviozrqQPMwMAOc~aJcpcqTBpL-6npfoDuhcITeb8NCFZr~FocJSa3wzx8nbMCW3VhL8IE06rujjJ~sUnvzg9tL0Qj4EvwJTIexOjG82mSUm6ZG7U~hJfnPUmWKr1AhAvsNsiMrwKuyPQWQnZiTudc4ncF~0qPFMMlnk3OzH9iQszGBpf47OAziISA-TFxTwj9HppXxGIkTKPTQNgET1uwQlEQVtjWHv2PsAopoFPV1GXh-yK8nPZ16KjqcAtlr0v6CdtwzeoNA__",
      text: "half day tour",
    },
    {
      src: "https://s3-alpha-sig.figma.com/img/807c/6902/7c211e6b89775a5f4c992289272d44b5?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nS3Xsvg3NI6vdh~cBErajPCeeMOOmzC3YdaLD5w75cr5Xseyc6AC6v4SBSjkjG-YvTmFxo93EHdkvacZ-AtiQd~gtv2z5OPo2eFigOasdzKoUSjLBtF2B~n0hWpankJZHhZ4JNyzLxFRIEwO4u01iCAt362vFZpf8cB2aTIqNrZ3to5aHidzl4Ct0HrzLsqfDzCPNlE9Ck5R7sWJt1ptjDJxuj0ZHgTNEQatZ1SGBhdbN3zIKRd23qN-kZpZ7jVjLsYtzjh7Ak16wsS6iApYhHTfOQUANO~~NHKOc3qfSox7wekr-q30RITkLdBYhqDXytff40kqg0RVldiV-0NZdA__",
      text: "private sightseeing tour",
    },
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider-container w-100">
      <div className="slider my-3 mx-auto ">
        {images.map((image, index) => (
          <div
            key={index}
            className={
              index === currentIndex ? "slider-item active " : "slider-item "
            }
          >
            <div className="slider-item-container fw-bold pe-2 py-1">
              <img src={image.src} alt={`Image ${index + 1}`} />
              <p className="slider-text my-3 ms-2">{image.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-controls">
        <div
          className="slider-control p-2 btn btn-outline-light rounded-circle"
          onClick={prevSlide}
        >
          <BiChevronLeft className="fw-bolder fs-5"></BiChevronLeft>
        </div>
        <div
          className="slider-control p-2 btn btn-outline-light rounded-circle"
          onClick={nextSlide}
        >
          <BiChevronRight className="fw-bolder fs-5"></BiChevronRight>{" "}
        </div>
      </div>
    </div>
  );
};

export default TourSlider;
