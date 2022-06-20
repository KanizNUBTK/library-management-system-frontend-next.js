import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import { message } from 'antd';

const UserDetails = ({ id }) => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (!!id) {
            const dataFetch = async () => {
                try {
                    const token = await Cookies.get('token');
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                    const res = await axios.get(`http://localhost:8080/user/get-user-by-id/${id}`, config)
                    setUserData(res.data.data)

                } catch (error) {
                    if (error.response.data.message) {
                        message.error(error.response.data.message);

                    } else {
                        message.warning("Failed, maybe you're not authorized!");
                    }
                }
            }
            dataFetch()
        }
    }, [id])


    return (
        <div >
            <p>First Name : {userData?.firstName}</p>
            <p>Last Name : {userData?.lastName}</p>
            <p>Email : {userData?.email}</p>
            <p>Designation : {userData?.role}</p>
            <p>Joined : {new Date(userData?.createdAt).toLocaleDateString()}</p>

        </div>
    );
};

export default UserDetails;