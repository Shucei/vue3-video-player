<template>
  <div ref="refPlayerWrap" id="refPlayerWrap" class="player-wrap">
    <div class="d-player-video" id="dPlayerVideo">
      <video :src="state.src" controls></video>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "VideoPlay",
};

</script>

<script lang="ts" setup>
import { defineProps, reactive } from 'vue'
import { defaultProps } from './defaultProps'
const props = defineProps(defaultProps)

const state = reactive({
  dVideo: null,
  ...props, //如果有自定义配置就会替换默认配置
  muted: props.muted,
  playBtnState: props.autoPlay ? "pause" : "play", // 播放按钮状态
  loadStateType: "loadstart", // 加载状态类型 //loadstart初始化  waiting缓冲 ended播放结束
  fullScreen: false,
  handleType: "", //当前操作类型
  //当前播放时间
  currentTime: "00:00:00",
  // 当前缓冲进度
  preloadBar: 0,
  //总时长
  totalTime: "00:00:00",
  isVideoHovering: true,
  speedActive: "1.0", //倍速
  playProgress: 0, //播放进度
  isMultiplesPlay: false, //是否倍速播放
  longPressTimeout: null,
  progressCursorTime: "00:00:00", //进度条光标时间
  qualityLevels: [], //分辨率数组
  currentLevel: 0, //首选分辨率
});
</script>


<style lang="scss" scoped>
@import "../style/index.scss";
</style>
