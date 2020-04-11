import React from "react";
import {Runnable} from "../../util/functions";
import ButtonCSS from './Button.module.css'

type ButtonProps = { type: 'Danger' | 'Success'; clicked: Runnable }

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button className={[ButtonCSS.Button, ButtonCSS[props.type]].join(' ')}
                onClick={() => props.clicked()}>
            {props.children}
        </button>
    )
};

export default Button;