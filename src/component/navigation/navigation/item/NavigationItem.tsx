import React from "react";
import NavigationItemCSS from './NavigationItem.module.css'

type NavigationItemProps = { link: string; active: boolean }
const NavigationItem: React.FC<NavigationItemProps> = props => {
    return (
        <li className={NavigationItemCSS.NavigationItem}>
            <a className={props.active ? NavigationItemCSS.active : ''} href={props.link}>{props.children}</a>
        </li>
    )
}

export default NavigationItem;