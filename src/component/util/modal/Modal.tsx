import React from "react";
import ModalCSS from './Modal.module.css';
import Backdrop from "../backdrop/Backdrop";
import {Runnable} from "../../../util/functions";

type ModalProps = { show: boolean,onClosed:Runnable};

const Modal: React.FC<ModalProps> = (props) => {

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={() => props.onClosed()}/>
            <div className={[ModalCSS.Modal, props.show ? ModalCSS.Show : ModalCSS.Hide].join(' ')}>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default Modal;