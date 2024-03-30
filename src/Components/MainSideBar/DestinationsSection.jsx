import React, { useContext, useState } from "react";
import { colors } from "../../colors.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { DataToShowContext } from "../../Contexts/dataToShow.js";
import { useEffect } from "react";
import { Checkbox } from "@mui/material";
import { FilterContext } from './../../Contexts/filterationContext';

const DestinationsSection = () => {
  const { destinationsArr, setDestinationsArr, FullData } =
    useContext(DataToShowContext);
  const [showMenu, setShowMenu] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const { selectedFilters, setSelectedFilters } =
    useContext(FilterContext);
  useEffect(() => {
    setDestinationsArr((old) => {
      old = [];
      FullData.map((el) => {
        if (old.findIndex((e) => e === el.destination) === -1) {
          console.log("pppp");
          old.push(el.destination);
        }
      });
      return old;
    });
    console.log(destinationsArr);
  }, [FullData]);
  return (
    <div className="destination d-flex flex-column my-4">
      <div>
        <h5
          onClick={() => setShowMenu(!showMenu)}
          style={{ display: "flex", alignItems: "center" }}
        >
          Destinations{" "}
          <span style={{ marginLeft: "150px" }}>
            {destinationsArr.length > 0 ? (
              showMenu ? (
                <FontAwesomeIcon icon={faAngleDown} />
              ) : (
                <FontAwesomeIcon icon={faAngleUp} />
              )
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </span>
        </h5>
      </div>

      {showMenu && (
        <ul style={{ listStyle: "none", paddingLeft: "0" }}>
          {destinationsArr
            .slice(0, showMore ? destinationsArr.length : 3)
            .map((destination, index) => (
              <li key={index}>
                <label>
                <Checkbox
                sx={{
                  color: colors.violet,
                  '&.Mui-checked': {
                    color: colors.violet
                  }
                }}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedFilters((old) => {
                      old.Destinations = [...old.Destinations, destination];
                      return { ...old, Destinations: old.Destinations };
                    });
                  } else {
                    setSelectedFilters((old) => {
                      old.Destinations = old.Destinations.filter(
                        (el) => el !== destination
                      );
                      return { ...old, Destinations: old.Destinations };
                    });
                  }
                  // console.log(selectedFilters);
                }}                  checked={selectedFilters.Destinations.includes(destination)}
                />
                  {/* <input
                    style={{ width: "20px", height: "20px" }}
                    type="checkbox"
                    value={destination}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFilters((old) => {
                          old.Destinations = [...old.Destinations, destination];
                          return { ...old, Destinations: old.Destinations };
                        });
                      } else {
                        setSelectedFilters((old) => {
                          old.Destinations = old.Destinations.filter(
                            (el) => el !== destination
                          );
                          return { ...old, Destinations: old.Destinations };
                        });
                      }
                      // console.log(selectedFilters);
                    }} // Call handleDurationSelection on change
                  /> */}
                  {" "}
                  {destination}
                </label>
              </li>
            ))}
        </ul>
      )}
      {destinationsArr.length > 3 && (
        <a
          style={{ color: colors.violet, cursor: "pointer" }}
          className="text-decoration-none"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </a>
      )}
      <div
        className="my-3"
        style={{ width: "25%", height: "0.7px", border: "1px solid gray" }}
      ></div>
    </div>
  );
};

export default DestinationsSection;
