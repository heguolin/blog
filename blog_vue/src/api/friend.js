/**
 * 友链相关 API
 * 
 * @author hgl
 * @date 2025年12月
 */
import request from '@/utils/request'

export const fetchFriends = () => request.get('/friend/list')


