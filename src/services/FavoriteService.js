import axiosJWT from "./axiosJWT";
export const createnewFavorite = async (data,Idproperty) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_URL_BACKEND}/Favorite/create-newfavorite`,
        {
            id:data.id,
            IdListing: Idproperty   // 👈 phải là object
        },{
            headers: {
                authorization: `Bearer ${data.access_Token}`,
            }
        
    });
    return res
}
export const deleteFavoriteofuser = async (data,Id) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_URL_BACKEND}/Favorite/delete-likefavorite/${data.id}/${Id}`,{
            headers:{
                authorization: `Bearer ${data.access_Token}`,
            }
        }
    )
    return res;
}