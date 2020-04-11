import React from "react";
import NavigationCSS from './Navigation.module.css'
import NavigationItem from "./item/NavigationItem";
const Navigation: React.FC = props => {
    return (
        <nav className={NavigationCSS.Navigation}>
            <ul>
                <NavigationItem link={'/'} active={false}>Build</NavigationItem>
                <NavigationItem link={'/'} active={false}>Checkout</NavigationItem>
            </ul>
        </nav>
    )
}

export default Navigation;