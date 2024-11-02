import requestAuth from '../utils/requestAuth'
import requestTasks from '../utils/requestTasks'


const token = localStorage.getItem('token');

export function loginRequest(data) {
  return requestAuth({
    url: '/login',
    method: 'post',
    data
  })
}

export function findAlltaskRequest() {
  return requestTasks({
    url: '/tasks',
    method: 'get',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function savedRequest(data) {
  return requestTasks({
    url: '/tasks',
    method: 'post',
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function updateRequest(id,data) {
  return requestTasks({
    url: `/tasks/${id}`,
    method: 'put',
    data,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function deleteRequest(id) {
  return requestTasks({
    url: `/tasks/${id}`,
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}