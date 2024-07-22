

import axios from "axios";

export  const userInstance = axios.create({
  baseURL: "http://localhost:8080:/user/api/v1",
  withCredentials: true,
});
export  const notificationInstance = axios.create({
  baseURL: "http://localhost:8080:/notification/api/v1",
  withCredentials: true,
});
export  const authInstance = axios.create({
  baseURL: "http://localhost:8080:/auth/api/v1",
  withCredentials: true,
});
export  const bookingInstance = axios.create({
  baseURL: "http://localhost:8080:/booking/api/v1",
  withCredentials: true,
});
const instance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
  });
  
  export default instance;
  