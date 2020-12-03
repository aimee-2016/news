<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>积分中心</span>
      <van-icon name="ellipsis" @click="showShare = true" />
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
          <van-cell title="积分说明" to="/integralexplain/" />
          <van-cell title="积分记录" to="/integralrecord/" />
          <van-cell title="兑换记录" to="/exchangerecord/" />
        </div>
      </div>
      <div class="signin-wrap">
        <div class="signin">
          <div class="row-1">
            <h3>
              签到进度<span>{{ signedDays }}</span
              >/{{ totalDays }}
            </h3>
            <div>
              <span>签到提醒</span
              ><van-switch
                v-model="whetherSignReminder"
                @change="setSignReminder"
                active-color="#7BB2D8"
                size="20px"
              />
            </div>
          </div>
          <div class="date">
            <div class="day-box">
              <ul>
                <li v-for="(item, index) in signList" :key="index">
                  <i>{{ item.whetherSign ? "√" : item.integral }}</i>
                  <span>{{ item.day }}天</span>
                </li>
              </ul>
            </div>
            <span class="btn signed-btn" v-if="todaySign">已签到</span>
            <span class="btn unsign-btn" v-else @click="signIn()">打卡赚积分</span>
          </div>
          <div class="desc">
            <i class="icon"></i>
            <span>{{ totalSignCount }}人已打卡</span>
          </div>
        </div>
        <div class="rule">
          <div class="rule-title">
            <h3>积分规则</h3>
            <span>今日已累计<i>{{ruleIntegral}}积分</i></span>
          </div>
          <ul>
            <li v-for="(item, index) in ruleList" :key="index">
              <div>
                <i>+{{ item.integral }}</i
                ><span
                  >{{
                    item.name +
                      item.currentCompleteCount +
                      "/" +
                      item.completeNumber
                  }}</span
                >
              </div>
              <van-button plain color="#fcbe64" size="small" round v-if="item.currentCompleteCount<item.completeNumber" @click="toPage(item.integralType.name)">{{
                item.integralType.message
              }}</van-button>
              <van-button
              plain
              color="#999999"
              size="small"
              round
              disabled=""
              v-else
              >已完成</van-button
            >
            </li>
          </ul>
        </div>
      </div>
      <div class="goods-list">
        <div class="title">礼品列表</div>
        <no-content v-if="!goodsList.length"></no-content>
        <ul v-else>
          <li v-for="(item, index) in goodsList" :key="index" @click="$router.push({path: '/goodsdetails/',query: {id:item.id}})">
            <div class="img-wrap">
              <van-image :src="item.goodImage" />
              <span>剩余：{{ item.stock }}</span>
            </div>
            <div class="title">{{ item.name }}</div>
            <div class="money">价值：￥{{ item.money }}</div>
            <div class="integral">{{ item.integral }}积分</div>
          </li>
        </ul>
      </div>
    </div>
    <van-share-sheet v-model="showShare" :options="options" title="分享到" />
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, Button, Icon, Image, Switch,ShareSheet, } from "vant";
export default {
  data() {
    return {
      signList: [],
      todaySign: false,
      totalSignCount: 0,
      checked: true,
      goodsList: [],
      whetherSignReminder: false,
      signedDays: 0,
      totalDays: 7,
      ruleList:[],
      ruleIntegral: 0,
      showShare:false,
      options: [
        [
          { name: "微信好友", icon: "wechat" },
          {
            name: "微信朋友圈",
            icon: require("../../assets/img/home/friendscircle@2x.png")
          },
          { name: "QQ", icon: "qq" },
          {
            name: "QQ空间",
            icon: require("../../assets/img/home/qqzone@2x.png")
          }
        ],
        [
          { name: "微博", icon: "weibo" },
          {
            name: "系统分享",
            icon: require("../../assets/img/home/love@2x.png")
          },
          { name: "复制链接", icon: "link" }
        ]
      ],
    }
  },
  created() {
    this.getSignList()
    this.getGoodesList()
    this.getRuleList()
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
          this.whetherSignReminder = res.data.whetherSignReminder
          this.signedDays = res.data.signedDays
          this.totalDays = res.data.totalDays
        });
    },
    signIn() {
      this.$ajax
        .post("api/front/member/signIn.json", {})
        .then(() => {
          this.getSignList()
        }).catch(error=> {
          this.$toast(error)
        });
    },
    setSignReminder(val) {
      this.$ajax
        .post("api/front/member/setSignReminder.json", {whetherSignReminder:val})
        .then(() => {
          this.$toast('设置成功')
        }).catch(error=> {
          this.whetherSignReminder = !val
          this.$toast(error)
        });
    },
    getGoodesList() {
      this.$ajax
        .post("api/front/good/findGoodsPageByCondition.json", {
          page: 1,
          size: 10
        })
        .then(res => {
          this.goodsList = res.data.content
        });
    },
    getRuleList() {
      this.$ajax
        .post("api/front/member/memberIntegralCompleteDtos.json", {})
        .then(res => {
          this.ruleList = res.data.memberIntegralCompleteDtos
          this.ruleIntegral = res.data.todayIntegral
        });
    },
    toPage(type) {
      let url = ''
      switch (type) {
        case 'Share':
          url = 'home'
          break;
        case 'Comment':
          url = 'home'
          break;
        case 'ViewVideo':
          url = 'home'
          break;
        case 'ReadingNews':
          url = 'home'
          break;
        case 'ReadingArticles':
          url = 'home'
          break;
        case 'PushExplosive':
          url = 'myexplosive'
          break;
        case 'PushVideo':
          url = 'home'
          break;
        case 'PushArticles':
          url = 'home'
          break;
        case 'BindPhone':
          url = 'accountprivacy'
      }
      this.$router.push('/'+url+'/')
    }
  }, 
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {

  },
  components: {
    "van-cell": Cell,
    "van-button": Button,
    "van-icon": Icon,
    "van-image": Image,
    "van-switch": Switch,
    "van-share-sheet": ShareSheet,
  }
}
</script>

<style lang="scss" scoped>
#container {
  padding-top: 58px;
  background: #f8f8f8;
  // background: chocolate;
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
    top: 15px;
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
.signin-wrap {
  padding-top: 16px;
  .signin {
    margin: 0px 15px 18px;
    padding: 16px 10px 16px 12px;
    background: #ffffff;
    box-shadow: 0px 1px 10px 0px rgba(4, 0, 0, 0.1);
    .row-1 {
      display: flex;
      justify-content: space-between;
      margin-bottom: 18px;
      padding-bottom: 11px;
      border-bottom: solid 1px #f0f0f0;
      h3 {
        font-size: 14px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        color: #333333;
        span {
          color: #fcbe64;
        }
      }
      > div {
        span {
          margin-right: 9px;
          font-size: 13px;
          font-family: PingFang SC Medium, PingFang SC Medium-Medium;
          font-weight: 500;
          color: #666666;
        }
        .van-switch {
          vertical-align: middle;
        }
      }
    }
    .btn {
    width: 80px;
    height: 28px;
    background: #fff;
    border-radius: 15px;
    font-size: 11px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    line-height: 26px;
    text-align: center;
  }
  .signed-btn {
    color: #999999;
    border: solid 1px #DADADA;
  }
  .unsign-btn {
    border: 1px solid #fcbe64;
    color: #f99307;
  }
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
  .rule {
    padding: 0 15px;
    .rule-title {
      display: flex;
      justify-content: space-between;
      padding-bottom: 18px;
      border-bottom: solid 1px #f0f0f0;
      h3 {
        font-size: 15px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        color: #333333;
      }
      span {
        font-size: 13px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #999999;
        i {
          font-style: normal;
          color: #fc4d00;
        }
      }
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        border-bottom: solid 1px #f0f0f0;
        > div {
          span {
            font-size: 14px;
            font-family: PingFang SC Medium, PingFang SC Medium-Medium;
            font-weight: 500;
            color: #333333;
          }
          i {
            display: inline-block;
            width: 50px;
            margin-right: 16px;
            font-style: normal;
            font-size: 19px;
            font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
            font-weight: 800;
            color: #f99307;
          }
        }
      }
    }
  }
}

.goods-list {
  padding: 0 15px;
  > .title {
    padding: 18px 0;
    font-size: 15px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    color: #333333;
  }
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  li {
    margin-bottom: 12px;
    // margin-right: 25px;
    // &:nth-of-type(2n+2) {
    //   margin-right: 0;
    // }
    .img-wrap {
      position: relative;
      .van-image {
        width: 160px;
        height: 130px;
        border-radius: 5px;
        overflow: hidden;
      }
      span {
        position: absolute;
        bottom: 7px;
        right: 7px;
        display: inline-block;
        padding: 5px 10px;
        background: rgba(6, 6, 6, 0.2);
        border-radius: 11px;
        font-size: 11px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .title {
      margin-top: 15px;
      font-size: 15px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      color: #333333;
    }

    .money {
      margin-top: 12px;
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #999999;
    }
    .integral {
      margin-top: 10px;
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #fc4d00;
    }
  }
}
</style>
