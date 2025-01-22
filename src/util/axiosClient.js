import axios from "axios";

var isPrd = true;

const axiosClient = axios.create({
    baseURL: isPrd ? 'https://engfuel.com' : 'https://localhost:7144',
    // Include credentials (cookies)
    withCredentials: true,
  withCredentials: true,
});

export default axiosClient;