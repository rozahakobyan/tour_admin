import React from 'react';
import {ScaleLoader} from "react-spinners";

const LoadingPage = (props) => {
    return (
        <ScaleLoader color="#36d7b7"  {...props} />
    );
};

export default LoadingPage;
