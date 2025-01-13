import axios from "axios";

const newRequest = axios.create({
    baseURL: "http://localhost:8800/api/", withCredentials: true,
    // baseURL: `${process.env.REACT_APP_BACK_END_URL}/api/`, withCredentials: true,
});

export default newRequest;