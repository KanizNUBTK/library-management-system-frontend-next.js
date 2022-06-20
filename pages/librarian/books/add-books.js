import React, { useState, useEffect } from 'react';
import Layout from '../../../layout/index';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { useUser } from '../../../context/userContext';
import swalAlert from '../../../components/alert/index';

const BooksAdd = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const { user } = useUser();
    console.log(user.libraryId);
    const onFinish = async (values) => {
        values.libraryId = user?.libraryId._id;
        async function createBooks() {
            try {
                const token = await Cookies.get('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const response = await axios.post('http://localhost:8080/books/create', values, config);
                console.log(response);
                if (response.data) {
                    swalAlert.success("Books added successfully")
                    setTimeout(() => {
                        router.push('/librarian/books/view-books')
                    }, 2700);
                }

            } catch (error) {
                console.log(error);
                swalAlert.error(error);
            }
        }
        createBooks()
    };
    useEffect(() => {
        if (!!user) {
            form.setFieldsValue({
                libraryId: user?.libraryId?._id
            })
        }

    }, [user])

    return (
        <Layout>
            <div className='bg-slate-300 h-screen rounded-md p-0 m-0'>
                <h1 className='text-center py-4 font-semibold text-lg text-cyan-800'>Add A New Book</h1>
                <div className='m-auto bg-slate-200 rounded-lg p-10 shadow-lg font-semibold md:w-3/5 h-auto'>
                    <Form
                        onFinish={onFinish}
                        layout='vertical'
                        form={form}
                        initialValues={{
                            remember: true,
                        }}
                        name="control-hooks"
                    >
                        {/* <Form.Item
                            label="Library Name"
                            name="library"
                        >
                            <input defaultValue={user.libraryId?._id} />
                        </Form.Item> */}
                        <Form.Item
                            label="Book Tittle"
                            name="bookTitle"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Book Title!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <div className='md:grid md:grid-cols-2 md:gap-1'>
                            <Form.Item
                                label="Author Name"
                                name="authorName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Input Author Name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Publisher Name"
                                name="pulisherName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Input Publisher Name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Type"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Input Type!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Quantity"
                                name="quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Input Quantity!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <Form.Item
                            label="Discription"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Input Description!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add book
                        </Button>
                    </Form>
                </div>
            </div>
        </Layout>
    );
};

export default BooksAdd;