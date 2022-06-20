import React from 'react';
import { Form, Input, Button, Select, message, DatePicker } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import Layout from '../../../../layout';
import swalAlert from '../../../../components/alert';
import { useUser } from '../../../../context/userContext';
const { Option } = Select;

const EditCurrentlyBookings = () => {
    const router = useRouter();
    const { user } = useUser();
    const firstName = router.query.slug[0];
    const email = router.query.slug[1];
    const departmentName = router.query.slug[2];
    const bookTitle = router.query.slug[3];
    const authorName = router.query.slug[4];
    const pulisherName = router.query.slug[5];
    const startDate = router.query.slug[6];
    const endDate = router.query.slug[7];
    const state = router.query.slug[8];
    const bookId = router.query.slug[9];
    console.log(firstName, email, departmentName, bookTitle, authorName, pulisherName, startDate, endDate, bookId);
    const onSubmit = async (values) => {
        values.firstName = router.query.slug[0];
        values.email = router.query.slug[1];
        values.departmentName = router.query.slug[2];
        values.bookTitle = router.query.slug[3];
        values.authorName = router.query.slug[4];
        values.pulisherName = router.query.slug[5];
        values.libraryId = user.libraryId;
        // values.startDate = router.query.slug[6];
        // values.endDate = router.query.slug[7];
        console.log(values);
        try {
            const token = await Cookies.get('token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            const res = await axios.patch(`http://localhost:8080/bookings/update/${bookId}`, values, config);
            // const res = await axios.post(`http://localhost:8080/receivedBooking/create`, values, config);
            console.log('update booking=', res);
            if (res.data.status == true) {
                swalAlert.success(res.data.message);
                setTimeout(() => {
                    router.push('/librarian/booking/receiveFolder/receive')
                }, 2000);
            }

        } catch (error) {
            if (error.response.data.message) {
                swalAlert.error(error.response.data.message);

            } else {
                swalAlert.error("Failed, maybe you're not authorized!");
            }
        }
    }


    return (
        <Layout>
            <div className='bg-slate-300 h-auto p-0 m-0'>
                <h1 className='text-center pt-4 font-semibold text-lg text-cyan-800'>Update Currently Booking</h1>
                <div className='w-11/12 md:w-1/2 mx-auto mt-4 bg-slate-200 shadow-lg p-10 rounded-lg'>
                    <Form onFinish={onSubmit} layout='vertical'>
                        <Form.Item label='Member Name' name='firstName'>
                            <Input defaultValue={firstName} />
                        </Form.Item>
                        <div className='md:grid md:grid-cols-2 md:gap-1'>
                            <Form.Item label='Member Email' name='email'>
                                <Input defaultValue={email} />
                            </Form.Item>
                            <Form.Item label='Department Name' name='departmentName'>
                                <Input defaultValue={departmentName} />
                            </Form.Item>
                        </div>
                        <Form.Item label='Book Title' name='bookTitle'>
                            <Input defaultValue={bookTitle} />
                        </Form.Item>
                        <div className='md:grid md:grid-cols-2 md:gap-1'>
                            <Form.Item label='Author Name' name='authorName'>
                                <Input defaultValue={authorName} />
                            </Form.Item>
                            <Form.Item label='Publisher Name' name='pulisherName'>
                                <Input defaultValue={pulisherName} />
                            </Form.Item>
                        </div>
                        <div className='md:grid md:grid-cols-2 md:gap-1'>
                            <Form.Item label='Start Date' name='startDate'>
                                <DatePicker placeholder={startDate} />
                            </Form.Item>
                            <Form.Item label='End Date' name='endDate'>
                                <DatePicker placeholder={endDate} />
                            </Form.Item>
                        </div>
                        <Form.Item name="state" label="Current State" rules={[{ required: true, message: 'Please Select State' }]}>
                            <Select placeholder={state}>
                                <Option value='received'>Received</Option>
                            </Select>
                        </Form.Item>
                        <Button type='primary' htmlType='submit'>Update Currently Booking</Button>
                    </Form>
                </div>
            </div>
        </Layout>
    );
};
export default EditCurrentlyBookings;