import React, {useState, ChangeEvent} from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ErrorIcon from '@mui/icons-material/Error';
import { ValidateEmail } from '../utils/EmailValidator';
import { ValidatePassword } from '../utils/PasswordValidator';
import { useAppDispatch } from '../store/hooks';
import { useCookies } from 'react-cookie';
import {
    populateAuthObject,
} from '../reducers/authObjSlice';
import {useNavigate} from "react-router-dom";

enum formTypeEnum {
    login = "login",
    signup = "signup",
}



const AuthComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [signupSuccessModal, setSignupSuccessModal] = useState(false);
    const [formType, setFormType] = useState<formTypeEnum>(formTypeEnum.login);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({email: '', password: ''})
    const [globalError, setGlobalError] = useState({showError: false, errorMessage: 'An error occurred'  })
    const [formError, setFormError] = useState({email: '', fullName: '', password: ''  })
    const [, setCookies]  = useCookies(['token', 'lastLogin']);

    const isValidFormData =
        formType === formTypeEnum.login ? ValidateEmail(formData.email)
            : (ValidateEmail(formData.email) && ValidatePassword(formData.password))


    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const clearForm = () => {
        setFormData({ email: "", password: "" })
    }

    const showSignupSuccess = () => {
        setSignupSuccessModal(true)
    }

    const switchFormType = () => {
        clearForm()
        setSignupSuccessModal(false)
        formType === formTypeEnum.login
            ? setFormType(formTypeEnum.signup)
            : setFormType(formTypeEnum.login);
    };

    const authenticate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        formType === formTypeEnum.login ? login() : signup();
    };

    const login = () => {
        axios.post('/login', { email: formData.email, password: formData.password })
            .then(res => {
                if(res.status === 200){
                    clearForm()
                    onAuthSuccess(res.data.token);
                    navigate('/')
                }
                else {
                    globalError.showError = true;
                    globalError.errorMessage = "Invalid email or password";

                }
            }).catch(err => {
            setGlobalError({ showError: true, errorMessage: "Invalid email or password" })
        })
    };

    const signup = () => {
        axios.post('/users', { email: formData.email, password: formData.password })
            .then(res => {
                if(res.status === 201) {
                    clearForm()
                    showSignupSuccess();
                }
            }).catch(err => {
            setGlobalError({ showError: true, errorMessage: err.response.data.message })
        })
    };

    const onAuthSuccess = (token: string) => {
        dispatch(populateAuthObject({
            token,
            lastLogin: Date.now()
        }))
        setCookies('token', token, { path: '/' });
        setCookies('lastLogin', Date.now(), { path: '/' });

    }


    const handleEmail = (email: string)=>{
        setFormData({ ...formData, email })
        if(!ValidateEmail(email)){
            setFormError({ ...formError, email: 'Invalid Email Address'})
            return
        }
        setFormError({ ...formError, email: ''})
    }

    const handlePassword = (password: string) => {
        setFormData({ ...formData, password })
        if(formType === formTypeEnum.signup && !ValidatePassword(password)){
            setFormError({ ...formError, password: 'Must Contain 8 Characters including at least one letter, number and symbol'})
            return
        }
        setFormError({ ...formError, password: ''})
    }

    const clearErrors = () => {
        setGlobalError({ showError: false,  errorMessage: '' })
    }

    return (
        <div className="fe-auth-container">
            <div className="fe-auth" onClick={(event)=>{clearErrors();event.stopPropagation()}}>
                <h1 className="fe-auth__head">{ formType===formTypeEnum.signup ? "Signup": "Login" }</h1>
                <div className="signup">
                    {globalError.showError ?
                        <div className="fe-error">
                            <ErrorIcon style={{color: 'white'}}/>
                            {"  " + globalError.errorMessage}
                        </div>
                        : <></>
                    }
                    <form onSubmit={authenticate}>
                        <div className="signup__item">
                            <TextField
                                type="email"
                                name="email"
                                id="outlined-basic"
                                label="Email"
                                autoComplete="email email-address"
                                variant="outlined"
                                onChange={(e) => handleEmail(e.target.value)}
                                value={formData.email}
                                autoFocus={true}
                                fullWidth={true}
                                className={"without-padding"}
                                error={formError.email.length > 0}
                                helperText={formError.email}
                                required
                            />
                        </div>
                        <div className="signup__item">
                            <TextField
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                label="Password"
                                autoComplete="password"
                                variant="outlined"
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handlePassword(e.target.value)}
                                value={formData.password}
                                fullWidth={true}
                                required
                                className={"without-padding"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={()=>setShowPassword(!showPassword)}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                error={formError.password.length > 0}
                                helperText={formError.password}
                            />
                        </div>
                        {formType === formTypeEnum.login ? (
                            <div className="signup__item">
                                <p className="forget_password">Forgot Password?</p>
                            </div>
                        ) : (
                            <></>
                        )}
                        <div className="signup__item submit-btn">
                            <button
                                className="btn nav__button--btn"
                                type="submit"
                                disabled={!isValidFormData}
                            >
                                {formType === formTypeEnum.login ? "Login" : "Signup"}
                            </button>
                        </div>
                    </form>
                    <div className="signup__item need-acct">
                        {formType === formTypeEnum.login ? (
                            <p className="">
                                {" "}
                                Need an account?{" "}
                                <span
                                    style={{ color: "blue", cursor: "pointer" }}
                                    onClick={switchFormType}
                                >
                  Signup for free{" "}
                </span>
                            </p>
                        ) : (
                            <p className="">
                                {" "}
                                Already have an account?{" "}
                                <span
                                    style={{ color: "blue", cursor: "pointer" }}
                                    onClick={switchFormType}
                                >
                  {" "}
                                    Login{" "}
                </span>{" "}
                            </p>
                        )}
                    </div>
                </div>
                {signupSuccessModal ? <div className="signup-success-container">
                    <div className="signup-success">
                        <div className="signup-success-text">
                            Signup successful, please <span onClick={switchFormType} className="link">Login</span> to continue
                        </div>
                    </div>
                </div>
                    : <></> }
            </div>

        </div>
    );
};
export default AuthComponent;
