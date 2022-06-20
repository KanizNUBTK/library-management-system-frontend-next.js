import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie';
import swalAlert from '../alert';

const UploadPicture = () => {
    const [imageData, setImageData] = useState(null)
    const handleImage = (e) => {
        e.preventDefault();
        setImageData(e.target.files[0]);
    }
    const onSubmit = async data => {
        data.preventDefault();
        if (imageData) {
            try {
                const token = await Cookies.get('token');
                const formData = new FormData();
                formData.append('image', imageData);
                const config = {
                    headers: {
                        'content-type': 'multipart/from-data',
                        Authorization: `Bearer ${token}`
                    }
                }
                const res = await axios.patch(`http://localhost:8080/user/profile-image`, formData, config);
                if (res.data.status === true) {
                    swalAlert.success('Profile updated successFully!');
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }

            } catch (error) {
                swalAlert.error(error.response.data.message);
            }
        }
    }


    return (
        <div >
            <form onSubmit={onSubmit}>
                <input type="file" onChange={handleImage} id="image" className="block" />
                <small className="italic">Image size upto 500 KB</small>
                <button type="submit" className="block mt-3 bg-cyan-500 text-white px-4 py-2 rounded-lg font-semibold  cursor-pointer focus:translate-y-1 transition focus:shadow-xl" >Upload</button>
            </form>
        </div>
    );
};

export default UploadPicture;