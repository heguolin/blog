/**
 * 路由配置文件
 * 
 * @author hgl
 * @date 2025年12月
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

// 懒加载页面组件
const Articles = () => import('@/views/Articles.vue')
const Archive = () => import('@/views/Archive.vue')
const Friends = () => import('@/views/Friends.vue')
const MessageBoard = () => import('@/views/MessageBoard.vue')
const BlogDetail = () => import('@/views/BlogDetail.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/articles', component: Articles },
  { path: '/archive', component: Archive },
  { path: '/friends', component: Friends },
  { path: '/message', component: MessageBoard },
  { path: '/blog/:id', component: BlogDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router