import React from 'react';

const Logo = () => {
    return (
        <div className={'logo'}>
            <h1>Tra</h1>
            <img src={require('../../assets/images/logo.png')}/>
            <h1>vel</h1>
        </div>
    );
};

export default Logo;
