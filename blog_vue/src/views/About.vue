<!--
  关于页组件
  @author hgl
  @date 2025年12月
-->
<template>
  <div class="common-layout">
    <div class="page-title">🧙‍♂️ 关于 hgl</div>

    <div class="about-card glass-card">
      <p>这里是 hgl 的个人空间，主要分享技术、生活和二次元相关内容。</p>
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
  margin-bottom: 30px;
}

.glass-card {
  background: rgba(30, 40, 50, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
}
</style>


