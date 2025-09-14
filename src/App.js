import React, { Fragment } from 'react';
import { Routes, Route } from "react-router";
import {routes} from "./routes/index";
// import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
export default function App() {
  return (
    <div>
      <Routes>
        <Route>
           {routes.map((route) => {
              const Page = route.page
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
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
