// 是否是移动端
export const isMobile = !!("ontouchstart" in window);
// 电影时间格式化
export const timeFormat = (time) => {
  let hh: any = ~~(time / 3600);
  let mm: any = ~~((time % 3600) / 60);
  let ss: any = ~~(time % 60); //取整
  hh = hh < 10 ? "0" + hh : hh; //个位数补0
  mm = mm < 10 ? "0" + mm : mm; //个位数补0
  ss = ss < 10 ? "0" + ss : ss; //个位数补0
  return `${hh}:${mm}:${ss}`;
}