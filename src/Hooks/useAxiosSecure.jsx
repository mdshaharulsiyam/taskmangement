import axios from 'axios'
import React from 'react'
const axiosecure = axios.create({
    baseURL: 'https://task-management-server-six-liard.vercel.app',
    // baseURL: 'http://localhost:5000',
    withCredentials: true,
})
const useAxiosSecure = () => {
    return axiosecure
}

export default useAxiosSecure
