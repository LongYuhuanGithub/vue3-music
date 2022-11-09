<template>
  <div class="player">
    <div class="player_disk">
      <disk />
    </div>
    <div class="player_control">
      <control />
    </div>
    <div class="player_progress">
      <progress-bar />
    </div>
  </div>
</template>

<script setup>
import Disk from './Disk.vue'
import Control from './Control.vue'
import ProgressBar from './ProgressBar.vue'
</script>

<style lang="scss" scoped>
.player {
  position: relative;
  display: flex;
  border-radius: 8px;
  width: 300px;
  height: 75px;
  max-width: 300px;
  max-height: 75px;
  background-color: white;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12), 0 20px 20px rgba(95, 23, 101, 0.2);

  .player_disk {
    flex: 1.2;
    padding: 12px;
  }

  .player_control {
    flex: 2;
    padding: 12px 12px 12px 0;
  }

  .player_progress {
    position: absolute;
    top: 0;
    right: 9px;
    bottom: 25px;
    left: 9px;
    z-index: -1;
  }
}
</style>
