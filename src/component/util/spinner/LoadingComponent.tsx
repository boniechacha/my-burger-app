import React from "react";
import withLoading from "./withLoading";

const LoadingComponent:React.FC = (props) => {
    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default withLoading(LoadingComponent);