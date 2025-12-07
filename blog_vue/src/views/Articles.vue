<!--
  文章列表页组件
  @author hgl
  @date 2025年12月
-->
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getArticles } from '@/api/article'
import defaultCover from '@/assets/bj.png'

const articles = ref([])
const loading = ref(false)
const router = useRouter()

const fetchArticles = async () => {
  loading.value = true
  try {
    const res = await getArticles(1, 100)
    articles.value = res.data?.content || []
  } catch (error) {
    console.error('加载文章列表失败', error)
  } finally {
    loading.value = false
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

onMounted(() => {
  fetchArticles()
})
</script>

<template>
  <div class="common-layout">
    <div class="page-title">📚 全部文章</div>

    <div v-if="loading" class="loading">正在加载文章...</div>

    <div v-else class="articles-wrapper">
      <div v-if="articles.length" class="articles-list">
        <div
          v-for="item in articles"
          :key="item.id"
          class="article-card"
          @click="goDetail(item.id)"
        >
          <div class="thumb">
            <img :src="item.coverImage || defaultCover" :alt="item.title" />
          </div>
          <div class="info">
            <div class="ribbon"></div>
            <h3 class="title">{{ item.title }}</h3>
            <div class="meta">
              <span>📅 {{ formatDate(item.createTime) }}</span>
              <span v-if="item.categoryName" class="category-pill">
                📂 {{ item.categoryName }}
              </span>
            </div>
            <div v-if="item.tags && item.tags.length" class="tag-list">
              <span
                v-for="tag in item.tags"
                :key="tag.id || tag"
                class="tag-chip"
              >
                #{{ tag.name || tag }}
              </span>
            </div>
            <p class="summary">
              {{ item.summary || item.description || '这个人很懒，什么都没写~' }}
            </p>
          </div>
        </div>
      </div>

      <p v-else class="empty-text">还没有文章呢，去后台写一篇试试吧～</p>
    </div>
  </div>
</template>

<style scoped>
.common-layout {
  padding: 120px 20px 50px;
  max-width: 1200px;
  margin: 0 auto;
  color: #fff;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 40px;
  font-family: 'M PLUS Rounded 1c', 'Microsoft YaHei', sans-serif;
}

.articles-wrapper {
  min-height: 200px;
}

.loading {
  text-align: center;
  color: #a0cfff;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-card {
  display: flex;
  background: rgba(30, 40, 50, 0.8);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
  position: relative;
}

.article-card:hover {
  transform: translateY(-4px);
  background: rgba(40, 50, 60, 0.9);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
}

.thumb {
  width: 220px;
  height: 140px;
  flex-shrink: 0;
  overflow: hidden;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.article-card:hover .thumb img {
  transform: scale(1.05);
}

/* 右上角丝带 NEW 装饰 */
.ribbon {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  overflow: hidden;
  pointer-events: none;
}

.ribbon::before {
  content: 'NEW';
  position: absolute;
  top: 20px;
  right: -25px;
  width: 120px;
  transform: rotate(45deg);
  background-color: #ff69b4;
  color: #fff;
  text-align: center;
  font-weight: bold;
  font-size: 0.8rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.info {
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  margin: 0 0 8px;
  font-size: 1.3rem;
  color: #fff;
}

.meta {
  font-size: 0.85rem;
  color: #a0cfff;
  margin-bottom: 8px;
}

.category-pill {
  background: rgba(64, 158, 255, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
  margin-left: 8px;
}

.tag-list {
  margin-bottom: 6px;
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

.summary {
  margin: 0;
  color: #ccc;
  font-size: 0.95rem;
  line-height: 1.6;
}

.empty-text {
  text-align: center;
  color: #999;
}

@media (max-width: 768px) {
  .article-card {
    flex-direction: column;
  }

  .thumb {
    width: 100%;
    height: 180px;
  }
}
</style>
