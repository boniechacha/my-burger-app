import React, {ChangeEventHandler} from "react";
import CSS from './TextField.module.css'

type TextFieldProps = {
    name: string,
    value:string,
    valid:boolean,
    label?: string,
    placeholder?: string ,
    onChange:ChangeEventHandler<HTMLInputElement>
}
const TextField: React.FC<TextFieldProps> = props => {
    return (
        <div className={`${CSS.TextField} ${!props.valid?CSS.Invalid:''}`}>
            <label>{props.label}</label>
            <input type='text' placeholder={props.placeholder} name={props.name} onChange={props.onChange} value={props.value}/>
        </div>
    )
}

export default TextField;