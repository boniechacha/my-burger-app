import React from "react";
import {Runnable} from "../../../util/functions";
import BackdropCSS from './Backdrop.module.css';

type BackdropProps = { show: boolean; clicked: Runnable }

const Backdrop: React.FC<BackdropProps> = (props) => {
    return props.show ? <div className={BackdropCSS.Backdrop} onClick={() => props.clicked()}></div> : <React.Fragment/>
}

export default Backdrop;