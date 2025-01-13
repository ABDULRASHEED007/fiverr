import axios from "axios";

const newRequest = axios.create({
    // baseURL: "http://localhost:8800/api/", withCredentials: true,
    baseURL: `https://fiverr-b3lzuxvee-abduls-projects-eae57996.vercel.app/api/`, withCredentials: true,
});

export default newRequest;