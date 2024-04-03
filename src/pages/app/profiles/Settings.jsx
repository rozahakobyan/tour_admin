import React, {useCallback, useState} from 'react';
import useChange from "../../../components/hooks/useChange";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {userUpdateProfilePasswordRequest} from "../../../store/action/users";
import {Helmet} from "react-helmet";
import InputProfilePassword from "../../../components/profile/InputProfilePassword";
import {IoWarning} from "react-icons/io5";
import {FaCheckCircle} from "react-icons/fa";
import {SyncLoader} from "react-spinners";

const Settings = () => {
    const {values, handleChange} = useChange({
        password: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [oldPasswordStatus, setOldPasswordStatus] = useState(null);
    const errors = useSelector(state => state.users.errors);
    const loading = useSelector(state => state.users.loading);
    const messages = useSelector(state => state.users.messages);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleSavePassword = useCallback(async (e) => {
        e.preventDefault()
        const {payload} = await dispatch(userUpdateProfilePasswordRequest(values))
        if (payload.errors?.oldPassword) {
            return setOldPasswordStatus(true)
        } else {
            setOldPasswordStatus(false)
        }
        if (payload.status === 'ok') {
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }

    }, [values])

    return (
        <div className={'edit-pass'}>
            <Helmet>
                <title>settings</title>
            </Helmet>
            <div className={'edit-pass-container'}>
                <form
                    onSubmit={handleSavePassword}
                    className={'login-form account-edit-password'}>
                    {
                        messages.message ? <span className={'messages'}>{messages.message}</span> : null
                    }
                    <InputProfilePassword
                        value={values.password}
                        onChange={handleChange('password')}
                        valueShowPassword={values.password}
                        title={'Old password'}>
                        {
                            oldPasswordStatus !== null
                                ? oldPasswordStatus === true
                                    ? <span className={'errors-old-text'}>
                                        <IoWarning className={'errors-old'}/>
                                        {errors?.oldPassword}</span> :
                                    <span className={'strong-text'}>
                                        <FaCheckCircle className={'strong-text-icon'}/>
                                        Strong password </span>
                                : null
                        }
                    </InputProfilePassword>
                    <InputProfilePassword
                        value={values.newPassword}
                        onChange={handleChange('newPassword')}
                        valueShowPassword={values.newPassword}
                        title={'New password'}>
                        {
                            errors.newPassword ?
                                <span className={'errors-old-text'}>
                                      <IoWarning className={'errors-old'}/>
                                    {errors?.newPassword}
                                </span> : null
                        }
                    </InputProfilePassword>
                    <InputProfilePassword
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        valueShowPassword={values.confirmPassword}
                        title={'Confirm Password'}>
                        {
                            errors.confirmPassword ?
                                <span className={'errors-old-text'}>
                                      <IoWarning className={'errors-old'}/>
                                    {errors?.confirmPassword}
                                </span> : null
                        }
                    </InputProfilePassword>
                    <button>{
                        loading ? <SyncLoader size={9} color={'#fff'}/> : "Save"
                    }</button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
