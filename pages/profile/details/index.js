import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../../layout/index';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useUser } from '../../../context/userContext'
import UserProfileDetails from '../../../components/UserProfileDetails/index';


const ProfileDetails = () => {
    const { user } = useUser();
    const router = useRouter();
    const userId = router.query.id;

    useEffect(() => {

    }, [])


    return (
        <Layout >
            <UserProfileDetails userData={user} />
        </Layout>
    );
};

export default ProfileDetails;