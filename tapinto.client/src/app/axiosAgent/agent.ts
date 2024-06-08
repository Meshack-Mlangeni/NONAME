import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5169/api";
axios.defaults.withCredentials = true;
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    return config;
})

axios.interceptors.response.use(async (response) => {
    return response;
}, (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, data: object) => axios.post(url, data).then(responseBody),
    put: (url: string, data: object) => axios.put(url, data).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const account = {
    login: (data: object) => requests.post('account/login', data),
    register: (data: object) => requests.post('account/register', data)
}

export const agent = {
    account
};