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
        <ControlsProgress class="progress-bar"></ControlsProgress>
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
console.log(props);

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
