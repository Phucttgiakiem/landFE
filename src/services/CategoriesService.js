import axios from "axios";

export const getCategory = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/catagory_property/getAll`);
    return res;
}
export const getAllCategoryforadmin = async (searchParams) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/catagory_property/getAllforadmin?${searchParams.toString()}`);
    return res;
}
export const getCategorywithtypelisting = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/catagory_property/getAllwithtype`,
        {
        params: {
          typelisting:data,
        }
    });
    return res;
}
export const createCategory = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/catagory_property/create`,data);
    return res.data;
}
export const updateCategory = async (id,data) => {
    const payload = {
        Name: data.name,
        NameSlug: data.friendlyURL,
        Type: data.typePost
    }
    const res = await axios.put(`${process.env.REACT_APP_URL_BACKEND}/catagory_property/update/${id}`,payload);
    return res.data;
}
export const deleteCategory = async (id) => {
    console.log("record_id: ",id);
    const res = await axios.delete(`${process.env.REACT_APP_URL_BACKEND}/catagory_property/delete/${id}`);
    return res.data;
}