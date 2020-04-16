import React, {MouseEventHandler} from "react";
import ButtonCSS from './Button.module.css'

type ButtonProps = { type: 'Danger' | 'Success'; clicked: MouseEventHandler }

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button className={[ButtonCSS.Button, ButtonCSS[props.type]].join(' ')}
                onClick={(event) => props.clicked(event)}>
            {props.children}
        </button>
    )
};

export default Button;