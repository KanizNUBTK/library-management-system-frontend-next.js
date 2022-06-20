import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
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
                const result = await axios.get(`http://localhost:8080/OnlineBooks/filtered-subject/${id}`, config);
                setBooks(result.data.books);
                console.log("result", result);
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [user])
    const column = [
        { dataField: 'bookTitle', headerName: 'Book Title' },
        { dataField: 'authorName', headerName: 'Author Name' },
        { dataField: 'pulisherName', headerName: 'Publisher Name' },
        { dataField: 'type', headerName: 'Type' },
        {
            dataField: '_id', headerName: 'Download', formatter: (_, data) => (
                <div>
                    <a href={data.link} target="_blank" download>Click me</a>
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
            <h1 className='text-center font-bold text-2xl text-cyan-600'>Online Book List</h1>
            <Table className="capitalize" data={books} columns={column} />
        </Layout>
    );
};

export default ViewAllBooks;