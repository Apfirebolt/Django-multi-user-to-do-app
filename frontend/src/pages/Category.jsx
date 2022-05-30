import React, { useState, useEffect } from "react";
import { Container, Modal, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/common/Loader";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "../features/category/CategorySlice";

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import CategoryForm from "../components/modals/AddUpdateCategory";

const CategoryScreen = () => {
  const dispatch = useDispatch();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [confirmModalOpened, isConfirmModalOpened] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);

  const handleClose = () => setIsModalOpened(false);
  const handleShow = () => setIsModalOpened(true);

  const handleCloseConfirmModal = () => isConfirmModalOpened(false);
  const handleOpenConfirmModal = () => isConfirmModalOpened(true);

  const { categories, isLoading, isSuccess } = useSelector(
    (state) => state.category
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const createCategoryUtil = (data) => {
    dispatch(createCategory(data));
    handleClose();
  };

  const openCreateCategoryModal = () => {
    setUpdateMode(false);
    setSelectedCategory(null);
    handleShow();
  };

  const openUpdateCategory = (data) => {
    setUpdateMode(true);
    setSelectedCategory(data);
    handleShow();
  };

  const openDeleteCategory = (data) => {
    setSelectedCategory(data);
    handleOpenConfirmModal();
  };

  const updateCategoryUtil = (data) => {
    dispatch(updateCategory(data));
    handleClose();
  };

  const deleteCategoryUtil = () => {
    dispatch(deleteCategory(selectedCategory.id));
    handleCloseConfirmModal();
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <h3 className="my-3">Welcome, {user.userData.username || user.username}</h3>
      <div className="d-flex my-3 bg-dark text-white p-3 justify-content-between align-items-center">
        <h3>CATEGORY</h3>

        <Button variant="primary" onClick={openCreateCategoryModal}>
          Add Category
        </Button>
      </div>

      <Modal show={isModalOpened} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {updateMode ? "Update Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryForm
            createCategoryUtil={createCategoryUtil}
            updateCategoryUtil={updateCategoryUtil}
            category={selectedCategory}
            updateMode={updateMode}
          />
        </Modal.Body>
      </Modal>

      {selectedCategory && (
        <Modal show={confirmModalOpened} onHide={handleCloseConfirmModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-danger">
              Are you sure you want to delete category named "
              {selectedCategory.name}" ?
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={() => deleteCategoryUtil()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {categories.length && (
        <Table striped bordered hover className="my-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Category Description</th>
              <th>Category Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr key={item.id}>
                <td>1</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    src={item.category_image}
                    alt="Category Image Not available"
                    height="100"
                    width="150"
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="m-2"
                    onClick={() => openDeleteCategory(item)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => openUpdateCategory(item)}
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
      {!categories.length && (
        <p className="text-center my-3">No categories added</p>
      )}
    </Container>
    
  );
};

export default CategoryScreen;
