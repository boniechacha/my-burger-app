import React, {PropsWithChildren} from "react";

type HOCWrapperProps = { hoc: (props: any) => React.ElementType }

const HOCWrapper: React.FC<HOCWrapperProps & PropsWithChildren<any>> = (props) => {
    return props.hoc(
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}

export default HOCWrapper;