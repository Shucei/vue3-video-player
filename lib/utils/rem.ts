// rem等比适配配置文件
// 基准大小
const baseSize = 16;
// 设置 rem 函数
function init() {
  // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 1920;
  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + "px";
}
// 初始化
init();
// 监听手机旋转的事件的时机，重新设置
window.addEventListener("orientationchange", init);
// 监听手机窗口变化，重新设置
window.addEventListener("resize", init);

// main.js
export function px2rem(px) {
  if (/%/gi.test(px)) {
    // 有百分号%，特殊处理，表述pc是一个有百分号的数，比如：90%
    return px;
  } else {
    return parseFloat(px) / 16 + "rem";
  }
}
