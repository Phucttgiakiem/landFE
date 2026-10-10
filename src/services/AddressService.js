import axios from "axios";

export const getProvinces = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Address/getProvinces`);
    return res;
}

export const getCommunes = async (codeProvince) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Address/getCommune/${codeProvince}`);
    return res;
}