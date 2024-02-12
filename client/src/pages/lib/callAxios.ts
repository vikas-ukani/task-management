import axios from 'axios'

const callAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
})

// instance.defaults.headers.common['Authorization'] = 

export default callAxios