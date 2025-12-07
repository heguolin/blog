<!--
  博客前端主应用组件
  @author hgl
  @date 2025年12月
-->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import StarBackground from './components/StarBackground.vue'

const isScrolled = ref(false)
const searchText = ref('')
const router = useRouter()

// --- 鼠标点击特效逻辑 START ---
const initMouseEffect = () => {
  let clickCount = 0
  const textContent = [
    '❤富强❤',
    '❤民主❤',
    '❤文明❤',
    '❤和谐❤',
    '❤自由❤',
    '❤平等❤',
    '❤公正❤',
    '❤法治❤',
    '❤爱国❤',
    '❤敬业❤',
    '❤诚信❤',
    '❤友善❤'
  ]

  document.addEventListener('click', e => {
    const span = document.createElement('span')
    span.style.zIndex = '99999'
    span.style.position = 'absolute'
    span.style.fontWeight = 'bold'
    span.style.userSelect = 'none'
    span.style.pointerEvents = 'none'
    span.style.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`

    span.innerText = textContent[clickCount % textContent.length]
    clickCount++

    const x = e.pageX
    const y = e.pageY
    span.style.left = `${x}px`
    span.style.top = `${y}px`

    span.className = 'mouse-effect-anim'
    document.body.appendChild(span)

    setTimeout(() => {
      document.body.removeChild(span)
    }, 1000)
  })
}
// --- 鼠标点击特效逻辑 END ---

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleSearch = () => {
  if (searchText.value.trim()) {
    alert(`正在搜索: ${searchText.value}`)
    searchText.value = ''
  }
}

onMounted(() => {
  initMouseEffect()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="anime-container">
    <StarBackground />
    <!-- 顶部导航栏 -->
    <nav class="glass-nav" :class="{ 'nav-scrolled': isScrolled }">
      <div class="logo" @click="router.push('/')">🌸 hglの小博客</div>
      <div class="links">
        <router-link to="/"><i>🏠</i> 首页</router-link>
        <router-link to="/articles"><i>📚</i> 文章</router-link>
        <router-link to="/message"><i>💬</i> 留言板</router-link>
        <router-link to="/archive"><i>📅</i> 归档</router-link>
        <router-link to="/friends"><i>🔗</i> 友链</router-link>
      </div>
      <div class="search-box">
        <input
          type="text"
          placeholder="Search..."
          v-model="searchText"
          @keyup.enter="handleSearch"
        />
        <span class="search-icon">🔍</span>
      </div>
    </nav>

    <!-- 主要内容区：由路由页面填充 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 固定立绘 Waifu -->
    <div class="waifu-corner">
      <!-- 本地 PNG -->
      <img
        src="waifu-corner.png"
        alt="waifu"
      />
    </div>

    <!-- 底部波浪 Footer -->
    <footer class="anime-footer">
      <div class="footer-wave-box">
        <svg
          class="waves footer-waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g class="parallax footer-parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(46, 96, 122, 0.7)" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(46, 96, 122, 0.5)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(46, 96, 122, 0.3)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="#223a46" />
          </g>
        </svg>
      </div>
      <div class="footer-content">
        <p>分享技术的每一天 | Designed by hgl</p>
        <p>本站已安全运行 <span>10</span> 天</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* 动漫风格核心样式 */

/* 1. 全屏背景 */
.anime-container {
  min-height: 100vh;
  width: 100%;
  font-family: 'Comic Sans MS', 'Microsoft YaHei', sans-serif;
  color: #333;
}

/* 导航栏改为固定定位，压在 Hero 图片上 */
.glass-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: all 0.4s ease;
  background: transparent;
}

.nav-scrolled {
  background: rgba(20, 30, 40, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  padding: 0.6rem 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  font-family: 'M PLUS Rounded 1c', 'Microsoft YaHei', sans-serif;
  text-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
}

.links {
  display: flex;
  gap: 25px;
}

.links a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
}

.links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #409eff;
  transition: width 0.3s;
}

.links a:hover {
  color: #ffffff;
}

.links a:hover::after {
  width: 100%;
}

.router-link-active {
  color: #409eff !important;
}

.search-box {
  position: relative;
}

.search-box input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 8px 15px 8px 35px;
  color: #fff;
  outline: none;
  width: 150px;
  transition: all 0.3s;
}

.search-box input:focus {
  width: 220px;
  background: rgba(0, 0, 0, 0.3);
  border-color: #409eff;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  opacity: 0.7;
}

/* 主内容布局 */
.main-content {
  max-width: 100%;
  margin: 0;
  padding: 0;
}

/* 固定立绘：右下角 Waifu */
.waifu-corner {
  position: fixed;
  bottom: 0;
  right: 20px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.3;
}

.waifu-corner img {
  height: 80vh;
  width: auto;
  object-fit: contain;
  animation: breathe 4s ease-in-out infinite;
}

@keyframes breathe {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .waifu-corner {
    display: none;
  }
}

/* 卡片样式 */
.glass-card {
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease, background 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.85);
}

.intro-card {
  text-align: center;
  margin-bottom: 40px;
}

.intro-card h1 {
  color: #6a5acd;
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.blog-card h2 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}

.desc {
  color: #666;
  line-height: 1.6;
  margin-bottom: 8px;
}

.date {
  font-size: 0.8rem;
  color: #999;
}

/* 底部波浪 Footer */
.anime-footer {
  position: relative;
  margin-top: 100px;
}

.footer-wave-box {
  transform: rotate(180deg);
  margin-bottom: -10px;
  position: relative;
  z-index: 1;
}

.footer-waves {
  display: block;
  width: 100%;
  height: 100px;
}

/* 底部波浪动画，和顶部保持一致但作用在 footer-parallax 上 */
.footer-parallax > use {
  animation: footer-move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.footer-parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.footer-parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.footer-parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.footer-parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes footer-move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

.footer-content {
  background: #1b2a32;
  color: #888;
  text-align: center;
  padding-bottom: 40px;
  padding-top: 10px;
}

@media (max-width: 768px) {
  .glass-nav {
    padding: 0.8rem 1rem;
  }

  .links a {
    margin-left: 10px;
    font-size: 0.9rem;
  }

  .main-content {
    margin-top: 1.5rem;
  }
}

/* 鼠标点击特效动画 */
@keyframes mouse-float-up {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(1.5);
  }
}

.mouse-effect-anim {
  animation: mouse-float-up 1s ease-out forwards;
  font-size: 16px;
  position: absolute;
}
</style>
