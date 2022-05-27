import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from "react-bootstrap";
import { login, reset } from '../../features/auth/AuthSlice'

const TaskForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const TaskData = {
      name,
      description,
    }

    dispatch(login(TaskData))
  };

  return (
    <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="description" className="my-3">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Task description"
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

export default TaskForm;
