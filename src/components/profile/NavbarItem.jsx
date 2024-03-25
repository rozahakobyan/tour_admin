import React, {useCallback, useMemo} from 'react';

import {MdKeyboardArrowRight} from "react-icons/md";
import NavbarSubMenu from "./NavbarSubMenu";
import {Link, useNavigate} from "react-router-dom";
import {Account} from "../../helpers/account";


const NavbarItem =
    ({item, activePathName, setActivePathName, activeSubItem, setActiveSubItem}) => {
        const navigate = useNavigate();

        const activeClass = useMemo(() => {
            return activePathName === item.path ? "active-nav-item" : ""
        }, [item, activePathName]);

        const activeClassSubMenu = useMemo(() => {
            return activePathName === item.path && item.subMenu ? "open-sub-menu" : ""
        }, [item, activePathName]);

        const handleRouter = useCallback((item) => () => {
            setActivePathName(item.path)
            Account.setNavbarUrlPath(item.path);
            localStorage.removeItem('nav_sub_menu_url_path_name')
        }, []);

        const subItemRouter = useCallback((item) => () => {
            navigate(`${activePathName}/${item.path}`)
            Account.setNavbarUrlPathSub(item.path);
            setActiveSubItem(item.path)
        }, [activePathName]);

        return (
            <li
                className={`nav-item ${activeClass} ${activeClassSubMenu}`}>
                <Link onClick={handleRouter(item)} to={item.path} className={'left-text-content'}>
                    <span className={'icon-item'}>{<item.Icon/>}</span>
                    <p className={'item-title'}>{item.name}</p>
                </Link>
                {
                    item.openIcon ? <MdKeyboardArrowRight className={'open-sub-menu-icon'}/> : null
                }
                <ul className={'sub-menu'}>
                    {
                        item.subMenu ? item.subMenu.map(subItem => (
                            <NavbarSubMenu
                                activeSubItem={activeSubItem}
                                subItem={subItem}
                                onClick={subItemRouter(subItem)}
                                key={subItem.id}/>
                        )) : null
                    }
                </ul>
            </li>
        );
    };

export default NavbarItem;
