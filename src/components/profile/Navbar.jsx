import React, {useEffect, useState} from "react";
import classNames from "classnames";
import NavbarItem from "./NavbarItem";
import {MdDashboard, MdLocalHotel} from "react-icons/md";
import {FaCarSide, FaRegRegistered, FaUsers} from "react-icons/fa";
import {MdOutlineTour} from "react-icons/md";
import {MdMedicalServices} from "react-icons/md";
import {AiOutlineMessage} from "react-icons/ai";
import {IoFastFoodSharp, IoListOutline} from "react-icons/io5";
import {IoIosHelpCircle, IoIosSettings} from "react-icons/io";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {Account} from "../../helpers/account";

const navItem = [
    {
        id: 1,
        name: 'Dashboard',
        Icon: MdDashboard,
        path: '/',
        renderItem: true
    },
    {
        id: 2,
        name: 'Destination',
        Icon: FaRegRegistered,
        openIcon: true,
        renderItem: true,
        path: 'destination',
        subMenu: [
            {
                id: 21,
                title: "Settings destination",
                path: "settings-destination",
            },
            {
                id: 22,
                title: "Add new destination",
                path: "add-new-destination",
            }
        ]
    },
    {
        id: 33,
        name: 'Categories',
        Icon: IoListOutline,
        openIcon: true,
        renderItem: true,
        path: 'categories',
        subMenu: [
            {
                id: 33,
                title: "All categories",
                path: "settings-categories",
            },
            {
                id: 34,
                title: "Add new categories",
                path: "add-new-categories",
            }
        ]
    },
    {
        id: 3,
        name: 'Tour',
        Icon: MdOutlineTour,
        openIcon: true,
        renderItem: true,
        path: 'tour',
        subMenu: [
            {
                id: 31,
                title: "Settings tours",
                path: "settings-tours",
            },
            {
                id: 32,
                title: "Add new tour",
                path: "add-new-tour",
            },
        ]
    },
    {
        id: 4,
        name: 'Services',
        path: 'services',
        Icon: MdMedicalServices,
        openIcon: true,
        renderItem: true,
        subMenu: [
            {
                id: 44,
                title: "Message",
                Icon: AiOutlineMessage,
                path: "message",
            },
        ]
    },
    {
        id: 5,
        name: 'Hotels',
        Icon: MdLocalHotel,
        path: "hotels",
        renderItem: true,
    },
    {
        id: 6,
        name: 'Food',
        Icon: IoFastFoodSharp,
        path: "food",
        renderItem: true,
    },
    {
        id: 7,
        name: 'Cars',
        Icon: FaCarSide,
        path: "/cars",
        renderItem: true,
    },
    {
        id: 8,
        name: 'Users',
        Icon: FaUsers,
        path: "/users/1",
        renderItem: true,
    },
    {
        id: 9,
        name: 'Settings',
        Icon: IoIosSettings,
        path: "settings",
        renderItem: true,
    },
    {
        id: 10,
        name: 'Help',
        Icon: IoIosHelpCircle,
        path: "help",
        renderItem: true,
    },
]
const Navbar = () => {
    const [activePathName, setActivePathName] = useState('');
    const [activeSubItem, setActiveSubItem] = useState('')
    const scrollStatus = useSelector(state => state.users.scrollStatus);
    const {pathname} = useLocation();
    const {navPath, subMenuPath} = Account.getNavbarUrlPath();


    useEffect(() => {

        if (pathname === '/') {
            return setActivePathName('/')
        }

        if (subMenuPath) {
            setActiveSubItem(subMenuPath)
        } else {
            setActiveSubItem('')
        }
        if (navPath) {
            setActivePathName(navPath)
        }
    }, [navPath, subMenuPath]);

    return (
        <nav className={classNames('navbar-left', {
            activeScrollNavbar: scrollStatus,
            isActiveScrollNavbar: scrollStatus === false
        })}>
            <ul
                style={{
                    height: scrollStatus === null
                        ? "90%" : scrollStatus ? "100%" : "90%"
                }}
                className="nav-container">
                {
                    navItem.map((item) => (
                        <NavbarItem
                            setActivePathName={setActivePathName}
                            activePathName={activePathName}
                            item={item}
                            activeSubItem={activeSubItem}
                            setActiveSubItem={setActiveSubItem}
                            key={item.id}
                        />
                    ))
                }
            </ul>
        </nav>
    );
};

export default Navbar;
