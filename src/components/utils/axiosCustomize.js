import axios from 'axios';
import store from "../../store/index";  

const instance = axios.create({
  baseURL: "http://localhost:8085/",
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
