<template>
  <div class="jz-vbox">
    <p>{{author.title}}</p>
    <div :id="id">

    </div>
    <div class="video-info">
      <div class="vi-left"> 
        <img :src="author.author.headImgPath">
        <span class="vi-name">{{author.author.nickName}}</span>
        <span class="vi-gz">+关注</span>
      </div>
      <div class="vi-right">
        <span>355</span>
        <span>12</span>
        <img src="../../assets/img/video/other2x.png">
      </div>
    </div>
  </div>
</template>

<script>
import Player from "xgplayer";
export default {
  name: "vd",
  props: {
    videoUrl: {
      default: '',
      type: String
    },
    videoImg: {
      default: '',
      type: String
    },
    id: {
      default: '',
      type: [String, Number]
    },
    author: {
      default: function () {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
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
    play
  },
  methods: {
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
.video-info {
  padding: 0 15px 0 16px;
  display: flex;
  justify-content: space-between;
  .vi-left {
    .vi-name {
      font-size: 14px;
      color: #333333;
      width: 55px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin:0 5px;
    }
    .vi-gz {
      font-size: 14px;
      color: #F99307;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
    img {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .vi-right {
    img {
      width: 16px;
      height: 4px;
    }
  }
}
</style>