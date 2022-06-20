import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios'
import Cookies from 'js-cookie';
import Layout from '../../../../layout';
import { useRouter } from 'next/router'
import swalAlert from '../../../../components/alert';

const Edit = () => {
    const [libraryData, setLibraryData] = useState({})
    const router = useRouter();
    const libraryId = router.query.id;
    const token = Cookies.get('token');

    const onFinish = async (values) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.patch(`http://localhost:8080/library/update/${libraryId}`, values, config)

            if (response.data) {
                swalAlert.success("Update Successful!");
                setTimeout(() => {
                    router.push('/admin')
                }, 2700);
            }

        } catch (error) {
            swalAlert.error(error.response.data.message);
        }
    };


    useEffect(() => {
        if (!!libraryId) {
            const schoolGet = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/library/${libraryId}`);
                    console.log(response.data);
                    setLibraryData(response.data.library)

                } catch (error) {
                    console.log(error.response.data)
                }
            }
            schoolGet()
        }

    }, [libraryId])


    return (
        <Layout>
            <h1 className='text-center font-semibold text-2xl mt-4 text-cyan-600'>Update Library Information</h1>

            <div className='m-auto bg-blue-200 rounded-lg p-10 shadow-md font-semibold' style={{ width: '60%' }}>
                <Form
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Form.Item
                        label="Library Name"
                        name="libraryName"
                    >
                        <Input placeholder={libraryData?.libraryName} />
                    </Form.Item>

                    <Form.Item
                        label="Library Email"
                        name="libraryEmail"
                    >
                        <Input type='number' placeholder={libraryData?.libraryEmail} />
                    </Form.Item>

                    <Form.Item
                        label="Institution Name"
                        name="institutionName"
                    >
                        <Input placeholder={libraryData?.institutionName} />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                </Form>
            </div>
        </Layout>
    );
};

export default Edit;