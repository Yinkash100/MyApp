import React, {useEffect, useState} from "react";
import {Link, useNavigate } from "react-router-dom";
import { intervalToDuration, Duration } from 'date-fns'
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
    populateAuthObject,
    deleteAuthObject,
    selectAuthObject,
} from '../reducers/authObjSlice'
import {useCookies} from "react-cookie";

const NavbarWithSearch = () => {
    const navigate = useNavigate();
    const authObj = useAppSelector(selectAuthObject);
    const dispatch = useAppDispatch();
    const [duration, setDuration] = useState<Duration>(intervalToDuration({
        start: new Date(),
        end: new Date(),
    }));
    const [, setCookie, removeCookie]  = useCookies([ 'token', 'lastLogin']);

    const logoutUser = () => {
        dispatch(deleteAuthObject());
        removeCookie('token');
        removeCookie('lastLogin');
        navigate('/');
    }

    useEffect(()=>{
        if (duration.minutes === 0 && duration.seconds === 0){
            logoutUser();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [duration])

    useEffect(()=>{

        const tenMinLater = new Date(new Date(authObj.lastLogin).getTime() + 10*60000);
        let countdownInterval: NodeJS.Timer;

            countdownInterval = setInterval(() => {
                setDuration(intervalToDuration({
                    start: new Date(),
                    end: tenMinLater,
                }));
            }, 1000);

        return(() => {
            clearInterval(countdownInterval)
        })
    }, [authObj.lastLogin])


    const refreshToken = ()=>{
        dispatch(populateAuthObject({
            token: authObj.token,
            lastLogin: Date.now()
        }))
        setCookie('lastLogin',  Date.now(),{ path: '/' })
        navigate(0)
    }


    return (
        <div>
            {authObj.token !== '' ?
                <div className="prenav">
                    Time until token expires
                    {" " + duration.minutes + ":" + duration.seconds }.
                    <span className="link" onClick={refreshToken}>{" " } Refresh now</span>
                </div>
                : <></>
            }
            <div className="nav">
                <div className="nav__left">
                    <h1>MY APP</h1>
                </div>
                <div className="nav__right">
                    {authObj.token !== '' ?
                        <ul className="nav__link">
                            <li className="nav__link--item">
                                <Link to="/account" className=" ">Account</Link>
                            </li>
                            <li className="nav__link--item">
                                <Link to="/users" className=" ">Users</Link>
                            </li>
                            <li className="nav__link--item">
                                <button onClick={logoutUser} className="btn ">Logout</button>
                            </li>
                        </ul>
                        :
                        <Link to="/authentication" className="btn ">Signup/Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default NavbarWithSearch;
