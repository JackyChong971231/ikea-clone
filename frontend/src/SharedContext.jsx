import React, { createContext, useContext, useEffect, useState } from 'react';

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
  const [barcodesInWishlists, setBarcodesInWishlists] = useState();
  const [barcodeToBeAddedToWishlist, setBarcodeToBeAddedToWishlist] = useState();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userDetail))
    const tempBarcodesInWishlists = [];
    for (const wishlistItemId in userDetail.wishlistItems) {
      tempBarcodesInWishlists.push(userDetail.wishlistItems[wishlistItemId].barcode.barcodeId)
    }
    setBarcodesInWishlists(tempBarcodesInWishlists);
    console.log(tempBarcodesInWishlists);
  },[userDetail])

  const expandPopUpWindow = (whichDropdownContentToShow) => {
    setWhichDropdownContent(whichDropdownContentToShow);
    setIsDropdownComponentOpen(true);
    
}

  return (
    <SharedContext.Provider value={{
      isDropdownComponentOpen, 
      setIsDropdownComponentOpen, 
      userDetail, setUserDetail, 
      whichDropdownContent, setWhichDropdownContent, 
      isShowProductImage, setIsShowProductImage,
      barcodesInWishlists, setBarcodesInWishlists,
      barcodeToBeAddedToWishlist, setBarcodeToBeAddedToWishlist,
      emptyUserDetail, expandPopUpWindow
      }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedContext = () => {
  return useContext(SharedContext);
};
