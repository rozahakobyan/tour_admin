import React, {useCallback, useEffect, useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import Header from "../../../components/profile/Header";
import Navbar from "../../../components/profile/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {removeUserLogout, userProfileRequest} from "../../../store/action/users";
import CustomsPortal from "../../../components/CustomsPortal";
import {Helmet} from "react-helmet";


const Account = () => {
    const [verificationEmail, setVerificationEmail] = useState(false);
    const profile = useSelector(state => state.users.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userProfileRequest())
    }, []);

    useEffect(() => {
        if (profile.status !== 'active') {
            setVerificationEmail(true)
        }
    }, [profile]);

    const verificationAddress = useCallback(() => {
        dispatch(removeUserLogout())
        navigate('/')
    }, []);

    return (
        <div className={'account childrenWidth'}>
            <Helmet>
                <title>dashboard</title>
            </Helmet>
            <Header/>
            <div className="container">
                <Navbar/>
                <Outlet/>
            </div>
            {
                verificationEmail
                    ? <CustomsPortal className={'verification_email'}>
                        <div className="modal">
                            <p>You have successfully uploaded your email address. Enter your email address. To verify your
                                email address, please log in</p>
                            <button onClick={verificationAddress}>Verification Email</button>
                        </div>
                    </CustomsPortal>
                    : null
            }
        </div>
    );
};

export default Account;
