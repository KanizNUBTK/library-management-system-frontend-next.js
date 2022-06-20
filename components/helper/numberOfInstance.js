import React from 'react';

const NumberOfInstance = ({ library, total }) => {
    return (
        <div className='h-16 rounded-xl flex justify-around pt-1 items-center bg-gray-50 shadow-xl'>
            <h1 className='text-cyan-500 text-xl font-bold'>{library}</h1>
            <h1 className='text-cyan-500 text-2xl font-extrabold'>{total}</h1>
        </div>
    );
};

export default NumberOfInstance;