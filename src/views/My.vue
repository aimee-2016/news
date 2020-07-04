<template>
  <div>
    <div class="info-top">
      <div class="back-home">
        <span>个人主页</span>
        <van-icon name="arrow" />
      </div>
      <div class="top">
        <div class="avatar">
          <i class="auth"></i>
        </div>
        <div class="text">
          <div class="name">包小白</div>
          <div class="obtain">
            <span class="tech-video"></span>
            <span class="tech-article"></span>
          </div>
        </div>
      </div>
      <div class="follow">
        <ul>
          <li>
            <span class="num">5</span>
            <span class="text">关注</span>
          </li>
          <li>
            <span class="num">5</span>
            <span class="text">粉丝</span>
          </li>
          <li>
            <span class="num">5</span>
            <span class="text">获赞</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="signin">
      <div class="date">
        <div class="day-box">
          <ul>
            <li>
              <i>10</i>
              <span>1天</span>
            </li>
            <li>
              <i>10</i>
              <span>2天</span>
            </li>
            <li>
              <i>10</i>
              <span>3天</span>
            </li>
            <li>
              <i>10</i>
              <span>4天</span>
            </li>
            <li>
              <i>10</i>
              <span>5天</span>
            </li>
            <li>
              <i>10</i>
              <span>6天</span>
            </li>
            <li>
              <i>10</i>
              <span>7天</span>
            </li>
          </ul>
        </div>

        <van-button class="btn-sign" size="small" round>已签到</van-button>
      </div>
      <div class="desc">
        <i class="icon"></i>
        <span>10万人已打卡</span>
      </div>
    </div>
    <ul class="handle">
      <li>
        <i class="collection"></i>
        <span>收藏</span>
      </li>
      <li>
        <i class="history"></i>
        <span>历史</span>
      </li>
      <li>
        <i class="comment"></i>
        <span>评论</span>
      </li>
      <li>
        <i class="support"></i>
        <span>点赞</span>
      </li>
    </ul>
    <van-cell-group>
      <van-cell icon="envelop-o" title="消息中心" is-link url="/vant/mobile.html" />
      <van-cell icon="edit" title="反馈帮助" is-link to="index" />
      <van-cell icon="setting-o" title="系统设置" is-link url="/vant/mobile.html" />
      <van-cell icon="info-o" title="关于我们" is-link to="index" />
    </van-cell-group>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button, Icon } from "vant";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
  components: {
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button,
    "van-icon": Icon
  }
};
</script>

<style lang="scss" scoped>
.info-top {
  margin: 40px 14px 0;
  .back-home {
    position: absolute;
    top: 50px;
    right: 0;
    width: 88px;
    height: 27px;
    border-radius: 16px 0 0 16px;
    background: linear-gradient(to right, #f79598, #fbaf95);
    font-size: 14px;
    color: #fff;
    line-height: 27px;
    text-align: center;
    .van-icon-arrow {
      font-size: 10px;
      margin-left: 6px;
    }
  }
  .top {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    .avatar {
      position: relative;
      width: 58px;
      height: 58px;
      margin-right: 10px;
      border-radius: 50%;
      border: #666666 1px solid;
      .auth {
        display: inline-block;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 14px;
        height: 14px;
        background-size: 14px 14px;
        background-repeat: no-repeat;
        @include bg-image("../assets/img/my/auth");
      }
    }
    .text {
      .name {
        margin-bottom: 6px;
        font-size: 17px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        text-align: left;
        color: #000006;
      }
      .obtain {
        span {
          display: inline-block;
          width: 82px;
          height: 21px;
          margin-right: 5px;
          background-size: 82px 21px;
          background-repeat: no-repeat;
        }
        .tech-video {
          @include bg-image("../assets/img/my/tech-video");
        }
        .tech-article {
          @include bg-image("../assets/img/my/tech-article");
        }
      }
    }
  }
  .follow {
    padding: 0 50px;
    text-align: center;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        span {
          display: block;
          &.num {
            font-size: 16px;
            font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
            font-weight: 800;
            color: #000006;
          }
          &.text {
            margin-top: 9px;
            font-size: 12px;
            font-family: PingFang SC Medium, PingFang SC Medium-Medium;
            font-weight: 500;
            text-align: center;
            color: #666666;
          }
        }
      }
    }
  }
}
.signin {
  margin: 20px 14px 10px;
  padding: 16px 12px 16px 14px;
  background: #ffffff;
  box-shadow: 0px 1px 10px 0px rgba(4, 0, 0, 0.1);
  .date {
    display: flex;
    align-items: center;
    .day-box {
      position: relative;
      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 1px;
        background: #fcbe64;
        top: 13px;
      }
    }
    ul {
      position: relative;
      z-index: 2;
      display: flex;
      li {
        margin-right: 10px;
        text-align: center;
        &:last-child {
          margin-right: 0;
        }
        i {
          display: block;
          width: 26px;
          height: 26px;
          background: #fcbe64;
          border-radius: 50%;
          font-size: 13px;
          font-family: PingFang SC Medium, PingFang SC Medium-Medium;
          font-weight: 500;
          line-height: 26px;
          color: #ffffff;
          font-style: normal;
        }
        span {
          display: block;
          margin-top: 6px;
          font-size: 11px;
          font-family: PingFang SC Medium, PingFang SC Medium-Medium;
          font-weight: 500;
          color: #666666;
        }
      }
    }
  }
  .desc {
    margin-top: 16px;
    .icon {
      display: inline-block;
      width: 13px;
      height: 13px;
      margin-right: 6px;
      background-size: 13px 13px;
      background-repeat: no-repeat;
      @include bg-image("../assets/img/my/date");
      vertical-align: bottom;
    }
    span {
      font-size: 11px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #999999;
    }
  }
  .btn-sign {
    margin-left: 14px;
  }
}
.handle {
  display: flex;
  justify-content: space-between;
  margin: 10px 14px;
  padding: 15px 36px;
  background: #ffffff;
  box-shadow: 0px 1px 10px 0px rgba(4, 0, 0, 0.1);
  text-align: center;
  i {
    display: inline-block;
    &.collection {
      width: 26px;
      height: 25px;
      background-size: 26px 25px;
      background-repeat: no-repeat;
      @include bg-image("../assets/img/my/icon-collection");
    }
    &.history {
      width: 25px;
      height: 25px;
      background-size: 25px 25px;
      background-repeat: no-repeat;
      @include bg-image("../assets/img/my/icon-history");
    }
    &.comment {
      width: 29px;
      height: 21px;
      background-size: 29px 21px;
      background-repeat: no-repeat;
      @include bg-image("../assets/img/my/icon-comment");
    }
    &.support {
      width: 24px;
      height: 24px;
      background-size: 24px 24px;
      background-repeat: no-repeat;
      @include bg-image("../assets/img/my/icon-support");
    }
  }

  span {
    display: block;
    margin-top: 10px;
  }
}
</style>
