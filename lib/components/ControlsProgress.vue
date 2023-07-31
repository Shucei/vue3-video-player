<template>
  <div class="controls">
    <div class="progress-bar" @click="seek($event)">
      <div class="progress" :style="{ width: `${progress}%` }"></div>
    </div>
    <div class="volume-bar" @click="adjustVolume($event)">
      <div class="volume" :style="{ width: `${volume}%` }"></div>
    </div>
  </div>
</template>
<script></script>

<script setup lang="ts">
// import { ref, onMounted } from 'vue';

// const progress = ref(0);
// const volume = ref(50);

// const videoRef = ref<HTMLVideoElement | null>(null);

// // 更新进度条
// const updateProgressBar = () => {
//   if (videoRef.value) {
//     const progressValue = (videoRef.value.currentTime / videoRef.value.duration) * 100;
//     progress.value = progressValue;
//   }
// };

// // 更新声音控制
// const updateVolume = () => {
//   if (videoRef.value) {
//     const volumeValue = (videoRef.value.volume) * 100;
//     volume.value = volumeValue;
//   }
// };

// // 点击进度条跳转
// const seek = (event: MouseEvent) => {
//   if (videoRef.value) {
//     const position = event.offsetX / (event.currentTarget as HTMLElement).offsetWidth;
//     videoRef.value.currentTime = position * videoRef.value.duration;
//   }
// };

// // 点击声音控制调整音量
// const adjustVolume = (event: MouseEvent) => {
//   if (videoRef.value) {
//     const volumeValue = event.offsetX / (event.currentTarget as HTMLElement).offsetWidth;
//     videoRef.value.volume = volumeValue;
//   }
// };

// onMounted(() => {
//   if (videoRef.value) {
//     videoRef.value.addEventListener('timeupdate', updateProgressBar);
//     videoRef.value.addEventListener('volumechange', updateVolume);
//   }
// });
</script>

<style scoped>
.video-player {
  position: relative;
}

.video-player video {
  width: 100%;
}

.controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.progress-bar,
.volume-bar {
  flex-grow: 1;
  height: 5px;
  background-color: #fff;
  margin: 0 10px;
  position: relative;
  cursor: pointer;
}

.progress,
.volume {
  height: 100%;
  background-color: #f00;
  position: absolute;
  top: 0;
  left: 0;
}

.volume-bar {
  width: 100px;
}

.volume {
  width: 50%;
}
</style>