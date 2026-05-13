import axios from "axios";

export const axiosJWT = axios.create();
export const createListing = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/Listing/create-listing`,data);
    return res;
}
export const updateListing = async (id,data) => {
    //console.log(Object.fromEntries(data.entries()));
    //const dt = Object.fromEntries(data.entries());
    const res = await axios.put(`${process.env.REACT_APP_URL_BACKEND}/Listing/update-listing/${id}`,data);
   // console.log("res",res);
    return res;
}
export const softDeleteListing = async (data) => {
   // console.log("data",data);
    const res = await axios.patch(`${process.env.REACT_APP_URL_BACKEND}/Listing/softdelete-listing`,data);
    return res;
}
export const restoreListing = async (data) => {
    const res = await axios.patch(`${process.env.REACT_APP_URL_BACKEND}/Listing/restore-listing`,data);
    return res;
}
export const hardDeleteListing = async (data) => {
    const res = await axios.delete(`${process.env.REACT_APP_URL_BACKEND}/Listing/delete-listing`,{data});
    return res;
}
export const getAllmeListing = async (searchParams)=> {
    const res = await axios.get(
        `${process.env.REACT_APP_URL_BACKEND}/Listing/me/getAll?${searchParams.toString()}`);
    return res;
}
export const getAllDeletedListing = async (searchParams) => {
    const res = await axios.get(
        `${process.env.REACT_APP_URL_BACKEND}/Listing/me/getAllDeleted?${searchParams.toString()}`);
    return res;
}
export const getListing = async (idlist) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Listing/get-detail/${idlist}`);
    return res;
}