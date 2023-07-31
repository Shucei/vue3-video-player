
<template>
  <!-- :class="{ 'is-vertical': props.vertical }" -->
  <div ref="refProgress" class="d-progress">
    <div class="d-progress__runway">
      <div class="d-progress__cursor">
        <div class="d-progress__tips" ref="refTips">666</div>
      </div>
      <div class="d-progress__preload"></div>
      <div class="d-progress__bar"></div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'DProgress'
}
</script>
<script setup lang="ts">


</script>

<style lang='scss' scoped>
.d-progress {
  position: relative;

  .d-progress__runway {
    width: 100%;
    // height: v-bind(size);
    background-color: #333333;
    position: relative;
    cursor: pointer;
    vertical-align: middle;

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
        background: rgba(0, 0, 0, 0.6);
        border-radius: 3px;
        transform: translateX(-50%);
      }
    }

    &:hover .d-progress__cursor {
      display: block;
    }

    // 预加载进度条
    .d-progress__preload {
      background: #717171;
    }

    // 颜色进度条
    .d-progress__bar {
      background: linear-gradient(to right,
          #52a0fd 0%,
          #00e2fa 80%,
          #00e2fa 100%);

      &::before {
        display: block;
        content: "";
        position: absolute;
        right: -5px;
        top: 50%;
        width: 6px;
        height: 6px;
        transition: 0.2s;
        // transform: translateY(-50%) scale(1, 1);
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