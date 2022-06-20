import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
import axios from 'axios'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import Layout from '../../../layout';
import swalAlert from '../../../components/alert';
import { useUser } from '../../../context/userContext';


const Edit = () => {
    const router = useRouter();
    const userId = router.query.id;
    const [userData, setUserData] = useState({})
    const token = Cookies.get('token');
    const { user } = useUser();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        values.libraryId = user?.libraryId._id
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.put(`http://localhost:8080/user/update/${userId}`, values, config)
            if (response.data) {
                swalAlert.success("Update Successful!")
                router.push('/librarian/member/view-all')
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (!!userId) {
            const getOneUserData = async () => {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                    const response = await axios.get(`http://localhost:8080/user/get-user-by-id/${userId}`, config);
                    console.log(response.data.data)
                    setUserData(response.data.data)

                } catch (error) {
                    console.log(error.response.data)
                }
            }
            getOneUserData()
        }
    }, [token, userId])

    useEffect(() => {
        if (!!user) {
            form.setFieldsValue({
                libraryId: user?.libraryId?._id
            })
        }

    }, [user])
    return (
        <Layout>
            <h1 className='text-center font-semibold text-lg mt-4 text-blue-600'>Update User Information</h1>
            <div className='flex justify-around'>
                <h2 className='font-semibold text-lg text-cyan-600'>Library Name: {userData.libraryId?.libraryName}</h2>
                <h2 className='font-semibold text-lg text-cyan-600'>Institution Name: {userData.libraryId?.institutionName}</h2>
            </div>
            <div className='m-auto bg-sky-100 rounded-lg p-10 shadow-md font-semibold' style={{ width: '60%', height: 'auto' }}>
                <Form onFinish={onFinish} layout='vertical'>

                    <div className='grid grid-cols-2 gap-1'>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                        >
                            <Input placeholder={userData.firstName} />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastName"
                        >
                            <Input placeholder={userData.lastName} />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input placeholder={userData.email} />
                    </Form.Item>
                    <div className='grid grid-cols-2 gap-1'>
                        <Form.Item
                            label="Department Name"
                            name="departmentName"
                        >
                            <Input placeholder={userData.departmentName} />
                        </Form.Item>
                        <Form.Item name="role" label="Designation" rules={[{ required: true, message: 'Please Select Role' }]}>
                            <Select placeholder={userData.role}>
                                <Option value='admin'>Admin</Option>
                                <Option value='librarian'>Librarian</Option>
                                <Option value='teacher'>Teacher</Option>
                                <Option value='member'>Member</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>

            </div>
        </Layout>
    );
};

export default Edit;