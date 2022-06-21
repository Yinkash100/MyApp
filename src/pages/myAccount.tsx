import React, {useEffect, useState} from "react";
import axios from "axios";
import {UserDataI} from "../interfaces";
import TextField from "@mui/material/TextField";

const MyAccount = () => {
    const userID = 2;
    const [showEditModal, setShowEditModal] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const [formError, setFormError] = useState({ jobTitle: '' })
    const [currentUser, setCurrentUser] = useState<UserDataI>({
        id: "",
        email: "",
        first_name: "",
        last_name: "",
        avatar: ""
    })

    const toggleShowEditModal = () => {
        setShowEditModal(!showEditModal);
    }
    const isValidFormData = jobTitle.length > 0;

    const handleSetJobTitle = (jobTitle: string)=> {
        setJobTitle(jobTitle);
        if(jobTitle === ''){
            setFormError({ jobTitle: 'Field cannot be empty' })
        }
    }

    const getUsers = () => {
        axios.get(`/users/${userID}`)
            .then(res => {
                if(res.status === 200) {
                    setCurrentUser(res.data.data);
                }
            }).catch(err => {
                console.log('na here he happen')
            console.error(err)
        })
    }
    useEffect(()=>{
        getUsers()
    }, [])


    const updateUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axios.patch(`/users/${userID}`, { job: `${jobTitle}` })
            .then(res => {
                if(res.status === 200) {
                    setCurrentUser(res.data.data);
                    toggleShowEditModal();
                }
            }).catch(err => {
            console.error(err)
        })
    }
    return (
        <div className="myAccountPage">
            <div className="edit_button">
                <button className="btn edit_user__button" onClick={toggleShowEditModal}>
                    Edit
                </button>
            </div>
            {currentUser && Object.keys(currentUser).length > 0 ?
                <div className="user">
                    <div className="user__image">
                        <img src={currentUser.avatar} alt="" className="user__image--img"/>
                    </div>
                    <div className="user__text">
                        <div className="user__text--item">
                            <div className="user__text--item-head"> First Name: </div>
                            <div className="user__text--item-text"> {currentUser.first_name}</div>
                        </div>
                        <div className="user__text--item">
                            <div className="user__text--item-head"> Last Name: </div>
                            <div className="user__text--item-text"> {currentUser.last_name}</div>
                        </div>
                        <div className="user__text--item">
                            <div className="user__text--item-head"> Email: </div>
                            <div className="user__text--item-text"> {currentUser.email}</div>

                        </div>
                    </div>
                </div>
                :
                <></>
            }
            { showEditModal ?
                <div className="edit-modal-container">
                <div className="edit-modal">
                    <h4 className="edit-modal-head">Update User Info </h4>
                    <form className="form" onSubmit={updateUser}>
                        <div className="form__item">
                            <TextField
                                type="text"
                                name="firstname"
                                id="outlined-basic"
                                label="First Name"
                                autoComplete="first name"
                                variant="outlined"
                                onChange={()=>{}}
                                value={currentUser.first_name}
                                fullWidth={true}
                                className={"without-padding"}
                                disabled
                            />
                        </div>
                        <div className="form__item">
                            <TextField
                                type="text"
                                name="lastname"
                                id="outlined-basic"
                                label="Last Name"
                                autoComplete="last name"
                                variant="outlined"
                                onChange={()=>{}}
                                value={currentUser.last_name}
                                fullWidth={true}
                                className={"without-padding"}
                                disabled
                            />
                        </div>
                        <div className="form__item">
                            <TextField
                                type="email"
                                name="email"
                                id="outlined-basic"
                                label="email"
                                autoComplete="email"
                                variant="outlined"
                                onChange={()=>{}}
                                value={currentUser.email}
                                fullWidth={true}
                                className={"without-padding"}
                                disabled
                            />
                        </div>

                        <div className="form__item">
                            <TextField
                                type="text"
                                name="job-title"
                                id="outlined-basic"
                                label="Job Title"
                                autoComplete=""
                                variant="outlined"
                                onChange={(e) => handleSetJobTitle(e.target.value)}
                                value={jobTitle}
                                fullWidth={true}
                                autoFocus={true}
                                className={"without-padding"}
                                error={formError.jobTitle.length > 0}
                                helperText={formError.jobTitle}
                                required
                            />
                        </div>
                        <div className="form__item submit-btn">
                            <button
                                className="btn nav__button--btn"
                                type="submit"
                                disabled={!isValidFormData}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
                : <></>
            }
        </div>
    );
};

export default MyAccount;
