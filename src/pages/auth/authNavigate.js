import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgetPassword";
import NotFount from "../NotFount";

const AuthNavigate = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Login/>}/>
            <Route path={'/forgot-password'} element={<ForgotPassword/>}/>
            <Route path={'*'} element={<NotFount/>}/>
        </Routes>
    );
};

export default AuthNavigate;
