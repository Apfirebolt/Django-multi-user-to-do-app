import httpClient from "../../plugins/interceptor"

// Get Tasks
const getTasks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await httpClient.get('tasks', config)

  return response.data
}

// Create Task
const createTask = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await httpClient.post('tasks', data, config)

  return response.data
}

// Update task
const updateTask = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await httpClient.patch(`tasks/${data.id}`, data, config)

  return response.data
}

// Delete Task
const deleteTask = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await httpClient.delete(`tasks/${id}`, config)

  return response.data
}

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
}

export default taskService
