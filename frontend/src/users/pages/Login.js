import React, { useContext } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
// import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import MyFormGroup from '../../shared/components/FormElements/MyFormGroup';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Login = () => {

    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(false);

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

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
        try {
            sendRequest(
                'http://localhost:3001/users',
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    first_name: 'new',
                    password: formState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            ).then(res => {
                console.log('success');
                auth.login()
            });

        } catch (err) {
            console.log(err);
            console.log('error happened on login');
        }
    };


    // const placeSubmitHandler = event => {
    //     event.preventDefault();
    //     setIsLoading(true);
    //     console.log(formState.inputs); // send this to the backend!

    //     try {
    //         setTimeout(function () { //Start the timer
    //             console.log('delayed'); //After 1 second, set render to true
    //         }.bind(this), 1000)
    //         const response = fetch('http://localhost:3001/users', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 email: formState.inputs.email.value,
    //                 first_name: 'new',
    //                 password: formState.inputs.password.value
    //             })
    //         }).then(response => response.json())
    //             .then(data => {
    //                 console.log(data);
    //                 setIsLoading(false);
    //                 auth.login();
    //             });

    //     } catch (err) {
    //         setIsLoading(false);
    //     }

    // };

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