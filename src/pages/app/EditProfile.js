import React, {useCallback, useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {useDispatch, useSelector} from "react-redux";
import {API_URL} from "../../store/Api";
import {useNavigate} from "react-router-dom";
import {userUpdateProfileRequest} from "../../store/action/users";
import {SyncLoader} from "react-spinners";

const EditProfile = () => {
    const [profile, setProfile] = useState({});
    const errors = useSelector(state => state.users.errors);
    const loading = useSelector(state => state.users.loading);
    const user = useSelector(state => state.users.profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setProfile(...user)
    }, [user]);

    const handleChangeFile = useCallback((e) => {
        setProfile({...profile, photo: e.target.files[0]})
    }, [profile]);

    const handleChange = useCallback((key) => (event) => {
        const {value} = event.target;
        setProfile((prevValues) => ({
            ...prevValues,
            [key]: value,
        }));
    }, []);

    const handleSubmitSave = useCallback(async (e) => {
        e.preventDefault()
        const {favorites, status, isOauth, ...data} = profile
        const {payload} = await dispatch(userUpdateProfileRequest(data));
        if (payload.status === 'ok') {
            navigate('/')
        }
    }, [profile]);

    return (
        <div className={'effect'}>
            <Helmet>
                <title>edit profile</title>
            </Helmet>
            <div className={'effect-container'}>
                <form onSubmit={handleSubmitSave}
                      className={'edit-profile login-form'}>
                    <div className="file_img">
                        <label
                            htmlFor="file-upload"
                            className="custom-file">
                            <img src={
                                profile.photo?.name
                                    ? URL.createObjectURL(profile.photo)
                                    : `${API_URL}/${profile.photo}`
                            } alt={""}/>
                        </label>
                        <input
                            onChange={handleChangeFile}
                            name={'files'}
                            accept="image/*"
                            id="file-upload"
                            type="file"/>
                    </div>
                    <div className="con_input">
                        <div className={'row_item'}>
                            <div className={'input-login-item input'}>
                                <span>First Name</span>
                                <input
                                    onChange={handleChange('firstName')}
                                    value={profile?.firstName || ''}
                                    type="text"/>
                            </div>
                            {
                                errors?.firstName ? <small>{errors.firstName}</small> : null
                            }
                        </div>
                        <div className="row_item">
                            <div className={'input-login-item input'}>
                                <span>Last Name</span>
                                <input
                                    onChange={handleChange('lastName')}
                                    value={profile?.lastName || ''}
                                    type="text"/>
                            </div>
                            {
                                errors?.lastName ? <small>{errors.lastName}</small> : null
                            }
                        </div>
                        <div className="row_item">
                            <div className={'input-login-item input'}>
                                <span>Email Address</span>
                                <input
                                    onChange={handleChange('email')}
                                    value={profile?.email || ''}
                                    type="text"/>
                            </div>
                            {
                                errors?.email ? <small>{errors.email}</small> : null
                            }
                        </div>
                        <button>{
                            loading ? <SyncLoader size={10} color={'#fff'}/> : 'Save'
                        }</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
