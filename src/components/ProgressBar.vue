<template>
  <div class="progress" :class="{ progress__playing: store.state.isPlaying }">
    <h2 class="progress_title ellipsis-1">{{ formatName(name) }}</h2>
    <p class="progress_text">
      {{ formatTime(position) }} / {{ formatTime(duration) }}
    </p>
    <div class="progress_line">
      <span :style="{ width: progress }" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { player } from '@/utils/player'

const store = useStore()

// 响应式状态
const name = ref('')
const position = ref(0)
const duration = ref(0.001)
const progress = ref('')

// 处理函数
const formatTime = val => {
  const min = Math.floor(val / 60)
  const sec = Math.floor(val % 60)
  return `${min}:${sec < 10 ? '0' : ''}${sec}`
}
const formatName = val => {
  return val.replace(/\.mp3$/, '')
}

// 生命周期函数
onMounted(() => {
  const draw = () => {
    requestAnimationFrame(draw)
    const tempProgress = player.position / player.duration
    progress.value = `${(tempProgress * 100).toFixed(2)}%`
    position.value = player.position
    duration.value = player.duration
    name.value = player.current.file ? player.current.file.name : ''
  }
  draw()
})
</script>

<style lang="scss" scoped>
.progress {
  border-radius: 6px 6px 0 0;
  padding-left: 123px;
  padding-right: 12px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.6s ease;

  .progress_title {
    padding-top: 6px;
    font-size: 12px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .progress_text {
    padding-top: 2px;
    padding-left: 2px;
    font-size: 12px;
    font-weight: bold;
    color: #ccc;
    transform-origin: left top;
  }

  .progress_line {
    border-radius: 3px;
    height: 3px;
    overflow: hidden;
    background-color: #ddd;

    span {
      display: block;
      height: 100%;
      background-color: #ec51a5;
    }
  }
}

.progress__playing {
  transform: translateY(-100%);
}
</style>
