import React, { useState } from 'react';
import swalAlert from '../../../components/alert/index';
import { useUser } from '../../../context/userContext';
import Layout from '../../../layout/index'
import axios from 'axios'
import Form from 'antd/lib/form/Form';
import { useRouter } from 'next/router';

const Details = () => {
    const { user } = useUser({});
    const router = useRouter();
    const [libaryPicture, setibaryPicture] = useState(null);
    console.log(user);
    const handleImage = (e) => {
        e.preventDefault();
        setibaryPicture(e.target.files[0]);
    }
    const handleLibraryInfo = async e => {
        e.preventDefault();
        const data = {
            libraryName: e.target.libraryName.value,
            libraryEmail: e.target.libraryEmail.value,
            institutionName: e.target.institutionName.value,
            libraryDescription: e.target.libraryDescription.value,
            libraryId: user?.libraryId?._id
        }
        console.log("data", data);
        try {
            const userData = {
                data
            }
            const res = await axios.patch(`http://localhost:8080/library/update-library-info`, userData);
            console.log("library info=", res);
            if (res.data.status === true) {
                swalAlert.success('library info updated successFully!');
                setTimeout(() => {
                    router.push('/librarian/about/about')
                }, 3000);
            }
        } catch (error) {
            swalAlert.error(error);
        }
    }
    // const handleLibraryImage = async e => {
    //     e.preventDefault();
    //     const data = {
    //         libraryId: user?.libraryId?._id
    //     }
    //     if (libaryPicture) {
    //         try {
    //             const token = await Cookies.get('token');
    //             const formData = new FormData();
    //             formData.append('image', libaryPicture);
    //             const config = {
    //                 headers: {
    //                     'content-type': 'multipart/from-data',
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             }
    //             const userData = {
    //                 data
    //             }
    //             const res = await axios.patch(`http://localhost:8080/library/library-image`, formData, config, userData);
    //             if (res.data.status === true) {
    //                 swalAlert.success('Profile updated successFully!');
    //                 setTimeout(() => {
    //                     window.location.reload();
    //                 }, 3000);
    //             }

    //         } catch (error) {
    //             swalAlert.error(error.response);
    //         }
    //     }
    // }

    return (
        <Layout>
            <div className='bg-gray-200 h-auto md:h-screen rounded-xl md:mr-2 p-4 '>
                <div className='bg-gray-50 rounded-xl'>
                    {/* <div>
                        <form onSubmit={handleLibraryImage}>
                            <label htmlFor="libaryPicture">libary Picture:</label><br />
                            <input type="file" name='libaryPicture' onChange={handleImage} className='border' accept="image/x-png,image/gif,image/jpeg" /><br />
                            <button type="submit" className="block mt-3 bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold  cursor-pointer focus:translate-y-1 transition focus:shadow-xl" >Upload</button>
                        </form>
                    </div> */}
                    <div className='flex justify-center md:py-8'>
                        <div className='border-2 border-sky-200 shadow bg-sky-50 px-8 py-4 rounded-xl'>
                            <h1 className='text-center text-sky-900 text-xl font-bold border-b-2 border-sky-200'>Update Library Information</h1>
                            <form onSubmit={handleLibraryInfo}>
                                <div className='w-96 my-4'>
                                    <label className='text-base font-semibold capitalize text-green-900' htmlFor="libraryName">library Name:</label><br />
                                    <input type="text" className='border w-96 py-1 px-4 rounded bg-gray-50 my-1' name="libraryName" id="" defaultValue={user.libraryId?.libraryName} /><br />
                                </div>
                                <div className='my-4'>
                                    <label htmlFor="libraryEmail" className='text-base font-semibold capitalize text-green-900'>library Email:</label><br />
                                    <input type="email" className='border w-full py-1 px-4 rounded bg-gray-50 my-1' name="libraryEmail" id="" defaultValue={user.libraryId?.libraryEmail} /><br />
                                </div>
                                <div className='my-4'>
                                    <label htmlFor="institutionName" className='text-base font-semibold capitalize text-green-900'>institution Name:</label><br />
                                    <input type="text" className='border w-full py-1 px-4 rounded bg-gray-50 my-1' name="institutionName" id="" defaultValue={user.libraryId?.institutionName} /><br />
                                </div>
                                <div className='my-4'>
                                    <label htmlFor="libraryDescription" className='text-base font-semibold capitalize text-green-900'>library Description:</label><br />
                                    <input type="text" className='border w-full py-1 px-4 rounded bg-gray-50 my-1' name="libraryDescription" placeholder='library description' />
                                </div>
                                <button type="submit" className="block my-3 bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold  cursor-pointer focus:translate-y-1 transition focus:shadow-xl" >Update Library Information</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default Details;
