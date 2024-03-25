import React, {useCallback, useState} from 'react';
import ShowPasswordIcon from "../login/ShowPasswordIcon";
import {MdLockOpen} from "react-icons/md";

const InputProfilePassword = ({title, valueShowPassword, children, ...props}) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = useCallback(() => {
        setShowPassword(!showPassword)
    }, [showPassword])
    return (
        <div className="input-row">
            <div className={'input-login-item inputs'}>
                <small>{title}</small>
                <div className={'input-item-row'}>
                    <ShowPasswordIcon
                        className={'show-password-icon'}
                        onClick={handleShowPassword}
                        passwordKey={valueShowPassword}
                        activeCheckEyo={showPassword}/>
                    <span className={'icon-input'}> <MdLockOpen/></span>
                    <input
                        {...props}
                        placeholder={'*******'}
                        type={showPassword ? "text" : 'password'}/>
                </div>
            </div>
            {children}
        </div>
    );
};

export default InputProfilePassword;
