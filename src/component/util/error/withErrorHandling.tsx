import React, {PropsWithChildren} from "react";
import Modal from "../modal/Modal";

interface WithErrorsProps {
    error: string;
}

const withErrorHandling = <P extends object>(Component: React.ComponentType<P>) => {

    return class extends React.Component<P & WithErrorsProps & PropsWithChildren<P>> {

        closed = false;

        render() {
            const {error, ...otherProps} = this.props;
            const showError = !this.closed && !!error;

            return (
                <React.Fragment>
                    <Modal show={showError} onClosed={() => this.closeModal()}>
                        {error}
                    </Modal>

                    <Component {...otherProps as P}/>
                </React.Fragment>
            )
        }

        private closeModal() {
            this.closed = true;
            this.forceUpdate(() => this.closed = false)
        }
    }

}

export default withErrorHandling;