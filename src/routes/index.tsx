import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/homepage";
import Users from "../pages/users";
import MyAccount from "../pages/myAccount";
import Error404 from "../pages/error404";
import Auth from "../pages/authentication";
import Error500 from "../pages/error500";
import ProtectedRoute, {ProtectedRouteProps} from "./ProtectedRoute";
import {useAppSelector} from "../store/hooks";
import {selectAuthObject} from "../reducers/authObjSlice";



export const AppRoutes = () => {
    const authObj = useAppSelector(selectAuthObject);

    const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
        isAuthenticated: authObj.token !== '',
        authenticationPath: '/login',
    };
    return (
        <Routes>
            <Route path={`/`} element={<HomePage/>}/>
            <Route path={`/users`} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Users />} />} />
            <Route path={`/account`} element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<MyAccount />} />} />
            <Route path={`/authentication`} element={<Auth/>}/>
            <Route path={`/server-down`} element={<Error500 />}/>
            <Route path="*" element={<Error404/>}/>
        </Routes>
    )
};
