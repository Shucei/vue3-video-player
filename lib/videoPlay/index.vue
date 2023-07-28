<template>
  <div class="player">
    <video src="https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4"></video>
  </div>
  <SvgIcon icon="Bfullscreen" className=""></SvgIcon>
</template>

<script lang="ts" setup>
import SvgIcon from "../components/SvgIcon.vue";


</script>

<script lang="ts">
export default {
  name: "VideoPlay",
};
</script>
<style lang="scss" scoped>

</style>
