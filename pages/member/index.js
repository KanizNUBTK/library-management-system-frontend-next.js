import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useUser } from '../../context/userContext';
import Layout from '../../layout/index';
import libraryImg from '../../public/images/library.jpg';
import Image from 'next/image';
import Card from '../../components/helper/card';

const Member = () => {
    const { user } = useUser();
    const [bookingInfo, setBookingInfo] = useState([]);
    const token = Cookies.get('token');
    const date = new Date();
    //console.log(user.email);
    useEffect(() => {
        async function getData() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const result = await axios.get(`http://localhost:8080/bookings/get-all`, config);
                console.log("booking result=", result.data.booking);
                setBookingInfo(result.data.booking);

            } catch (error) {
                swalAlert.error(error);
            }
        }
        getData()
    }, [token])
    //console.log(bookingInfo.email);
    const filterBookingInfo = bookingInfo.filter(bookInfo => bookInfo.email == user.email).filter(book => book.state === "pending");
    const filterBookingAcceptedInfo = bookingInfo.filter(bookInfo => bookInfo.email == user.email).filter(book => book.state === "accepted");
    const recevingBook = bookingInfo.filter(bookInfo => bookInfo.email == user.email).filter(book => book.endDate === date);
    //console.log('recevingBook=',recevingBook);
    const filBook = filterBookingInfo.slice(0, 4);
    const acceptBook = filterBookingAcceptedInfo.slice(0, 4);
    return (
        <Layout>
            <div className='bg-gray-200 h-auto md:h-auto rounded-xl'>
                <div className='grid grid-cols-1 md:grid-cols-3'>
                    <div className='col-span-2 grid grid-rows-2 md:grid-rows-2 gap-4 p-4'>
                        <div className='bg-white p-2 rounded-lg'>
                            <Image src={libraryImg} alt="" srcset="" />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 bg-white p-4 rounded-lg'>
                            {
                                filBook.map(book => <Card
                                    key={book._id}
                                    book={book}
                                ></Card>)
                            }
                        </div>
                    </div>
                    <div className='p-4 grid grid-rows-2 gap-4 rounded-xl md:mt-0 mt-4'>
                        <div className='bg-gray-100 rounded-xl p-4 shadow-lg'>
                            <p className='text-center font-bold text-2xl bg-white rounded-xl p-2 text-teal-600 shadow-xl'>{new Date().toDateString()}</p>

                            {recevingBook.length != 0 ?
                                <div className='bg-white p-4 rounded-xl'>
                                    <p className='text-red-400 font-semibold text-justify'> <span className='text-red-600 font-bold'>{recevingBook[0]?.bookTitle}</span> , this book must be submitted today</p>
                                    <p className='text-red-400 font-semibold text-justify'>The book you took on the <span className='text-red-600 font-bold'>{new Date(recevingBook[0]?.startDate).toDateString()}</span> and must be submitted on the <span className='text-red-700 font-bold'>{new Date(recevingBook[0]?.endDate).toDateString()}</span></p>
                                    <p></p>
                                </div>
                                :
                                <div className='bg-white rounded-xl p-2 shadow'><p className='text-center text-green-600 font-bold text-lg'>No books need to be submitted today</p></div>
                            }
                        </div>
                        <div className='bg-cyan-50 rounded-xl p-4 shadow-lg'>
                            {
                                acceptBook.map(book => <Card
                                    key={book._id}
                                    book={book}
                                ></Card>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Member;