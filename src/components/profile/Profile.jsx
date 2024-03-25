import React, {useCallback, useContext, useEffect} from 'react';
import {API_URL} from "../../store/Api";
import CustomsPortal from "../CustomsPortal";
import classNames from "classnames";
import {FiLogOut} from "react-icons/fi";
import {FaRegLightbulb, FaUser} from "react-icons/fa";
import {IoMdSettings} from "react-icons/io";
import {IoMdHelpCircle} from "react-icons/io";
import {MdKeyboardArrowRight} from "react-icons/md";
import {Account} from "../../helpers/account";
import {FaLightbulb} from "react-icons/fa6";
import {ThemeContextValue} from "../ThemeProvider";
import {removeUserLogout} from "../../store/action/users";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const menuItem = [
    {
        id: 1,
        title: 'Edit Profile',
        path: "edit-profile",
        icon: FaUser
    },
    {
        id: 2,
        title: 'Settings & Privacy',
        path: "edit-account-password",
        icon: IoMdSettings
    },
    {
        id: 3,
        title: 'Help & Support',
        path: "Update-navbars",
        icon: IoMdHelpCircle
    },
    {
        id: 4,
        title: 'Logout',
        icon: FiLogOut
    }
]


const Profile = ({settingModal, setSettingModal, scrollDirection}) => {
    const profile = useSelector(state => state.users.profile);
    const {theme, setTheme} = useContext(ThemeContextValue);
    const dispatch = useDispatch()
    const navigator = useNavigate();

    useEffect(() => {
        const getTheme = localStorage.getItem('theme')
        setTheme(JSON.parse(getTheme))
    }, [theme])

    const handleEditThem = useCallback(() => {
        setTheme(!theme)
        setTimeout(() => {
            setSettingModal(false)
        }, 500)
        localStorage.setItem('theme', JSON.stringify(!theme))
    }, [theme]);

    const handleOpenSettingModal = useCallback(() => {
        if (settingModal === null) {
            setSettingModal(true)
        } else {
            setSettingModal(!settingModal)
        }
    }, [settingModal]);

    if (settingModal === false) {
        setTimeout(() => {
            setSettingModal(null)
        }, 1000)
    }

    const handleMenuItem = useCallback((item) => () => {
        if (item.title === 'Logout') {
            Account.removeStrong()
            dispatch(removeUserLogout())
            window.location.hre = '/'
        } else {
            navigator(`/${item.path}`)
        }
    }, [])

    return (
        <>
            <figure
                onClick={handleOpenSettingModal}
                className={'profile-user'}>
                <img src={`${API_URL}${profile.photo}`} alt={'users'}/>
            </figure>
            {
                settingModal !== null ?
                    <CustomsPortal
                        style={{
                            right: scrollDirection === null ? '10px' : '0'
                        }}
                        className={classNames('setting', {
                            activeSetting: settingModal,
                            isActiveSetting: !settingModal
                        })}
                    >
                        <div className={'user-item'}>
                            <img src={`${API_URL}${profile?.photo}`} alt={'hello'}/>
                            <p>{profile.lastName} {profile.firstName}</p>
                            <div/>
                        </div>
                        <ul className={'setting-container'}>
                            {
                                menuItem.map(item => (
                                    <li key={item.id}>
                                        <div className={'item'}>
                                            <span className={'icon-profile-modal'}>{<item.icon/>}</span>
                                            <p onClick={handleMenuItem(item)}> {item.title}</p>
                                        </div>
                                        <MdKeyboardArrowRight className={'icon-right'}/>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className={'them'}>
                            <div className={'item'}>
                                <span className={'them-icon'}>{
                                    theme ? <FaRegLightbulb/> : <FaLightbulb/>
                                }</span>
                                <p>Editor Theme</p>
                            </div>
                            <div onClick={handleEditThem} className={classNames('edit-button', {
                                editButtonThemActive: theme
                            })}>
                                <span/>
                            </div>
                        </div>
                    </CustomsPortal>
                    : null
            }
        </>
    );
};

export default Profile;
