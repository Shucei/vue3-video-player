import videoPlay from "./videoPlay/index.vue";
import "./utils/rem";
const requireAll = (requireContext) => requireContext.keys().map(requireContext); // 通过正则匹配引入相应的文件
const req = require.context("./assets/icon/svg", false, /\.svg$/); // 找到icons目录下以.svg结尾的文件
requireAll(req);

// 为组件提供 install 安装方法，供按需引入
function install(app) {
  app.component(videoPlay.name, videoPlay);
}
videoPlay.install = install;
// 默认导出组件
export { videoPlay, install };
export default videoPlay;
