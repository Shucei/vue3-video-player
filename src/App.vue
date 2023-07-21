<template>
  <div style="text-align: center">
    <button @click="options.src = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'">{{ options.src }}</button>
    <videoPlay ref="video" style="display: inline-block; width: 100%" v-bind="options" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import { videoPlay } from "../lib/index";

const options = reactive({
  width: "800px", //播放器宽度
  height: "450px", //播放器高度
  color: "#409eff", //主题色
  muted: false, //静音
  webFullScreen: false, //网页全屏
  autoPlay: false, //自动播放
  currentTime: 0, //当前播放时间
  loop: false, //循环播放
  mirror: false, //镜像画面
  ligthOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制器
  title: "", //视频名称
  type: "m3u8",
  src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
  // src: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/IronMan.mp4", //视频源
  // src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8", //视频源
  poster: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg", //封面
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
  ],
});
const video = ref(null);

nextTick(() => {
  console.log(video.value);
});
</script>

<style scoped>

</style>
