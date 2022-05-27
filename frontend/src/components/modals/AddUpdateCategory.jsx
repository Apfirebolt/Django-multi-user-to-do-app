import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CategoryForm = (props) => {
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category_image, setCategoryImage] = useState("");

  const onChangeCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Create a new form data object
    let formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category_image", category_image);

    props.createCategoryUtil(formData);
  };

  return (
    <Form onSubmit={submitHandler} encType="multipart/form-data">
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
          as="textarea" 
          rows={3}
          type="text"
          placeholder="Enter category description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="formFile" className="my-3">
        <Form.Label>Upload Category Image</Form.Label>
        <Form.Control 
          type="file"
          placeholder="Category Image"
          onChange={onChangeCategoryImage} 
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  );
};

export default CategoryForm;
