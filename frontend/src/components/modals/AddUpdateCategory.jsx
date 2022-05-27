import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Form, Button } from "react-bootstrap";
import { login, reset } from '../../features/auth/AuthSlice'

const CategoryForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const categoryData = {
      name,
      description,
    }

    dispatch(login(categoryData))
  };

  return (
    <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="description" className="my-3">
          <Form.Label>Category Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
  );
};

export default CategoryForm;
