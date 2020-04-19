import React, {MouseEventHandler} from "react";
import CSS from './Navigation.module.css';
import NavigationItem from "./item/NavigationItem";

type NavigationProps = { onNavigating: MouseEventHandler<HTMLAnchorElement> }
const Navigation: React.FC<NavigationProps> = props => {
    return (
        <nav className={CSS.Navigation}>
            <ul>
                <NavigationItem link={'/'} exact onNavigating={props.onNavigating}>Build</NavigationItem>
                <NavigationItem link={'/orders'} onNavigating={props.onNavigating}>Orders</NavigationItem>
            </ul>
        </nav>
    )
}

export default Navigation;