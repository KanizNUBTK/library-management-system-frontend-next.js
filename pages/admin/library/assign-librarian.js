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

    useEffect(() => {
        async function library() {
            try {
                const res = await axios.get('http://localhost:8080/library/get-all');
                console.log(res.data);
                setLibrary(res.data.librarys)

            } catch (error) {
                console.log(error)
            }
        }
        library()
    }, [])


    const onFinish = async (values) => {
        async function createLibrarian() {
            try {
                const token = await Cookies.get('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const response = await axios.post('http://localhost:8080/user/signup', values, config);

                if (response.data) {
                    swalAlert.success("LIbrarian added successfully")
                    setTimeout(() => {
                        router.push('/admin/view-all/librarian')
                    }, 2700);
                }

            } catch (error) {
                console.log(error);
                swalAlert.error(error);
            }
        }
        createLibrarian()
    };


    const libraryData = library.slice(0, 7);


    return (
        <Layout>
            <h1 className='text-center py-2 font-bold text-lg text-cyan-600'>Assign Librarian for a Library</h1>
            <div className='m-auto bg-blue-200 rounded-lg p-10 shadow-xl font-semibold md:w-3/5 h-auto'>

                <Form onFinish={onFinish} layout='vertical'>
                    <Form.Item name="libraryId" label="Library" rules={[{ required: true, message: 'Please Select a Library' }]}>
                        <Select
                            placeholder="Select a Library"
                        >
                            {
                                libraryData?.map(li =>
                                    <Option key={li._id} value={li._id}>{li.libraryName}</Option>
                                )
                            }

                        </Select>
                    </Form.Item>

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
                            <Option value='librarian'>librarian</Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Set Librarian
                    </Button>
                </Form>
            </div>
        </Layout>
    );
};

export default AddLibrarian;