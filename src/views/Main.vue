<template>
  <div id="main">
    <div id="nav">
      <router-link to="/home">资讯</router-link>
      <router-link to="/video">视频</router-link>
      <span @click="addmodal()" class="add"></span>
      <router-link to="/topic">话题</router-link>
      <router-link to="/my">我的</router-link>
    </div>
    <router-view></router-view>
    <van-popup
      v-model="modal.add"
      :close-on-click-overlay="false"
      class="modal-add"
    >
      <div class="add-main">
        <div @click="$router.push('/releasebroke/')">
          <img src="../assets/img/home/icon-broken@2x.png" alt />
          <span>发爆料</span>
        </div>
        <div @click="$router.push('/releasevideo/')">
          <img src="../assets/img/home/icon-video@2x.png" alt />
          <span>发布视频</span>
        </div>
      </div>
      <div class="close">
        <img
          src="../assets/img/home/icon-close@2x.png"
          alt
          @click="modal.add = false"
        />
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Popup } from "vant";
export default {
  data() {
    return {
      modal: {
        add: false,
      },
    };
  },
  created() {},
  methods: {
    addmodal() {
      this.modal.add = true;
    },
  },
  components: {
    "van-popup": Popup,
  },
};
</script>
<style lang="scss" scoped>
// .home {
//   background: red;
// }
#nav {
  position: fixed;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 58px;
  background: #ffffff;
  a {
    font-size: 15px;
    font-weight: bold;
    color: #666666;
    &.router-link-exact-active {
      color: #c4a655;
    }
  }
}
.add {
  width: 40px;
  height: 40px;
  background-size: 40px 40px;
  background-repeat: no-repeat;
  // @include border-1px(green);
  @include bg-image("../assets/img/home/add");
}
.modal-add {
  background: none;
  overflow: hidden;
  .add-main {
    width: 267px;
    height: 180px;
    background: #ffffff;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    > div {
      width: 60px;
      text-align: center;
      img {
        width: 45px;
      }
      span {
        display: block;
        margin-top: 11px;
        font-size: 13px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #666666;
      }
    }
  }
  .close {
    margin-top: 33px;
    text-align: center;
    img {
      width: 21px;
    }
  }
}
</style>
