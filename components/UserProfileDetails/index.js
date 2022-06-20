/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { AiOutlineSafety, AiOutlineMail, AiOutlineContacts, AiOutlineUserAdd } from "react-icons/ai";
import InfoUpdateForm from './updateForm';
import Image from 'next/image';
import avater from '../../public/images/avatar.png';
import { BsCloudArrowUpFill } from "react-icons/bs";
import { Modal, Button } from 'antd';
import UploadPicture from '../modal/uploadPicture';
import PasswordChange from '../modal/passwordChange';


const UserProfileDetails = (props) => {
    const { createdAt, email, firstName, lastName, role, _id, image } = props.userData;
    const imgUrl = `http://localhost:8080/${image}`

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [profileImage, setProfileImage] = useState(false);

    const showModal = (value) => {
        if (value === 'image') {
            setProfileImage(true)
            setIsModalVisible(true);

        } else {
            setProfileImage(false)
            setIsModalVisible(true);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }


    return (
        <section>
            <div className='bg-gray-200 h-full w-full md:grid md:grid-cols-3 md:gap-3 p-4 mt-3 rounded-lg'>
                <div className='bg-gray-300 rounded-md h-full w-full p-3'>
                    <div className='image bg-gray-50 h-52 flex items-center justify-center rounded-md relative'>
                        <div className='w-40 border-2 rounded-full shadow-sm cursor-not-allowed'>
                            {
                                image !== 'avatar.png' ?
                                    <img src={imgUrl} alt='profile-pic' className='shrink object-cover rounded-full' />
                                    :
                                    <Image src={avater} alt='profile-pic' className='shrink object-cover rounded-full' />
                            }
                        </div>
                        <div className='absolute right-5 bottom-5' title='upload image' onClick={() => showModal('image')}>
                            <BsCloudArrowUpFill className='text-cyan-600 text-3xl hover:cursor-pointer hover:scale-110 transition' />
                        </div>
                    </div>
                    <div className='user-info bg-gray-50 mt-3 h-48 rounded-md'>
                        <div className='flex items-center justify-center'>
                            <AiOutlineSafety className='text-green-600' />
                            <h1 className='font-bold text-center pt-2 border-b-2 ml-2'>{role?.toUpperCase()}</h1>
                        </div>
                        <div className='flex items-center ml-5'>
                            <AiOutlineUserAdd className='mb-3 text-lg text-cyan-500' />
                            <p className='font-semibold ml-2'>Name : {firstName + " " + lastName}</p>
                        </div>
                        <div className='flex items-center ml-5'>
                            <AiOutlineMail className='mb-3 text-lg text-cyan-500' />
                            <p className='font-semibold ml-2'>Email : {email}</p>
                        </div>
                        <div className='flex items-center ml-5'>
                            <AiOutlineContacts className='mb-3 text-lg text-cyan-500' />
                            <p className='font-semibold ml-2'>Joined : {new Date(createdAt).toLocaleDateString()}</p>
                        </div>

                        {/* <p>Class : {}</p> */}
                    </div>
                    <em>
                        <p className='mt-3 p-2 bg-gray-50 rounded-md'>Change your password <a onClick={() => showModal('password')}>Click here</a> </p>
                    </em>
                </div>


                <div className='bg-gray-300 h-full w-full col-span-2 p-3 rounded-md'>
                    <div className='w-11/12 bg-gray-50 rounded-md m-auto -space-y-3 mb-5 pt-2 pb-4'>
                        <h1 className='ml-10 text-lg font-bold  text-cyan-500'>Welcome</h1>
                        <h1 className='ml-10  text-cyan-600'><em>You can update your profile information</em></h1>
                    </div>
                    <InfoUpdateForm />
                </div>
            </div>

            <Modal title={profileImage ? "Upload Picture" : 'Change Password'} visible={isModalVisible} onCancel={handleCancel} footer={null} >
                {
                    profileImage ?
                        <UploadPicture setIsModalVisible={setIsModalVisible} />
                        :
                        <PasswordChange setIsModalVisible={setIsModalVisible} />
                }
            </Modal>
        </section>
    );
};

export default UserProfileDetails;