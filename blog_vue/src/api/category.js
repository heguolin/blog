/**
 * 分类相关 API
 * 
 * @author hgl
 * @date 2025年12月
 */
import request from '@/utils/request'

export const getAllCategories = () => {
  return request({
    url: '/categories',
    method: 'get'
  })
}

export const getCategoryById = (id) => {
  return request({
    url: `/categories/${id}`,
    method: 'get'
  })
}

