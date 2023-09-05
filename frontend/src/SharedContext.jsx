import React, { createContext, useContext, useEffect, useState } from 'react';

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userDetail, setUserDetail] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <SharedContext.Provider value={{ isProfileDropdownOpen, setIsProfileDropdownOpen, userDetail, setUserDetail }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedContext = () => {
  return useContext(SharedContext);
};
