import { Form, Input, Button, Checkbox, Modal } from "antd";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import swalAlert from "../components/alert";
import PasswordResetRequest from "../components/modal/passwordResetRequest";
import { useState } from "react";

const Login = () => {
    const [toggleLogin, setToggleLogin] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const router = useRouter();

    const onFinish = async (values) => {
        try {

            const res = await axios.post(
                "http://localhost:8080/user/login",
                values
            );

            if (res.data.token) {
                Cookies.set("token", res.data.token);
                console.log(res.data);
                await swalAlert.success("login successfully")
                router.push("/");
            } else {
                router.push("/login");
            }

        } catch (error) {
            console.log(error);
            await swalAlert.error(error);
        }
    };
    const handleResetPassword = () => {
        setToggleLogin(false)
        setIsModalVisible(true);
    }
    const handleCancel = () => {
        setIsModalVisible(false);
        setToggleLogin(true)
    };

    return (
        <div className="bg-[url('../public/images/signup.jpg')] ">
            <div className="relative min-h-screen flex items-center  justify-center py-12 px-4 sm:px-6 lg:px-8 relative items-center">
                <div className="absolute opacity-60 inset-0 z-0"></div>
                <div className="max-w-md w-full space-y-8 p-10 bg-gray-400 bg-opacity-75 rounded-xl z-10">
                    <div>
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back!</h2>
                            <p className="mt-2 text-sm font-semibold text-gray-900">
                                Please sign in to your account
                            </p>
                        </div>
                    </div>
                    <div>
                        <Form
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={{
                                remember: true,
                            }}
                        >
                            <Form.Item
                                name="email"
                                rules={[{
                                    required: true,
                                    message: "Please input your Password!",
                                },
                                ]}
                                label={<label className="font-semibold theme-font-color">Email</label>}
                            >
                                <input className="shadow-lg rounded appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{
                                    required: true,
                                    message: "Please input your Password!",
                                },
                                ]}
                                label={<label className="font-semibold theme-font-color">Password</label>}
                            >
                                <Input.Password className="shadow-lg rounded appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="text-white bg-gray-900 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-14 py-2.5 text-center mr-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
                                >
                                    Log in
                                </Button>
                            </Form.Item>

                        </Form>
                        <p className="text-white font-semibold">Forgot your password? <span onClick={handleResetPassword} className="underline cursor-pointer font-bold text-green-300 hover:text-xl hover:text-green-900">Click</span></p>
                    </div>
                </div>
                <Modal title="Request For Resetting Password" visible={isModalVisible} footer={null} onCancel={handleCancel} >
                    <PasswordResetRequest setIsModalVisible={setIsModalVisible} setToggleLogin={setToggleLogin} />
                </Modal>
            </div>
        </div>
    );
};

export default Login;
