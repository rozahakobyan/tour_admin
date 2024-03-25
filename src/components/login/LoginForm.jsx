import React, {useCallback, useEffect, useState} from 'react';
import {MdLockOpen} from "react-icons/md";
import {HiOutlineMail} from "react-icons/hi";
import HeaderLogin from "./HeaderLogin";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Checkout from "../Checkout";
import useChange from "../hooks/useChange";
import Button from "../Button";
import ShowPasswordIcon from "./ShowPasswordIcon";
import {userLoginRequest} from "../../store/action/users";

const LoginForm = () => {
    const {values, handleChange, setValues} = useChange({
        email: "",
        password: ''
    });
    const [activeCheck, setActiveCheck] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const errors = useSelector(state => state.users.errors);
    const loading = useSelector(state => state.users.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const getRememberMe = localStorage.getItem('remember-me')
        if (getRememberMe) {
            setValues(JSON.parse(getRememberMe))
            setActiveCheck(true)
        }
        if (activeCheck === false) {
            localStorage.removeItem('remember-me')
            setActiveCheck(false)
        }
    }, [activeCheck, setActiveCheck, setValues])

    const handleShowPassword = useCallback(() => {
        setShowPassword(!showPassword)
    }, [showPassword]);

    const handleRememberMe = useCallback(() => {
        if (values.email !== '' && values.password !== '') {
            localStorage.setItem('remember-me', JSON.stringify(values))
            if (!activeCheck) {
                setActiveCheck(true)
            } else {
                setActiveCheck(false)
            }
        }
    }, [values, activeCheck])

    const handleLogin = useCallback((event) => {
        event.preventDefault()
        dispatch(userLoginRequest(values))
    }, [values, dispatch]);

    const handleRouteForget = useCallback(() => {
        navigate('/forgot-password')
    }, [navigate]);

    return (
        <div className={'login-form'}>
            <HeaderLogin titles={'Travel To Armenia! auth page'}/>
            {
                errors?.exsist
                    ? <span
                        className={'error-messing-email-exsist'}>
                        {errors?.exsist}!!!
                </span>
                    : null
            }
            {
                errors?.actvateError
                    ? <span
                        className={'error-messing-email-exsist'}>
                        {errors?.actvateError}!!!
                </span>
                    : null
            }
            <form
                onSubmit={handleLogin}
                className={'form-input-login'}>
                <div className="input-row">
                    <div className={'input-login-item'}>
                        <small>Email Address</small>
                        <div className={'input-item-row'}>
                            <span className={'icon-input'}> <HiOutlineMail/></span>
                            <input
                                value={values.email}
                                onChange={handleChange('email')}
                                placeholder={'experience@gmail.come'}
                                type="text"/>
                        </div>
                    </div>
                    {
                        errors?.email ?
                            <span className={'error-messing-back'}>
                                {errors.email}!!!
                            </span>
                            : null
                    }

                </div>
                <div className="input-row">
                    <div className={'input-login-item'}>
                        <small>Password</small>

                        <div className={'input-item-row'}>
                            <ShowPasswordIcon
                                className={'show-password-icon'}
                                onClick={handleShowPassword}
                                passwordKey={values.password}
                                activeCheckEyo={showPassword}/>
                            <span className={'icon-input'}> <MdLockOpen/></span>
                            <input
                                value={values.password}
                                onChange={handleChange('password')}
                                placeholder={'******'}
                                type={showPassword ? 'text' : 'password'}/>
                        </div>
                    </div>
                    {
                        errors?.password ?
                            <span className={'error-messing-back'}>
                                {errors.password}!!!
                            </span>
                            : null
                    }
                </div>
                <div>
                    <div className={'remember-me'}>
                        <Checkout
                            style={{
                                color: activeCheck ? 'blue' : '#fff'
                            }}
                            className={'check-out'}
                            activeCheck={activeCheck}/>
                        <span onClick={handleRememberMe}>Remember me</span>
                    </div>
                </div>
                <Button
                    className={'forget-password-button'}
                    title={'Save'}
                    loading={loading}/>
                <div onClick={handleRouteForget} className={'password-forgot'}>
                    <span>Forgot password</span>
                </div>
            </form>
        </div>
    );
};
export default LoginForm;
