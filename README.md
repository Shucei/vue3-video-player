# vue3-player

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

```
使用MSE API可以封装实现的一些常见功能和组件包括:
HLS播放器
使用MSE API可以实现一个纯前端的HLS播放器,支持标准HLS协议,能够流畅播放HLS格式的流媒体视频。
MPEG-DASH播放器
同样可以实现支持MPEG-DASH标准的流媒体播放器。
自定义视频播放器
封装一个可定制的视频播放器组件,支持自定义皮肤,添加播放控件,实现播放效果等。
视频剪辑和拼接
通过MSE API对视频流进行操作,实现视频剪辑,片段拼接等功能。
视频滤镜
可以通过处理视频数据流添加各种视频滤镜,如Old film、模糊、色调等效果。
视频水印
利用MSE API实时向视频流添加水印图层。
视频广告插点
通过控制视频数据流可以实现视频广告的插入。
视频弹幕
可以在播放器上实时渲染弹幕。
字幕
可以用来添加并显示外挂字幕。
视频录制
记录并导出视频数据流到文件。
```

```
视频剪辑和拼接
创建MediaSource和SourceBuffer对象,用来接收视频数据流。
按照时间戳,将视频流分段写入SourceBuffer中。
如果需要剪辑,可以移除SourceBuffer中的某些时间段的数据。
如果需要拼接,可以往SourceBuffer添加其他视频的数据段。
设置video元素的src为MediaSource对象URL,即可播放处理后的视频。
视频滤镜
创建Canvas对象,设置与视频相同的分辨率。
在Canvas上根据像素数据添加滤镜效果,如模糊、灰度等。
在SourceBuffer中,处理每一帧视频数据,渲染到Canvas上。
然后将Canvas帧数据重新写入SourceBuffer中。
video元素即会显示添加了滤镜效果的视频。
视频水印
创建水印图层,用Canvas绘制水印内容。
和视频滤镜类似,在渲染每一帧时,将水印层渲染到Canvas上。
然后将Canvas帧写入SourceBuffer。
video元素播放出来的视频中就会包含水印。
视频广告插点
可以在某个时间点,切换SourceBuffer中的视频流为广告视频。然后在适当时间切回原来的视频流。
视频弹幕
可以用Canvas在渲染视频帧时,额外渲染弹幕元素,然后将Canvas帧写入SourceBuffer。
字幕
将字幕作为文本渲染到视频帧的Canvas上,然后写入SourceBuffer。
视频录制
可以通过JavaScript读取SourceBuffer中的视频数据,并写入Blob,实现录制功能。
```

```
实现HLS播放器
获取HLS流媒体播放列表(M3U8文件)
通过XMLHttpRequest获取TS分片视频文件
创建MediaSource对象,以及SourceBuffer来存放视频数据
查找播放列表中EXTINF标记,读取每个TS文件的时长
按照时间顺序,将TS文件的数据附加到SourceBuffer中
当数据附加结束,触发SourceBuffer的updateend事件
如果所有TS都已附加完,则触发MediaSource的sourceended事件
视频就绪,设置video.src为MediaSource的URL进行播放
缓冲结束后继续找下一个TS,重复步骤4-8直到结束
实现MPEG-DASH播放器
大致流程类似,主要差异:
获取MPD manifest文件,解析出各个视频&音频片段
通过SegmentBase或SegmentTemplate解析出每个片段的URL
创建SourceBuffer时,需要区分视频和音频
查找Representation元素,获取码率信息,可以实现码率切换
可以监听buffer事件,实时调整码率
片段获取需要考虑HTTP range请求
```
