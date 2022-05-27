import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import TaskForm from "../components/modals/AddUpdateTask";

const TaskScreen = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleClose = () => setIsModalOpened(false);
  const handleShow = () => setIsModalOpened(true);

  return (
    <Container>
      <h3 className="text-center my-4">Task</h3>

      <Button variant="primary" onClick={handleShow}>
        Add Task
      </Button>

      <Modal show={isModalOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskForm />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default TaskScreen;
