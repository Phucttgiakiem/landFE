import axios from "axios";
export const axiosJWT = axios.create();
export const getHome = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.URL_BACKEND}/home/get-all`,
      {
            headers: {
                authorization: `Bearer ${access_token}`,
            },
        }
    );
    console.log("res: ",res);
    return res;
}
export const getListingFilter = async (data) => {
   const res = await axios.get(`${process.env.URL_BACKEND}/home/get-listing-filter`,{
      params: {
        ...data,
      }
   });
   return res;
}
export const getListingRelated = async (data) => {
   // console.log("key: ",data);
    const res = await axios.get(`${process.env.URL_BACKEND}/home/get-listing-related`,
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
export const getPropertyofBroker = async (data) => {
    const res = await axios.get(
        `${process.env.URL_BACKEND}/home/getAllListingofbroder`,{
        params: {
          ...data,
        }
      }
    );
    return res.data;
}