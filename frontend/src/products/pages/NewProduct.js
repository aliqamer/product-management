import React, { useCallback, useReducer } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';

import './NewProduct.css';

const formReducer = (state, action) => {

    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                }, isValid: formIsValid
            };

        default:
            return state;
    }
};

const NewProduct = () => {

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({ type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id })
    }, []);

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return (<Container>
        <Row><Col><h1>Enter product details</h1></Col><Col></Col></Row>
        <Row className="justify-content-md-center">
            <Col></Col>
            <Col>
                <Form onSubmit={placeSubmitHandler}>
                    <Input
                        id="title"
                        element="input"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter valid title"
                        onInput={inputHandler}
                    />

                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter valid description"
                        onInput={inputHandler}
                    />

                    <Input
                        id="price"
                        element="input"
                        type="text"
                        label="Price"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter valid price"
                        onInput={inputHandler}
                    />

                    <Button type="submit" disabled={!formState.isValid} > submit </Button>
                </Form>
            </Col>
            <Col></Col>
        </Row>
    </Container>);

};

export default NewProduct;