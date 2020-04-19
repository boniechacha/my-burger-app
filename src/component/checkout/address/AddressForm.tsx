import React from "react";
import Button from "../../util/button/Button";
import CSS from './AddressForm.module.css'
import {RouteComponentProps} from "react-router";
import Modal from "../../util/modal/Modal";
import LoadingComponent from "../../util/spinner/LoadingComponent";
import OrderAxios from "../../../service/order-axios";
import {convertQueryToMap} from "../../../util/functions";
import TextField from "../../util/textfield/TextField";

type Validation = { required?: boolean, minLength?: number, maxLength?: number }
type Form = {
    [p: string]: {
        value: string,
        valid: boolean,
        changed: boolean,
        validation: Validation
    }
};
type AddressFormState = { submitting: boolean, sending: boolean, valid: boolean, error: string, form: Form }
interface AddressFormProps extends RouteComponentProps {}

class AddressForm extends React.Component<AddressFormProps, AddressFormState> {
    state = {
        submitting: false,
        sending: false,
        error: '',
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
        this.setState({error: '', submitting: true, sending: true});

        const queryMap = convertQueryToMap(this.props.location.search);

        const price = +queryMap.get('price')!;
        queryMap.delete('price');

        const ingredients = Object.fromEntries(queryMap.entries())
        const ingredientData = Object.keys(ingredients).reduce((prev, cur) => {
            prev.set(cur, +queryMap.get(cur)!);
            return prev;
        }, new Map<string, number>());

        const order = {
            price: price,
            ingredients: Object.fromEntries(ingredientData.entries()),
            customer: {
                name: this.state.form.name.value,
                email: this.state.form.email.value,
                addressCode: this.state.form.addressCode.value,
            }
        }

        console.log(order)

        OrderAxios.post("/order.json", order)
            .then(response => {
                this.setState({error: '', sending: false});
            })
            .catch(error => {
                this.setState({error: error.toString(), sending: false});
            })
            .finally(() => {
            })

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

        const submissionMsg = this.state.error === '' ? 'Submitted Successfully' : this.state.error

        return (
            <React.Fragment>
                <Modal show={this.state.submitting}
                       onClosed={() => this.modalClosed()}>

                    <LoadingComponent loading={this.state.sending}>
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

export default AddressForm;