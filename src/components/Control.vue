<template>
  <div class="control">
    <div class="control_btn" @click="handlePrev">
      <i class="fa fa-backward" />
    </div>
    <div class="control_btn" @click="handlePlay">
      <span class="play-btn" :class="{ control__playing: store.state.isPlaying }" />
    </div>
    <div class="control_btn" @click="handleNext">
      <i class="fa fa-forward" />
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { player } from '@/utils/player'

const store = useStore()

// 处理函数
const handlePlay = () => {
  if (!player.isEmpty) {
    if (!store.state.isPlaying) {
      player.play()
    } else {
      player.pause()
    }
  }
}
const handlePrev = () => {
  if (store.state.isPlaying) player.prev()
}
const handleNext = () => {
  if (store.state.isPlaying) player.next()
}
</script>

<style lang="scss" scoped>
.control {
  display: flex;
  height: 100%;

  .control_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    border-radius: 4px;
    margin: 2px;
    color: #ccc;
    font-size: 22px;
    transition: background-color 0.6s ease;

    &:hover {
      background-color: #ddd;
      color: white;

      .play-btn {
        &::before {
          border-left-color: white;
        }

        &::after {
          border-color: white;
        }
      }
    }

    .play-btn {
      position: relative;
      width: 20px;
      height: 20px;

      &::before {
        position: absolute;
        top: 50%;
        left: 11px;
        border: 12px solid transparent;
        border-left-color: #ccc;
        border-top-width: 10px;
        border-bottom-width: 10px;
        margin-top: -10px;
        margin-left: -4px;
        content: '';
        width: 0;
        height: 0;
        transition: all 0.2s ease;
      }

      &::after {
        position: absolute;
        top: 50%;
        right: 5px;
        border: 0 solid transparent;
        border-width: 0 0 0 6px;
        border-left-color: #ccc;
        margin-top: -10px;
        margin-right: -4px;
        content: '';
        width: 0;
        height: 20px;
        opacity: 0;
        transform: scale(0);
        transition: all 0.2s ease;
      }
    }

    .control__playing {
      &::before {
        border-width: 0 0 0 6px;
        height: 20px;
        left: 5px;
      }

      &::after {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
}
</style>
