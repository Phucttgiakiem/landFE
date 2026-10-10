import axios from "axios";
import axiosJWT from "./axiosJWT";
export const createListing = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/Listing/create-listing`,data);
    return res;
}
export const updateListing = async (id,data,access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_URL_BACKEND}/Listing/update-listing/${id}`,data,{
        headers: {
            authorization: `Bearer ${access_token}`,
        }
    });
    return res;
}
export const softDeleteListing = async (data) => {
    const {arrid,typedelete,token,id} = data; 
    const res = await axiosJWT.patch(`${process.env.REACT_APP_URL_BACKEND}/Listing/softdelete-listing/${id}`,{
        arrid: arrid,
        typedelete:typedelete
    },{
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
    return res;
}
export const restoreListing = async (data) => {
    const {arrid,id,token} = data;
    const res = await axiosJWT.patch(`${process.env.REACT_APP_URL_BACKEND}/Listing/restore-listing/${id}`,arrid,{
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
    return res;
}
export const hardDeleteListing = async (data) => {
    const {arrid,id,token,typedelete} = data
    console.log("arr: ",arrid);
    const res = await axiosJWT.delete(`${process.env.REACT_APP_URL_BACKEND}/Listing/delete-listing/${id}`,{
        data: {
            arrid,
            typedelete
        },
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
    return res;
}
export const getAllmeListing = async (searchParams)=> {
    
    const res = await axios.get(
        `${process.env.REACT_APP_URL_BACKEND}/Listing/me/getAll?${searchParams.toString()}`);
    return res;
}
export const getAllDeletedListing = async (searchParams,id,access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_URL_BACKEND}/Listing/me/getAllDeleted/${id}?${searchParams.toString()}`,{
            headers: {
                authorization: `Bearer ${access_token}`,
            }
        });
    return res;
}
export const getListing = async (idlist) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Listing/get-detail/${idlist}`);
    return res;
}
export const getSuggestionsSearch = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Listing/searchpropery`,{
            params: {
                ...data,
            }
        })
    return res.data;
}