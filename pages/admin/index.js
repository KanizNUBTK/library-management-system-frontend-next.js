import React, { useState, useEffect } from 'react';
import Layout from '../../layout/index';
import NumberOfInstance from '../../components/helper/numberOfInstance';
import axios from 'axios';
import Image from 'next/image'
import Cookies from 'js-cookie';
import classes from './admin.module.css'
import Calender from '../../components/helper/calender';

const Admin = () => {
    const [library, setLibrary] = useState([])
    const [librarian, setLibrarian] = useState([])
    const [admin, setAdmin] = useState([])

    useEffect(() => {
        try {
            async function getAllData() {
                const libraryData = await axios.get(`http://localhost:8080/library/get-all`);
                console.log(libraryData.data.librarys);
                setLibrary(libraryData.data.librarys)
            }
            getAllData()
        } catch (error) {
            console.log(error.response.data)
        }
    }, [])


    useEffect(() => {
        try {
            async function getLibrarianData() {
                const token = await Cookies.get('token');
                const config = {
                    headers: { "Authorization": `Bearer ${token}` }
                }
                const librarianData = await axios.get(`http://localhost:8080/user/get-filtered-data?role=librarian`, config);
                console.log(librarianData);
                setLibrarian(librarianData.data.data)
            }
            getLibrarianData()
        } catch (error) {
            console.log(error.response.data)
        }
    }, [])


    useEffect(() => {
        try {
            async function getlibrarianData() {
                const token = await Cookies.get('token');
                const config = {
                    headers: { "Authorization": `Bearer ${token}` }
                }
                const adminData = await axios.get(`http://localhost:8080/user/get-filtered-data?role=admin`, config);
                setAdmin(adminData.data.data)
            }
            getlibrarianData()
        } catch (error) {
            console.log(error.response.data)
        }
    }, [])
    const lib = library.slice(0, 10)
    const lban = librarian.slice(0, 10)
    return (
        <Layout>
            {/* <h1 className='ml-5 font-bold text-lg mt-1 pb-3 text-cyan-500 text-xl font-bold'>Admin Dashboard</h1> */}
            <div className='bg-gray-200 h-auto md:h-auto rounded-xl md:mr-2'>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-10 pt-5 justify-center mx-5 '>
                    <div className='h-16 rounded-xl flex justify-around pt-1 items-center bg-gray-50 shadow-xl'>
                        <h1 className='text-cyan-500 text-xl font-bold capitalize'>library :</h1>
                        <h1 className='text-cyan-500 text-2xl font-extrabold'>{library.length}</h1>
                    </div>
                    <div className='h-16 rounded-xl flex justify-around pt-1 items-center bg-gray-50 shadow-xl'>
                        <h1 className='text-cyan-500 text-xl font-bold capitalize'>librarian :</h1>
                        <h1 className='text-cyan-500 text-2xl font-extrabold'>{librarian.length}</h1>
                    </div>
                    <div className='h-16 rounded-xl flex justify-around pt-1 items-center bg-gray-50 shadow-xl'>
                        <h1 className='text-cyan-500 text-xl font-bold capitalize'>admin :</h1>
                        <h1 className='text-cyan-500 text-2xl font-extrabold'>{admin.length}</h1>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3'>
                    <div className='col-span-2 grid grid-cols-1 md:grid-cols-2 bg-gray-50 gap-4 rounded-xl m-5 p-4'>
                        <div className='bg-cyan-50 w-auto pl-4 pr-4 rounded-xl shadow-2xl capitalize'>
                            <h1 className="font-bold text-md border-b-2 mt-2">Recently Added library</h1>
                            {
                                lib?.map(library => <li key={library._id} className={classes.liStyle}>{library.libraryName}</li>)
                            }

                        </div>
                        <div className='bg-sky-50 w-auto pl-4 pr-4 rounded-xl shadow-2xl capitalize'>
                            <h1 className="font-bold text-md border-b-2 mt-2">Recently Added librarian</h1>
                            {
                                lban?.map(librarian => <li key={librarian._id} className={classes.liStyle}>{librarian.firstName + " " + librarian.lastName}</li>)
                            }
                        </div>
                    </div>
                    <div className='py-4 pr-2 grid grid-rows rounded-xl mt-5 md:mt-0'>
                        <div className='bg-gray-50 w-auto p-1 rounded-xl'>
                            <Calender />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Admin;