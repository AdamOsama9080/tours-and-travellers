import axios from "axios";
import React, { createContext, useState } from "react";

export const DataToShowContext = createContext();

export const DataToShowProvider = ({ children }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [FullData, setFullData] = useState([]);
  const [destinationsArr, setDestinationsArr] = useState([]);
  let DestinationArr = [];
  let LocationArr = [];
  let PriceArr = [];
  let DurationArr = [];
  let RateArr = [];
  const setData = async (data) => {
    console.log("Data to be sent:", data); // Add this line to log the data before sending
    await axios
      .post("https://apis-2-4nek.onrender.com/tours/filter-trips", data)
      .then((response) => {
        console.log("Response from API:", response.data.data);
        setFullData(response.data.data);
      })
      .catch((error) => {
        console.error("Error sending data to API:", error);
      });
  };
  let dummy = [];
  const setFillterData = (fillters) => {
    DestinationArr = [];
   LocationArr = [];
   PriceArr = [];
   DurationArr = [];
   RateArr = [];
    FullData.map((el) => {
      fillters.Destinations.map((e) => {
        if (
          el.destination &&
          el.destination.toLowerCase().includes(e.toLowerCase()) &&
          DestinationArr.findIndex((elem) => elem._id === el._id) === -1
        ) {
          DestinationArr.push(el);
        }
      });
      fillters.Duration.map((e) => {
        if (
          el.duration &&
          el.duration.toLowerCase().includes(e.toLowerCase()) &&
          DurationArr.findIndex((elem) => elem._id === el._id) === -1
        ) {
          DurationArr.push(el);
        }
      });
      fillters.Departs.map((e) => {
        if (
          el.location &&
          el.location.toLowerCase().includes(e.toLowerCase()) &&
          LocationArr.findIndex((elem) => elem._id === el._id) === -1
        ) {
          LocationArr.push(el);
        }
      });
      if(fillters.Price.min !== 0 && fillters.Price.max !== 0){
        if(fillters.Price.max !== 300 || fillters.Price.min !== 10){
          if(el.price >= fillters.Price.min && el.price <= fillters.Price.max && PriceArr.findIndex(e=> e._id === el._id) == -1){
                PriceArr.push(el);
          }
        }
      }
      if (fillters.Rate !== 0 && el.rating >= fillters.Rate) {
        if (RateArr.findIndex((elem) => elem._id === el._id) === -1) {
          RateArr.push(el);
        }
      }
    });
    dummy = [];
    if (DestinationArr.length > 0) {
      console.log("DestinationArr",DestinationArr);
      dummy.push(DestinationArr);
    }
    if (LocationArr.length > 0) {
      console.log("LocationArr",LocationArr);
      dummy.push(LocationArr);
    }
    if (DurationArr.length > 0) {
      console.log("DurationArr",DurationArr);
      dummy.push(DurationArr);
    }
    if (PriceArr.length > 0) {
      console.log("PriceArr",PriceArr);
      dummy.push(PriceArr);
    }
    if (RateArr.length > 0) {
      console.log("RateArr",RateArr);
      dummy.push(RateArr);
    }
    setFilteredData(getCrossElements(dummy , fillters));
  };
  const getCrossElements = (arrays , fillters) => {
    console.log(fillters)
    if (arrays.length < 1){
      if(fillters.Price.min !== 0 && fillters.Price.max !== 0 ){
        if((fillters.Price.max !== 300 || fillters.Price.min !== 10) || fillters.Rate != 0){
          return undefined;
        }else{
          return [];
        }
      }else{
        return [];

      }
    } 
    if (arrays.length === 1){
      console.log("in");
      if(fillters.Price.min !== 0 && fillters.Price.max !== 0 ){
        console.log("pppppp")
        if((fillters.Price.max !== 300 || fillters.Price.min !== 10) && PriceArr.length === 0 ){
          return undefined;
        }else{
          if(fillters.Rate != 0 && RateArr.length === 0){
            return undefined;
          }
          else{
            return arrays[0];
          }
          
        }
      }else{
        return arrays[0];
      }
    }
    if(arrays.length > 1){
      if(fillters.Price.min !== 0 && fillters.Price.max !== 0 ){
        if((fillters.Price.max !== 300 || fillters.Price.min !== 10) && PriceArr.length === 0 ){
          return undefined;
        }else{
          if(fillters.Rate != 0 && RateArr.length === 0){
            return undefined;
          }
        }
      }
    }
    
    let temp = arrays[0].filter((element) =>
      arrays
        .slice(1)
        .every((array) => array.some((item) => item._id === element._id))
    );
    if (temp.length === 0) return undefined;
    else return temp;
  };

  
  return (
    <DataToShowContext.Provider
      value={{
        setFillterData,
        filteredData,
        setFilteredData,
        FullData,
        setFullData,
        setData,
        destinationsArr,
        setDestinationsArr
      }}
    >
      {children}
    </DataToShowContext.Provider>
  );
};
