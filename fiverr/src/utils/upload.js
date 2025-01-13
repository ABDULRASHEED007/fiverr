import axios from "axios";



const upload = async (file) => {
    let formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "fiverr");

    try {
        const res = await axios.post("https://api.cloudinary.com/v1_1/dazqpizt4/image/upload", formData);
        const { url } = res.data;
        return url;

    } catch (error) {
        console.log(error)
    }


};

export default upload;