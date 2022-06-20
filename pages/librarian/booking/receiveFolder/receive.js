import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link'
import Table from '../../../../components/table/table';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import Layout from '../../../../layout';
import swalAlert from '../../../../components/alert';
import { useUser } from '../../../../context/userContext';
import { deleteReceivedBooking } from '../../../../components/helper/delete';

const ViewBooking = () => {
    const router = useRouter()
    const [bookingInfo, setBookingInfo] = useState([]);
    const token = Cookies.get('token');
    const { user } = useUser();
    //console.log("user library id=", user.libraryId?._id);

    useEffect(() => {
        async function getData() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const result = await axios.get(`http://localhost:8080/bookings/get-all`, config);
                //console.log("received booking result=", result.data.booking);
                setBookingInfo(result.data.booking);

            } catch (error) {
                swalAlert.error(error);
            }
        }
        getData()
    }, [token])
    const deleteHandler = async (id) => {
        let { isConfirmed } = await swalAlert.confirm('Are you want to delete the currently booking?', 'Yes, Delete')
        if (isConfirmed) {
            const res = await deleteReceivedBooking(id)
            if (res.status) {
                swalAlert.success(res.message);
                router.reload();
            }
        }
    }
    const column = [
        { dataField: 'firstName', headerName: 'Name' },
        { dataField: 'email', headerName: 'Email' },
        { dataField: 'departmentName', headerName: 'Department Name' },
        { dataField: 'bookTitle', headerName: 'Book Title' },
        { dataField: 'authorName', headerName: 'Author Name' },
        { dataField: 'pulisherName', headerName: 'Publisher Name' },
        { dataField: 'startDate', headerName: 'Date', formatter: (_, data) => (<div><p>{new Date(data.startDate).toDateString()}</p><p>{new Date(data.endDate).toDateString()}</p></div>) },
        { dataField: 'state', headerName: 'Status' },
        {
            dataField: '_id', headerName: 'Action', formatter: (_id, data) => (
                <button onClick={() => deleteHandler(_id)} className='deleteBtn ml-2 tracking-wide hover:text-red-700 hover:font-bold hover:text-xl'>Delete</button>
            )
        },
    ]
    //console.log(bookingInfo[0]?.libraryId._id);
    const filterMemberBookingInfo = bookingInfo.filter(book => book?.libraryId._id === user.libraryId?._id).filter(book=>book.state==="received")
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
            <h1 className='text-center font-bold text-2xl mt-4 text-cyan-600'>Received BookingInfo List</h1>
            <Table data={filterMemberBookingInfo} columns={column} />
        </Layout>
    );
};

export default ViewBooking;