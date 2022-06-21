import React from 'react';
import './App.scss';
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {populateAuthObject, selectAuthObject} from "./reducers/authObjSlice";
import {AppRoutes} from "./routes";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import NavBar from "./components/NavBar";
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";


function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authObj = useAppSelector(selectAuthObject);
  const [cookies]  = useCookies(['token', 'lastLogin']);


  if(!authObj.token && cookies['token'] !== undefined){
    dispatch(populateAuthObject({
      token: cookies['token'],
      lastLogin: cookies.lastLogin
    }))
  }


    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API_URL;
    axios.defaults.headers.post["Content-Type"] = "application/json";

    axios.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {
        // @ts-ignore
        config.headers.Authorization =  authObj.token;

        return config;
    }, (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    });

    axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
        // Edit response config
        return response;
    }, (error: AxiosError): Promise<AxiosError> => {
        if (error.response?.status === 500) {
            navigate('/server-down')
        }
        return Promise.reject(error);
});

  return (
    <div className="apps--main">
      <NavBar />
      <AppRoutes />
    </div>
  );
}

export default App;
