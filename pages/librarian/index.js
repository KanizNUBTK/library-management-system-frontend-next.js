import React from 'react';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';
import Layout from '../../layout/index';
import axios from 'axios';
import Image from 'next/image'
import Cookies from 'js-cookie';
import classes from './library.module.css'
import NumberOfInstance from '../../components/helper/numberOfInstance';
import libraryImage from '../../public/images/library.jpg'
import swalAlert from '../../components/alert';

const Librarian = () => {
    const { user } = useUser();
    const token = Cookies.get('token');
    //console.log("home page user=", user);
    const [member, setMember] = useState([])
    const [teacher, setTeacher] = useState([])
    const [books, setBooks] = useState([])
    const [bookingInfo, setBookingInfo] = useState([])
    const [receiveBookingInfo, setReceiveBookingInfo] = useState([])
    const [onlineBooks, setOnlineBooks] = useState([])

    useEffect(() => {
        try {
            async function getteacherData() {
                const token = await Cookies.get('token');
                const config = {
                    headers: { "Authorization": `Bearer ${token}` }
                }
                const teacherData = await axios.get(`http://localhost:8080/user/get-filtered-data?role=member`, config);
                //console.log(teacherData);
                setMember(teacherData.data.data)
            }
            getteacherData()
        } catch (error) {
            swalAlert.error(error.response.data)
        }
    }, [])
    const filterMembers = member.filter(mem => mem.libraryId === user.libraryId?._id)

    useEffect(() => {
        try {
            async function getteacherData() {
                const token = await Cookies.get('token');
                const config = {
                    headers: { "Authorization": `Bearer ${token}` }
                }
                const teacherData = await axios.get(`http://localhost:8080/user/get-filtered-data?role=teacher`, config);
                //console.log(teacherData);
                setTeacher(teacherData.data.data)
            }
            getteacherData()
        } catch (error) {
            swalAlert.error(error.response.data)
        }
    }, [])
    const filterTeacher = teacher.filter(mem => mem.libraryId === user.libraryId?._id)

    useEffect(() => {
        async function getData() {
            const id = user?.libraryId?._id;
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const result = await axios.get(`http://localhost:8080/books/filtered-subject/${id}`, config);
                setBooks(result.data.books);
                //console.log("result", result);
            } catch (error) {
                swalAlert.error(error)
            }
        }
        getData()
    }, [user])
    useEffect(() => {
        async function getData() {
            const id = user?.libraryId?._id;
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const result = await axios.get(`http://localhost:8080/OnlineBooks/filtered-subject/${id}`, config);
                setOnlineBooks(result.data.books);
                //console.log("result", result);
            } catch (error) {
                swalAlert.error(error)
            }
        }
        getData()
    }, [user])
    useEffect(() => {
        async function getData() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const result = await axios.get(`http://localhost:8080/bookings/get-all`, config);
                //console.log("booking result=", result.data.booking);
                setBookingInfo(result.data.booking);

            } catch (error) {
                swalAlert.error(error);
            }
        }
        getData()
    }, [token])
    const filterPendingBookingInfo = bookingInfo.filter(book => book?.libraryId._id === user.libraryId?._id).filter(book=>book.state==="pending");
    const filterReceivedBookingInfo = bookingInfo.filter(book => book?.libraryId._id === user.libraryId?._id).filter(book=>book.state==="received");
    const tea = filterTeacher.slice(0, 5)
    const mem = filterMembers.slice(0, 5)
    const book = books.slice(0, 5)
    return (
        <Layout>
            <div className='bg-gray-200 h-auto md:h-screen rounded-xl md:mr-2'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-2 capitalize md:gap-10 pt-5 justify-center mx-5 '>
                    <NumberOfInstance library={'member'} total={filterMembers.length} />
                    <NumberOfInstance library={'teacher'} total={filterTeacher.length} />
                    <NumberOfInstance library={'books'} total={books.length} />
                    <NumberOfInstance library={'onlineBooks'} total={onlineBooks.length} />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3'>
                    <div className='col-span-2 grid grid-rows-2 md:grid-rows-2 bg-gray-50 gap-4 rounded-xl m-5 p-4'>
                        <div className='bg-cyan-50 w-auto pl-4 pr-4 rounded-xl shadow-2xl'>
                            <Image src={libraryImage}></Image>
                        </div>
                        <div className='w-auto rounded-xl shadow-2xl'>
                            <div className='flex justify-between'>
                                <div className='bg-sky-50 p-2 rounded-xl shadow-2xl'>
                                    <h1 className="font-bold text-md border-b-2 mt-2">Recently Added Teacher</h1>
                                    {
                                        tea?.map(teacher => <li key={teacher._id} className={classes.liStyle}>{teacher.firstName + " " + teacher.lastName}</li>)
                                    }
                                </div>
                                <div className='bg-green-50 p-2 rounded-xl shadow-2xl'>
                                    <h1 className="font-bold text-md border-b-2 mt-2">Recently Added Member</h1>
                                    {
                                        mem?.map(member => <li key={member._id} className={classes.liStyle}>{member.firstName + " " + member.lastName}</li>)
                                    }
                                </div>
                                <div className='bg-yellow-50 p-2 rounded-xl shadow-2xl'>
                                    <h1 className="font-bold text-md border-b-2 mt-2">Recently Added Books</h1>
                                    {
                                        book?.map(bk => <li key={bk._id} className={classes.liStyle}>{bk.bookTitle}</li>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='p-4 grid grid-rows-2 rounded-xl md:mt-0 mt-4'>
                        <div className='bg-red-700 w-auto h-52 pl-4 pr-4 rounded-xl'>
                            <h1 className="font-bold text-xl text-white text-center border-b-2 mt-2">Booking Pendling</h1>
                            <h1 className="font-bold text-9xl text-white text-center mt-2">{filterPendingBookingInfo.length}</h1>
                        </div>
                        <div className='bg-green-700 w-auto pl-4 pr-4 rounded-xl'>
                            <h1 className="font-bold text-xl text-white text-center border-b-2 mt-2">Book Received</h1>
                            <h1 className="font-bold text-9xl text-white text-center">{filterReceivedBookingInfo.length}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Librarian;