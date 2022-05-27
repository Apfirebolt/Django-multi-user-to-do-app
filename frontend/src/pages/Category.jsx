import React, { useState, useEffect } from "react";
import { Container, Modal, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/common/Loader";
import {
  createCategory,
  getCategories,
} from "../features/category/CategorySlice";
import CategoryForm from "../components/modals/AddUpdateCategory";

const CategoryScreen = () => {
  const dispatch = useDispatch();

  const [isModalOpened, setIsModalOpened] = useState(false);

  const handleClose = () => setIsModalOpened(false);
  const handleShow = () => setIsModalOpened(true);

  const { categories, isLoading, isSuccess } = useSelector(
    (state) => state.category
  );

  const createCategoryUtil = (data) => {
    dispatch(createCategory(data));
    handleClose();
  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

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
          <CategoryForm createCategoryUtil={createCategoryUtil} />
        </Modal.Body>
      </Modal>

      {categories.length && (
        <Table striped bordered hover className="my-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Category Description</th>
              <th>Category Image</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item) => (
              <tr key={item.id}>
                <td>1</td>
                <td>{item.name} Crook</td>
                <td>{item.description}</td>
                <td>
                  <img src={item.category_image} alt="Category Image Not available" height="150" width="250"/>
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
