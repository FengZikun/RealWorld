import { request } from '@/plugins/request'

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

export const getFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

export const addFavorite = (slug) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

export const deleteFavorite = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}