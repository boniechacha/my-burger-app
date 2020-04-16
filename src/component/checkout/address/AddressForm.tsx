import React from "react";
import Button from "../../util/button/Button";
import CSS from './AddressForm.module.css'
import {RouteComponentProps} from "react-router";
import Modal from "../../util/modal/Modal";
import LoadingComponent from "../../util/spinner/LoadingComponent";
import OrderAxios from "../../../service/order-axios";
import {convertQueryToMap} from "../../../util/functions";

type AddressFormState = { submitting: boolean, sending: boolean, error: string, name: string, email: string, addressCode: string }

interface AddressFormProps extends RouteComponentProps {
}


class AddressForm extends React.Component<AddressFormProps, AddressFormState> {
    state = {
        submitting: false,
        sending: false,
        error: '',
        name: '',
        email: '',
        addressCode: ''
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
                name: this.state.name,
                email: this.state.email,
                addressCode: this.state.addressCode,
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
                        <input type='text'
                               name='name'
                               placeholder='Name'
                               onChange={event => this.setState({name: event.target.value})}/>
                        <input type='email'
                               name='email'
                               placeholder='Email'
                               onChange={event => this.setState({email: event.target.value})}/>
                        <input type='text'
                               name='addressCode'
                               placeholder='Address Code'
                               onChange={event => this.setState({addressCode: event.target.value})}/>

                        <Button type={'Success'} clicked={(event) => this.submitHandler(event)}>Submit Order</Button>
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