import React, { createContext, useState } from "react";

export const AdultContext = createContext();

export const AdultsProvider = ({ children }) => {
  const [Adults, setAdultsContext] = useState(1);

  return (
    <AdultContext.Provider value={{ Adults, setAdultsContext }}>
      {children}
    </AdultContext.Provider>
  );
};
