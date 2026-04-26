import axios from "axios";

export const guestAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})