import axios from "axios";

export const getAllImage = async (id) => {
    const res = await axios.get(`${process.env.URL_BACKEND}/ImageListing/getAllImage/${id}`);
    return res;
}