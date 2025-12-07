/**
 * 博客前端主入口文件
 * 
 * @author hgl
 * @date 2025年12月
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

createApp(App).use(router).mount('#app')
