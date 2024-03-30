import React, { createContext, useState } from 'react';

export const TourdetailsContext = createContext();

export const TourDetailsProvider = ({ children }) => {
  const [tour, setTour] = useState(false);
  const [relatedTours , setRelatedTours] = useState([]);

  return (
    <TourdetailsContext.Provider value={{ tour, setTour,relatedTours , setRelatedTours }}>
      {children}
    </TourdetailsContext.Provider>
  );
};
