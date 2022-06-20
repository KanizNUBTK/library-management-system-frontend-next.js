import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import { useUser } from '../../../context/userContext';
import Layout from '../../../layout';
import swalAlert from '../../../components/alert';


const EditOnlineBooks = () => {
    const router = useRouter();
    const { user } = useUser();
    const bookTitle = router.query.slug[0];
    const authorName = router.query.slug[1];
    const pulisherName = router.query.slug[2];
    const type = router.query.slug[3];
    const link = router.query.slug[4];
    const bookId = router.query.slug[5];
    console.log(bookTitle, authorName, pulisherName, type, link, bookId);
    const onSubmit = async (values) => {
        try {
            const token = await Cookies.get('token');
            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
            const res = await axios.patch(`http://localhost:8080/OnlineBooks/update/${bookId}`, values, config);
            if (res.data.status == true) {
                swalAlert.success(res.data.message);
                setTimeout(() => {
                    router.push('/librarian/books/view-books')
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
            <div className='bg-slate-300 h-screen p-0 m-0'>
                <h1 className='text-center pt-6 font-semibold text-lg text-cyan-800'>Update Online Book</h1>
                <div className='w-11/12 md:w-1/2 mx-auto mt-8 bg-slate-200 shadow-lg p-10 rounded-lg'>
                    <Form onFinish={onSubmit} layout='vertical'>

                        <Form.Item label='Book Title' name="bookTitle" hasFeedback>
                            <Input placeholder={bookTitle} />
                        </Form.Item>
                        <div className='md:grid md:grid-cols-2 md:gap-1'>
                            <Form.Item label='Author Name' name="authorName" hasFeedback>
                                <Input placeholder={authorName} />
                            </Form.Item>
                            <Form.Item label='Publisher Name' name="pulisherName" hasFeedback>
                                <Input placeholder={pulisherName} />
                            </Form.Item>
                        </div>
                        <Form.Item label='Type' name="type" hasFeedback>
                            <Input placeholder={type} />
                        </Form.Item>
                        <Form.Item label='Drive Link' name="link">
                            <Input placeholder={link} />
                        </Form.Item>
                        <Button type='primary' htmlType='submit'>Update</Button>
                    </Form>
                </div>
            </div>
        </Layout>
    );
};

export default EditOnlineBooks;