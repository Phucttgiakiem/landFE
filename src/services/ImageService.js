import axios from "axios";

export const getAllImage = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/ImageListing/getAllImage/${id}`);
    return res;
}