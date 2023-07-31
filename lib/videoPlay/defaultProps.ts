import type { PropType } from "vue"; //导入PropType类型

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
];
export const defaultProps = {
  width: { type: String, default: "800px" },
  height: { type: String, default: "450px" },
  color: { type: String, default: "#409eff" },
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
  ligthOff: { type: Boolean, default: false }, //关灯模式
  volume: { type: [String, Number], default: 0.3 }, //默认音量大小
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
    ],
  }, //是否显示控制器
  preload: { type: String, default: "auto" }, //预加载
};
