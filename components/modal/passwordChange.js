import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import Cookies from 'js-cookie';
import swalAlert from '../alert';


const PasswordChange = ({ setIsModalVisible }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        //console.log(values)
        try {
            const token = await Cookies.get('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }

            const res = await axios.patch('http://localhost:8080/user/change-password', values, config)

            if (res.data.status === true) {
                swalAlert.success("Password Change Successfully")
                setTimeout(() => {
                    setIsModalVisible(false)   // for modal close
                    form.resetFields()
                }, 3000);
            }

        } catch (error) {
            swalAlert.error(error.response.data.message);
        }
    };


    return (
        <div className=''>
            <Form
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout='vertical'
                form={form} name="control-hooks"
            >
                <Form.Item
                    label="Current Password"
                    name="currentPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Current Password!',
                        },
                    ]}
                >
                    <Input.Password placeholder='Enter current password' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Password!',
                        },
                        {
                            min: 6,
                            message: "Minimum 6 character needed!"
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder='Password' />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: 'Please Input Confirm Password!',
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
                    <Input.Password placeholder='Enter password again' />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Change Password
                </Button>

            </Form>
        </div>
    );
};

export default PasswordChange;