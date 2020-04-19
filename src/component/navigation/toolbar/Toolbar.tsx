import React from "react";
import CSS from './Toolbar.module.css'
import Logo from "../logo/Logo";
import Navigation from "../navigation/Navigation";

const Toolbar: React.FC = (props) => {
    return (
        <header className={`${CSS.Toolbar} ${CSS.DesktopOnly}`}>
            <div className={CSS.Logo}>
                <Logo/>
            </div>

            <Navigation onNavigating={(e)=>{}}/>
        </header>
    )
}

export default Toolbar;