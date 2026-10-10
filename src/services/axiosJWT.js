import axios from "axios";


const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_URL_BACKEND,
    withCredentials: true
})

axiosJWT.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem("access_token");

        if (token) {
            try {
                token = JSON.parse(token);
            } catch (e) {}
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosJWT.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(`${process.env.REACT_APP_URL_BACKEND}/user/refresh-token`,{ withCredentials: true });
                const newAccessToken = res.data.access_token;
                localStorage.setItem("access_token",JSON.stringify(newAccessToken));
                originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
                return axiosJWT(originalRequest);
            } catch (err) {
                localStorage.removeItem("access_token");
                alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                window.location.href = "/sign-in";
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
)
export default axiosJWT;