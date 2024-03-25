import React from 'react';

const HeaderLogin = ({titles,...props}) => {
    return (
        <div {...props}>
            <figure className={'logo-login'}>
                <img
                    src={require('../../assets/images/logo.png')}
                    alt={'logo'}/>
            </figure>
            <h1 className={'login-title'}>{titles}</h1>
        </div>
    );
};

export default HeaderLogin;
