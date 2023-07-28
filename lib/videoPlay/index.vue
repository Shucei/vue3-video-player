<template>
  <div class="player-wrap">
    <video src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"></video>
  </div>

</template>

<script lang="ts" setup>
// import SvgIcon from "../components/SvgIcon.vue";
import { ref, onMounted, onUnmounted, onUpdated, watch, defineProps } from "vue";
import { defaultProps } from "./defaultProps";
const props = defineProps(defaultProps);
</script>

<script lang="ts">
export default {
  name: "VideoPlay",
};
</script>
<style lang="scss" scoped>
@import "../assets/style/index.scss";

.player-wrap {
  width: v-bind(width);
  height: v-bind(height);
}
</style>
