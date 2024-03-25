import React from 'react';
import {createPortal} from 'react-dom';


const CustomsPortal = ({children, ...props}) => {
    return (
        createPortal(
            <div {...props}>
                {children}
            </div>,
            document.getElementById('App')
        )
    );
};

export default CustomsPortal;
