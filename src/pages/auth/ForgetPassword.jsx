import React from 'react';
import ControllersProvider from "../../components/forgetPassword/ControllersProvider";

const ForgetPassword = () => {
    return (
        <section className={"login"}>
            <div className={'effect-container'}>
                <ControllersProvider/>
            </div>
        </section>
    );
};

export default ForgetPassword;
