import React, { useEffect } from 'react';
import { Form, Input, Button, Upload, } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useUser } from '../../context/userContext';
import { useRouter } from 'next/router'
import swalAlert from '../alert';


const InfoUpdateForm = ({ }) => {
    const router = useRouter()
    const { user } = useUser()
    const { firstName, lastName, email } = user;

    const onFinish = async (values) => {
        try {
            const token = await Cookies.get('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }

            const res = await axios.patch('http://localhost:8080/user/update-profile', values, config)

            if (res.data.message === 'success') {
                swalAlert.success('Profile Updated Successfully!');
                router.reload()
            }
        } catch (error) {
            swalAlert.error(error);
        }
    };

    return (
        <div className='m-auto bg-gray-50 rounded-lg p-10 shadow-md font-semibold w-11/12'>
            <Form
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
            >

                <Form.Item
                    label="First Name"
                    name="firstName"
                >
                    <Input placeholder={firstName} />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                >
                    <Input placeholder={lastName} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input placeholder={email} />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
};

export default InfoUpdateForm;