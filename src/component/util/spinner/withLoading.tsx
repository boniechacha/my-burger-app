import Spinner from "./Spinner";
import React, {PropsWithChildren} from "react";

interface WithLoadingProps {
    loading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) => {
    return (props: P & WithLoadingProps & PropsWithChildren<P>) => {
        const {loading, ...otherProps} = props;
        return loading ? <Spinner/> : <Component {...otherProps as P} >{otherProps.children}</Component>;
    }
}

export default withLoading;