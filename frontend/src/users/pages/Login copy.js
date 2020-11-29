import React, { useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
// import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';

const Login = () => {

    const [loginform, setEmail] = useState({
        email: "",
        password: ""
    });

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(loginform);
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setEmail(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
    }

    return (
        <Container style={{ backgroundColor: 'grey' }}>
            <Row style={{ margin: '3%' }}></Row>
            <Row>
                <Col></Col>
                <Col>
                    <h1>Login form</h1>
                    <Form onSubmit={placeSubmitHandler}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                onChange={handleChange}
                                value={loginform.email} />
                            {/* <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={loginform.password}
                                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
                                onChange={handleChange} />
                        </Form.Group>
                        {/* <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default Login;