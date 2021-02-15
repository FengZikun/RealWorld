import request from '@/utils/request'

export const getArticelInfo = (params) => {
  return request({
    method: 'GET',
    url: `/api/articles/${params}`
  })
}