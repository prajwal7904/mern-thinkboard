import axios from "axios";

const BASE_URL = import.meta.env.MODE ==="development"?"http://localhost:5000/api":"https://mern-thinkboard-12-l8u8.onrender.com/api"
const api = axios.create({
    baseURL:BASE_URL,
})
export default api<p></p>