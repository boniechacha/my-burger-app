import React from "react";
import CSS from './Spinner.module.css'
const Spinner:React.FC = props => {
    return (
        <div className={CSS.Spinner}>Loading ...</div>
    )
}

export default Spinner;