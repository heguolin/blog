<!--
  归档页组件
  @author hgl
  @date 2025年12月
-->
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getArticles } from '@/api/article'

const router = useRouter()
const articles = ref([])
const loading = ref(false)

const fetchArchives = async () => {
  loading.value = true
  try {
    const res = await getArticles(1, 200)
    articles.value = res.data?.content || []
  } catch (e) {
    console.error('加载归档数据失败', e)
  } finally {
    loading.value = false
  }
}

const formatDay = dateStr => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const m = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  return `${m}-${day}`
}

const archives = computed(() => {
  const map = new Map()
  articles.value.forEach(a => {
    if (!a.createTime) return
    const d = new Date(a.createTime)
    const year = d.getFullYear()
    if (!map.has(year)) {
      map.set(year, [])
    }
    map.get(year).push(a)
  })

  const result = Array.from(map.entries()).map(([year, list]) => ({
    year,
    items: list.sort(
      (a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
    )
  }))

  // 年份从新到旧
  result.sort((a, b) => b.year - a.year)
  return result
})

const goDetail = id => {
  router.push(`/blog/${id}`)
}

onMounted(() => {
  fetchArchives()
})
</script>

<template>
  <div class="common-layout">
    <div class="page-title">📅 归档时光</div>

    <div v-if="loading" class="loading">正在加载归档...</div>

    <div v-else class="timeline">
      <div
        v-for="block in archives"
        :key="block.year"
        class="year-block"
      >
        <h2 class="year-title">{{ block.year }}</h2>
        <div
          v-for="item in block.items"
          :key="item.id"
          class="timeline-item"
          @click="goDetail(item.id)"
        >
          <div class="time">{{ formatDay(item.createTime) }}</div>
          <div class="content">
            <span class="title">{{ item.title }}</span>
          </div>
        </div>
      </div>

      <p v-if="!archives.length" class="empty-text">
        还没有文章呢，去写一篇试试吧～
      </p>
    </div>
  </div>
</template>

<style scoped>
.common-layout {
  padding: 120px 20px 50px;
  max-width: 800px;
  margin: 0 auto;
  color: #fff;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  font-family: 'M PLUS Rounded 1c', 'Microsoft YaHei', sans-serif;
}

.loading {
  text-align: center;
  color: #a0cfff;
}

.timeline {
  border-left: 2px solid rgba(255, 255, 255, 0.2);
  padding-left: 30px;
  position: relative;
}

.year-title {
  font-size: 2rem;
  color: #409eff;
  margin: 30px 0 20px -40px;
  text-shadow: 0 0 10px rgba(64, 158, 255, 0.5);
}

.timeline-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
  transition: transform 0.3s;
  cursor: pointer;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -36px;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  border: 2px solid #409eff;
  transition: all 0.3s;
}

.timeline-item:hover {
  transform: translateX(10px);
}

.timeline-item:hover::before {
  background: #ff69b4;
  border-color: #ff69b4;
  transform: scale(1.5);
}

.time {
  font-size: 0.9rem;
  color: #aaa;
  margin-right: 20px;
}

.title {
  font-size: 1.1rem;
}

.empty-text {
  margin-top: 20px;
  color: #999;
}
</style>

