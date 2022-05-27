import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import CategoryForm from "../components/modals/AddUpdateCategory";

const CategoryScreen = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleClose = () => setIsModalOpened(false);
  const handleShow = () => setIsModalOpened(true);

  return (
    <Container>
      <h3 className="text-center my-4">CATEGORY</h3>

      <Button variant="primary" onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={isModalOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Category Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default CategoryScreen;
