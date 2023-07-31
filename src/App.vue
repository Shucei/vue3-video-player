<template>
  <div style="text-align: center;width: 700px;">
    <videoPlay ref="video" v-bind="options" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";
import { videoPlay } from "../lib/index";

const options = reactive({
  width: "800px", //播放器宽度
  height: "500px", //播放器高度
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
  title: "你好", //视频名称
  type: "mp4",
  src: "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4", //视频源
  poster: "https://dogefs.s3.ladydaily.com/~/source/wallhaven/small/we/we1lrq.jpg?w=400&h=200&fmt=webp", //封面
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
