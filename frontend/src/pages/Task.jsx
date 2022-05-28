import React, { useState, useEffect } from "react";
import { Container, Modal, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/common/Loader";
import {
  createTask,
  getTasks,
} from "../features/task/TaskSlice";
import {
  getCategories,
} from "../features/category/CategorySlice";
import TaskForm from "../components/modals/AddUpdateTask";

const TaskScreen = () => {
  const dispatch = useDispatch();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleClose = () => setIsModalOpened(false);
  const handleShow = () => setIsModalOpened(true);

  const { tasks, isLoading, isSuccess } = useSelector(
    (state) => state.task
  );

  const { categories } = useSelector(
    (state) => state.category
  );

  const createTaskUtil = (data) => {
    dispatch(createTask(data));
    handleClose();
  };

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

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
          <TaskForm createTaskUtil={createTaskUtil} categories={categories} />
        </Modal.Body>
      </Modal>

      {tasks.length > 0 && (
        <Table striped bordered hover className="my-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Task Name</th>
              <th>Task Description</th>
              <th>Task Priority</th>
              <th>Task Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((item) => (
              <tr key={item.id}>
                <td>1</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.priority}</td>
                <td>{item.category_name}</td>
                <td>
                  <Button variant="danger" onClick={handleShow} className="m-2">
                    Delete
                  </Button>
                  <Button variant="info" onClick={handleShow} className="m-2">
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!tasks.length && (
        <p className="text-center my-3">No tasks added</p>
      )}
    </Container>
  );
};

export default TaskScreen;
