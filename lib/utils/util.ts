// 是否是移动端
export const isMobile = !!("ontouchstart" in window);

// 将首字母大写
export const firstUpperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// 电影时间格式化
export const timeFormat = (time) => {
  let hh: number | string = ~~(time / 3600);
  let mm: number | string = ~~((time % 3600) / 60);
  let ss: number | string = ~~(time % 60); //取整
  hh = hh < 10 ? "0" + hh : hh; //个位数补0
  mm = mm < 10 ? "0" + mm : mm; //个位数补0
  ss = ss < 10 ? "0" + ss : ss; //个位数补0
  return `${hh}:${mm}:${ss}`;
};

// 全屏模式
export const toggleFullScreen = (el) => {
  //如果当前是全屏状态，就退出全屏，否则进入全屏状态
  //获取当前的全屏状态
  const documentEL = document as any;
  const isFullscreen = documentEL.webkitIsFullScreen || documentEL.fullscreen;
  if (!isFullscreen) {
    const inFun = el.requestFullscreen || el.webkitRequestFullScreen;
    //让当前播放器进入全屏状态
    inFun.call(el);
  } else {
    const exitFun = document.exitFullscreen || documentEL.webkitExitFullScreen;
    //退出全屏状态要使用document
    exitFun.call(documentEL);
  }
  return !isFullscreen;
};

// 画中画模式
export const requestPictureInPicture = async (
  el: HTMLElement | Document | Window | HTMLVideoElement
) => {
  try {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else {
      await (el as HTMLVideoElement).requestPictureInPicture();
    }
  } catch (error) {
    console.error("Picture-in-Picture mode failed:", error);
  }
};
