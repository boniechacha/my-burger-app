import React from "react";
import withErrorHandling from "./withErrorHandling";

const ErrorWrapper:React.FC = (props) => {
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default withErrorHandling(ErrorWrapper);