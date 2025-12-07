<!--
  星空背景组件
  @author hgl
  @date 2025年12月
-->
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
let animationId

class Star {
  constructor(w, h) {
    this.canvasWidth = w
    this.canvasHeight = h
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.size = Math.random() * 2
    this.speed = Math.random() * 0.5 + 0.1
    this.opacity = Math.random()
  }

  update() {
    this.y -= this.speed
    if (this.y < 0) {
      this.y = this.canvasHeight
      this.x = Math.random() * this.canvasWidth
    }
    this.opacity += (Math.random() - 0.5) * 0.1
    if (this.opacity > 1) this.opacity = 1
    if (this.opacity < 0.3) this.opacity = 0.3
  }

  draw(ctx) {
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const stars = []
  const starCount = 200

  for (let i = 0; i < starCount; i++) {
    stars.push(new Star(canvas.width, canvas.height))
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, '#0f2027')
    gradient.addColorStop(0.5, '#203a43')
    gradient.addColorStop(1, '#2c5364')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    stars.forEach(star => {
      star.update()
      star.draw(ctx)
    })

    animationId = requestAnimationFrame(animate)
  }

  animate()

  const handleResize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<template>
  <canvas ref="canvasRef" class="star-bg"></canvas>
</template>

<style scoped>
.star-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
}
</style>

{
  "cells": [],
  "metadata": {
    "language_info": {
      "name": "python"
    }
  },
  "nbformat": 4,
  "nbformat_minor": 2
}