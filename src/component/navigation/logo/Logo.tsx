import React from "react";
import BurgerLogo from '../../../assets/images/burger-logo.png'
import LogoCSS from './Logo.module.css'
const Logo:React.FC = props => {
    return (
        <div className={LogoCSS.Logo}>
            <img src={BurgerLogo} alt='My Burger'/>
        </div>
    )
}

export default Logo;