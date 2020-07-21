<template>
  <div>
    <div class="top-info" :style="{background:  '#2e2840 url('+userInfo.headImgPath+')'}">
      <div class="bg">
        <div class="return">
          <van-icon name="arrow-left" />
        </div>
        <div class="row-1">
          <img :src="userInfo.headImgPath" alt class="avatar" />
          <span class="btn-edit">编辑资料</span>
          <span class="btn-auth">我的认证</span>
        </div>
        <div class="row-2">
          <span class="name">卡卡</span>
          <span class="age">女 18</span>
        </div>
        <ul class="row-3">
          <li>
            <span class="num">{{userInfo.followCount}}</span>
            <span class="text">关注</span>
          </li>
          <li>
            <span class="num">{{userInfo.fansCount}}</span>
            <span class="text">粉丝</span>
          </li>
          <li>
            <span class="num">{{userInfo.fabulousCount}}</span>
            <span class="text">获赞</span>
          </li>
        </ul>
        <ul class="row-4">
          <li>
            <span class="icon-auth icon"></span>
            <span class="text">认证：美食文章创作者、美食视频创作者</span>
          </li>
          <li>
            <span class="icon-location icon"></span>
            <span class="text">位置：海外</span>
          </li>
          <li>
            <span class="icon-desc icon"></span>
            <span class="text">简介：喜爱美食所以旅行，感受不同国家的美食</span>
          </li>
        </ul>
      </div>
    </div>
    <van-tabs
      v-model="active"
      line-width="15px"
      line-heigth="2px"
      title-active-color=" #333333"
      color="#ffcb00"
    >
      <van-tab title="全部">
        <ul class="all">
          <li>
            <div class="info">
              <div class="left">
                <img :src="userInfo.headImgPath" alt class="avatar" />
                <div class="text">
                  <span class="name">大马哈</span>
                  <span class="time">5分钟前</span>
                </div>
              </div>
              <div class="right">
                <span class="icon-top"></span>
                <van-icon name="ellipsis" />
              </div>
            </div>
            <div class="content"></div>
            <div class="opreate">
              <span class="icon-share"></span>
              <span>
                <van-icon name="good-job-o" />
                <i>12</i>
              </span>
              <span>
                <van-icon name="comment-o" />
                <i>355</i>
              </span>
            </div>
          </li>
        </ul>
      </van-tab>
      <van-tab title="文章">文章</van-tab>
      <van-tab title="视频">视频</van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import {  Icon, Tabs, Tab } from "vant"; // Cell, CellGroup, Button,
export default {
  data() {
    return {
      active: 0
    };
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {},
  components: {
    // "van-cell-group": CellGroup,
    // "van-cell": Cell,
    // "van-button": Button,
    "van-icon": Icon,
    "van-tabs": Tabs,
    "van-tab": Tab
  }
};
</script>

<style lang="scss" scoped>
.top-info {
  height: 307px;
  color: #fff;
  .bg {
    height: 307px;
    padding: 18px 15px;
    background: rgba(46, 40, 64, 0.8);
  }
  .return {
    margin-bottom: 23px;
    font-size: 15px;
  }
  .row-1 {
    .avatar {
      margin-right: 10px;
      width: 62px;
      height: 62px;
      border-radius: 50%;
      vertical-align: middle;
    }
    span {
      display: inline-block;
      margin-left: 23px;
      width: 104px;
      height: 33px;
      background: #6c677b;
      border-radius: 3px;
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      line-height: 33px;
      color: #ffffff;
      text-align: center;
    }
    .btn-auth {
      background: #fdd004;
      color: #333333;
    }
  }
  .row-2 {
    margin-top: 22px;
    .name {
      margin-right: 19px;
      font-size: 22px;
      font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
      font-weight: 800;
      color: #ffffff;
    }
    .age {
      display: inline-block;
      padding: 2px 6px;
      background: #fdb4c5;
      border-radius: 8px;
      font-size: 11px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      color: #ffffff;
    }
  }
  .row-3 {
    display: flex;
    margin-top: 11px;
    li {
      margin-right: 13px;
      .num {
        margin-right: 3px;
        font-size: 11px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        text-align: left;
        color: #a19fac;
      }
      .text {
        font-size: 15px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
      }
    }
  }
  .row-4 {
    margin-top: 18px;
    li {
      margin-bottom: 10px;
      .icon {
        display: inline-block;
      }
      .icon-auth {
        margin-right: 9px;
        width: 15px;
        height: 13px;
        background-size: 15px 13px;
        background-repeat: no-repeat;
        @include bg-image("../assets/img/myhome/icon-auth");
      }
      .icon-location {
        margin-right: 10px;
        width: 12px;
        height: 15px;
        background-size: 12px 15px;
        background-repeat: no-repeat;
        @include bg-image("../assets/img/myhome/icon-location");
      }
      .icon-desc {
        margin-right: 11px;
        width: 11px;
        height: 13px;
        background-size: 11px 13px;
        background-repeat: no-repeat;
        @include bg-image("../assets/img/myhome/icon-desc");
      }
    }
  }
}
.all {
  padding: 22px 15px;
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
    }
    .avatar {
      margin-right: 10px;
      width: 43px;
      height: 43px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .text {
      font-size: 0;
      span {
        display: block;
      }
      .name {
        font-size: 15px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: bold;
        color: #333333;
      }
      .time {
        margin-top: 10px;
        font-size: 11px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #999999;
      }
    }
    .right {
      .icon-top {
        display: inline-block;
        width: 43px;
        height: 36px;
        margin-right: 29px;
        background-size: 43px 36px;
        background-repeat: no-repeat;
        @include bg-image("../assets/img/myhome/icon-top");
      }
      .van-icon-ellipsis {
        font-size: 20px;
        vertical-align: super;
      }
    }
  }
  .content {
    margin-top: 18px;
    width: 100%;
    height: 180px;
    border: #333333 solid 1px;
  }
  .opreate {
    margin-top: 18px;
    > span {
      margin-right: 27px;
      i {
        margin-left: 4px;
        font-size: 13px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #666666;
        font-style: normal;
      }
    }
    .icon-share {
      display: inline-block;
      width: 16px;
      height: 16px;

      background-size: 16px 16px;
      background-repeat: no-repeat;
      @include bg-image("../assets/img/myhome/icon-share");
    }
  }
}
</style>
 