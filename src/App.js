import React, { Fragment,useEffect } from 'react';
import { Routes, Route } from "react-router";
import {routes} from "./routes/index";
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import HeaderSidebarComponent from './components/HeaderSidebarComponent/HeaderSidebarComponent';
import { isJsonString } from './utils';
import * as UserService from "./services/UserService";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from './redux/slides/userSlide';
export default function App() {
  const dispatch = useDispatch();
  // Add a request interceptor
  UserService.axiosJWT.interceptors.request.use(
      
    async (config) => {
      const decoded = handleDecoded()?.decoded;

      // luôn đảm bảo headers tồn tại
      config.headers = config.headers || {};

      if (decoded && decoded.exp * 1000 < Date.now()) {
        const data = await UserService.refreshToken();
        config.headers.token = `Bearer ${data.access_token}`;
      }

      return config; 
    },
    (error) => Promise.reject(error)
  );
  const handleGetDetailsUser = async (id,token) => {
      try {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res.data, access_Token: token }));
      } catch (err) {
        console.error("User invalid or token expired");
        localStorage.removeItem("access_token");
      }
    }
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {}
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData};
  }
  useEffect(() => {
    let {storageData,decoded} = handleDecoded();
      if(decoded?.id){
        handleGetDetailsUser(decoded?.id,storageData); 
      }
  },[]);
  
  return (
    <div>
      <Routes>
        <Route>
           {routes.map((route) => {
              const Page = route.page
              const Layout = route.isShowHeader && !route.isShowSidebar ? DefaultComponent : route.isShowSidebar ? HeaderSidebarComponent : Fragment
              return (
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page/>
                  </Layout>
                }/>

              )
           })}
        </Route>
      </Routes>
    </div>
  )
}
