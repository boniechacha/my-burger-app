import React from "react";
import Button from "../../util/button/Button";
import CSS from './AddressForm.module.css'
import Modal from "../../util/modal/Modal";
import LoadingComponent from "../../util/spinner/LoadingComponent";
import TextField from "../../util/textfield/TextField";
import {connect} from "react-redux";
import {RootState} from "../../state/reducer";
import Form from "./Form";
import Validation from "./Validation";
import {
    AddressFormProps,
    AddressFormReduxDispatchProps,
    AddressFormReduxStateProps,
    AddressFormState
} from "./AddressFormTypes";
import {submitOrder} from "../../state/order/OrderAction";
import {OrderData} from "../../../domain/OrderData";

class AddressForm extends React.Component<AddressFormProps, AddressFormState> {
    state = {
        submitting: false,
        valid: false,
        form: {
            name: {
                value: '',
                valid: false,
                changed: false,
                validation: {
                    required: true
                }
            },
            email: {
                value: '',
                valid: false,
                changed: false,
                validation: {
                    required: true
                }
            },
            addressCode: {
                value: '',
                valid: false,
                changed: false,
                validation: {
                    required: true
                }
            }
        }
    }

    submitHandler(event: React.MouseEvent<Element>) {
        event.preventDefault();
        this.setState({submitting: true});

        const order:OrderData = {
            price: this.props.price,
            ingredients: Object.fromEntries(this.props.ingredients.entries()),
            customer: {
                name: this.state.form.name.value,
                email: this.state.form.email.value,
                addressCode: this.state.form.addressCode.value,
            }
        }

        this.props.submitOrder(order);

    }

    valueChangeHandler(field: string, value: string) {
        let formChange: Form = {...this.state.form}
        formChange[field].value = value;
        formChange[field].changed = true;
        formChange[field].valid = this.isValid(formChange[field].validation, value);

        //check if the entire form is valid
        const formValid = Object.keys(formChange).reduce((valid, field) => valid && formChange[field].valid, true)
        this.setState({form: formChange, valid: formValid})
    }

    isValid(validation: Validation, value: string) {
        let valid = true;

        if (validation.required) {
            valid = value !== '' && valid;
        }

        //TODO implement other rules here
        return valid;
    }

    render() {

        const submissionMsg = this.props.orderSubmissionError === '' ? 'Submitted Successfully' : this.props.orderSubmissionError

        return (
            <React.Fragment>
                <Modal show={this.state.submitting}
                       onClosed={() => this.modalClosed()}>

                    <LoadingComponent loading={this.props.submittingOrder}>
                        <p>{submissionMsg}</p>
                    </LoadingComponent>

                </Modal>

                <div className={CSS.AddressForm}>
                    <form>
                        <TextField
                            name='name'
                            value={this.state.form.name.value}
                            valid={!this.state.form.name.changed || this.state.form.name.valid}
                            placeholder='Name'
                            onChange={e => this.valueChangeHandler('name', e.target.value)}/>

                        <TextField
                            name='email'
                            value={this.state.form.email.value}
                            valid={!this.state.form.email.changed || this.state.form.email.valid}
                            placeholder='Email'
                            onChange={e => this.valueChangeHandler('email', e.target.value)}/>

                        <TextField
                            name='addressCode'
                            value={this.state.form.addressCode.value}
                            valid={!this.state.form.addressCode.changed || this.state.form.addressCode.valid}
                            placeholder='Address Code'
                            onChange={e => this.valueChangeHandler('addressCode', e.target.value)}/>

                        <Button type={'Success'}
                                disabled={!this.state.valid}
                                clicked={(event) => this.submitHandler(event)}>Submit Order</Button>
                    </form>
                </div>
            </React.Fragment>

        )
    }

    private modalClosed() {
        this.props.history.push('/')
    }
}

const mapStateToProps = (state: RootState): AddressFormReduxStateProps => {
    return {
        ingredients: state.builder.ingredients,
        price: state.builder.price,
        submittingOrder: state.order.submittingOrder,
        orderSubmissionError: state.order.orderSubmissionError
    };
}

const mapDispatchToProps: AddressFormReduxDispatchProps = {
    submitOrder: (order: OrderData) => submitOrder(order)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);