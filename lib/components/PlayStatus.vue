<template>
  <div class="player-notice-list">
    <div class="player-notice" :class="vl">
      {{ statusValue }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, watch } from 'vue';
const props = defineProps({
  state: {
    type: Object,
    default: () => ({})
  }
});

const flag = ref(true);

const statusValue = ref('');
let timer: any = null
const changeNotice = () => {
  flag.value = false;
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    flag.value = true;
  }, 1500);
};

watch(() => props.state.volume, (val, oldVal) => {
  statusValue.value = `音量 ${~~(props.state.volume * 100)}%`;
  changeNotice();
});

watch(() => props.state.playProgress, (val, oldVal) => {
  const secondsElapsed = val - oldVal;
  if (Math.abs(secondsElapsed * 100) > 1) {
    if (val > oldVal) {
      statusValue.value = `快进 10 秒`;
    }
    if (val < oldVal) {
      statusValue.value = `快退 10 秒`;
    }
    changeNotice();
  }
});


const vl = computed(() => {
  return flag.value ? 'remove-notice' : '';
});

</script>

<style scoped lang="scss">
.player-notice-list {
  position: absolute;
  bottom: 60px;
  left: 20px;
  z-index: 1;

  .player-notice {
    border-radius: 2px;
    background: rgba(28, 28, 28, 0.7);
    transition: all .3s ease-in-out;
    overflow: hidden;
    color: #fff;
    display: table;
    pointer-events: none;
    animation: showNotice .3s ease 1 forwards;
    font-weight: 600;
  }

  .remove-notice {
    animation: removeNotice .3s ease 1 forwards;
  }
}

@keyframes showNotice {
  from {
    padding: 0;
    font-size: 0;
    margin-top: 0;
  }

  to {
    padding: 6px 20px;
    font-size: 14px;
    margin-top: 5px;
  }
}

@keyframes removeNotice {
  0% {
    padding: 6px 20px;
    font-size: 14px;
    margin-top: 5px;
  }

  20% {
    font-size: 12px;
  }

  21% {
    font-size: 0;
    padding: 6px 10px;
  }

  100% {
    padding: 0;
    margin-top: 0;
    font-size: 0;
  }
}
</style>