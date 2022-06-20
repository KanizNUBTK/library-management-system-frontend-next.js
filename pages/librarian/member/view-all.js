import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link'
import Table from '../../../components/table/table';
import { Spin } from 'antd';
import { deleteUser } from '../../../components/helper/delete';
import { useRouter } from 'next/router';
import Layout from '../../../layout';
import swalAlert from '../../../components/alert';
import { useUser } from '../../../context/userContext';

const Viewmember = () => {
    const router = useRouter()
    const [member, setMember] = useState([]);
    const token = Cookies.get('token');
    const {user}=useUser();
    console.log("member=",user.libraryId?._id);

    useEffect(() => {
        async function getData() {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const result = await axios.get(`http://localhost:8080/user/get-filtered-data?role=member`, config);
                console.log("member result=", result.data.data);
                setMember(result.data.data);

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [token])

    const editHandler = (id) => {
        router.push(`/user/edit/${id}`)
    }

    const deleteHandler = async (id) => {
        const res = await deleteUser(id)
        if (res.status) {
            swalAlert.success(res.message);
            router.reload();
        }
    }

    const column = [
        { dataField: 'firstName', headerName: 'Name', formatter: (_, data) => (<p className='capitalize'>{data.firstName + " " + data.lastName}</p>) },
        { dataField: 'email', headerName: 'Email' },
        { dataField: 'departmentName', headerName: 'Department Name' },
        { dataField: 'role', headerName: 'Designation' },
        {
            dataField: '_id', headerName: 'Action', formatter: _id => (
                <div>
                    <button onClick={() => editHandler(_id)} className='editBtn mr-2 tracking-wide hover:text-green-700 hover:font-bold hover:text-xl'>Edit</button>
                    <button onClick={() => deleteHandler(_id)} className='deleteBtn ml-2 tracking-wide hover:text-red-700 hover:font-bold hover:text-xl'>Delete</button>
                </div>
            )
        },
    ]

    const filterMembers = member.filter(mem=>mem.libraryId===user.libraryId?._id)
    if (member.length < 1) {
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
            <h1 className='text-center font-bold text-2xl mt-4 text-cyan-600'>Member List</h1>
            <Table data={filterMembers} columns={column} />
        </Layout>
    );
};

export default Viewmember;