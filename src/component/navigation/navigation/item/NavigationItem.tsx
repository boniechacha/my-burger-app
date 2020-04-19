import React, {MouseEventHandler} from "react";
import CSS from './NavigationItem.module.css'
import {NavLink} from "react-router-dom";

type NavigationItemProps = { link: string, exact?: boolean, onNavigating: MouseEventHandler<HTMLAnchorElement> }
const NavigationItem: React.FC<NavigationItemProps> = props => {
    return (
        <li className={CSS.NavigationItem}>
            <NavLink to={props.link}
                     activeClassName={CSS.active}
                     exact={props.exact}
                     onClick={props.onNavigating}>
                {props.children}
            </NavLink>
        </li>
    )
}

export default NavigationItem;