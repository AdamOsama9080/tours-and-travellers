import React, { useState, useEffect, useRef, useContext } from "react";
import "./SearchCard.css";
import subBtn from "../../Images/minus.png";
import addBtn from "../../Images/plus.png";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { AdultContext } from "../../Contexts/AdultsContext";
import { useLocation, useNavigate } from "react-router-dom";
import { DataToShowContext } from "../../Contexts/dataToShow";
import Swal from "sweetalert2";
import Search from "../../Pages/Search/Search";
import { SearchContext } from "../../Contexts/SearchResultContext";

const SearchCard = () => {
  const { t } = useTranslation();
  const [adults, setAdults] = useState(1);
  const { Adults, setAdultsContext } = useContext(AdultContext);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [destination, setDestination] = useState("cairo");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const { i18n } = useTranslation();
  const Navigate = useNavigate();
  const { setSearchData } = useContext(SearchContext);

  useEffect(() => {
    const today = new Date();
    const todayFormatted = today.toISOString().substr(0, 10);
    setCheckInDate(todayFormatted);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekFormatted = nextWeek.toISOString().substr(0, 10);
    setCheckOutDate(nextWeekFormatted);

    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const decrementValue = () => {
    setAdultsContext((prevValue) =>
      prevValue > 0 ? prevValue - 1 : prevValue
    );
  };

  const sendDataToAPI = async () => {
    let data = {
      destination: destination,
      startDate: checkInDate,
      endDate: checkOutDate,
      numberOfTravelers: adults,
    };

    console.log(data);
  
    data.destination = data.destination.charAt(0).toUpperCase() + data.destination.slice(1) + ", Egypt";
  
    try {
      const response = await axios.post("http://localhost:2000/filter-trips", data);
      if (response && response.data) { 
        if (response.data.status === "success") {
          console.log("Data has been retrieved successfully");
          console.log(response.data.data);
          setSearchData(data);
          Navigate("/search");
        } else {
          console.error("API call failed:", response.data.error);
        }
      } else {
        console.error("API response is empty or malformed.");
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
      if (error.response && error.response.status === 404) {
        Swal.fire({
          title: "No Matching Tours Found",
          icon: "info",
          text: `Sorry, there are no tours available for the selected destination "${data.destination}" from ${data.startDate} to ${data.endDate}. Please try another date or destination.`,
        });
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "An error occurred while fetching data.",
        });
      }
    }
  };

  // Conditionally render based on the location pathname
  // if (location.pathname === "/search") {
  //   return null;
  // }

  return (
    <div
      className="search-card"
      style={{
        direction: i18n.language === "ar" ? "rtl" : null,
        margin: location.pathname === "/search" && "50px",
      }}
    >
      <div className="input-group">
        <label htmlFor="destinations">{t("searchCard.destinations")}</label>
        <select
          id="destinations"
          value={destination}
          style={{ cursor: "pointer" }}
          onChange={(e) => {
            setDestination(e.target.value);
          }}
        >
          <option value="Cairo">{t("searchCard.cairo")}</option>
          <option value="Alexandria">{t("searchCard.Alexandria")}</option>
          <option value="Sharm El Sheikh">{t("searchCard.Sharm El Sheikh")}</option>
          <option value="Hurghada">{t("searchCard.Hurghada")}</option>
          <option value="Aswan">{t("searchCard.Aswan")}</option>
          <option value="Luxor">{t("searchCard.Luxor")}</option>
          <option value="Giza">{t("searchCard.Giza")}</option>
        </select>
      </div>
      <div className="input-group" ref={dropdownRef}>
        <label htmlFor="travellers">{t("searchCard.travellers")}</label>
        <input
          type="text"
          id="travellers"
          value={Adults}
          readOnly
          onClick={toggleDropdown}
          style={{ cursor: "pointer", padding: "10px 20px" }}
        />
        {dropdownOpen && (
          <div className="travellers-dropdown" style={{ width: "190px" }}>
            <div className="chatgpt" style={{ textAlign: "center" }}>
              <img
                alt="minus icon"
                onClick={(e) => {
                  e.stopPropagation();
                  decrementValue();
                }}
                style={{
                  backgroundColor: "#5F41B2",
                  borderRadius: "50%",
                  padding: "5px",
                  cursor: "pointer",
                }}
                src={subBtn}
              />

              <span style={{ margin: "0 20px" }}>{Adults}</span>

              <img
                alt="add icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setAdultsContext(Adults + 1);
                }}
                style={{
                  backgroundColor: "#5F41B2",
                  borderRadius: "50%",
                  padding: "5px",
                  cursor: "pointer",
                }}
                src={addBtn}
              />
            </div>
          </div>
        )}
      </div>
      <div className="input-group">
        <label htmlFor="check-in">{t("searchCard.checkIn")}</label>
        <input
          type="date"
          id="check-in"
          value={checkInDate}
          min={new Date().toISOString().split('T')[0]} // Disable past dates
          onChange={(e) => {
            setCheckInDate(e.target.value);
            setCheckOutDate(""); 
          }}
        />
      </div>
      <div className="input-group">
        <label htmlFor="check-out">{t("searchCard.checkOut")}</label>
        <input
          type="date"
          id="check-out"
          value={checkOutDate}
          min={checkInDate}
          onChange={(e) => {
            setCheckOutDate(e.target.value);
          }}
        />
      </div>
      <button className="search-button" onClick={sendDataToAPI}>
        {t("searchCard.search")}
      </button>
    </div>
  );
};

export default SearchCard;

