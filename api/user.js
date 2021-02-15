import request from '@/utils/request'

export const login = (user) => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data: {
      user
    }
  })
}

export const register = (data) => {
  return request({
    method: 'POST',
    url: '/api/users',
    data: {
      data
    }
  })
}