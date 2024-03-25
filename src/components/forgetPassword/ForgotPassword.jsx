import React, {useCallback, useContext, useEffect, useState} from 'react';
import HeaderLogin from "../login/HeaderLogin";
import {MdLockOpen} from "react-icons/md";
import useChanges from "../hooks/useChange";
import classNames from "classnames";
import {ForgetPasswordContext} from "./ControllersProvider";
import Button from "../Button";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import ShowPasswordIcon from "../login/ShowPasswordIcon";
import {userForgetPassword} from "../../store/action/users";
import {SyncLoader} from "react-spinners";
import {BsCheckCircleFill} from "react-icons/bs";

const ForgotPassword = () => {
    const {values, handleChange} = useChanges({
        newPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [statusRouter, setStatusRouter] = useState(false)
    const {
        response,
        errors,
        setErrors,
        setLoading,
        loading,
        showForgotPassword,
    } = useContext(ForgetPasswordContext);
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const handleShowPassword = useCallback(() => {
        setShowPassword(!showPassword)
    }, [showPassword]);

    const handleSavePassword = useCallback(async (e) => {
        e.preventDefault()
        if (values.newPassword === '') {
            return setErrors({
                newPassword: "is not allowed to be empty!!!"
            })
        }
        try {
            setLoading(true)
            const {payload} = await dispatch(userForgetPassword({
                email: response.email,
                newPassword: values.newPassword
            }))
            if (payload.errors) {
                return setErrors(payload.errors)
            }
            setStatusRouter(true)
        } finally {
            setLoading(false)
        }
    }, [response, values]);

    useEffect(() => {
        if (statusRouter) {
            setTimeout(() => {
                navigation('/')
            }, 2200)
        }
    }, [statusRouter]);

    return (
        <form
            onSubmit={handleSavePassword}
            className={classNames('login-form login-form-control', {
                activeForgotPassword: showForgotPassword
            })}>
            <HeaderLogin titles={'Forgot password  page!!!'}/>
            <div className="input-row">
                <div className={'input-login-item input-control'}>
                    <small>Password</small>
                    <div className={'input-item-row'}>
                        <ShowPasswordIcon
                            className={'show-password-icon'}
                            onClick={handleShowPassword}
                            passwordKey={values.newPassword}
                            activeCheckEyo={showPassword}/>
                        <span className={'icon-input'}> <MdLockOpen/></span>
                        <input
                            className={'input-forget'}
                            value={values.password}
                            onChange={handleChange('newPassword')}
                            placeholder={'******'}
                            type={showPassword ? 'text' : 'password'}/>
                    </div>
                </div>
            </div>
            {
                errors.newPassword ? <small className={'errors-forget-message'}>{errors.newPassword}</small> : null
            }
            <button className={'sav-password-button'}>
                {
                    loading ?
                        <SyncLoader
                            size={11}
                            color={'#fff'}/>
                        : <div className={'password-button'}>
                            {
                                statusRouter ?
                                    <small className={classNames('icon-password-button')}><BsCheckCircleFill/></small>
                                    : <span className={classNames('title-password-button')}>Save</span>

                            }
                        </div>
                }
            </button>
        </form>
    )
};

export default ForgotPassword;
