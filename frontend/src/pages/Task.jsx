import React, { useState, useEffect } from "react";
import { Container, Modal, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/common/Loader";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../features/task/TaskSlice";
import {
  getCategories,
} from "../features/category/CategorySlice";
import TaskForm from "../components/modals/AddUpdateTask";

const TaskScreen = () => {
  const dispatch = useDispatch();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [confirmModalOpened, isConfirmModalOpened] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);

  const handleClose = () => setIsModalOpened(false);
  const handleShow = () => setIsModalOpened(true);

  const handleCloseConfirmModal = () => isConfirmModalOpened(false);
  const handleOpenConfirmModal = () => isConfirmModalOpened(true);

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

  const openUpdateTask = (data) => {
    setUpdateMode(true);
    setSelectedTask(data);
    handleShow();
  };

  const openDeleteTask = (data) => {
    setSelectedTask(data);
    handleOpenConfirmModal();
  };

  const updateTaskUtil = (data) => {
    dispatch(updateTask(data));
    handleClose();
  };

  const deleteTaskUtil = () => {
    dispatch(deleteTask(selectedTask.id));
    handleCloseConfirmModal();
    dispatch(getTasks());
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
          <TaskForm createTaskUtil={createTaskUtil} updateTaskUtil={updateTaskUtil} task={selectedTask} updateMode={updateMode} categories={categories} />
        </Modal.Body>
      </Modal>

      {selectedTask && (
        <Modal show={confirmModalOpened} onHide={handleCloseConfirmModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-danger">
              Are you sure you want to delete task named "
              {selectedTask.name}" ?
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={() => deleteTaskUtil()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      )}

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
                  <Button
                    variant="danger"
                    className="m-2"
                    onClick={() => openDeleteTask(item)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => openUpdateTask(item)}
                    className="m-2"
                  >
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
