import axios from "axios";
import axiosJWT from "./axiosJWT";
export const getinfoforCreatecontract = async(iduser) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Contract/getInfoforContract?iduser=${iduser}`);
    return res;
}
export const createContract = async (data) => {
    const idowner = data.userid;
    const access_token = data.token;
    const data2 = {...data.formdata}
    const res = await axiosJWT.post(`/Contract/createContract/${idowner}`,data2,{
        headers: {
            authorization: `Bearer ${access_token}`,
        }
    });
    return res.data;
}
export const getAllContract = async (searchParams,user,role) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Contract/getAllContract?${searchParams.toString()}&user=${user}&role=${role}`);
    //console.log("data: ",res.data);
    return res.data;
}
export const getContractById = async (idcontract,iduser) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Contract/getContractById/${idcontract}?iduser=${iduser}`);
    return res.data;
}
export const getContractByIdnotiduser = async (idcontract) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Contract/getContractByIdnotiduser/${idcontract}`);
    return res.data;
}
export const updateContract = async (data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_URL_BACKEND}/Contract/updateContract`,data,{
        headers:{
            authorization: `Bearer ${data.token}`,
        }
    });
    return res.data;
}