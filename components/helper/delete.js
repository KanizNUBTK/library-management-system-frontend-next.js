import axios from "axios";
import Cookies from 'js-cookie';

const deleteUser = async (id) => {
    console.log(id)
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.delete(`http://localhost:8080/user/delete/${id}`, config);

            if (response.data)
                return response.data;

        } catch (error) {
            return error.response.data
        }

    } else {
        return false
    }
}


const deleteLibrary = async (id) => {
    console.log(id)
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.delete(`http://localhost:8080/library/delete/${id}`, config);

            if (response.data)
                return response.data;

        } catch (error) {
            return error.response.data
        }

    } else {
        return false
    }
}

const deleteBooks = async (id) => {
    console.log(id)
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.delete(`http://localhost:8080/books/delete/${id}`, config);

            if (response.data)
                return response.data;

        } catch (error) {
            return error.response.data
        }

    } else {
        return false
    }
}
const deleteOnlineBooks = async (id) => {
    console.log(id)
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.delete(`http://localhost:8080/OnlineBooks/delete/${id}`, config);

            if (response.data)
                return response.data;

        } catch (error) {
            return error.response.data
        }

    } else {
        return false
    }
}


const deletePendingBookings = async (id) => {
    //console.log(id)
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.delete(`http://localhost:8080/bookings/delete/${id}`, config);

            if (response.data)
                return response.data;

        } catch (error) {
            return error.response.data
        }

    } else {
        return false
    }
}



const deleteAcceptedBooking = async (id) => {
    //console.log(id)
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.delete(`http://localhost:8080/CurrentlyBookings/delete/${id}`, config);

            if (response.data)
                return response.data;

        } catch (error) {
            return error.response.data
        }

    } else {
        return false
    }
}


const deleteReceivedBooking = async (id) => {
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const response = await axios.delete(`http://localhost:8080/receivedBooking/delete/${id}`, config);

            if (response.data)
                return response.data;

        } catch (error) {
            return error.response.data
        }

    } else {
        return false
    }
}


const deleteStudentFromClass = async (clsId, stdId) => {
    const token = await Cookies.get('token');
    if (token) {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const data = {
                students: stdId
            }
            const response = await axios.patch(`http://localhost:8080/api/class/delete-student-from-class/${clsId}`, data, config);

            if (response.data)
                return response.data;

        } catch (error) {
            return error.response.data
        }

    } else {
        return false
    }
}



export { 
    deleteUser, 
    deleteLibrary, 
    deleteBooks, 
    deleteOnlineBooks,
    deletePendingBookings, 
    deleteAcceptedBooking,
    deleteReceivedBooking,
    deleteStudentFromClass
 };