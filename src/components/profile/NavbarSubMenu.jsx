import React from 'react';
import {Link} from "react-router-dom";
import classNames from "classnames";

const NavbarSubMenu
    = ({subItem, activeSubItem, ...props}) => {
    return (
        <li {...props} className={'sub-menu-item'}>
            {subItem.Icon ? <span className={'icon-item-sub'}>{<subItem.Icon/>}</span> : null}
            <Link to={subItem.path} className={classNames('sub-menu-title', {
                activeSubItem: subItem.path === activeSubItem
            })}>{subItem.title}</Link>
        </li>
    );
};

export default NavbarSubMenu;
