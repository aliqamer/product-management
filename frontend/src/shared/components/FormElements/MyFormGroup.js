import React, { useReducer, useEffect } from 'react'
import { Form, Alert } from 'react-bootstrap'
import { validate } from '../../util/validators';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true
            }
        default:
            return state;
    }
};

const MyFormGroup = (props) => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid === 'true' || false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };


    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    return (
        <Form.Group controlId={props.controlId}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control
                name={props.name}
                type={props.email}
                placeholder={props.placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
            { !inputState.isValid && inputState.isTouched &&
                <Form.Text style={{ color: 'red' }} >
                    {props.errorText}
                    {/* <Alert variant='danger'>{props.errorText}</Alert> */}
                </Form.Text>}
        </Form.Group >
    )
}

export default MyFormGroup;