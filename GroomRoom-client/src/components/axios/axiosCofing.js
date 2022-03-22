import axios from "axios";

export const Axios = axios.create({
    baseURL: "http://localhost:6060",
    withCredentials: true
})