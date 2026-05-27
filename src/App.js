import React, { Fragment,useEffect } from 'react';
import { Routes, Route } from "react-router";
import {routes} from "./routes/index";
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import ProtectedRoute from './protectedroute';
import HeaderSidebarComponent from './components/HeaderSidebarComponent/HeaderSidebarComponent';
//import { isJsonString } from './utils';
import * as UserService from "./services/UserService";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from './redux/slides/userSlide';
export default function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleGetDetailsUser = async (id) => {
      try {

        const res = await UserService.getDetailsUser(id);

        const token = JSON.parse(
            localStorage.getItem("access_token")
        );

        dispatch(updateUser({
            ...res.data,
            access_Token: token
        }));

    } catch (err) {

        console.error("User invalid or token expired");

        localStorage.removeItem("access_token");
    }
  }
  useEffect(() => {
    try {

        const token = localStorage.getItem("access_token");

        if(token){

            let parsedToken = token;

            try {
                parsedToken = JSON.parse(token);
            } catch(e){}

            const decoded = jwtDecode(parsedToken);

            if(decoded?.id){
                handleGetDetailsUser(decoded.id);
            }
        }

    } catch(error){

        localStorage.removeItem("access_token");
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
                    {route.isPrivate ? (
                      <ProtectedRoute allowedRoles={route.allowedRoles}>
                        <Page />
                      </ProtectedRoute>
                    ) : (
                      <Page />
                    )}
                  </Layout>
                }/>
              )
           })}
        </Route>
      </Routes>
    </div>
  )
}
