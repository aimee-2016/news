<template>
  <div>
    <div class="no-login" v-if="!userInfo">
      <div class="avatar"></div>
      <van-button color="#F99307" plain round to="login" class="login-btn">登陆/注册</van-button>
    </div>
    <div class="info-top" v-if="userInfo">
      <div class="back-home" @click="$router.push('myhome')">
        <span>个人主页</span>
        <van-icon name="arrow" />
      </div>
      <div class="top">
        <div class="avatar">
          <img :src="userInfo.headImgPath" alt />
          <i class="auth" v-if="userInfo.memberStatus.name==='CertifyAdopt'"></i>
        </div>
        <div class="text">
          <div class="name">{{userInfo.nickName}}</div>
          <div class="obtain">
            <!-- <span class="icon-tech tech-video"></span>
            <span class="icon-tech tech-article"></span>-->
            <span class="icon-auth noauth" v-if="userInfo.memberStatus.name==='NotApplied'"></span>
            <span class="icon-auth authing" v-if="userInfo.memberStatus.name==='AssessmentPeriod'"></span>
            <span class="icon-auth authed" v-if="userInfo.memberStatus.name==='CertifyAdopt'"></span>
          </div>
        </div>
      </div>
      <div class="follow">
        <ul>
          <li @click="$router.push({path:'/focus/',query:{active:0}})">
            <span class="num">{{userInfo.followCount}}</span>
            <span class="text">关注</span>
          </li>
          <li @click="$router.push({path:'/focus/',query:{active:1}})">
            <span class="num">{{userInfo.fansCount}}</span>
            <span class="text">粉丝</span>
          </li>
          <li @click="modalSupport=true">
            <span class="num">{{userInfo.fabulousCount}}</span>
            <span class="text">获赞</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="signin" v-if="userInfo">
      <div class="date">
        <div class="day-box">
          <ul>
            <li v-for="(item,index) in signList" :key="index">
              <i>{{item.whetherSign?'√':item.integral}}</i>
              <span>{{item.day}}天</span>
            </li>
          </ul>
        </div>
        <van-button plain color="#999999" size="small" round v-if="todaySign" disabled="">已签到</van-button>
        <van-button plain color="#fcbe64" size="small" round v-else @click="signIn()">打卡赚积分</van-button>
      </div>
      <div class="desc">
        <i class="icon"></i>
        <span>{{totalSignCount}}人已打卡</span>
      </div>
    </div>
    <ul class="handle">
      <li @click="$router.push({path:'/collection/',query:{active:0}})">
        <div class="img-wrap">
          <img src="../assets/img/my/icon-collection@2x.png" alt="">
        </div>
        <span>收藏</span>
      </li>
      <li @click="$router.push({path:'/collection/',query:{active:1}})">
        <div class="img-wrap">
          <img src="../assets/img/my/icon-history@2x.png" alt="">
        </div>
        <span>历史</span>
      </li>
      <li @click="$router.push({path:'/collection/',query:{active:2}})">
        <div class="img-wrap">
          <img src="../assets/img/my/icon-comment@2x.png" alt="">
        </div>
        <span>评论</span>
      </li>
      <li @click="$router.push({path:'/collection/',query:{active:3}})">
        <div class="img-wrap">
          <img src="../assets/img/my/icon-support@2x.png" alt="">
        </div>
        <span>点赞</span>
      </li>
    </ul>
    <van-cell-group>
      <van-cell is-link url="/msgcenter/">
        <template #title>
          <span class="icon-news"></span>
          <span>消息中心</span>
        </template>
        <template #right-icon>
          <span class="badge">{{msgNum}}</span>
          <van-icon name="arrow" style="line-height: inherit;font-size:16px;color:#969799;" />
        </template>
      </van-cell>
      <van-cell is-link url="/myexplosive/">
        <template #title>
          <span class="icon-broke"></span>
          <span>我的爆料</span>
        </template>
      </van-cell>
      <van-cell is-link url="/feedbackhelp/">
        <template #title>
          <span class="icon-edit"></span>
          <span>反馈帮助</span>
        </template>
      </van-cell>
      <van-cell is-link url="/setup/">
        <template #title>
          <span class="icon-setting"></span>
          <span>系统设置</span>
        </template>
      </van-cell>
      <van-cell is-link url="/aboutus/">
        <template #title>
          <span class="icon-info"></span>
          <span>关于我们</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-popup v-model="modalSupport" class="modal-support">
      <div class="container">
        <div class="name">{{userInfo.nickName}}</div>
        <div class="text">
          共获得
          <span>{{userInfo.fabulousCount}}</span>个赞
        </div>
        <img src="../assets/img/myhome/icon-44@2x.png" alt />
        <van-button type="primary" round class="btn-yellow" @click="modalSupport=false">好的</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapActions } from "vuex";
import { Cell, CellGroup, Button, Icon, Popup, } from "vant";
export default {
  data() {
    return {
      signList: [],
      todaySign: false,
      msgNum: 0,
      totalSignCount: 0,
      modalSupport: false
    };
  },
  created() {
    // this.init();
    this.getSignList()
    this.unreadData()
  },
  mounted() {},
  methods: {
    // ...mapActions(["getUserInfo"]),
    // init() {
    //   if (this.$store.state.token && !this.userInfo) {
    //     this.getUserInfo();
    //   }
    // },
    getSignList() {
      this.$ajax
        .post("api/front/member/findMemberSignList.json", {})
        .then(res => {
          this.signList = res.data.signDtoList;
          this.todaySign = res.data.todaySign
          this.totalSignCount = res.data.totalSignCount
        });
    },
    signIn() {
      this.$ajax
        .post("api/front/member/signIn.json", {})
        .then(res => {
          this.getSignList()
        });
    },
    unreadData() {
      this.$ajax
        .post('api/front/message/findMessageUnRead.json', {})
        .then((res) => {
          this.msgNum = res.data.systemMessageCount+res.data.replyCount+res.data.privateLetterCount
        })
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {},
  components: {
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button,
    "van-icon": Icon,
    "van-popup": Popup
  }
};
</script>

<style lang="scss" scoped>
.btn-yellow.van-button--primary {
  display: block;
  margin: 20px auto 0;
  width: 95px;
  height: 39px;
  background: #ffdd00;
  color: #333334;
  border-color: #ffdd00;
}
.no-login {
  padding-bottom: 18px;
  text-align: center;
  .avatar {
    margin: 36px auto 16px;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    background: #e6f1ff;
  }
  .login-btn {
    font-size: 14px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    padding: 10px 29px;
  }
}
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
      // border-radius: 50%;
      // border: red 1px solid;
      font-size: 0;
      img {
        width: 58px;
        height: 58px;
        border-radius: 50%;
      }
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
        .icon-tech {
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
        .icon-auth {
          display: inline-block;
          width: 47px;
          height: 21px;
          margin-right: 5px;
          background-size: 47px 21px;
          background-repeat: no-repeat;
        }
        .noauth {
          width: 55px;
          background-size: 55px 21px;
          @include bg-image("../assets/img/my/NotApplied");
        }
        .authing {
          @include bg-image("../assets/img/my/AssessmentPeriod");
        }
        .authed {
          @include bg-image("../assets/img/my/CertifyAdopt");
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
  padding: 16px 10px 16px 12px;
  background: #ffffff;
  box-shadow: 0px 1px 10px 0px rgba(4, 0, 0, 0.1);
  .date {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  .img-wrap {
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    img {
      width: 100%;
    }
  }
  span {
    display: block;
    margin-top: 10px;
  }
}
.badge {
  display: inline-block;
  height: 20px;
  min-width: 20px;
  padding: 0 4px;
  background: #fd4040;
  border-radius: 10px;
  font-size: 12px;
  font-family: PingFang SC Bold, PingFang SC Bold-Bold;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  line-height: 20px;
}
.icon-news {
  display: inline-block;
  width: 16px;
  height: 14px;
  margin-right: 6px;
  background-size: 16px 14px;
  background-repeat: no-repeat;
  @include bg-image("../assets/img/my/news");
  vertical-align: middle;
}
.icon-broke {
  display: inline-block;
  width: 16px;
  height: 18px;
  margin-right: 6px;
  background-size: 16px 18px;
  background-repeat: no-repeat;
  @include bg-image("../assets/img/my/broke");
  vertical-align: middle;
}
.icon-edit {
  display: inline-block;
  width: 14px;
  height: 17px;
  margin-right: 6px;
  background-size: 14px 17px;
  background-repeat: no-repeat;
  @include bg-image("../assets/img/my/edit");
  vertical-align: middle;
}
.icon-setting {
  display: inline-block;
  width: 17px;
  height: 15px;
  margin-right: 6px;
  background-size: 17px 15px;
  background-repeat: no-repeat;
  @include bg-image("../assets/img/my/setting");
  vertical-align: middle;
}
.icon-info {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 6px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  @include bg-image("../assets/img/my/info");
  vertical-align: middle;
}
.modal-support {
  padding: 36px 0;
  width: 250px;
  border-radius: 5px;
  text-align: center;
  .name {
    font-size: 15px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    color: #333333;
  }
  .text {
    margin-top: 13px;
    font-size: 13px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #333333;
    span {
      color: #f7962a;
    }
  }
  img {
    margin-top: 23px;
    width: 92px;
    height: 41px;
  }
  button {
    margin-top: 22px;
  }
}
</style>
