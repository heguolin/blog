<!--
  首页组件
  @author hgl
  @date 2025年12月
-->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getArticles } from '@/api/article'
import defaultCover from '@/assets/bj.png'

const blogs = ref([])
const hitokoto = ref('正在加载一言...')
const fromWho = ref('')
const router = useRouter()

const fetchBlogs = async () => {
  try {
    const res = await getArticles(1, 20)
    blogs.value = res.data?.content || []
  } catch (error) {
    console.error('加载文章列表失败', error)
  }
}

const fetchHitokoto = async () => {
  try {
    const res = await fetch('https://v1.hitokoto.cn?c=a&c=b')
    const data = await res.json()
    hitokoto.value = data.hitokoto
    fromWho.value = data.from || ''
  } catch (e) {
    hitokoto.value = '世界はまだまだ面白い。'
    fromWho.value = ''
  }
}

const goDetail = id => {
  router.push(`/blog/${id}`)
}

const formatDate = dateStr => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleString('zh-CN')
}

const scrollToContent = () => {
  const content = document.querySelector('.home-content')
  if (content) {
    content.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  fetchBlogs()
  fetchHitokoto()
})
</script>

<template>
  <div class="home-wrapper">
    <!-- 1. 顶部 Hero 区域 (大图 + 标语) -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="main-title">あなたの名前です</h1>
        <p class="sub-title">生活は続きません</p>

        <div class="hitokoto-box">
          <p class="word">「 {{ hitokoto }} 」</p>
          <p v-if="fromWho" class="from">-「 {{ fromWho }} 」</p>
        </div>
      </div>

      <!-- 向下滚动指示器 -->
      <div class="scroll-down" @click="scrollToContent">
        <span>﹀</span>
      </div>

      <!-- 2. 顶部动态波浪 -->
      <div class="wave-divider">
        <svg
          class="waves"
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
          <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(32, 58, 67, 0.7)" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(32, 58, 67, 0.5)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(32, 58, 67, 0.3)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="#1b2a32" />
          </g>
        </svg>
      </div>
    </div>

    <!-- 2. 首页主体内容 (单栏居中) -->
    <div class="home-content">
      <!-- 板块 A: 个人简介 -->
      <section class="section-box intro-box">
        <div class="avatar-box">
          <img src="@/assets/liuyin.png" alt="avatar" />
        </div>
        <h2>Hi, I'm hgl 👋</h2>
        <p class="bio">一名热爱二次元的全栈开发者 / SpringBoot / Vue3 / 正在拯救世界中...</p>
        <div class="social-icons">
          <span>🐱</span>
          <span>📺</span>
          <span>🐦</span>
        </div>
      </section>

      <!-- 板块 B: 技能栈 -->
      <section class="section-box">
        <h3 class="section-title">🛠️ Tech Stack</h3>
        <div class="tech-grid">
          <div class="tech-item">☕ Java</div>
          <div class="tech-item">🍃 SpringBoot</div>
          <div class="tech-item">⚡ Vue 3</div>
          <div class="tech-item">🐬 MySQL</div>
          <div class="tech-item">🚀 Redis</div>
          <div class="tech-item">🐳 Docker</div>
        </div>
      </section>

      <!-- 板块 C: 最新文章 (取前 3 篇) -->
      <section class="section-box">
        <div class="section-header">
          <h3 class="section-title">📝 Latest Posts</h3>
          <span class="more-btn" @click="$router.push('/articles')">More ></span>
        </div>

        <div class="latest-posts">
          <div
            v-for="blog in blogs.slice(0, 3)"
            :key="blog.id"
            class="mini-post-card"
            @click="goDetail(blog.id)"
          >
            <img
              :src="blog.coverImage || defaultCover"
              :alt="blog.title"
              class="mini-cover"
            />
            <div class="mini-info">
              <h4>{{ blog.title }}</h4>
              <span class="date">{{ formatDate(blog.createTime) }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  height: 60vh;
  width: 100%;
  background: url('@/assets/bj.png') no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
}

.hero-content {
  z-index: 2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.main-title {
  font-size: 3.5rem;
  font-weight: bold;
  position: relative;
  color: #ffffff;
  letter-spacing: 5px;
  mix-blend-mode: overlay;
}

.main-title::before,
.main-title::after {
  content: 'あなたの名前です';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-title::before {
  color: #ff00c1;
  z-index: -1;
  animation: glitch-effect 3s infinite;
}

.main-title::after {
  color: #00fff9;
  z-index: -2;
  animation: glitch-effect 2s infinite reverse;
}

@keyframes glitch-effect {
  0% {
    transform: translate(0);
    clip-path: inset(0 0 0 0);
  }
  20% {
    transform: translate(-2px, 2px);
    clip-path: inset(20% 0 30% 0);
  }
  40% {
    transform: translate(2px, -2px);
    clip-path: inset(60% 0 10% 0);
  }
  60% {
    transform: translate(-2px, 2px);
    clip-path: inset(40% 0 50% 0);
  }
  80% {
    transform: translate(2px, -2px);
    clip-path: inset(10% 0 70% 0);
  }
  100% {
    transform: translate(0);
    clip-path: inset(0 0 0 0);
  }
}

.sub-title {
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 5px 15px;
  border-radius: 20px;
}

.hitokoto-box {
  text-align: center;
  margin-top: 20px;
  color: #a0cfff;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  animation: fadeInUp 2s;
}

.hitokoto-box .word {
  font-size: 1.2rem;
  font-weight: bold;
}

.hitokoto-box .from {
  font-size: 0.9rem;
  margin-top: 5px;
  opacity: 0.8;
}

.scroll-down {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 20;
  animation: bounce 2s infinite;
}

.scroll-down span {
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
}

/* --- 首页主体容器 --- */
.home-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 10;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

.wave-divider {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  line-height: 0;
}

/* --- 动态波浪样式 --- */
.waves {
  position: relative;
  width: 100%;
  height: 100px;
  margin-bottom: -7px;
  min-height: 100px;
  max-height: 150px;
}

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}

.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}

.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
  position: relative;
  z-index: 10;
  margin-top: -50px;
}

.post-card,
.widget-card {
  background: rgba(30, 40, 50, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-bottom: 20px;
  color: #e0e0e0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, background 0.3s;
}

.post-card {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-left: 5px solid transparent;
  padding: 0;
  height: 200px;
}

.post-card:hover {
  transform: translateY(-5px);
  background: rgba(40, 50, 60, 0.85);
  border-left-color: #6a5acd;
  box-shadow: 0 0 20px rgba(106, 90, 205, 0.3);
}

.post-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.15),
    transparent
  );
  transition: 0.5s;
  pointer-events: none;
}

.post-card:hover::before {
  left: 100%;
}

.post-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}

.post-cover {
  width: 280px;
  height: 100%;
  flex-shrink: 0;
  overflow: hidden;
}

.post-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.post-card:hover .post-cover img {
  transform: scale(1.1);
}

.post-title {
  margin: 0 0 10px 0;
  font-size: 1.3rem;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.85rem;
  color: #a0cfff;
  margin-bottom: 12px;
}

.category-pill {
  background: rgba(64, 158, 255, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
}

.tag-list {
  margin-bottom: 8px;
}

.tag-chip {
  display: inline-block;
  margin-right: 6px;
  margin-bottom: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(255, 105, 180, 0.15);
  color: #ffb6d9;
  font-size: 0.78rem;
}

.sticky-tag {
  background: linear-gradient(45deg, #ff69b4, #ff1493);
  color: #ffffff;
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 2px 5px rgba(255, 20, 147, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.tag {
  background: rgba(64, 158, 255, 0.2);
  color: #a0cfff;
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 10px;
}

.post-desc {
  color: #bbb;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.post-arrow {
  color: #ddd;
  font-weight: bold;
  font-size: 1.2rem;
}

.sidebar-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-card .avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.5s;
}

.profile-card:hover .avatar img {
  transform: rotate(360deg);
}

.social-links span {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: all 0.3s;
  cursor: pointer;
}

.social-links span:hover {
  background: #ff69b4;
  color: #ffffff;
  transform: rotate(360deg);
  box-shadow: 0 0 15px #ff69b4;
}

.stats-grid {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.count {
  font-weight: bold;
  font-size: 1.2rem;
  color: #ffffff;
}

.label {
  font-size: 0.8rem;
  color: #999;
}

/* --- 通用板块样式 --- */
.section-box {
  margin-bottom: 60px;
  text-align: center;
  animation: fadeInUp 0.8s ease backwards;
}

.section-title {
  font-size: 2rem;
  color: #a0cfff;
  margin-bottom: 30px;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  text-shadow: 0 0 10px rgba(64, 158, 255, 0.3);
}

/* --- 板块 A: 简介 --- */
.intro-box .avatar-box img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(64, 158, 255, 0.5);
  margin-bottom: 20px;
  transition: transform 0.5s;
}

.intro-box .avatar-box img:hover {
  transform: rotate(360deg);
}

.bio {
  color: #ccc;
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.social-icons span {
  font-size: 1.5rem;
  margin: 0 10px;
  cursor: pointer;
  transition: 0.3s;
}

.social-icons span:hover {
  transform: scale(1.2);
}

/* --- 板块 B: 技能栈 --- */
.tech-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.tech-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
  border-radius: 20px;
  color: #fff;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: 0.3s;
}

.tech-item:hover {
  background: #409eff;
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(64, 158, 255, 0.4);
}

/* --- 板块 C: 最新文章 --- */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.more-btn {
  color: #888;
  cursor: pointer;
  transition: 0.3s;
}

.more-btn:hover {
  color: #ff69b4;
}

.latest-posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.mini-post-card {
  background: rgba(30, 40, 50, 0.6);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.mini-post-card:hover {
  transform: translateY(-5px);
  border-color: #ff69b4;
}

.mini-cover {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.mini-info {
  padding: 15px;
  text-align: left;
}

.mini-info h4 {
  margin: 0 0 10px 0;
  color: #eee;
  font-size: 1.1rem;
}

.mini-info .date {
  font-size: 0.8rem;
  color: #888;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .content-container {
    grid-template-columns: 1fr;
  }
}
</style>