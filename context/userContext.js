import { useContext, createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'
import axios from 'axios';
import { Spin } from 'antd';

const UserContext = createContext({ user: undefined });

export function UserContextProvider(props) {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({})
    const router = useRouter()

    const verify = async () => {
        const token = await Cookies.get('token');
        // fetch user data by sending token, or use jwt-decode
        if (token) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                const response = await axios.get('http://localhost:8080/user', config);
                console.log(response.data)
                setUser(response.data.user);
                setAuthenticated(true);
                return response.data.user;
            } catch (error) {
                Cookies.remove('token')
                console.log(error)
                router.push('/login');
            }
        } else {
            router.push('/login');
        }
    }
    const logout = () => {
        if (authenticated) <Spin />
        setAuthenticated(false)
        Cookies.remove('token')
        router.push('/login')
    }
    useEffect(() => {
        if (authenticated === false) {
            verify()
        }
    }, [])
    return (
        <UserContext.Provider value={{ user, logout, verify }}>
            {props.children}
        </UserContext.Provider>
    )
}
export const useUser = () => {
    return useContext(UserContext);
}