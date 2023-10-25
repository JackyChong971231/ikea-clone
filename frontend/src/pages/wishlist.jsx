import * as React from 'react';
import { useSharedContext } from '../SharedContext';

export const Wishlist = () => {
    const {userDetail, setUserDetail} = useSharedContext();


    return (
        <>
            <div className='wishlist__container px-3'>
                <div className='wishlist__header'>
                    <p><small>My lists</small></p>
                    <h3><b>Hej!</b></h3>
                    <p>Start organizing your dream space.</p>
                </div>
                <div className='wishlist__buttons'>
                    <button className='px-2 py-2'>Lists</button>
                    <button className='px-2 py-2'>Idea board</button>
                </div>
            </div>
        </>
    )
}