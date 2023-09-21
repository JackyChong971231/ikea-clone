import React, { createContext, useContext, useEffect, useState } from 'react';
import { updateUserDetail } from './services/membershipService';

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [ whichPopUp, setWhichPopUp ] = useState();
  const [userDetail, setUserDetail] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (userDetail === null) { localStorage.removeItem("user") }
    else { 
      localStorage.setItem("user", JSON.stringify(userDetail));
      // console.log(userDetail);
      updateUserDetail(userDetail);
    };
  },[userDetail])

  return (
    <SharedContext.Provider value={{ isProfileDropdownOpen, setIsProfileDropdownOpen, userDetail, setUserDetail, whichPopUp, setWhichPopUp }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedContext = () => {
  return useContext(SharedContext);
};
