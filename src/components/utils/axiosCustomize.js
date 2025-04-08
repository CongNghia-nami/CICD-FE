import axios from 'axios';
import store from "../../store/index";  

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    let accessToken = state.user.accessToken; 

    if (!accessToken) {
      accessToken = localStorage.getItem('accessToken');  
    }

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;  
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

 export { instance };
