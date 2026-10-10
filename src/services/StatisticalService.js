import axios from "axios";

export const getdataStatisticalbytype = async (data) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Statistical/StatisticalbyType`,
        {
            params: {
                ...data,
            }
        });
    return res.data;
}
export const getAllowners = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Statistical/getAllowners`);
    return res.data
}