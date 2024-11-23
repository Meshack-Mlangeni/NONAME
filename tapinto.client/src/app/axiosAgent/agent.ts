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
});

axios.interceptors.response.use(async (response) => {
    return response;
}, (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error.response);
});

const requests = {
    get: <T>(url: string, params?: URLSearchParams) => axios.get<T>(url, { params }).then(responseBody),
    post: <T>(url: string, data: object) => axios.post<T>(url, data).then(responseBody),
    post_form: <T>(url: string, data: object) => axios.post<T>(url, data,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(responseBody),
    put: <T>(url: string, data: object) => axios.put<T>(url, data).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const account = {
    login: <T>(data: object) => requests.post<T>("account/login", data),
    register: <T>(data: object) => requests.post<T>("account/register", data),
    currentUser: <T>() => requests.get<T>("account/currentUser")
};

const activity = {
    create: <T>(data: object) => requests.post_form<T>("activity/create", data),
    getallactivity: <T>(skip: number) => requests.get<T>(`activity/getall?skip=${skip}`),
    getactivity: <T>(id: number) => requests.get<T>(`activity/getsingleactivity?activityId=${id}`),
    like_activity: <T>(id: number) => requests.post<T>(`activity/likeactivity?id=${id}`, {}),
    comment: <T>(data: object) => requests.put<T>("activity/comment", data),
    getallactivitycomments: <T>(id: number) => requests.get<T>(`activity/getcomments?id=${id}`),
    getallactivitychats: <T>(id: number) => requests.get<T>(`activity/getchathistory?activityId=${id}`),
};
const group = {
    create: <T>(data: object) => requests.put<T>("group/creategroup", data),
    getallschoolgroups: <T>() => requests.get<T>("group/getallgroups"),
    joinorexitgroup: <T>(groupId: number, action: string) => requests.put<T>(`group/joinexitgroup?groupId=${groupId}&action=${action}`, {})
}
const school = {
    getallschools: <T>() => requests.get<T>("school/getallschools"),
};

export const agent = {
    account,
    activity,
    school,
    group
};