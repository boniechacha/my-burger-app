import React from "react";
import {Runnable} from "../../util/functions";
import CSS from './HamburgerButton.module.css'

type HamburgerButtonProps = { onClicked: Runnable }

const HamburgerButton: React.FC<HamburgerButtonProps> = (props) => {
    return (
        <div className={CSS.Hamburger} onClick={() => props.onClicked()}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default HamburgerButton;