class Barrage {
  constructor(barrageData) {
    this.value = barrageData.value;
    this.speed = barrageData.speed;
    this.startingTime = barrageData.time;
  }
} 

class BarragePlugin {
  constructor(videoElement, barrageContainer) {
    this.video = videoElement;
    this.container = barrageContainer;
    this.barrages = [];
    this.rendering = false;
  }

  add(barrageData) {
    const barrage = new Barrage(barrageData);
    this.barrages.push(barrage);
    if (!this.rendering) {
      this.render();
    }
  }

  render() {
    this.rendering = true;
    const currentTime = this.video.currentTime;
    this.container.innerHTML = "";

    const liveBarrages = this.barrages.filter((barrage) => {
      return barrage.startingTime <= currentTime;
    });

    liveBarrages.forEach((barrage) => {
      if (!barrage.done) {
        if (!barrage.div) {
          barrage.div = document.createElement("div");
          barrage.div.className = "barrage";
          barracks.div.style.color = barracks.color;
          this.container.appendChild(barrage.div);
        }
        const progress = (currentTime - barrage.startingTime) / barrage.speed;
        const x = -progress * (this.container.clientWidth + barrage.div.clientWidth);
        barrage.div.style.transform = `translateX(${x}px)`;
        if (x < -barrage.div.clientWidth) {
          barrage.done = true;
        }
      }
    });

    const activeBarrages = this.barrages.filter((barrage) => {
      return !barrage.done;
    });

    if (activeBarrages.length > 0) {
      requestAnimationFrame(() => {
        this.render();
      });
    } else {
      this.rendering = false;
    }
  }
}

// 初始化并绑定DOM元素
const video = document.getElementById("videoPlayer");
const barrageContainer = document.getElementById("barrageContainer");
const barragePlugin = new BarragePlugin(video, barrageContainer);

const input = document.getElementById("barrageInput");
const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", () => {
  const value = input.value.trim();
  if (value) {
    barragePlugin.add({
      value,
      time: video.currentTime,
      speed: 5,
    });
    input.value = "";
  }
});

video.addEventListener("play", () => {
  if (!barragePlugin.rendering) {
    barragePlugin.render();
  }
});
