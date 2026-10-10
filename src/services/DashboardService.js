import axios from "axios";

export const getDashboardoverviewSeller = async (Iduser) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Dashboard/seller/overview?iduser=${Iduser}`);
    return res;
}
export const getDashboardoverviewadmin = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Dashboard/admin/overview`);
    return res;
}
export const getDashboarduseroverview = async (Iduser) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/Dashboard/user/overview?iduser=${Iduser}`);
    return res;
}