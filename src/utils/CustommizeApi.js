import axios from "axios";
import NProgress from 'nprogress';
// import { store } from '../redux/Store';


const instance = axios.create({
    baseURL: 'http://localhost:3000',
});

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100,
    // easing: 'ease',
    // speed: 500,
    // trickleRate: 0.5,
    // easing: 'ease',
    // speed: 200,
    // trickle: true,
    // trickleRate: 0.02
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    NProgress.start();
    // const token = store?.getState()?.account?.account?.data;
    // config.headers['Authorization'] = `Bearer ${token}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done();
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    //return Promise.reject(error);
    NProgress.done();
    if (error.response.status === 401) {
        //(`unauthorized :)`);
        //localStorage.removeItem("persist:root");
        //removeLocalStorageToken
        // window.location.href = "/login";
        // toast.error('User Name Or Password Not Correct')
        return;
    }
    return Promise.reject(error);
});
export default instance;