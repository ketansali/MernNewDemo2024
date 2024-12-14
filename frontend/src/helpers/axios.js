import axios from 'axios';
import { api } from '../config/urlConfig';


const axiosApi = axios.create({
    baseURL: api
});

const getTokenSilently = () =>{
    return localStorage.getItem('authToken');
}

axiosApi.interceptors.request.use(async (req)=>{
    const token = await getTokenSilently();
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default axiosApi;