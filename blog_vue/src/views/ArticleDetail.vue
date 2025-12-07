<!--
  文章详情页组件
  @author hgl
  @date 2025年12月
-->
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { getArticleById } from '@/api/article'

const route = useRoute()
const article = ref(null)
const contentHtml = ref('')
const tocItems = ref([])

const buildToc = () => {
  const container = document.querySelector('.markdown-body')
  if (!container) return

  const headings = container.querySelectorAll('h1, h2, h3')
  const usedIds = new Map()
  const items = []

  headings.forEach(el => {
    const level = Number(el.tagName[1])
    const text = el.textContent?.trim() || ''
    if (!text) return

    let slug = text
      .toLowerCase()
      .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
      .replace(/^-+|-+$/g, '')

    if (!slug) slug = 'heading'
    const count = usedIds.get(slug) || 0
    usedIds.set(slug, count + 1)
    if (count > 0) slug = `${slug}-${count}`

    el.id = slug
    items.push({ id: slug, text, level })
  })

  tocItems.value = items
}

const scrollToHeading = id => {
  const target = document.getElementById(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const fetchDetail = async () => {
  try {
    const id = route.params.id
    const res = await getArticleById(id)
    article.value = res.data?.article || null

    if (article.value && article.value.content) {
      contentHtml.value = marked.parse(article.value.content)

      nextTick(() => {
        const blocks = document.querySelectorAll('.markdown-body pre code')
        blocks.forEach(block => {
          hljs.highlightElement(block)
        })

        buildToc()
      })
    } else {
      tocItems.value = []
    }
  } catch (error) {
    console.error('加载文章详情失败', error)
  }
}

onMounted(() => {
  fetchDetail()
})
</script>

<template>
  <div v-if="article" class="detail-layout">
    <aside v-if="tocItems.length" class="toc-sidebar">
      <div class="toc-title">目录</div>
      <ul class="toc-list">
        <li
          v-for="item in tocItems"
          :key="item.id"
          class="toc-item"
          :class="`level-${item.level}`"
          @click="scrollToHeading(item.id)"
        >
          {{ item.text }}
        </li>
      </ul>
    </aside>

    <div class="detail-container glass-card">
      <header class="detail-header">
        <h1>{{ article.title }}</h1>
        <div class="meta">
          <span>📅 {{ article.createTime }}</span>
          <span v-if="article.categoryName" class="category-pill">
            📂 {{ article.categoryName }}
          </span>
          <span v-if="article.viewCount">👀 {{ article.viewCount }} 次浏览</span>
        </div>
        <div v-if="article.tags && article.tags.length" class="tag-list">
          <span
            v-for="tag in article.tags"
            :key="tag.id || tag"
            class="tag-chip"
          >
            #{{ tag.name || tag }}
          </span>
        </div>
        <img
          v-if="article.coverImage"
          :src="article.coverImage"
          alt="cover"
          class="cover-img"
        />
      </header>

      <hr class="divider" />

      <article class="markdown-body" v-html="contentHtml"></article>
    </div>
  </div>

  <div v-else class="detail-container glass-card">
    正在加载文章...
  </div>
</template>

<style scoped>
.detail-layout {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: 20px;
}

.toc-sidebar {
  align-self: flex-start;
  background: rgba(20, 30, 40, 0.9);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: sticky;
  top: 90px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  font-size: 0.9rem;
}

.toc-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: #a0cfff;
  font-size: 1rem;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  cursor: pointer;
  padding: 4px 4px 4px 0;
  color: #ccc;
  border-left: 2px solid transparent;
  transition: all 0.2s;
  line-height: 1.5;
}

.toc-item.level-1 {
  font-weight: 600;
}

.toc-item.level-2 {
  padding-left: 12px;
  font-size: 0.9rem;
}

.toc-item.level-3 {
  padding-left: 24px;
  font-size: 0.85rem;
}

.toc-item:hover {
  color: #ff69b4;
  border-left-color: #ff69b4;
  background: rgba(255, 105, 180, 0.08);
}

.detail-container {
  background: rgba(30, 40, 50, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  min-height: 60vh;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e0e0e0;
}

.detail-header h1 {
  text-align: center;
  color: #ffffff;
  font-size: 2rem;
}

.meta {
  text-align: center;
  color: #888;
  margin: 10px 0 20px;
  display: flex;
  justify-content: center;
  gap: 16px;
}

.category-pill {
  background: rgba(64, 158, 255, 0.15);
  padding: 2px 8px;
  border-radius: 4px;
}

.tag-list {
  margin-bottom: 10px;
  text-align: center;
}

.tag-chip {
  display: inline-block;
  margin-right: 6px;
  margin-bottom: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(255, 105, 180, 0.15);
  color: #ffb6d9;
  font-size: 0.8rem;
}

.cover-img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin: 20px 0;
}

.divider {
  border: 0;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 30px 0;
}

.markdown-body {
  font-size: 16px;
  line-height: 1.8;
  color: #cccccc;
  letter-spacing: 0.5px;
}

@media (max-width: 900px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }

  .toc-sidebar {
    position: static;
    max-height: none;
    order: -1;
  }
}

:deep(.markdown-body h1),
:deep(.markdown-body h2) {
  border-bottom: 1px solid #444;
  padding-bottom: 10px;
  color: #a0cfff;
}

:deep(.markdown-body img) {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
}

:deep(.markdown-body img) {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
}

:deep(.markdown-body a) {
  color: #ff69b4;
  text-decoration: none;
  font-weight: bold;
  border-bottom: 1px dashed #ff69b4;
  transition: all 0.3s;
}

:deep(.markdown-body a:hover) {
  color: #ff1493;
  border-bottom-style: solid;
}

:deep(.markdown-body blockquote) {
  margin: 20px 0;
  padding: 15px 20px;
  background: rgba(255, 192, 203, 0.2);
  border-left: 5px solid #ff69b4;
  border-radius: 0 10px 10px 0;
  color: #555;
  font-family: 'Comic Sans MS', sans-serif;
}

:deep(.markdown-body pre) {
  background: #282c34;
  border-radius: 10px;
  padding: 40px 20px 20px 20px;
  position: relative;
  overflow-x: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  margin: 20px 0;
}

:deep(.markdown-body pre)::before {
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

:deep(.markdown-body p code),
:deep(.markdown-body li code) {
  color: #d63384;
  background-color: rgba(255, 192, 203, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
}
</style>
