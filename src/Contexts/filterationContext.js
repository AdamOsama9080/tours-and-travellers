import React, { createContext, useState, useContext } from 'react';
// import { FilterContext } from "../../Contexts/filterationContext";

export const FilterContext = createContext();

export const useFilterContext = () => useContext(FilterContext);
export const FilterContextProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    Destinations: [],
    Departs: [],
    Duration: [],
    Rate: 0,
    Price: { min: 10, max: 300 }
  });

  return (
    <FilterContext.Provider value={{ selectedFilters, setSelectedFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
