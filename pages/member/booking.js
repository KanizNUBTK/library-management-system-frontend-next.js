import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link'
import Table from '../../components/table/table';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import Layout from '../../layout';
import swalAlert from '../../components/alert';
import { useUser } from '../../context/userContext';


const ViewBooking = () => {
    const router = useRouter()
    const [bookingInfo, setBookingInfo] = useState([]);
    const token = Cookies.get('token');
    const { user } = useUser();
    //console.log("bookingInfo email=", user.email);

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

    const column = [
        { dataField: 'firstName', headerName: 'Name', formatter: (_, data) => (<p className='capitalize'>{data.firstName + " " + data.lastName}</p>) },
        { dataField: 'email', headerName: 'Email' },
        { dataField: 'bookTitle', headerName: 'Book Title' },
        { dataField: 'authorName', headerName: 'Author Name' },
        { dataField: 'pulisherName', headerName: 'Publisher Name' },
        { dataField: 'startDate', headerName: 'Date', formatter: (_, data) => (<div><p>{new Date(data.startDate).toDateString()}</p><p>{new Date(data.endDate).toDateString()}</p></div>) },
        {
            dataField: '_id', headerName: 'Action', formatter: (_id, data) => (
                <div>
                    {
                        data.state === "pending" ? 
                        <button className='text-red-700 font-bold text-lg'>Pending</button>
                            :
                        <button className='text-green-700 font-bold text-lg'>Accept</button>
                    }
                </div>
            )
        },
    ]

    const filterMemberBookingInfo = bookingInfo.filter(book => book.email===user.email).filter(book=>book.state==="pending" || "accepted")
    //console.log(filterMemberBookingInfo);
    if (bookingInfo.length < 1) {
        return (
            <Layout>
                <div className='text-center mt-20'>
                    <Spin tip="Loading..." size="large">
                    </Spin>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <h1 className='text-center font-bold text-2xl mt-4 text-cyan-600'>BookingInfo List</h1>
            <Table data={filterMemberBookingInfo} columns={column} />
        </Layout>
    );
};

export default ViewBooking;