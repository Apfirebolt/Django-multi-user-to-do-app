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

const taskService = {
  getTasks,
  createTask,
}

export default taskService
