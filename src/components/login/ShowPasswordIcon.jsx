import React from 'react';
import {IoEyeOutline} from "react-icons/io5";
import {IoEyeOffOutline} from "react-icons/io5";


const ShowPasswordIcon =
    ({activeCheckEyo, passwordKey, ...props}) => {
        return (
            passwordKey !== '' &&
            <div {...props}>
                {
                    activeCheckEyo ? <IoEyeOffOutline/> : <IoEyeOutline/>
                }
            </div>
        );
    };

export default ShowPasswordIcon;
