/**
 * 文章相关 API
 * 
 * @author hgl
 * @date 2025年12月
 */
import request from '@/utils/request'

export const getArticles = (page = 1, size = 10) => {
  return request({
    url: '/articles',
    method: 'get',
    params: { page, size }
  })
}

export const getArticleById = (id) => {
  return request({
    url: `/articles/${id}`,
    method: 'get'
  })
}

export const getArticlesByCategory = (categoryId, page = 1, size = 10) => {
  return request({
    url: `/articles/category/${categoryId}`,
    method: 'get',
    params: { page, size }
  })
}

export const searchArticles = (keyword, page = 1, size = 10) => {
  return request({
    url: '/articles/search',
    method: 'get',
    params: { keyword, page, size }
  })
}

export const getPopularArticles = () => {
  return request({
    url: '/articles/popular',
    method: 'get'
  })
}

