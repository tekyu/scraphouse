import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_ADDRESS,
  proxy: false,
  crossDomain: true
});
export { axiosInstance as axios };
