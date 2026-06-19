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
export const getDetailUserforAdmin = async (id,access_token) => {
    const res = await axiosJWT.get(`/user/get-detailUser/${id}`,{
        headers: {
            authorization: `Bearer ${access_token}`,
        }});
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
export const changePassword = async (data) => {
    const res = await axiosJWT.put(`/user/change-password/${data.id}`,data,{
        headers: {
            authorization: `Bearer ${data.access_token}`,
        }
    });
    return res.data;
}
export const forgotpass = async (data) => {
    console.log(data);
    const res = await axios.put(`${process.env.REACT_APP_URL_BACKEND}/user/resetpassword-user`,data);
    return res.data;
}
export const getAllClient = async (access_token,data) => {
    const res = await axiosJWT.get(`/user/getAll`,{
        params: {
            ...data,
        }
    },{
        headers: {
            authorization: `Bearer ${access_token}`,
        }
    });
    return res.data;
}
export const getAllowner= async (access_token) => {
    const res = await axiosJWT.get(`/user/getAllowner`,{
        headers: {
            authorization: `Bearer ${access_token}`,
        }
    })
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

export const authenemail = async (data) => {
    console.log(data);
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/resend-verification-email`,data);
    return res.data; 
}

export const verifyEmail = async (token) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/user/verify-email?token=${token}`);
    return res.data;
}