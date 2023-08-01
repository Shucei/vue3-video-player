<template>
  <div class="player-wrap" :class="{
    'player-wrap-hover':
      state.playBtnState == 'play' || state.isVideoHovering,
    'is-lightsOff': state.lightsOff,
    'web-full-screen': state.webFullScreen,
  }">
    <!-- 播放器 -->
    <div class="player-video">
      <!-- 
        :controls="isMobile && state.speed ? true : false"：这是一个动态绑定的控制属性。如果 isMobile 为真且 state.speed 为真，判断是否移动端，是否支持快进后退，满足显示默认控制器，否则隐藏。
        :muted="state.muted"：这是一个动态绑定的静音属性。根据 state.muted 的值，如果为真，则视频静音，否则取消静音。
        :volume="state.volume"：这是一个动态绑定的音量属性。根据 state.volume 的值，设置视频的音量级别。
        :autoplay="autoPlay"：这是一个动态绑定的自动播放属性。根据 autoPlay 的值，如果为真，则视频在加载后自动播放，否则不自动播放。
        :loop="state.loop"：这是一个动态绑定的循环播放属性。根据 loop 的值，如果为真，则视频循环播放，否则播放一次后停止。
        :src="state.src"：这是一个动态绑定的视频源属性。根据 state.src 的值，设置视频的源文件路径。
        :poster="poster"：这是一个动态绑定的封面图属性。根据 poster 的值，设置视频的封面图。
        :webkit-playsinline="playsinline"：这是一个动态绑定的 WebKit 内联播放属性。根据 playsinline 的值，如果为真，则在 WebKit 浏览器中内联播放视频，否则在全屏播放。
        :playsinline="playsinline"：这是一个动态绑定的内联播放属性。根据 playsinline 的值，如果为真，则在支持内联播放的浏览器中内联播放视频，否则在全屏播放。
        x-webkit-airplay="allow"：这是一个非标准的属性，用于在 WebKit 浏览器中启用 AirPlay 功能，允许将视频播放到支持 AirPlay 的设备上。
       -->
      <video class="player-video-main" :class="{ 'video-mirror': state.mirror }"
        :controls="isMobile && state.speed ? true : false" :muted="state.muted" :volume="state.volume"
        :autoplay="autoPlay" :loop="state.loop" :src="src" :poster="poster" :webkit-playsinline="playsinline"
        :playsinline="playsinline" x-webkit-airplay="allow">
        您的浏览器不支持video标签!
      </video>
    </div>

    <!-- 黑幕关灯模式 -->
    <transition name="d-fade-in">
      <div class="player-lightsOff" v-show="state.lightsOff"></div>
    </transition>


    <!-- 控制器 -->
    <div class="player-controller">
      <div class="control-progress">
        <ControlsProgress class="progress-bar" :disabled="!state.speed" :hoverText="state.progressCursorTime"
          :size="'100%'" v-model="state.playProgress" :preload="state.preloadBar"></ControlsProgress>
      </div>
      <!-- 控制工具 -->
      <div class="control-tool">
        <div class="tool-bar tool-barplayer-icons-left">
          <div class="tool-item">
            <!-- <icon size="24" :icon="`icon-${state.playBtnState}`"></icon> -->
            <SvgIcon :icon="state.playBtnState" :className="{ 'play': true }"></SvgIcon>
          </div>
          <div class="tool-item tool-sound">
            <SvgIcon icon="volume-off" :className="{ 'sound': true }"></SvgIcon>
          </div>
          <div class="tool-item tool-time audioTrack-btn" v-if="props.controlBtns.includes('audioTrack')">
            <span>{{ state.currentTime }}</span>
            <span style="margin: 0 3px">/</span>
            <span class="total-time">{{ state.totalTime }}</span>
          </div>
        </div>

        <div class="tool-bar dplayer-icons-right">
          <!-- 清晰度 -->
          <div class="tool-item quality-btn">
            720 高清
            <div class="tool-item-main">
              <ul class="speed-main" style="text-align:center">
                <li :class="{ 'speed-active': state.currentLevel == index }" v-for="(row, index) of state.qualityLevels"
                  :key="row">P</li>
                <!-- <li @click="qualityLevelsHandle({}, -1)">自动</li> -->
              </ul>
            </div>
          </div>

          <!-- 倍速播放 -->
          <div class="tool-item speedRate-btn" v-if="props.controlBtns.includes('speedRate')">
            {{ state.speedActive == "1.0" ? "倍速" : state.speedActive + "x" }}
            <div class="tool-item-main">
              <ul class="speed-main">
                <li :class="{ 'speed-active': state.speedActive == row }" v-for="row of state.speedRate"
                  :key="row as string">{{
                    row
                  }}x</li>
              </ul>
            </div>
          </div>

          <!-- 截图 -->
          <div class="tool-item pip-btn">
            <SvgIcon icon="screenshot" class="screenshot"></SvgIcon>
            <div class="tool-item-main">截图</div>
          </div>

          <!-- 设置 -->
          <div class="tool-item setting-btn" v-if="props.controlBtns.includes('setting')">
            <SvgIcon icon="settings" class="rotateHover"></SvgIcon>
            <div class="tool-item-main">
              <ul class="speed-main">
                <li>
                  镜像画面
                  <PlaySwitch v-model="state.mirror" />
                </li>
                <li>
                  循环播放
                  <PlaySwitch v-model="state.loop" />
                </li>
                <li>
                  关灯模式
                  <PlaySwitch v-model="state.lightsOff" />
                </li>
              </ul>
            </div>
          </div>
          <!-- 画中画 -->
          <div class="tool-item pip-btn" v-if="props.controlBtns.includes('pip')">
            <!-- <d-icon size="20" icon="icon-pip"></d-icon> -->
            <SvgIcon icon="hzh"></SvgIcon>
            <div class="tool-item-main">画中画</div>
          </div>
          <!-- 网页全屏 -->
          <div class="tool-item pip-btn" v-if="props.controlBtns.includes('pageFullScreen')"
            @click="state.webFullScreen = !state.webFullScreen">
            <!-- <d-icon size="20" icon="icon-web-screen"></d-icon> -->
            <SvgIcon icon="fullscreen"></SvgIcon>
            <div class="tool-item-main">网页全屏</div>
          </div>
          <!-- 全屏 -->
          <div class="tool-item fullScreen-btn" v-if="props.controlBtns.includes('fullScreen')">
            <div class="tool-item-main">全屏</div>
            <SvgIcon icon="Bfullscreen"></SvgIcon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from "../components/SvgIcon.vue";
import ControlsProgress from "../components/ControlsProgress.vue";
import PlaySwitch from "../components/PlaySwitch.vue";
import { defineProps, reactive } from "vue";
import { defaultProps } from "./defaultProps";
import { isMobile } from "../utils/util";
const props = defineProps(defaultProps);
const state = reactive({
  dVideo: null,
  ...props, //如果有自定义配置就会替换默认配置
  muted: props.muted,
  playBtnState: props.autoPlay ? "pause" : "play", // 播放按钮状态
  loadStateType: "loadstart", // 加载状态类型 //loadstart初始化  waiting缓冲 ended播放结束
  fullScreen: false,
  handleType: "", //当前操作类型
  currentTime: "00:00:00",//当前播放时间
  preloadBar: 0,// 当前缓冲进度
  totalTime: "00:00:00", //总时长
  isVideoHovering: true, //鼠标是否在视频上
  speedActive: "1.0", //倍速
  playProgress: 0, //播放进度
  isMultiplesPlay: false, //是否倍速播放
  longPressTimeout: null,
  progressCursorTime: "00:00:00", //进度条光标时间
  qualityLevels: [], //分辨率数组
  currentLevel: 0, //首选分辨率
});
</script>

<script lang="ts">
export default {
  name: "VideoPlay",
};
</script>
<style lang="scss" scoped>
@import "../assets/style/index.scss";
@import "../assets/style/transition.scss";
@import "../assets/style/animate.scss";

.player-wrap {
  // 通过v-bind绑定props中的width和height
  width: v-bind(width);
  height: v-bind(height);
  $font-color: v-bind(color);
}
</style>
