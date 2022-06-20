import React, { useState, useEffect } from 'react';
import Layout from '../../../layout';
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import swalAlert from '../../../components/alert';


const AddLibrarian = () => {
    const router = useRouter();
    const [library, setLibrary] = useState([]);

    const onFinish = async (values) => {
        async function createAdmin() {
            try {
                const token = await Cookies.get('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const response = await axios.post('http://localhost:8080/user/signup', values, config);

                if (response.data) {
                    swalAlert.success("Admin added successfully")
                    setTimeout(() => {
                        router.push('/admin/view-all/viewAdmin')
                    }, 2700);
                }

            } catch (error) {
                console.log(error);
                swalAlert.error(error);
            }
        }
        createAdmin()
    };

    return (
        <Layout>
            <h1 className='text-center py-2 font-bold text-lg text-cyan-600'>Make you admin</h1>
            <div className='m-auto bg-blue-200 rounded-lg p-10 shadow-xl font-semibold md:w-3/5 h-auto'>

                <Form onFinish={onFinish} layout='vertical'>
                    <div className='md:grid md:grid-cols-2 md:gap-1'>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input First Name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Last Name!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please Input Email!',
                            },
                            {
                                type: 'email',
                                message: 'Invalid email!'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>

                    <div className='md:grid md:grid-cols-2 md:gap-1'>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Valid Password!',
                                },
                                {
                                    min: 6,
                                    message: 'Minimum 6 character needed'
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={["password"]}
                            rules={[
                                {
                                    required: true,
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("Incorrect Password!")
                                    }
                                })

                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                    </div>

                    <Form.Item name="role" label="Designation" rules={[{ required: true, message: 'Please Select Role' }]}>
                        <Select placeholder="Select Role">
                            <Option value='admin'>Admin</Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Make Admin
                    </Button>
                </Form>
            </div>
        </Layout>
    );
};

export default AddLibrarian;