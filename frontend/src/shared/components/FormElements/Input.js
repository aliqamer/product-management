import React, { useReducer, useEffect } from 'react';
import { validate } from '../../util/validators';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';

import './Input.css';

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

const Input = props => {

    const [inputState, dispatch] = useReducer(inputReducer,
        {
            value: '',
            isTouched: false,
            isValid: false
        });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        props.onInput(id, value, isValid)
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
    }

    const element = props.element === 'input'
        ? (<input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputState.value}
        />)
        : (<textarea id={props.id} rows={props.rows || 3}
            onChange={changeHandler}
            value={inputState.value}
            onBlur={touchHandler} />);

    const element2 = <Form.Control
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
    />

    return (
        <div className={` ${!inputState.isValid && inputState.isTouched && 'form-control--invalids'} `}>
            {/* <Form.Label htmlFor={props.id}>{props.label}</Form.Label> */}
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {/* {element2} */}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>);
};

export default Input;