<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>积分中心</span>
      <van-icon name="ellipsis" @click="modal.user = true" />
    </div>
    <div class="main">
      <div class="head-info">
        <div class="avatar-row">
          <div class="left">
            <van-image round :src="userInfo.headImgPath" />
            <span class="nick-name">{{ userInfo.nickName }}</span>
          </div>
          <span class="integral"
            ><i>{{ userInfo.integral }}</i
            >积分</span
          >
        </div>
        <div>
          <van-cell title="积分说明" url="/integralexplain/" />
          <van-cell title="积分记录" url="/integralrecord/" />
          <van-cell title="兑换记录" url="/exchangerecord/" />
        </div>
      </div>
      <div class="signin">
        <div class="row-1">
          <h3>签到进度<span>1</span>/7</h3>
          <div>
            <span>签到提醒</span><van-switch v-model="checked" /></div>
        </div>
      <div class="date">
        <div class="day-box">
          <ul>
            <li v-for="(item,index) in signList" :key="index">
              <i @click="$router.push('/integralcenter/')">{{item.whetherSign?'√':item.integral}}</i>
              <span>{{item.day}}天</span>
            </li>
          </ul>
        </div>
        <van-button plain color="#999999" size="small" round v-if="todaySign" disabled="">已签到</van-button>
        <van-button plain color="#fcbe64" size="small" round v-else @click="signIn()">打卡赚积分</van-button>
      </div>
      <div class="desc" @click="$router.push('/integralcenter/')">
        <i class="icon"></i>
        <span>{{totalSignCount}}人已打卡</span>
      </div>
    </div>
      <div class="goods-list"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button, Icon, Popup, Image, Switch } from "vant";
export default {
  data() {
    return {
      signList: [],
      checked: true,
    }
  },
  created() {
    this.getSignList()
  },
  mounted() {

  },
  methods: {
    getSignList() {
      this.$ajax
        .post("api/front/member/findMemberSignList.json", {})
        .then(res => {
          this.signList = res.data.signDtoList;
          this.todaySign = res.data.todaySign
          this.totalSignCount = res.data.totalSignCount
        });
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {

  },
  components: {
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button,
    "van-icon": Icon,
    "van-popup": Popup,
    "van-image": Image,
    "van-switch": Switch
  }
}
</script>

<style lang="scss" scoped>
#container {
  padding-top: 58px;
  background: #f8f8f8;
}
#head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 14px 15px;
  font-size: 17px;
  font-family: PingFang SC Medium, PingFang SC Medium-Medium;
  font-weight: 500;
  text-align: center;
  color: #333334;
  line-height: 24px;
  background: #fff;
  // box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.08);
  .van-icon-arrow-left {
    position: absolute;
    left: 15px;
    top: 18px;
    font-size: 17px;
  }
  .van-icon-ellipsis {
    position: absolute;
    right: 15px;
    top: 16px;
    font-size: 24px;
  }
}
.main {
  > div {
    background: #fff;
    margin-bottom: 10px;
  }
}
.head-info {
  .avatar-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: solid #f0f0f0 1px;
    .left {
      display: flex;
      align-items: center;
      .van-image {
        width: 49px;
        height: 49px;
      }
      .nick-name {
        margin-left: 10px;
        font-size: 16px;
        font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
        font-weight: 800;
        color: #333333;
        line-height: 24px;
      }
    }
    .integral {
      font-size: 12px;
      color: #333334;
      i {
        font-size: 19px;
        font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
        font-weight: 800;
        color: #fc4d00;
        line-height: 24px;
        font-style: normal;
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
    display: inline-block;
    margin-top: 16px;
    .icon {
      display: inline-block;
      width: 13px;
      height: 13px;
      margin-right: 6px;
      background-size: 13px 13px;
      background-repeat: no-repeat;
      @include bg-image("../../assets/img/my/date");
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
.goods-list {
}
</style>
