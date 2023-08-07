import type { PropType } from "vue"; //导入PropType类型
/**
 * 
loadstart; //客户端开始请求数据
progress; //客户端正在请求数据
suspend; //延迟下载
abort; //客户端主动终止下载（不是因为错误引起）
loadstart; //客户端开始请求数据
progress; //客户端正在请求数据
suspend; //延迟下载
abort; //客户端主动终止下载（不是因为错误引起），
error; //请求数据时遇到错误
stalled; //网速失速
play; //play()和autoplay开始播放时触发
pause; //pause()触发
loadedmetadata; //成功获取资源长度
loadeddata; //
waiting; //等待数据，并非错误
playing; //开始回放
canplay; //可以播放，但中途可能因为加载而暂停
canplaythrough; //可以播放，歌曲全部加载完毕
seeking; //寻找中
seeked; //寻找完毕
timeupdate; //播放时间改变
ended; //播放结束
ratechange; //播放速率改变
durationchange; //资源长度改变
volumechange; //音量改变
 */
export const videoEmits = [
  "loadstart", //客户端开始请求数据
  "play", //播放
  "pause", //暂停
  "playing", //播放中
  "seeking", //寻找中
  "seeked", //寻找完毕
  "waiting", //等待
  "durationchange", //视频时长改变
  "progress", //视频加载进度
  "canplay", //可以播放
  "timeupdate", //播放时间改变
  "ended", //播放结束
  "error", //播放错误
  "stalled", //网速失速
  "volumechange", //音量改变
  // "loadeddata", //视频加载完毕
];
export const defaultProps = {
  width: { type: String, default: "800px" },
  height: { type: String, default: "450px" },
  theme: { type: String, default: "#409eff" },
  src: { required: true, type: String, default: "" }, //视频源
  title: { type: String, default: "" }, //视频名称
  type: { type: String, default: "video/mp4" }, //视频类型
  poster: { type: String, default: "" }, //封面
  webFullScreen: { type: Boolean, default: false }, // 网页全屏
  speed: { type: Boolean, default: true }, // 是否支持快进快退 //移动端不支持
  currentTime: { type: Number, default: 0 }, //当前播放时间
  playsinline: { type: Boolean, default: false }, //IOS10支持内联播放，不让视频全屏显示
  muted: { type: Boolean, default: false }, //静音
  speedRate: { type: Array, default: () => ["2.0", "1.5", "1.25", "1.0", "0.75", "0.5"] }, //播放倍速
  autoPlay: { type: Boolean, default: false }, //自动播放
  loop: { type: Boolean, default: false }, //循环播放
  mirror: { type: Boolean, default: false }, //镜像画面
  lightsOff: { type: Boolean, default: false }, //关灯模式
  volume: { type: Number, default: 0.3 }, //默认音量大小
  control: { type: Boolean, default: true }, //是否显示控制器
  controlBtns: {
    type: Array as PropType<Array<string>>,
    default: [
      "audioTrack",
      "quality",
      "speedRate",
      "volume",
      "setting",
      "pip",
      "pageFullScreen",
      "fullScreen",
      "screenshot",
    ],
  }, //是否显示控制器
  preload: { type: String, default: "auto" }, //预加载
};
