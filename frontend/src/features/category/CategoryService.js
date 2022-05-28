import httpClient from "../../plugins/interceptor"

// Get Categories
const getCategories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await httpClient.get('category', config)

  return response.data
}

// Create category
const createCategory = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await httpClient.post('/category', data, config)

  return response.data
}

// Update category
const updateCategory = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await httpClient.patch(`category/${data.get('id')}`, data, config)

  return response.data
}

// Delete category
const deleteCategory = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await httpClient.delete(`category/${id}`, config)

  return response.data
}

const categoryService = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
}

export default categoryService
