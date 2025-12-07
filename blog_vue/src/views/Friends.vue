<!--
  友链页组件
  @author hgl
  @date 2025年12月
-->
<template>
  <div class="common-layout">
    <div class="page-title">🔗 这里的伙伴们</div>

    <div v-if="loading" class="friend-loading">
      <div class="spinner"></div>
      <p>正在链接来自异世界的大佬...</p>
    </div>

    <div v-else-if="!friends.length" class="friend-empty">
      <p>还没有友链，快去后台添加一些吧！</p>
    </div>

    <div v-else class="friends-grid">
      <a
        v-for="(item, index) in friends"
        :key="item.id"
        :href="item.siteUrl"
        target="_blank"
        rel="noopener"
        class="friend-card"
        :style="{ borderTop: `3px solid ${friendColor(index)}` }"
      >
        <img
          :src="item.siteAvatar || defaultAvatar"
          class="friend-avatar"
          @error="(e) => (e.target.src = defaultAvatar)"
        />
        <div class="friend-info">
          <div class="friend-name">{{ item.siteName }}</div>
          <div class="friend-desc">
            {{ item.siteDesc || '这个大佬太神秘了，还没有简介~' }}
          </div>
        </div>
      </a>
    </div>

    <div class="apply-section glass-card">
      <h3>🤝 友链申请</h3>
      <p>欢迎大佬们交换友链！请在留言板留言，格式如下：</p>
      <div class="code-box">
        <div class="copy-btn" @click="copyInfo">
          📋 复制
        </div>
        <p>名称：hgl の 小博客</p>
        <p>简介：分享技术与二次元的日常</p>
        <p>链接：https://github.com/heguolin</p>
        <p>头像：https://avatars.githubusercontent.com/u/172561838?v=4&size=64</p>
      </div>
      <p class="tip">※ 请先添加本站友链，审核通过后将自动展示。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchFriends } from '@/api/friend'
import defaultAvatar from '@/assets/logo.png'

const friends = ref([])
const loading = ref(true)
const colors = ['#ff69b4', '#a0cfff', '#ff9f43', '#54a0ff', '#5f27cd', '#00d2d3']

const friendColor = (index) => colors[index % colors.length]

const loadFriends = async () => {
  loading.value = true
  try {
    const res = await fetchFriends()
    friends.value = res.data || res
  } finally {
    loading.value = false
  }
}

const copyInfo = () => {
  const text = `名称：hgl の 小博客
简介：分享技术与二次元的日常
链接：https://github.com/heguolin
头像：https://avatars.githubusercontent.com/u/172561838?v=4&size=64`
  navigator.clipboard
    .writeText(text)
    .then(() => window.alert('友链信息已复制到剪贴板！'))
    .catch(() => window.alert('复制失败，请手动复制'))
}

onMounted(loadFriends)
</script>

<style scoped>
.common-layout {
  padding: 120px 20px 60px;
  max-width: 1000px;
  margin: 0 auto;
  color: #fff;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.friend-card {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: rgba(30, 40, 50, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.5s ease forwards;
  opacity: 0;
}

.friend-card:nth-child(n + 1) {
  animation-delay: 0.1s;
}
.friend-card:nth-child(n + 2) {
  animation-delay: 0.2s;
}
.friend-card:nth-child(n + 3) {
  animation-delay: 0.3s;
}
.friend-card:nth-child(n + 4) {
  animation-delay: 0.4s;
}
.friend-card:nth-child(n + 5) {
  animation-delay: 0.5s;
}

.friend-card:hover {
  transform: translateY(-5px);
  background: rgba(40, 50, 60, 0.8);
  border-color: #ff69b4;
  box-shadow: 0 5px 15px rgba(255, 105, 180, 0.2);
}

.friend-avatar {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 2px solid #fff;
  margin-right: 15px;
  transition: transform 0.5s;
}

.friend-card:hover .friend-avatar {
  transform: rotate(360deg);
}

.friend-info {
  flex: 1;
  overflow: hidden;
}

.friend-name {
  color: #ff69b4;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 5px;
}

.friend-desc {
  color: #ccc;
  font-size: 0.85rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.apply-section {
  margin-top: 50px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  color: #eee;
}

.apply-section h3 {
  color: #a0cfff;
  border-bottom: 1px dashed #666;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.code-box {
  background: #1e1e1e;
  padding: 40px 20px 20px;
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  color: #a9b7c6;
  margin: 15px 0;
  border-left: 4px solid #ff69b4;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.code-box::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 15px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ff5f56;
  box-shadow: 20px 0 0 #ffbd2e, 40px 0 0 #27c93f;
}

.copy-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  color: #888;
  cursor: pointer;
  font-size: 0.85rem;
  transition: color 0.3s;
}

.copy-btn:hover {
  color: #fff;
}

.tip {
  font-size: 0.85rem;
  color: #888;
}

.friend-loading,
.friend-empty {
  text-align: center;
  color: #a0cfff;
  padding: 60px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 10px;
  border: 4px solid rgba(255, 255, 255, 0.15);
  border-left-color: #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
