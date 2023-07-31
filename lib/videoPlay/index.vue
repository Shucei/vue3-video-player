<template>
  <div class="player-wrap">
    <div class="player-video">
      <video class="player-video-main"
        src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4">您的浏览器不支持video标签!</video>
    </div>

    <div class="player-controller">
      <div class="control-progress">
        <!-- <d-slider class="d-progress-bar" @onMousemove="onProgressMove" @change="progressBarChange"
          :disabled="!state.speed" :hoverText="state.progressCursorTime" v-model="state.playProgress"
          :preload="state.preloadBar"></d-slider> -->
        <ControlsProgress class="progress-bar" :disabled="!state.speed" :hoverText="state.progressCursorTime"
          v-model="state.playProgress" :preload="state.preloadBar"></ControlsProgress>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
// import SvgIcon from "../components/SvgIcon.vue";
import ControlsProgress from "../components/ControlsProgress.vue";
import { defineProps } from "vue";
import { defaultProps } from "./defaultProps";

const props = defineProps(defaultProps);
const state = {
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
  isVideoHovering: true,//鼠标是否在视频上
  speedActive: "1.0", //倍速
  playProgress: 0, //播放进度
  isMultiplesPlay: false, //是否倍速播放
  longPressTimeout: null,
  progressCursorTime: "00:00:00", //进度条光标时间
  qualityLevels: [], //分辨率数组
  currentLevel: 0, //首选分辨率
}

</script>

<script lang="ts">
export default {
  name: "VideoPlay",
};
</script>
<style lang="scss" scoped>
@import "../assets/style/index.scss";

.player-wrap {
  // 通过v-bind绑定props中的width和height
  width: v-bind(width);
  height: v-bind(height);
  $font-color: v-bind(color);
}
</style>
