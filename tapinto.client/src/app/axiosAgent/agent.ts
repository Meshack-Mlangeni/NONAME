import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../store/store";

axios.defaults.baseURL = "http://localhost:5169/api";
axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000; //Allow 30 second timeout

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async (response) => {
    return response;
}, (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, data: object) => axios.post(url, data).then(responseBody),
    put: (url: string, data: object) => axios.put(url, data).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const account = {
    login: (data: object) => requests.post('account/login', data),
    register: (data: object) => requests.post('account/register', data),
    currentUser: () => requests.get("account/currentUser")
}

const posts = {
    labels: () => requests.get('activity/getlabels'),
    posts: (data: object) => requests.put('activity/create', data),
}

export const agent = {
    account,
    posts
};