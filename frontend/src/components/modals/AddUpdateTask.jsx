import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const TaskForm = (props) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [deadLine, setDeadline] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const taskData = {
      name,
      description,
      priority,
      deadline_date: deadLine,
      category,
    };

    props.createTaskUtil(taskData);
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
          as="textarea"
          rows={6}
          placeholder="Enter Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="deadline_date" className="my-3">
        <Form.Label>Task Deadline Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Select Task Deadline Date"
          value={deadLine}
          onChange={(e) => setDeadline(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="priority" className="my-3">
        <Form.Label>Set Task Priority</Form.Label>
        <Form.Control
          type="number"
          placeholder="Select Task Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="category" className="my-3">
        <Form.Label>Select Category</Form.Label>
        <Form.Control
          as="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {props.categories.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  );
};

export default TaskForm;
