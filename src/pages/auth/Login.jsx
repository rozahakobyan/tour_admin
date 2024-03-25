import React from 'react';
import LoginForm from "../../components/login/LoginForm";

const Login = () => {
    return (
        <section className={"login"}>
            <div className={'effect-container'}>
                <LoginForm/>
            </div>
        </section>
    );
};

export default Login;
