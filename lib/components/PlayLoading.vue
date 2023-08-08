<template>
  <div class="d-loading" :style="loadingStyle" v-show="LOAD_TYPE.includes(loadType)">
    <div>
      <!-- 初始化加载 -->
      <span v-if="loadType == 'loadstart'">
        <SvgIcon icon="loadding" class="loader"></SvgIcon>
        <p>{{ text }}</p>
      </span>
      <!-- 缓冲中 -->
      <span v-show="loadType == 'waiting'">
        <SvgIcon icon="loadding" className="loader"></SvgIcon>
        <p>正在缓冲...</p>
      </span>
      <!-- 播放结束 -->
      <span v-show="loadType == 'ended'">
        <p @click="replayHandle" class="d-flex-x d-pointer">
          <SvgIcon icon="replay" className="f24"></SvgIcon>重新播放
        </p>
      </span>
      <!-- 播放错误 -->
      <span v-show="loadType == 'error' || loadType == 'stalled'">
        <p @click="replayHandle" class="d-flex-x d-pointer">
          <SvgIcon icon="replay" className="f24"></SvgIcon>请求错误
        </p>
      </span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance, computed, defineProps } from 'vue'
import SvgIcon from './SvgIcon.vue';
const { proxy } = getCurrentInstance()!
const LOAD_TYPE = ['loadstart', 'waiting', 'ended', 'error', 'stalled']
const props = defineProps({
  loadType: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: '',
  },
})
const replayHandle = () => {
  proxy.$parent?.play()
}
const loadingStyle = computed(() => {
  let style = "background: rgba(0, 0, 0, .1);z-index:1"
  if (props.loadType == 'loadstart') {
    style = "background: rgba(0, 0, 0, 1);;z-index:3"
  }
  return style
})
</script>

<style scoped lang='scss'>
@import "../assets/style/animate.scss";

.f50 {
  font-size: 50px;
}

.f24 {
  font-size: 24px;
}

.d-loading {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
  color: #efefef;
  text-align: center;
  font-size: 13px;

  .loader {
    font-size: 42px;
    animation-name: spin;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
}
</style>
