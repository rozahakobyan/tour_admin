import React, {useCallback, useContext, useEffect} from 'react';
import {ForgetPasswordContext} from "./ControllersProvider";
import HeaderLogin from "../login/HeaderLogin";
import useChanges from "../hooks/useChange";
import classNames from "classnames";
import {MdLockOpen} from "react-icons/md";
import Button from "../Button";
import {useDispatch} from "react-redux";
import {userVerificationEmailCode} from "../../store/action/users";

const VerificationEmail = () => {
    const {values, handleChange} = useChanges({recoveryCode: ""})
    const {
        response,
        errors,
        setErrors,
        setShowVerificationEmail,
        setLoading,
        loading,
        showVerificationEmail,
        setShowForgotPassword
    } = useContext(ForgetPasswordContext);
    const dispatch = useDispatch();

    const handleVerificationEmail = useCallback(async (e) => {
        e.preventDefault()
        if (values.recoveryCode === '') {
            return setErrors({
                recoveryCodeError: "is not allowed to be empty!!!"
            })
        }
        try {
            setLoading(true)
            const {payload} = await dispatch(userVerificationEmailCode({
                email: response.email,
                recoveryCode: values.recoveryCode
            }))
            if (payload.errors) {
                return setErrors(payload.errors)
            }
            setShowVerificationEmail(false)
            setShowForgotPassword(true)
        } finally {
            setLoading(false)
        }
    }, [values, response]);

    useEffect(() => {
        if (!showVerificationEmail) {
            setTimeout(() => {
                setShowVerificationEmail(null)
            }, 300)
        }
    }, [showVerificationEmail]);

    return (
        <form onSubmit={handleVerificationEmail}
              className={classNames('login-form login-form-control', {
                  activeVerificationEmail: showVerificationEmail,
                  isActiveVerificationEmail: !showVerificationEmail
              })}>
            <HeaderLogin titles={'Verification email  page!!!'}/>
            <p className={'response-messing'}>{response.messing}...</p>
            <div className={'input-row'}>
                <div className={'input-login-item input-control'}>
                    <small>Verification Email Address</small>
                    <div className={'input-item-row'}>
                        <span className={'icon-input'}> <MdLockOpen/></span>
                        <input
                            className={'input-forget'}
                            onChange={handleChange('recoveryCode')}
                            value={values.recoveryCode}
                            placeholder={'123456'}
                            type="text"/>
                    </div>
                </div>
            </div>
            {
                errors.recoveryCodeError ?
                    <small className={'errors-forget-message'}>
                        {errors.recoveryCodeError}</small>
                    : null
            }
            <Button
                className={'forget-password-button'}
                title={'Recovery Code'}
                loading={loading}/>
        </form>
    );
};

export default VerificationEmail;
