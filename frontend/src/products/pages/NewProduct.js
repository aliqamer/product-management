import React, { useContext } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
// import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import MyFormGroup from '../../shared/components/FormElements/MyFormGroup';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';

import './NewProduct.css';

const NewProduct = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);
    let initialState = {
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        price: {
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
                'http://localhost:3001/userproducts',
                'POST',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    price: formState.inputs.price.value,
                    creator: auth.userId,
                    status: 'draft'
                }),
                {
                    'Content-Type': 'application/json'
                }
            ).then(res => {
                console.log('success');
                //todo
            });

        } catch (err) {
            console.log(err);
            console.log('error happened on add new product');
        }
    };

    return (
        <Container style={{ backgroundColor: 'lightgrey' }}>
            <Row style={{ margin: '3%' }}></Row>
            <Row>
                <Col></Col>
                <Col>
                    <h1>Add new product</h1>
                    {isLoading && <p>Loading...</p>}
                    <Form onSubmit={placeSubmitHandler} >
                        <MyFormGroup label="Product title"
                            controlId="formBasicTitle"
                            id="title"
                            name="title"
                            type="text"
                            placeholder="Enter title"
                            initialValid="false"
                            validators={[VALIDATOR_MINLENGTH(3)]}
                            errorText="Please enter a valid title."
                            onInput={inputHandler} />
                        <MyFormGroup label="Description"
                            controlId="formBasicDescription"
                            id="description"
                            name="description"
                            type="textarea"
                            placeholder="Enter description"
                            initialValid="false"
                            validators={[VALIDATOR_MINLENGTH(3)]}
                            errorText="Please enter a valid description, atleast 5 char"
                            onInput={inputHandler}
                        />
                        <MyFormGroup label="Price"
                            controlId="formBasicPrice"
                            id="price"
                            name="price"
                            type="price"
                            placeholder="Enter price"
                            initialValid="false"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid price"
                            onInput={inputHandler}
                        />
                        <Button variant="primary" type="submit" disabled={!formState.isValid}>
                            Submit
                    </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>

        // <Container>
        //     <Row><Col><h1>Enter product details</h1></Col><Col></Col></Row>
        //     <Row className="justify-content-md-center">
        //         <Col></Col>
        //         <Col>
        //             <Form onSubmit={placeSubmitHandler}>
        //                 <Input
        //                     id="title"
        //                     element="input"
        //                     type="text"
        //                     label="Title"
        //                     validators={[VALIDATOR_REQUIRE()]}
        //                     errorText="Please enter valid title"
        //                     onInput={inputHandler}
        //                 />

        //                 <Input
        //                     id="description"
        //                     element="textarea"
        //                     label="Description"
        //                     validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        //                     errorText="Please enter valid description"
        //                     onInput={inputHandler}
        //                 />

        //                 <Input
        //                     id="price"
        //                     element="input"
        //                     type="text"
        //                     label="Price"
        //                     validators={[VALIDATOR_REQUIRE()]}
        //                     errorText="Please enter valid price"
        //                     onInput={inputHandler}
        //                 />

        //                 <Button type="submit" disabled={!formState.isValid} > submit </Button>
        //             </Form>
        //         </Col>
        //         <Col></Col>
        //     </Row>
        // </Container>
    );

};

export default NewProduct;