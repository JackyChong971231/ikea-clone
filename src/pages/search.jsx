import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const dummy ={
    'products': [
        {
            'product-name': 'SUNNERSTA',
            'description': 'Shelf/ dish drainer',
            'price': '3.99',
            'rating': '4.5',
            'reviews': '20'
        },
        {
            'product-name': 'BURHULT',
            'description': 'Shelf, 59x20 cm (23 1/4x7 7/8 ")',
            'price': '5.00',
            'rating': '4.2',
            'reviews': '87'
        },
        {
            'name-decorator': 'RÅGRUND',
            'description': 'Shelf unit, 37x37x104 cm (14 5/8x14 5/8x41 ")',
            'price': '79.00',
            'rating': '',
            'reviews': ''
        },
    ],
    'contents': [
        {
            'title': 'Your shelf, your self',
            'type': 'Gallery',
            'image': 'https://www.ikea.com/images/zoomed-in-image-of-a-section-of-a-shelf-featuring-a-hektar-l-f31bf8c08660d878d34abe2ae466373e.jpg?f=xxxs',
        },
        {
            'title': 'Your foodie nirvana on shelves',
            'type': 'Gallery',
            'image': 'https://www.ikea.com/images/omar-shelving-units-in-different-heights-displaying-packages-04771b183e94d24fb128f244bd9d7d2a.jpg?f=xxxs',
        }
    ]
}

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [ searchQuery, setSearchQuery ] = useState('');
    const [ imageDisplayType, setImageDisplayType ] = useState('product')

    useEffect(() => {
        setSearchQuery(searchParams.get('q'));
    })

    return (
        <div className='search'>
            <div className='search__container py-2 px-3'>
                <div className='search__container__summary px-1'>
                    <h4>Showing matches for "<b>{searchQuery}</b>"</h4>
                    <p>
                        <span>
                            We found&nbsp;
                            <a href='#product-list'>{dummy['products'].length} products</a>
                            &nbsp;and&nbsp;
                            <a href='#content-list'>{dummy['contents'].length} content results</a>
                            .
                        </span>
                    </p>
                </div>
                <div className='search__container__image-type pt-4 pb-2'>
                    <span></span>
                    <div className='search__container__image-type__inner'>
                        <button 
                        className={'product-image-type__toggle-button'+((imageDisplayType==='product')?' product-image-type__toggle-button--active':'')}
                        onClick={() => {setImageDisplayType('product')}}>Product</button>
                        <button
                        className={'product-image-type__toggle-button'+((imageDisplayType==='room')?' product-image-type__toggle-button--active':'')}
                        onClick={() => {setImageDisplayType('room')}}>Room</button>
                    </div>
                </div>
                <div className='search__container__compare py-3'>
                    <span></span>
                    <div>
                        <span className='px-2'>Compare</span>
                        <label className='search__container__compare__toggle-switch'>
                            <input className='search__container__compare__checkbox' type='checkbox' name='switchname'
                            aria-label='Activate product comparison selection'></input>
                            <span className='slider round'></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}