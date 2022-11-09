<template>
  <div class="disk" :class="{ disk__playing: store.state.isPlaying }">
    <label
      class="disk_cover"
      ref="cover"
      for="file"
      :style="{
        transform: stopMatrix,
        backgroundImage: store.state.coverUrl ? `url(${store.state.coverUrl})` : ''
      }"
    />
    <input
      id="file"
      ref="file"
      type="file"
      accept=".wav,.midi,.mp3,.mp4,.vqf,.ogg,.flac,.m4a"
      multiple
      @change="handleChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { player } from '@/utils/player'

const store = useStore()

// ref 操作 dom 元素
const cover = ref()
const file = ref()

// 响应式状态
const stopMatrix = ref('')

// 处理函数
const handleChange = async () => {
  const target = file.value
  const files = target.files ? target.files : []
  if (files.length) {
    for (let i = 0; i < files.length; i++) {
      await player.append(files[i])
    }
  }
  target.value = ''
}

// 生命周期函数
onMounted(() => {
  player.onReady.listen(() => store.commit('changeCover'))
  player.onChange.listen(() => store.commit('changeCover'))
  player.onPlay.listen(() => store.commit('togglePlay', true))
  player.onPause.listen(() => store.commit('togglePlay', false))
})

// 侦听器
watch(store.state.isPlaying, newVal => {
  if (!newVal) {
    stopMatrix.value = window.getComputedStyle(cover.value).transform
  } else {
    const matrix = stopMatrix.value
    stopMatrix.value = ''

    const match = matrix.match(/^matrix\(([^,]+),([^,]+)/)
    const [, sin, cos] = match || [0, 0, 0]
    const deg = ((Math.atan2(cos, sin) / 2 / Math.PI) * 360) % 360

    const styles = [...document.styleSheets]
    styles.forEach(style => {
      const rules = [...style.cssRules]
      rules.forEach(rule => {
        if (rule.type === rule.KEYFRAMES_RULE && rule.name === 'rotate') {
          rule.cssRules[0].style.transform = `rotate(${deg}deg)`
          rule.cssRules[1].style.transform = `rotate(${deg + 360}deg)`
        }
      })
    })
  }
})
</script>

<style lang="scss" scoped>
.disk {
  position: relative;
  border-radius: 100%;
  padding-top: 100%;
  overflow: hidden;
  transform: translateY(-50%) scale(0.88);
  transform-origin: center bottom;
  transition: all 0.6s ease;

  .disk_cover {
    position: absolute;
    top: -10px;
    right: -10px;
    bottom: -10px;
    left: -10px;
    background-image: radial-gradient(circle, #444 0%, #333 100%);
    background-size: cover;
    background-position: center;

    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 100%;
      margin-left: -8px;
      margin-top: -8px;
      content: '';
      width: 16px;
      height: 16px;
      background-image: linear-gradient(45deg, white, #dabad1);
      box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
    }
  }

  input {
    display: none;
  }
}

.disk__playing {
  transform: translateY(-50%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0 20px 20px -10px rgba(108, 29, 171, 0.3);

  .disk_cover {
    animation: rotate infinite 6s linear;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
