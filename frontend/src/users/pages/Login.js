import React, { useContext } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import MyFormGroup from '../../shared/components/FormElements/MyFormGroup';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Login = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);
    let initialState = {
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    };

    const [formState, inputHandler, setFormData] = useForm(
        initialState,
        false
    );

    const placeSubmitHandler = async event => {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
        try {
            const response = await fetch(
                'http://localhost:3001/users?email=' + formState.inputs.email.value
            );

            const responseData = await response.json();

            console.log(responseData);
            console.log(response.status);
            if (responseData.length > 0) {
                console.log('success');
                auth.login(responseData[0].username);
            }

        } catch (err) {
            console.log(err);
            console.log('error happened on login');
        }
    };

    return (
        <Container style={{ backgroundColor: 'lightgrey' }}>
            <Row style={{ margin: '3%' }}></Row>
            <Row>
                <Col></Col>
                <Col>
                    <h1>Login Required</h1>
                    {isLoading && <p>Loading...</p>}
                    <Form onSubmit={placeSubmitHandler} >
                        <MyFormGroup label="Email email address"
                            controlId="formBasicEmail"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            initialValid="false"
                            validators={[VALIDATOR_EMAIL()]}
                            errorText="Please enter a valid email."
                            onInput={inputHandler} />
                        <MyFormGroup label="Password"
                            controlId="formBasicPassword"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            initialValid="false"
                            validators={[VALIDATOR_MINLENGTH(5)]}
                            errorText="Please enter a valid password, atleast 5 char"
                            onInput={inputHandler}
                        />
                        <Button variant="primary" type="submit" disabled={!formState.isValid}>
                            Login
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default Login;