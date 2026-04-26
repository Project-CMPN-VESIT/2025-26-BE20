import axios from "axios";
import {  getCookie } from "../utils/cookie-helper";
import { LONG_LIVE_TOKEN } from "../constants/constants";


const authAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: "application/json",
    }
})

authAxios.interceptors.request.use(function(config) {
    // Do something before request is sent.
    const token = getCookie(LONG_LIVE_TOKEN);
    console.log("token", token)
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});


export default authAxios;