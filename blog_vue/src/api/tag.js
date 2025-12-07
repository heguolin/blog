/**
 * 标签相关 API
 * 
 * @author hgl
 * @date 2025年12月
 */
import request from '@/utils/request'

export const getAllTags = () => {
  return request({
    url: '/tags',
    method: 'get'
  })
}

export const getTagById = (id) => {
  return request({
    url: `/tags/${id}`,
    method: 'get'
  })
}

