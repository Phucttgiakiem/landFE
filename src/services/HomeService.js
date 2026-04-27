import axios from "axios";

export const getHome = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/home/get-all`);
    return res;
}
export const getListingFilter = async (data) => {
   const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/home/get-listing-filter`,{
      params: {
        ...data,
      }
   });
   return res;
}
export const getListingRelated = async (data) => {
   // console.log("key: ",data);
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/home/get-listing-related`,
      {
        params: {
          ...data,
        }
      }
    );
  return res;
}
export const getArea = async () => {
    const res = await axios.get(
    "https://production.cas.so/address-kit/2025-07-01/communes"
  );
  const data = res.data;

  let communesCache = data.communes; 
  return communesCache;
}