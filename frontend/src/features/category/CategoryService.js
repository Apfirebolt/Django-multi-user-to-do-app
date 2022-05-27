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

const categoryService = {
  getCategories,
  createCategory,
}

export default categoryService
