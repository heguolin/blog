/**
 * 评论相关 API
 * 
 * @author hgl
 * @date 2025年12月
 */
import request from '@/utils/request'

export const fetchComments = () => request.get('/comment/list')

export const saveComment = (data) => request.post('/comment/save', data)


