import React /*,{useState, Component}*/ from "react";
import { Button, Card, Col, Container, Form, Jumbotron, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { auth, generateUserDocument } from "./firebase";

const createUserWithEmailAndPasswordHandler = async (email, password, displayName, role) => {
	try{
		const {user} = await auth.createUserWithEmailAndPassword(email, password);
		await generateUserDocument(user, {displayName, role});
	}
	catch(error){
		console.log(error);
	}
};

export default function SignUp()
{
    const { register, handleSubmit, errors} = useForm();
    const onSubmit = data => createUserWithEmailAndPasswordHandler(data.email, data.password, data.username, data.role);

    return(
		<div style={{backgroundColor: "#1ABC56"}}>
			<Jumbotron style={{backgroundColor: "#F9F8F9", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderTopLeftRadius: "0rem", borderTopRightRadius: "0rem", borderBottomRightRadius: "5rem", borderBottomLeftRadius: "5rem"}}>
				<h1 className="text-main-brand text-center font-weight-bold display-2">Sign Up</h1>
			</Jumbotron>
            <Container class="bg-white">
                <Jumbotron style={{backgroundColor: "#F9F8F9", borderRadius: "3rem"}}>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Control type="text" placeholder="Name" class="border-0" />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Control type="email" placeholder="Email Address" class="border-0" />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Control type="password" placeholder="Password" class="border-0" />
                        </Form.Group>
                        <Form.Group controlId="formConfPassword">
                            <Form.Control type="password" placeholder="Confirm Password" class="border-0" />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Control placeholder="Street Address" />
                        </Form.Group>
                        <Form.Group controlId="formGridAddress2">
                            <Form.Control placeholder="Apartment, studio, or floor" />
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Control placeholder="City"/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Control as="select" defaultValue="State">
                                    <option>State</option>
                                    <option>AL</option>
                                    <option>AK</option>
                                    <option>AZ</option>
                                    <option>AR</option>
                                    <option>CA</option>
                                    <option>CO</option>
                                    <option>CT</option>
                                    <option>DE</option>
                                    <option>FL</option>
                                    <option>...</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Control placeholder="Zip"/>
                            </Form.Group>
                        </Form.Row>

                        <fieldset>
                            <Form.Group as={Row}>
                                <Form.Label as="legend" column sm={4}>
                                    What type of user are you?
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Check
                                    type="radio"
                                    label="Farmer"
                                    name="roleRadios"
                                    id="farmerRadio"
                                    />
                                    <Form.Check
                                    type="radio"
                                    label="Consumer"
                                    name="roleRadios"
                                    id="consumerRadio"
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>
                        <Button variant="main-brand" type="submit" style={{width: "100%"}}>Sign Up</Button>
                    </Form>
                </Jumbotron>
            </Container>
		</div>
    )
}