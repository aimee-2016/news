<template>
  <div class="jz-vbox">
    <!-- <div class="vd-title">
      <p>标题</p>
    </div>
    <video id="video" class="jz-video">
      <source src="../../assets/img/video/视频.mp4" />您的浏览器不支持 video 标签。
    </video>
    <i class="vd-play" @click="player" v-if="pyImg">
        <img src='../../assets/img/video/play2x.png' />
    </i>
    <div class="vd-info">
        <p>652万次播放量 | 03:58:29</p>
    </div> -->
    <div :id="id">

    </div>
  </div>
</template>

<script>
import Player from "xgplayer";
export default {
  name: "vd",
  props: {
    videoUrl: '',
    videoImg: '',
    id: ''
  },
  data() {
    return {
      pyImg: true,
      flag: false,
      _dom: ''
    };
  },
  created() {
    let loadings = function () {
      let player = this; let util = Player.util; let container = util.createDom('xg-loading', `
        <img src="../../assets/img/home/play2x.png" style='width: 50px;height:50px'>
        </img>
        `, {}, 'xgplayer-loading')
      player.root.appendChild(container)
    }
    Player.install('zxloading', loadings)
  },
  mounted() {
    let play = new Player({
        id: this.id,
        url: this.videoUrl,
        width: '100%',
        height: 200,
        poster: this.videoImg,
        cssFullscreen: true,
        // closeVideoTouch: true,
        ignores: ['pc', 'play', 'volume', 'fullscreen', 'loading'],
        preview: {
          // uploadEl
        },
        zxloading: true
    })
    
  },
  methods: {
    // player() {
    //   this._dom = document.getElementById('video');
    //   this.pyImg = !this.pyImg;
    //   this._dom.play()
    // },
    showOtherVideo(){
      setTimeout(() => {
          this.flag = this._dom.paused;
          if(!this.flag){
              this.showOtherVideo();
          }
      },1000)
    }
  }
};
</script>

<style lang="scss" scoped>
.jz-vbox:first-child {
  margin-top: 0;
}
.jz-vbox:last-child {
  margin-bottom: 0;
}
.jz-vbox {
    position: relative;
    margin: 15px 0;
    .vd-title {
        position:absolute;
        width: 100%;
        height: 77px;
        top: 0;
        left: 0;
        padding:15px;
        font-size: 17px;
        font-weight: bold;
        color: #fff;
        z-index: 999;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5),rgba(255,255,255, 0));
        box-sizing: border-box;
    }
    .vd-info {
        position:absolute;
        width: 100%;
        height: 33px;
        font-size: 10px;
        bottom: 2px;
        left: 0;
        padding: 12px 15px 12px 0;
        color: #fff;
        z-index: 999;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.5),rgba(255,255,255, 0));
        box-sizing: border-box;
        text-align: right;
    }
    .vd-play {
      position: absolute;
      z-index: 999;
      top: 56px;
      left: 42%;
    }
  .jz-video {
    width: 100%;
    // height: 182px;
  }
}
</style>