import React from 'react';
import {FaCheckSquare} from "react-icons/fa";
import {CiSquareCheck} from "react-icons/ci";

const Checkout = ({activeCheck, ...props}) => {
    return (
        <div {...props}>
            { activeCheck ? <FaCheckSquare/> : <CiSquareCheck/>}
        </div>
    );
};

export default Checkout;
