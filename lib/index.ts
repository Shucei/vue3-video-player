import videoPlay from "./videoPlay/index.vue";
import { App } from "vue";
// 为组件提供 install 安装方法，供按需引入
function install(app: App) {
  app.component(videoPlay.name, videoPlay);
}
videoPlay.install = install;
// 默认导出组件
export { videoPlay, install };
export default videoPlay;
