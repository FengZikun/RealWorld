import { request } from '@/plugins/request'

export const getArticelInfo = (params) => {
  return request({
    method: 'GET',
    url: `/api/articles/${params}`
  })
}

export const getComments = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

export const addComments = (slug, data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}