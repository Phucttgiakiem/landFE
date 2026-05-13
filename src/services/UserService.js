import axios from "axios";
import axiosJWT from "./axiosJWT";


export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/sign-in`,data);
    return res.data;
}
export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/sign-up`,data);
    return res.data;
}
export const getDetailsUser = async (id) => {
    const res = await axiosJWT.get(`/user/get-details/${id}`);
    return res.data;
}
export const updateUser = async (id,data,access_token) => {
    const res = await axiosJWT.put(`/user/update-user/${id}`,data,{
        headers: {
            authorization: `Bearer ${access_token}`,
        }
    });
    return res.data;
}
export const changePassword = async (id,data,access_token) => {
    const res = await axiosJWT.put(`/user/change-password/${id}`,data,{
        headers: {
            authorization: `Bearer ${access_token}`,
        }
    });
    return res.data;
}
export const refreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/refresh-token`,{
        withCredentials: true
    });
    return res.data;
}

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/log-out`);
    return res.data;
}