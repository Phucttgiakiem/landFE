import axios from "axios";

export const getCategory = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/catagory_property/getAll`);
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