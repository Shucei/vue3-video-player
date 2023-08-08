<template>
  <!-- :class="{ 'is-vertical': props.vertical }" -->
  <div ref="refProgress" class="d-progress" @mousedown.stop="mouseDownHandle" @contextmenu="contextmenuHandle">
    <div class="d-progress__runway" @mousemove="mousemoveHandle">
      <div class="d-progress__cursor" v-if="!isSound" :style="hoverStyle" v-show="props.hover">
        <div class="d-progress__tips" ref="refTips" :style="{ left: state.hoverTipsLeft }" v-show="props.hoverText">{{
          props.hoverText
        }}</div>
      </div>
      <div v-if="!isSound" class="d-progress__preload" :style="preloadStyle"></div>
      <div class="d-progress__bar" :style="sliderBarStyle"></div>
    </div>

  </div>
</template>
<script lang="ts">
export default {
  name: 'DProgress'
}
</script>
<script setup lang="ts">
import { reactive, ref, computed, defineProps, defineEmits } from 'vue'
import { on, off } from '../utils/dom'

type Nullable<T> = null | T
const refProgress = ref<Nullable<HTMLElement>>(null)
const refTips = ref<Nullable<HTMLElement>>(null)
// 定义Props和Emits
const props = defineProps({
  modelValue: {
    required: true,
    type: [Number],
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hover: { type: Boolean, default: true },
  hoverText: { type: String, default: '' },
  preload: { type: Number, default: 0 },
  size: {
    type: String,
    default: '6px',
  },
  isSound: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue', 'change', 'onMousemove'])

// 响应式数据
const state = reactive({
  dragging: false,
  hoverPosition: 0,
  hoverTipsLeft: '50%',
})

// 计算属性
const sliderBarStyle = computed(() => {
  let value = props.modelValue < 0 ? 0 : props.modelValue > 1 ? 1 : props.modelValue;
  return `width:${value * 100}%`
})

const preloadStyle = computed(() => {
  let value = props.preload < 0 ? 0 : props.preload > 1 ? 1 : props.preload;
  return `width:${value * 100}%`
})

const hoverStyle = computed(() => {
  let value = state.hoverPosition < 0 ? 0 : state.hoverPosition > 1 ? 1 : state.hoverPosition;
  return `left:${value * 100}%`
})

// 阻止右键事件
const contextmenuHandle = (ev: MouseEvent) => {
  ev.preventDefault()
}

// 按下事件
const mouseDownHandle = (ev: MouseEvent) => {
  if (props.disabled) return // 禁用
  ev.preventDefault()
  state.dragging = true
  setPosition(ev)
  on(window, 'mousemove', onDragging)
  on(window, 'touchmove', onDragging)
  on(window, 'mouseup', onDragEnd)
  on(window, 'touchend', onDragEnd)
}

// 鼠标移动事件
const mousemoveHandle = (ev: MouseEvent) => {
  if (!props.hover) return
  let val = getPosition(ev)
  emits('onMousemove', ev, val)
  state.hoverPosition = val

  let refProgressEl = refProgress.value as HTMLElement
  let refTipsWidth = refTips.value?.clientWidth ? refTips.value?.clientWidth / 2 || 0 : 0
  let movePositon = ev.clientX - refProgressEl.getBoundingClientRect().left
  // 鼠标移动到两端时，提示框不超出进度条
  if (movePositon < refTipsWidth) {
    state.hoverTipsLeft = (refTipsWidth - movePositon) + 'px'
  } else if ((refProgressEl.clientWidth - movePositon) < refTipsWidth) {
    state.hoverTipsLeft = (refProgressEl.clientWidth - movePositon) - refTipsWidth + 'px'
  } else {
    state.hoverTipsLeft = '50%'
  }
}

// 设置位置
const setPosition = (ev: MouseEvent) => {
  let value = getPosition(ev)
  emits('update:modelValue', value)
  emits('change', ev, value)
}

// 获取当前事件位置
const getPosition = (ev: MouseEvent) => {
  let refProgressEl = refProgress.value as HTMLElement
  let value = (ev.clientX - refProgressEl.getBoundingClientRect().left) / refProgressEl.clientWidth
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

// 拖拽中
const onDragging = (ev) => {
  setPosition(ev)
}

// 拖拽结束
const onDragEnd = (ev: Event) => {
  if (state.dragging) {
    off(window, 'mousemove', onDragging)
    off(window, 'touchmove', onDragging)
    off(window, 'mouseup', onDragEnd)
    off(window, 'touchend', onDragEnd)
    off(window, 'contextmenu', onDragEnd)
    setTimeout(() => {
      state.dragging = false;
    }, 0);
  }
}
</script>

<style lang='scss' scoped>
.d-progress {
  position: relative;

  .d-progress__runway {
    width: v-bind(size);
    transition: height 0.1s;
    height: 100%;
    background: rgba(255, 255, 255, 0.4);
    position: relative;
    cursor: pointer;
    vertical-align: middle;
    border-radius: 5px;

    .d-progress__cursor,
    .d-progress__preload,
    .d-progress__bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;

    }

    .d-progress__cursor {
      display: none; //TODO
      z-index: 1;
      width: 1px;
      background: #fff;
      pointer-events: none;

      .d-progress__tips {
        pointer-events: none;
        color: #fff;
        position: absolute;
        white-space: nowrap;
        z-index: 2;
        bottom: 14px;
        left: 50%;
        padding: 4px;
        box-sizing: border-box;
        display: block;
        font-size: 12px;
        font-weight: 500;
        background: rgba(155, 108, 108, 0.6);
        border-radius: 3px;
        transform: translateX(-50%);
      }
    }

    &:hover .d-progress__cursor {
      display: block;
    }

    // 预加载进度条
    .d-progress__preload {
      background: rgba(67, 225, 204, 0.5);
    }

    // 颜色进度条
    .d-progress__bar {
      background: linear-gradient(to right,
          #52a0fd 0%,
          #00e2fa 80%,
          #00e2fa 100%);
      border-radius: 5px;

      &::before {
        display: block;
        content: "";
        position: absolute;
        right: -4px;
        top: 50%;
        width: 6px;
        height: 6px;
        transition: 0.2s;
        transform: translateY(-50%) scale(0, 0);
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 0 0 3px #409eff;
      }
    }
  }

  // 垂直模式
  // &.is-vertical {
  //   height: 100%;
  //   display: inline-block;

  //   .d-progress__runway {
  //     position: relative;
  //     height: 100%;
  //     width: v-bind(size);
  //     margin: 0 6px;

  //     .d-progress__preload,
  //     .d-progress__bar,
  //     .d-progress__cursor {
  //       bottom: 0;
  //       top: auto;
  //       width: 100%;
  //     }

  //     .d-progress__cursor {
  //       height: 1px;
  //     }

  //     .d-progress__bar {
  //       &::before {
  //         top: -6px;
  //         left: 50%;
  //         width: 12px;
  //         height: 12px;
  //         transform: translateX(-50%) scale(1, 1);
  //       }
  //     }
  //   }
  // }
}
</style>