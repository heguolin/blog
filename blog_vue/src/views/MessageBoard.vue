<!--
  留言板组件
  @author hgl
  @date 2025年12月
-->
<template>
  <div class="common-layout">
    <div class="page-title">💬 留言板</div>

    <div class="message-input glass-card">
      <div class="nickname-row">
        <input
          v-model="nickname"
          class="nick-input"
          placeholder="你的昵称（用于生成可爱头像）"
        />
      </div>
      <textarea
        v-model="content"
        placeholder="说点什么吧... "
      />
      <button @click="submit" :disabled="submitting">
        {{ submitting ? '发送中...' : '发送 🚀' }}
      </button>
    </div>

    <div v-if="loading" class="loading-box">
      <div class="spinner"></div>
      <p>正在召唤来自异世界的消息...</p>
    </div>

    <div v-else>
      <div v-if="!comments.length" class="empty-state">
        <img :src="emptyImage" alt="empty" />
        <p>还没有人留言，快来抢沙发吧~ (｡•́︿•̀｡)</p>
      </div>

      <div v-else class="message-list">
        <div
          v-for="item in comments"
          :key="item.id"
          class="message-item"
        >
          <div class="user-avatar">
            <img
              :src="getAvatar(item)"
              @error="(e) => (e.target.src = defaultAvatar)"
            />
          </div>
          <div class="message-content">
            <div class="user-name">
              <span>
                {{ item.nickname }}
                <span v-if="item.nickname === ownerName" class="admin-badge">
                  博主
                </span>
              </span>
              <div class="meta-info">
                <span class="os-tag">
                  💻 {{ getMetaInfo(item).os }}
                </span>
                <span class="browser-tag">
                  🌏 {{ getMetaInfo(item).browser }}
                </span>
                <span class="time">{{ formatTime(item.createTime) }}</span>
              </div>
            </div>
            <div class="text">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchComments, saveComment } from '@/api/comment'
import defaultAvatar from '@/assets/logo.png'
import emptyImage from '@/assets/liuyin.png'

const comments = ref([])
const nickname = ref('')
const content = ref('')
const submitting = ref(false)
const loading = ref(true)

const avatarUrl = (name) => {
  const key = name || 'guest'
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
    key
  )}&backgroundColor=b6e3f4,c0aede,d1d4f9`
}

const ownerName = 'hgl'

const getAvatar = (item) => item.avatar || avatarUrl(item.nickname)

const formatTime = (time) => {
  if (!time) return ''
  return time.replace('T', ' ')
}

const parseUserAgent = () => {
  const ua = navigator.userAgent
  let os = 'Unknown OS'
  if (/Windows NT 10/.test(ua)) os = 'Windows 10/11'
  else if (/Mac OS X/.test(ua)) os = 'macOS'
  else if (/Android/.test(ua)) os = 'Android'
  else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS'
  else if (/Linux/.test(ua)) os = 'Linux'

  let browser = 'Unknown Browser'
  if (/Edg\//.test(ua)) browser = 'Edge'
  else if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) browser = 'Chrome'
  else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browser = 'Safari'
  else if (/Firefox\//.test(ua)) browser = 'Firefox'

  return { os, browser }
}

const getMetaInfo = (item) => {
  if (item.os || item.browser) {
    return {
      os: item.os || 'Unknown OS',
      browser: item.browser || 'Unknown Browser'
    }
  }
  // 兼容旧数据：没有存 os/browser 时，实时解析当前 UA
  return parseUserAgent()
}

const loadComments = async () => {
  loading.value = true
  try {
    const res = await fetchComments()
    comments.value = res.data || res
  } finally {
    loading.value = false
  }
}

const submit = async () => {
  if (!nickname.value.trim() || !content.value.trim()) {
    alert('昵称和内容不能为空')
    return
  }
  submitting.value = true
  try {
    const uaInfo = parseUserAgent()
    await saveComment({
      nickname: nickname.value,
      content: content.value,
      avatar: avatarUrl(nickname.value),
      os: uaInfo.os,
      browser: uaInfo.browser
    })
    content.value = ''
    loadComments()
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadComments()
})
</script>

<style scoped>
.common-layout {
  padding: 120px 20px 50px;
  max-width: 800px;
  margin: 0 auto;
  color: #fff;
}

.glass-card {
  background: rgba(30, 40, 50, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.page-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 30px;
}

.message-input {
  padding: 20px;
  margin-bottom: 30px;
  background: rgba(30, 40, 50, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.nickname-row {
  margin-bottom: 10px;
}

.nick-input,
.message-input textarea {
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #eee;
  border-radius: 8px;
  padding: 12px;
  font-family: inherit;
  transition: all 0.3s;
}

.nick-input:focus,
.message-input textarea:focus {
  background: rgba(0, 0, 0, 0.5);
  border-color: #ff69b4;
  box-shadow: 0 0 10px rgba(255, 105, 180, 0.3);
  outline: none;
}

.message-input button {
  margin-top: 12px;
  padding: 8px 20px;
  background: #409eff;
  border: none;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
}

.message-list {
  margin-top: 10px;
}

.message-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s, background 0.3s;
}

.message-item:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.1);
}

.user-avatar img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s;
}

.message-item:hover .user-avatar img {
  transform: rotate(15deg) scale(1.1);
}

.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user-name {
  font-size: 1.1rem;
  color: #ff69b4;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meta-info {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 0.75rem;
  color: #888;
}

.os-tag,
.browser-tag {
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.time {
  font-weight: normal;
  color: #aaa;
  font-size: 0.8rem;
}

.text {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 2px solid #ff69b4;
  padding: 12px 18px;
  border-radius: 0 12px 12px 12px;
  margin-top: 5px;
  color: #eee;
  font-size: 0.95rem;
  line-height: 1.6;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.message-item:hover .text {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.08)
  );
  border-left-color: #a0cfff;
}

.text::before {
  content: '';
  position: absolute;
  top: 0;
  left: -10px;
  width: 0;
  height: 0;
  border-top: 10px solid rgba(0, 0, 0, 0.2);
  border-left: 10px solid transparent;
}

.admin-badge {
  background: linear-gradient(45deg, #ff69b4, #a0cfff);
  color: #fff;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
  vertical-align: middle;
}

::placeholder {
  color: #888;
}

.loading-box {
  text-align: center;
  padding: 20px;
  color: #a0cfff;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 10px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #ff69b4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #aaa;
}

.empty-state img {
  width: 200px;
  border-radius: 10px;
  margin-bottom: 20px;
  opacity: 0.8;
}

@media (max-width: 600px) {
  .os-tag,
  .browser-tag {
    display: none;
  }
}
</style>

