<template>
  <div class="home">
    <player />
  </div>
</template>

<script setup>
import Player from '@/components/Player.vue'
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ffedff;
  z-index: 0;
}
</style>
