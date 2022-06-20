import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import swalAlert from '../alert';


const PasswordResetRequest = ({ setIsModalVisible, setToggleLogin }) => {

    const onFinish = (values) => {
        async function sendEmail() {
            try {
                const res = await axios.post('http://localhost:8080/user/send-password-reset-email', values);

                if (res?.data?.status === true) {
                    await swalAlert.success(res.data.message, 5)
                    setIsModalVisible(false);
                    setToggleLogin(true)
                }

            } catch (error) {
                if (error?.response?.data?.message) {
                    swalAlert.success(error)
                } else {
                    swalAlert.success(error)
                }
            }
        }
        sendEmail()
    };


    return (
        <div>
            <Form
                name="email"
                onFinish={onFinish}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input valid email!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <div className='text-center'>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default PasswordResetRequest;