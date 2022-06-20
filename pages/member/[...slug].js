import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Layout from '../../layout';
import swalAlert from '../../components/alert';
import 'moment/locale/zh-cn';
import { useUser } from '../../context/userContext';

const BookingBook = () => {
    const { user } = useUser()
    const router = useRouter();
    const bookTitle = router.query.slug[0];
    const authorName = router.query.slug[1];
    const pulisherName = router.query.slug[2];
    const type = router.query.slug[4];
    const bookId = router.query.slug[5];
    //console.log(user);
    //console.log(bookTitle, authorName, pulisherName, description, type, bookId);
    const onSubmit = async (values) => {
        values.firstName=user.firstName;
        values.lastName=user.lastName;
        values.departmentName=user.departmentName;
        values.email=user.email;
        values.libraryId = user.libraryId?._id;
        values.bookTitle = router.query.slug[0] + " ";
        values.authorName = router.query.slug[1] + " ";
        values.pulisherName = router.query.slug[2] + " ";
        values.description = router.query.slug[3] + " ";
        values.type = router.query.slug[4] + " ";
        values.state = "pending";
        console.log(values);
        try {
            const token = await Cookies.get('token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            const res = await axios.post(`http://localhost:8080/bookings/create`, values, config);
            console.log(res);
            if (res.data.status == true) {
                swalAlert.success(res.data.message);
                setTimeout(() => {
                    router.push('/member')
                }, 2000);
            }

        } catch (error) {
            if (error.response.data.message) {
                swalAlert.error(error.response.data.message);
                console.log(error.response.data);

            } else {
                swalAlert.error("Failed, maybe you're not authorized!");
            }
        }
    }


    return (
        <Layout>
            <div className='bg-slate-300 h-auto p-0 m-0'>
                <h1 className='text-center pt-6 font-semibold text-lg text-cyan-800'>Booking</h1>
                <div className='w-11/12 md:w-1/2 mx-auto mt-8 bg-slate-200 shadow-lg p-10 rounded-lg'>
                    <Form onFinish={onSubmit} layout='vertical'>
                        <div className='md:grid md:grid-cols-2 md:gap-1'>
                            <Form.Item label='Member First Name' name="firstName">
                                <Input defaultValue={user.firstName} />
                            </Form.Item>
                            <Form.Item label='Member Last Name' name="lastName">
                                <Input defaultValue={user.lastName} />
                            </Form.Item>
                        </div>
                        <div className='md:grid md:grid-cols-2 md:gap-1'>
                            <Form.Item label='Member Email' name="email">
                                <Input defaultValue={user.email} />
                            </Form.Item>
                            <Form.Item label='Member Department Name' name="departmentName">
                                <Input defaultValue={user.departmentName} />
                            </Form.Item>
                        </div>
                        <Form.Item label='Book Title' name="bookTitle">
                            <Input defaultValue={bookTitle} />
                        </Form.Item>
                        <div className='md:grid md:grid-cols-2 md:gap-1'>
                            <Form.Item label='Author Name' name="authorName">
                                <Input defaultValue={authorName} />
                            </Form.Item>
                            <Form.Item label='Publisher Name' name="pulisherName">
                                <Input defaultValue={pulisherName} />
                            </Form.Item>
                        </div>
                        <Form.Item label='Book Type' name='type'>
                            <Input defaultValue={type} />
                        </Form.Item>
                        <div className='md:grid md:grid-cols-2 md:gap-1'>
                            <Form.Item label='Start Date' name="startDate">
                                <DatePicker />
                            </Form.Item>
                            <Form.Item label='End Date' name="endDate">
                                <DatePicker />
                            </Form.Item>
                        </div>
                        <Button type='primary' htmlType='submit'>Booking</Button>
                    </Form>
                </div>
            </div>
        </Layout>
    );
};

export default BookingBook;