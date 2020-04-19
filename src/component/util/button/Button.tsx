import React, {MouseEventHandler} from "react";
import ButtonCSS from './Button.module.css'

type ButtonProps = { type: 'Danger' | 'Success'; clicked: MouseEventHandler; disabled?: boolean }

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button className={[ButtonCSS.Button, ButtonCSS[props.type]].join(' ')}
                onClick={(event) => props.clicked(event)}
                disabled={props.disabled}>
            {props.children}
        </button>
    )
};

export default Button;