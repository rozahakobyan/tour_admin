import React, {useCallback, useContext, useEffect} from 'react';
import HeaderLogin from "../login/HeaderLogin";
import {HiOutlineMail} from "react-icons/hi";
import useChange from "../hooks/useChange";
import {ForgetPasswordContext} from "./ControllersProvider";
import classNames from "classnames";
import Button from "../Button";
import {useDispatch} from "react-redux";
import {userForgetPassSendEmail} from "../../store/action/users";

const ProfileEmail = () => {
    const {values, handleChange} = useChange({email: ""});
    const {
        setResponse,
        errors,
        setErrors,
        showSendEmail,
        setShowSendEmail,
        setShowVerificationEmail,
        setLoading,
        loading
    } = useContext(ForgetPasswordContext)
    const dispatch = useDispatch()

    const handleSendEmail = useCallback(async (e) => {
        e.preventDefault()
        if (values.email === '') {
            return setErrors({
                email: "is not allowed to be empty!!!"
            })
        }
        try {
            setLoading(true)
            const {payload} = await dispatch(userForgetPassSendEmail(values))
            if (payload.errors) {
                return setErrors(payload.errors)
            }
            setResponse({
                email: values.email,
                messing: payload
            })
            setShowSendEmail(false)
            setShowVerificationEmail(true)
        } finally {
            setLoading(false)
        }
    }, [values]);

    useEffect(() => {
        if (!showSendEmail) {
            setTimeout(() => {
                setShowSendEmail(null)
            }, 300)
        }
    }, [showSendEmail])

    return (
        <form onSubmit={handleSendEmail} className={classNames('login-form login-form-control', {
            isActiveSendEmail: !showSendEmail
        })}>
            <HeaderLogin titles={'Email address page!!!'}/>
            <div className={'input-row'}>
                <div className={'input-login-item input-control'}>
                    <small>Email Address</small>
                    <div className={'input-item-row'}>
                        <span className={'icon-input'}> <HiOutlineMail/></span>
                        <input
                            className={'input-forget'}
                            onChange={handleChange('email')}
                            value={values.email}
                            placeholder={'experience@gmail.come'}
                            type="text"/>
                    </div>
                </div>
            </div>
            {
                errors.email ? <small className={'errors-forget-message'}>{errors.email}</small> : null
            }
            <Button
                className={'forget-password-button'}
                title={'Send Email'}
                loading={loading}/>
        </form>
    );
};

export default ProfileEmail;
