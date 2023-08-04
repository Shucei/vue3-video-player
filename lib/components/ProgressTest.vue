<template>
  <div class="progress-bar" @mousedown="startDrag" @mousemove="dragging" @mouseup="endDrag" @mouseleave="endDrag">
    <div class="progress-bar__track" ref="track" @click="seek">
      <div class="progress-bar__progress" :style="{ width: progress + '%' }"></div>
      <div class="progress-bar__handle" :style="{ left: handlePosition + '%' }" @mousedown="startDrag"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTime: Number, // 当前播放时间
    duration: Number, // 视频总时长
  },
  data() {
    return {
      isDragging: false,
      progress: 0,
    };
  },
  computed: {
    handlePosition() {
      return (this.currentTime / this.duration) * 100;
    },
  },
  methods: {
    startDrag() {
      this.isDragging = true;
    },
    dragging(event) {
      if (this.isDragging) {
        const trackWidth = this.$refs.track.clientWidth; // 进度条总长度
        const clickPosition = event.clientX - this.$refs.track.getBoundingClientRect().left; // 鼠标点击位置距离进度条左侧的距离
        const newProgress = (clickPosition / trackWidth) * 100; // 新的进度
        this.progress = Math.max(0, Math.min(newProgress, 100));
      }
    },
    endDrag() {
      if (this.isDragging) {
        this.isDragging = false;
        // 触发视频跳转到新的进度位置
        const newTime = (this.progress / 100) * this.duration;
        this.$emit('seek', newTime);
      }
    },
    seek(event) {
      const trackWidth = this.$refs.track.clientWidth; // 进度条总长度
      const clickPosition = event.clientX - this.$refs.track.getBoundingClientRect().left;
      const newProgress = (clickPosition / trackWidth) * 100;
      this.progress = Math.max(0, Math.min(newProgress, 100));

      // 触发视频跳转到新的进度位置
      const newTime = (this.progress / 100) * this.duration;
      this.$emit('seek', newTime);
    },
  },
};
</script>

<style>
.progress-bar {
  position: relative;
  top: 100px;
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  cursor: pointer;
  
}
.progress-bar__track {
  position: relative;
  height: 100%;
  border-radius: 5px;
}
.progress-bar__progress {
  height: 100%;
  background-color: #007bff;
  border-radius: 5px;
}
.progress-bar__handle {
  position: absolute;
  top: -5px;
  left: 0;
  width: 10px;
  height: 20px;
  background-color: #007bff;
  border-radius: 50%;
  cursor: pointer;
}
</style>