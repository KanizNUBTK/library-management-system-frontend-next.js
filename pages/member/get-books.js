import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link'
import Table from '../../components/table/table';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import Layout from '../../layout/index';
import { useUser } from '../../context/userContext';


const ViewAllBooks = () => {
    const { user } = useUser();
    const router = useRouter()
    const [books, setBooks] = useState([]);
    const token = Cookies.get('token');
    //console.log("user=", user);

    useEffect(() => {
        async function getData() {
            const id = user?.libraryId?._id;
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const result = await axios.get(`http://localhost:8080/books/filtered-subject/${id}`, config);
                setBooks(result.data.books);
                console.log("result", result);
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [user])
    const bookingHandler = (bookTitle, authorName, pulisherName, description, type, quantity, id) => {
        //console.log(bookTitle, authorName, pulisherName, description, type, quantity, id);
        router.push(`/member/${bookTitle}/${authorName}/${pulisherName}/${description}/${type}/${quantity}/${id}`)
    }
    const column = [
        { dataField: 'bookTitle', headerName: 'Book Title' },
        { dataField: 'authorName', headerName: 'Author Name' },
        { dataField: 'pulisherName', headerName: 'Pulisher Name' },
        { dataField: 'description', headerName: 'Description' },
        { dataField: 'type', headerName: 'Type' },
        {
            dataField: '_id', headerName: 'Action', formatter: (_id, data) => (
                <div>
                    {
                        data.quantity > 0 ?
                            <button onClick={() => bookingHandler(data.bookTitle, data.authorName, data.pulisherName, data.description, data.type, _id)} className='editBtn mr-2 tracking-wide hover:text-green-700 hover:font-bold hover:text-xl'>Booking</button>
                            : <p className='text-red-700'>Sorry</p>
                    }
                </div>
            )
        },
    ]


    if (books.length < 1) {
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
            <h1 className='text-center font-bold text-2xl mt-4 text-cyan-600'>Book List</h1>
            <Table className="capitalize" data={books} columns={column} />
        </Layout>
    );
};

export default ViewAllBooks;