<template>
  <div class="player-wrap" :class="{
    'player-wrap-hover': state.playBtnState == 'play' || state.isVideoHovering,
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
      <video ref="videoRef" class="player-video-main" :class="{ 'video-mirror': state.mirror }"
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
          <!-- 播放 -->
          <div class="tool-item" @click="togglePlay">
            <SvgIcon :icon="state.playBtnState" className="play"></SvgIcon>
          </div>

          <!-- 音量 -->
          <div class="tool-item tool-sound">
            <SvgIcon icon="volume-off" className="sound"></SvgIcon>
          </div>
          <div class="tool-item volume-box" v-if="props.controlBtns.includes('volume')">
            <!-- @change 如果修改音量则取消静音 -->
            <ControlsProgress class="progress-bar" @change="state.muted = false" :hover="false" size="100%"
              v-model="state.volume" isSound>
            </ControlsProgress>
          </div>

          <!-- 时间 -->
          <div class="tool-item tool-time" v-if="props.controlBtns.includes('audioTrack')">
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
              <ul class="speed-main" style="text-align: center">
                <li :class="{ 'speed-active': state.currentLevel == index }" v-for="(row, index) of state.qualityLevels"
                  :key="row">
                  {{ row.name }}
                </li>
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
                  :key="row as string">
                  {{ row }}x
                </li>
              </ul>
            </div>
          </div>

          <!-- 截图 -->
          <div class="tool-item pip-btn" v-if="props.controlBtns.includes('screenshot')">
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
import { defineProps, reactive, ref, onMounted, watch, nextTick, onBeforeUnmount } from "vue";
import { defaultProps } from "./defaultProps";
import { isMobile } from "../utils/util";
import Hlsjs from "hls.js";

const props = defineProps(defaultProps);
const state = reactive({
  VideoRef: null as HTMLMediaElement | null,
  ...props, //如果有自定义配置就会替换默认配置
  muted: props.muted,
  playBtnState: props.autoPlay ? "pause" : "play", // 播放按钮状态
  loadStateType: "loadstart", // 加载状态
  fullScreen: false,
  handleType: "", //当前操作类型
  currentTime: "00:00:00", //当前播放时间
  preloadBar: 0, // 当前缓冲进度
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

// 播放器实例
const videoRef = ref<HTMLMediaElement>();

/**
 * 播放暂停切换
 */
const togglePlay = (ev) => {
  if (ev) ev.preventDefault();
  if (state.playBtnState === "play" || state.playBtnState === "replay") {
    // 点击播放按钮 或 重新播放按钮 后
    playVideo();
  } else if (state.playBtnState == "pause") {
    // 点击暂停按钮后
    pauseVideo();
  }
};

/**
 * 播放
 */
const playVideo = () => {
  state.loadStateType = "play";
  state.VideoRef?.play().catch(() => {
    setTimeout(() => {
      state.playBtnState = "replay";
      state.loadStateType = "error";
    }, 500);
  });
  state.playBtnState = "pause";
};

/**
 * 暂停
 */
const pauseVideo = () => {
  state.VideoRef?.pause();
  state.playBtnState = "play"; // 暂停后要显示播放按钮
};

/**
 * 聚焦到播放器
 */
// const inputFocusHandle = () => {
//   if (isMobile) return;
//   videoRef.value?.focus();
// };
let hls = null
const init = (): void => {
  if (
    state.VideoRef?.canPlayType(props.type) ||
    state.VideoRef?.canPlayType("application/vnd.apple.mpegurl") ||
    state.VideoRef?.canPlayType("application/x-mpegURL")
  ) {
    state.muted = props.autoPlay;
  }
  // 使用hls解码
  else if (Hlsjs.isSupported()) {
    /**
     * 
      fragLoadingTimeOut：设置片段加载超时时间的配置选项。
      maxBufferLength：设置缓冲区的最大长度，用于控制缓冲视频片段的数量。
      maxBufferSize：设置缓冲区的最大大小，用于控制缓冲视频片段的总大小。
      startLevel：设置初始的质量级别。
      autoStartLoad：设置是否自动开始加载视频。
      enableWorker：启用或禁用Web Worker的使用，用于在后台处理数据。
      enableWebVTT：启用或禁用WebVTT字幕的解析和显示。
      startPosition：设置初始播放位置。
     * 
     */
    hls = new Hlsjs({ fragLoadingTimeOut: 2000 });
    hls.detachMedia(); //解除绑定
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    hls.attachMedia(state.VideoRef!);
    // 当媒体元素与Hls实例绑定时触发
    hls.on(Hlsjs.Events.MEDIA_ATTACHED, (ev, data) => {
      hls.loadSource(props.src);
      // 成功解析HLS清单文件后触发
      hls.on(Hlsjs.Events.MANIFEST_PARSED, (ev, data) => {
        console.log(data);
        state.currentLevel = data.firstLevel;
        state.qualityLevels = data.levels || [];
        // state.VideoRef.load();
      });
    });


    hls.on(Hlsjs.Events.LEVEL_SWITCHING, (event, data) => {
      // 在LEVEL_SWITCHING事件中执行质量级别切换前的操作
      console.log('LEVEL_SWITCHING')
      // 在此处可以执行一些预处理操作，如暂停视频播放或显示加载指示器
      // state.qualityLevels = Hls.levels || []
      // state.VideoRef.load();
    });

    hls.on(Hlsjs.Events.LEVEL_SWITCHED, (event, data) => {
      // 在LEVEL_SWITCHED事件中执行质量级别切换后的操作
      console.log('LEVEL_SWITCHED')
      console.log(data);
      // 在此处可以执行一些后续操作，如恢复播放或隐藏加载指示器
      state.currentLevel = data.level
      // state.qualityLevels = Hls.levels || []
      // state.VideoRef.load();
    });

    // 监听错误事件
    hls.on(Hlsjs.Events.ERROR, (event, data) => {
      const errorType = data.type;
      const errorDetails = data.details;
      const errorFatal = data.fatal;
      console.error(`HLS.js错误: ${errorType}`);
      console.error(`错误详情: ${errorDetails}`);
      if (errorFatal) {
        // 如果错误是致命的，显示错误提示给用户
        // displayError('发生了一个错误，请稍后重试。');
      }
    });
  }
};

onBeforeUnmount(() => {
  if (hls) {
    hls.destroy();
  }
})

watch(
  () => props.src,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      nextTick(() => {
        // 初始化
        init()
      })
    }
  }, { immediate: true }
);

onMounted(() => {
  // 播放器实例
  if (!videoRef.value) {
    console.error("videoRef is null");
    return;
  }
  state.VideoRef = videoRef.value;
  // 聚焦到播放器
  // inputFocusHandle();
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
  $font-color: v-bind(theme);
}
</style>
