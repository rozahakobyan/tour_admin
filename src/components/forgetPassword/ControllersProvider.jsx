import React, {createContext, useState} from "react";
import ProfileEmail from "./ProfileEmail";
import VerificationEmail from "./VerificationEmail";
import ForgotPassword from "./ForgotPassword";

export const ForgetPasswordContext = createContext(null);
const ControllersProvider = () => {
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [showSendEmail, setShowSendEmail] = useState(true);
    const [showVerificationEmail, setShowVerificationEmail] = useState(null);
    const [showForgotPassword, setShowForgotPassword] = useState(null);
    return (
        <ForgetPasswordContext.Provider value={{
            response,
            setResponse,
            errors,
            setErrors,
            showSendEmail,
            setShowSendEmail,
            showVerificationEmail,
            setShowVerificationEmail,
            setLoading,
            loading,
            showForgotPassword,
            setShowForgotPassword
        }}>
            {
                showSendEmail !== null ? <ProfileEmail/> : null
            }
            {
                showVerificationEmail !== null && showSendEmail === null ? <VerificationEmail/> : null
            }
            {
                showForgotPassword !== null && showVerificationEmail === null ? <ForgotPassword/> : null
            }
        </ForgetPasswordContext.Provider>
    );
};

export default ControllersProvider;
