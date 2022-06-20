import React from 'react';
import Layout from '../../../layout';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import swalAlert from '../../../components/alert';


const Registration = () => {
    const router = useRouter();
    const token = Cookies.get('token');

    const onFinish = async (values) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.post(`http://localhost:8080/library/registration`, values, config)

            if (response.data) {
                setTimeout(() => {
                    router.push('/admin');
                    swalAlert.success("library added successfully")
                }, 2700);
            }

        } catch (error) {
            console.log(error)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <Layout>
            <h1 className='text-center font-semibold text-lg mt-4 text-green-600'>Register New Library</h1>

            <div className='m-auto bg-green-200 rounded-lg p-10 shadow-md font-semibold' style={{ width: '60%' }}>
                <Form
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Library Name"
                        name="libraryName"
                        rules={[
                            {
                                required: true,
                                message: 'Please Input Library Name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Institution Name"
                        name="institutionName"
                        rules={[
                            {
                                required: true,
                                message: 'Please Input Institution Name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="libraryEmail"
                        rules={[
                            {
                                required: true,
                                message: 'Please Input Libray Email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                </Form>
            </div>
        </Layout>
    );
};

export default Registration;