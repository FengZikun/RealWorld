import request from '@/utils/request'

export const getList = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

export const getTag = (params) => {
  return request({
    method: 'GET',
    url: '/api/tags',
    params
  })
}