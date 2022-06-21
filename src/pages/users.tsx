import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {Pagination} from "@mui/material";
import axios from "axios";
import { UserDataI } from '../interfaces'

const User = () => {
    const [users, setUsers] = useState([])
    const [currentPageNo, setCurrentPageNo] = useState(1)
    const [totalPageCount, setTotalPageCount] = useState(0)

    const getUsers = () => {
        axios.get(`/users?page=${currentPageNo}`)
            .then(res => {
                if(res.status === 200) {
                    setUsers(res.data.data);
                    setTotalPageCount(res.data.total_pages)
                    setCurrentPageNo(res.data.page)
                }
            }).catch(err => {
            console.error(err)
        })
    }
    useEffect(()=>{
        getUsers()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPageNo])

    const handleChangePagination = (event: React.ChangeEvent<unknown>, pageNo: number)=>{
        window.scroll(0,0 );
        setCurrentPageNo(pageNo);
    }


    return (
        <div className="userPage">
            <div className="users">
                {users.map((currentUser: UserDataI) => (
                    <div className="user">
                        <div className="user__image">
                            <img src={currentUser.avatar} alt="" className="user__image--img"/>
                        </div>
                        <div className="user__name">
                            {currentUser.first_name + " " + currentUser.last_name}
                        </div>
                        <div className="user__email">
                            <Link to={`${'mailto:' + currentUser.email}`} className="link">{currentUser.email}</Link>
                        </div>
                    </div>
                ))
                }
            </div>
            <div className="userPage__pagination">
                <Pagination
                    count={totalPageCount}
                    variant="outlined"
                    onChange={handleChangePagination}
                />
            </div>

        </div>
    );
};

export default User;
