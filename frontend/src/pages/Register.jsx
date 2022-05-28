import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from '../features/auth/AuthSlice'
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/forms/FormContainer";

const RegisterScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user, isLoading, isSuccess } = useSelector(
    (state) => state.auth
  )

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      email,
      username,
      password,
    }

    dispatch(register(userData))
  };

  useEffect(() => {
    
    // Redirect when logged in
    if (user) {
      navigate('/category')
    }

    dispatch(reset())
  }, [user, navigate, dispatch])

  return (
    <FormContainer>
      <h3 className="text-center my-4">REGISTER</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="username" className="my-3">
          <Form.Label>Enter Your Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password again to confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign Up
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already a Member ? <Link to={"/login"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
