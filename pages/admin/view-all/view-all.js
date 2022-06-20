import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link'
import Table from '../../../components/table/table';
import { Spin } from 'antd';
import { deleteLibrary } from '../../../components/helper/delete';
import { useRouter } from 'next/router';
import Layout from '../../../layout';
import swalAlert from '../../../components/alert';


const LibraryViewAll = () => {
    const router = useRouter()
    const [library, setLibrary] = useState([]);
    const token = Cookies.get('token');

    useEffect(() => {
        async function getData() {
            try {
                const result = await axios.get(`http://localhost:8080/library/get-all`);
                setLibrary(result.data.librarys);

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [token])


    const editHandler = (id) => {
        router.push(`/admin/library/edit/${id}`)
    }

    const deleteHandler = async (id) => {
        const res = await deleteLibrary(id)
        if (res.status) {
            swalAlert.success(res.message);
            router.reload();
        }
    }

    const column = [
        {
            dataField: 'libraryName', headerName: 'Library Name', formatter: (name, data) => (
                <p className='capitalize'>{name}</p>
            )
        },
        { dataField: 'libraryEmail', headerName: 'Email Address' },
        {
            dataField: 'institutionName', headerName: 'Institution Name'
        },
        {
            dataField: '_id', headerName: 'Action', formatter: (_id, data) => (
                <div>
                    <button onClick={() => editHandler(_id)} className='editBtn mr-2 tracking-wide hover:text-green-700 hover:font-bold hover:text-xl'>Edit</button>
                    <button onClick={() => deleteHandler(_id)} className='deleteBtn ml-2 tracking-wide hover:text-red-700 hover:font-bold hover:text-xl'>Delete</button>
                </div>
            )
        },
    ]


    if (library.length < 1) {
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
            <h1 className='text-center text-2xl font-bold text-lg mt-4 text-cyan-600'>Library List</h1>
            <Table data={library} columns={column} />
        </Layout>
    );
};

export default LibraryViewAll;