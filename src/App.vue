<template>
  <div style="text-align: center;width: 700px;margin: auto;">
    <videoPlay ref="video" v-bind="options" @durationchange="durationchange" @timeupdate="timeupdate" @progress="progress"
      @volumechange="volumechange" @canplay="canplay" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import { videoPlay } from "../lib/index";

const options = reactive({
  width: "800px", //播放器宽度
  height: "500px", //播放器高度
  theme: "#409eff", //主题色
  muted: false, //静音
  webFullScreen: false, //网页全屏
  autoPlay: false, //自动播放
  currentTime: 0, //当前播放时间
  loop: false, //循环播放
  mirror: false, //镜像画面
  lightsOff: false, //关灯模式
  volume: 0.3, //默认音量大小
  control: true, //是否显示控制器
  title: "你好", //视频名称
  hotkey: true, //是否支持热键
  type: "mp4",
  src: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", //视频源
  // https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
  // https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4
  // poster: "https://dogefs.s3.ladydaily.com/~/source/wallhaven/small/we/we1lrq.jpg?w=400&h=200&fmt=webp", //封面
  controlBtns: [
    "audioTrack",
    "quality",
    "speedRate",
    "volume",
    "setting",
    "pip",
    "pageFullScreen",
    "fullScreen",
    'screenshot'
  ],
});
const video = ref(null);

// const durationchange = (ev) => {
//   console.log("durationchange", ev);
// };
// const timeupdate = (ev) => {
//   console.log("timeupdate", ev);
// };
// const progress = (ev) => {
//   console.log("progress", ev);
// };
// const volumechange = (ev) => {
//   console.log("volumechange", ev);
// };
// const canplay = (ev) => {
//   console.log("canplay", ev);
// };
nextTick(() => {
  console.log(video.value);
});
</script>

<style lang="scss" scoped></style>
