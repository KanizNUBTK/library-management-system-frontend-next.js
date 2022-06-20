import React from 'react';
import Link from 'next/link'

const Card = (props) => {
    const { bookTitle, authorName, pulisherName, startDate, endDate, state } = props.book;

    return (
        <div>
            <div className="bg-green-50 w-auto h-32 pl-4 pr-4 rounded-xl shadow-lg shadow-gray-500/50">
                <div className='flex justify-between pt-2'>
                    <h1 className='text-green-900 text-lg font-bold border-b-2 border-green-500 capitalize'>{bookTitle}</h1>
                    {
                     state==='pending'?   
                    <button className='text-lg bg-red-600 capitalize text-white px-2 rounded  font-extrabold'>{state}</button>
                    :
                    <button className='text-lg bg-green-600 capitalize text-white px-2 rounded  font-extrabold'>{state}</button>
                    }
                </div>
                <div className='flex justify-between'>
                    <h2 className='text-emerald-700 text-md capitalize'>{authorName}</h2>
                    <h2 className='text-emerald-700 text-md capitalize'>{pulisherName}</h2>
                </div>
                <div className='flex justify-between'>
                    <h2 className='text-emerald-700 text-md capitalize'>{new Date(startDate).toDateString()}</h2>
                    <h2 className='text-emerald-700 text-md capitalize'>{new Date(endDate).toDateString()}</h2>
                </div>
            </div>
        </div>
    );
};

export default Card;