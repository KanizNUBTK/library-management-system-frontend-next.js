import { Form, Input, Button, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import swalAlert from "../components/alert";

const Signup = () => {
    const router = useRouter();

    const onFinish = async (values) => {
        try {
            const res = await axios.post(
                "http://localhost:8080/user/signup",
                values
            );

            if (res.data.token) {
                Cookies.set("token", res.data.token);
                await swalAlert.success("Welcome To Our Library....");
                router.push("/");
            } else {
                router.push("/login");
            }

        } catch (error) {
            console.log(error);
            await swalAlert.error(error);
        }
    };

    return (
        <div className="relative md:h-screen flex items-center justify-center bg-[url('../public/images/signup.jpg')] py-12 px-4 sm:px-6 lg:px-8 bg-gray-300 bg-no-repeat bg-cover relative items-center bg-img">
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className=" md:w-3/5 md:space-y-4 md:place-content-between py-6 px-10 bg-black rounded-xl z-10">
                <div className="md:w-3/5 md:p-10 bg-red-50">
                    <Form
                        onFinish={onFinish}
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <Form.Item
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter First Name",
                                },
                            ]}
                            label={
                                <label className="theme-font-color">
                                    First Name
                                </label>
                            }
                        >
                            <input className="shadow appearance-none border w-full py-2 px-3 text-gray-700 md:mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter Last Name",
                                },
                            ]}
                            label={
                                <label className="theme-font-color">
                                    Last Name
                                </label>
                            }
                        >
                            <input className="shadow appearance-none border w-full py-2 px-3 text-gray-700 md:mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter Your Email",
                                },
                            ]}
                            label={
                                <label className="theme-font-color">
                                    Email
                                </label>
                            }
                        >
                            <input className="shadow appearance-none border w-full py-2 px-3 text-gray-700 md:mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </Form.Item>
                        <Form.Item
                            name="role"
                            rules={[
                                {
                                    required: true,
                                    message: "Enter Your Email",
                                },
                            ]}
                            label={
                                <label className="theme-font-color">
                                    role
                                </label>
                            }
                        >
                            <input className="shadow appearance-none border w-full py-2 px-3 text-gray-700 md:mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            type="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                            ]}
                            label={
                                <label className="theme-font-color">
                                    Password
                                </label>
                            }
                        >
                            <Input.Password className="shadow appearance-none border w-full py-2 px-3 text-gray-900 md:mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            type="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please comfirm your Password!",
                                },
                            ]}
                            label={
                                <label className="theme-font-color">
                                    Comfirm Password
                                </label>
                            }
                        >
                            <Input.Password className="shadow appearance-none border w-full py-2 px-3 text-gray-700 md:mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Sign up
                            </Button>
                        </Form.Item>
                    </Form>
                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                        <span>Already have an account?</span>
                        <Link href="login">
                            <span className="text-indigo-500 hover:text-indigo-500no-underline hover:underline cursor-pointer transition ease-in duration-300">
                                {" "}
                                Sign in
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
