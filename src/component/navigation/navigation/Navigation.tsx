import React from "react";
import CSS from './Navigation.module.css';
import NavigationItem from "./item/NavigationItem";

const Navigation: React.FC = props => {
    return (
        <nav className={CSS.Navigation}>
            <ul>
                <NavigationItem link={'/'} exact>Build</NavigationItem>
                <NavigationItem link={'/orders'}>Orders</NavigationItem>
            </ul>
        </nav>
    )
}

export default Navigation;