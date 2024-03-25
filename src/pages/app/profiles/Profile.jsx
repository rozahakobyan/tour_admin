import React from 'react';

const Profile = () => {
    return (
        <div className={'profile childrenWidth'}>
            <h1 className={'p_tit'}>Analytics new signups</h1>
            <div className={'p_cont'}>
                <div className="sing_cont">
                    <div className="sing_it">
                        <h2>162k</h2>
                        <p>Visit</p>
                    </div>
                    <div className="sing_it">
                        <h2>2.3k</h2>
                        <p>New Signups</p>
                        <small>3% Decrease</small>
                    </div>
                    <div className="sing_it">
                        <h2>4.1k</h2>
                        <p>Users</p>
                    </div>
                </div>
                <div className={'box'}>

                </div>
            </div>
        </div>
    );
};

export default Profile;
