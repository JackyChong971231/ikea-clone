import * as React from 'react';
import { useSharedContext } from '../SharedContext';
import { getAllWishlistItems } from '../services/wishlistService';

export const Wishlist = () => {
    const {userDetail, setUserDetail} = useSharedContext();

    React.useEffect(() => {
        getAllWishlistItems(userDetail.email, userDetail.signedInToken);
    },[])

    return (
        <>
            <div className='wishlist__container px-3'>
                <div className='wishlist__header'>
                    <p><small>My lists</small></p>
                    <div className='py-4'>
                        <h3><b>Hej!</b></h3>
                        <p>Start organizing your dream space.</p>
                    </div>
                </div>
                <div className='wishlist__buttons'>
                    <button className='px-2 py-2'>Lists</button>
                    <button className='px-2 py-2'>Idea board</button>
                </div>
                <div className='wishlists__container'>
                    <div className='eachWishlist__container'>
                        <div className='eachWishlist__image'></div>
                        <div className='eachWishlist__info'></div>
                        <button>go</button>
                    </div>
                </div>
            </div>
        </>
    )
}