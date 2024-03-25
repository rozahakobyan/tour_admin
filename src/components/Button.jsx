import React from 'react';
import {SyncLoader} from "react-spinners";


const Button = ({title, loading, ...props}) => {
    return (
        <button {...props}>
            {
                loading
                    ? <SyncLoader
                        size={11}
                        color={'#fff'}/>
                    : title
            }
        </button>
    );
};

export default Button;
