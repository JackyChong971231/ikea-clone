import React, { createContext, useContext, useEffect, useState } from 'react';
import { updateUserDetail } from './services/membershipService';
import { getAllStores } from './services/storeService';

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
  const [isDropdownComponentOpen, setIsDropdownComponentOpen] = useState(false);
  const [ whichDropdownContent, setWhichDropdownContent ] = useState();
  const emptyUserDetail = {
    signedInToken: null,
    postalCode: null,
    preferredStore: null,
    wishlist: {},
    cart: {}
  };
  const [userDetail, setUserDetail] = useState((JSON.parse(localStorage.getItem("user")))? JSON.parse(localStorage.getItem("user")): emptyUserDetail);
  const [isShowProductImage, setIsShowProductImage] = useState(true)

  useEffect(() => {
    // handle sign out
    if (emptyUserDetail === userDetail) { 
      console.log("Signed out")
      localStorage.removeItem("user") 
    }
    else {
      if (userDetail.signedInToken) {                               // handle user update
        localStorage.setItem("user", JSON.stringify(userDetail));
        updateUserDetail(userDetail);
      } else {                                                      // handle guest update
        localStorage.setItem("user", JSON.stringify(userDetail))
      }
    };
  },[userDetail])

  return (
    <SharedContext.Provider value={{
      isDropdownComponentOpen, 
      setIsDropdownComponentOpen, 
      userDetail, setUserDetail, 
      whichDropdownContent, setWhichDropdownContent, 
      isShowProductImage, setIsShowProductImage,
      emptyUserDetail
      }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedContext = () => {
  return useContext(SharedContext);
};
