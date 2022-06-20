import React, { useEffect, useState } from 'react';
import swalAlert from '../../components/alert/index';
import { useUser } from '../../context/userContext';
import Layout from '../../layout/index';
import Link from 'next/link';
import axios from 'axios'
import Cookies from 'js-cookie';


const About = () => {
    const { user } = useUser({});
    const [libraryInfo, setLibraryInfo] = useState([]);
    //console.log(user.libraryId?._id);
    useEffect(() => {
        try {
            async function getlibrarianData() {
                const token = await Cookies.get('token');
                const config = {
                    headers: { "Authorization": `Bearer ${token}` }
                }
                const res = await axios.get(`http://localhost:8080/library/get-all`, config);
                setLibraryInfo(res.data.librarys)
                //console.log(res.data.librarys?._id)
            }
            getlibrarianData()
        } catch (error) {
            console.log(error.response.data)
        }
    }, [])
    const filterLibrary = libraryInfo.filter(lib => lib?._id === user.libraryId?._id)
    console.log(filterLibrary);
    return (
        <Layout>
            <div className='bg-gray-200 h-auto md:h-screen rounded-xl md:mr-2 p-4'>
                <div className='bg-gray-50 rounded-xl p-8'>
                    <div className='border-sky-200 shadow bg-sky-50 mx-8 rounded-lg'>
                        <h1 className='my-2 px-4 py-2 font-bold border-b-2 border-sky-200 text-lg rounded'>Library Name: {filterLibrary[0]?.libraryName}</h1>
                        <h1 className='my-2 px-4 py-2 font-semibold text-base rounded'>Library Email: {filterLibrary[0]?.libraryEmail}</h1>
                        <h1 className='my-2 px-4 py-2 text-md font-semibold rounded'>Institution Name: {filterLibrary[0]?.institutionName}</h1>
                        <h1 className='my-2 px-4 py-2 text-md  rounded'>Library Description: {filterLibrary[0]?.libraryDescription}</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default About;
