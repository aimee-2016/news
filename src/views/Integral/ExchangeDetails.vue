<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>{{ goodsStatusT }}</span>
    </div>
    <div class="main">
      <div class="top-info">
        <div class="head-name" @click="$router.push({path: '/goodsdetails/',query: {id:details.specificationDetailsDto.goodId}})">
          <span>{{ details.name }}</span>
          <van-icon name="arrow" />
        </div>
        <div class="goods-info">
          <div class="img-wrap">
            <img :src="details.specificationDetailsDto.image" alt="" />
          </div>
          <div class="right-info">
            <div class="name">{{ details.name }}</div>
            <div class="price">
              规格：{{
                formatconfig(details.specificationDetailsDto.attribute)
              }}
            </div>
            <div class="integral">
              <span>{{ details.integral }}积分</span
              ><i>×{{ details.number }}</i>
            </div>
          </div>
        </div>
        <div class="user-info">
          <div class="user">
            <van-image round fit="cover" :src="details.headImgPath" lazy-load />
            <span>{{ details.nikeName }}</span>
          </div>
          <div class="integral">
            实付: <span>{{ details.paymentIntegral }}积分</span>
          </div>
        </div>
      </div>
      <div class="service">
        <div>
          <img src="../../assets/img/integral/icon-message@2x.png" alt="" />
          <span>联系客服</span>
        </div>
        <div>
          <img src="../../assets/img/integral/icon-tel@2x.png" alt="" />
          <span>客服电话</span>
        </div>
      </div>
      <div class="interval-bar"></div>
      <div class="logistics">
        <div class="order-info">
          <div>
            订单编号：{{ details.orderNo }}<span @click="copyText()">复制</span>
          </div>
          <textarea id="input" v-model="details.orderNo" ref="inputT"></textarea>
          <div>支付方式：{{ details.paymentMethod }}</div>
          <div>兑换时间：{{ details.exchangeDate }}</div>
          <div>成交时间：{{ details.closingDate }}</div>
          <div>收款方：{{ details.payee }}</div>
        </div>
        <div class="transport-status">
          <h3 class="h-name">物流状态</h3>
          <div class="address-w">
            <img src="../../assets/img/integral/icon-location@2x.png" alt="" />
            <div class="address-info">
              <div class="username">
                联系人：{{ details.contactsName + " " + details.contactsPhone }}
              </div>
              <div class="address-text">
                地址：{{ details.receivingAddress }}
              </div>
            </div>
          </div>
          <!-- <div class="logistics-status">
            <img src="../../assets/img/integral/icon-order@2x.png" alt="" />
            <ul>
              <li v-for="(inner, index) in details.logisticsDto" :key="index">
                <div>{{ inner.logistics }}</div>
                <div>{{ inner.logisticsDate }}</div>
              </li>
            </ul>
          </div> -->
          <van-steps
            direction="vertical"
            :active="details.logisticsDto.length - 1"
            active-color="#FEA900"
            class="transport-steps"
          >
            <van-step
              v-for="(inner, index) in details.logisticsDto"
              :key="index"
            >
              <h3>{{ inner.logistics }}</h3>
              <p>{{ inner.logisticsDate }}</p>
            </van-step>
            <!-- <van-step>
              <h3>【城市】物流状态2</h3>
              <p>2016-07-11 10:00</p>
            </van-step>
            <van-step>
              <h3>快件已发货</h3>
              <p>2016-07-10 09:30</p>
            </van-step> -->
          </van-steps>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button, Icon, Popup, Image,Step, Steps } from "vant";
export default {
  data() {
    return {
      details: null,
      goodsStatusT: ''
    }
  },
  created() {
    this.getData()
  },
  mounted() {

  },
  methods: {
    getData() {
      this.$ajax
        .post("api/front/good/findOrderById.json", {id:this.$route.query.id})
        .then(res => {
          this.details = res.data
          this.goodsStatus(this.details.exchangeStatus.name)
        });
    },
    formatconfig(val) {
      let valJ = JSON.parse(val)
      let resultarr=[]
      for (const key in valJ) {
        resultarr.push(valJ[key])
      }
      return resultarr.join()
    },
    goodsStatus(name) {
      let text = ''
        switch (name) {
          case 'Pending':
            text='待受理'
            break;
          case 'ToBeReceived':
            text='待收件'
            break;
          case 'Completed':
            text='已完成'
            break;
          case 'Cancel':
            text='已取消'
            break;
      }
      this.goodsStatusT = text
    },
    copyText() {
      this.$refs['inputT'].select()
      document.execCommand("copy"); // 执行浏览器复制命令
      this.$toast("复制成功")
    }
  },
  computed: {
      userInfo() {
      return this.$store.state.userInfo;
    },

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
    "van-steps":Steps,
    "van-step":Step
  }
}
</script>

<style lang="scss" scoped>
#container {
  padding-top: 58px;
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
  box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.08);
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
.top-info {
  padding: 18px 15px 10px;
  border-bottom: solid 1px #f0f0f0;
  .head-name {
    display: inline-block;
    span {
      margin-right: 8px;
      font-size: 15px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      color: #333333;
      line-height: 18px;
    }
    .van-icon {
      color: #888888;
      font-size: 12px;
    }
  }
}
.goods-info {
  display: flex;
  align-items: center;
  padding: 15px 0 20px;
  .img-wrap {
    margin-right: 16px;
    width: 75px;
    height: 75px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .right-info {
    flex-grow: 1;
    > div:not(:last-child) {
      margin-bottom: 10px;
    }
    .name {
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #333333;
      line-height: 15px;
    }
    .integral {
      font-size: 15px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      color: #fc4d00;
      i {
        float: right;
        font-style: normal;
        font-size: 13px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #999999;
      }
    }
    .price {
      font-size: 13px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #666666;
    }
    .gray {
      color: #999999;
    }
  }
}
.user-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user {
    .van-image {
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
    span {
      margin-left: 7px;
      font-size: 13px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #333333;
    }
  }
  .integral {
    font-size: 13px;
    font-family: PingFang SC Regular, PingFang SC Regular-Regular;
    font-weight: 400;
    color: #666666;
    span {
      font-size: 15px;
      color: #333333;
    }
  }
}
.service {
  display: flex;
  justify-content: space-around;
  padding: 19px 0;
  > div {
    img {
      height: 17px;
      margin-right: 10px;
      vertical-align: middle;
    }
    span {
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #333333;
      line-height: 18px;
    }
  }
}
.interval-bar {
  width: 100%;
  height: 10px;
  background: #f8f8f8;
}
.logistics {
  padding: 15px;
  .order-info {
    div {
      font-size: 13px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #999999;
      line-height: 24px;
      span {
        float: right;
        color: #333333;
      }
    }
  }
}
.transport-status {
  margin-top: 20px;
  .h-name {
    position: relative;
    margin-bottom: 20px;
    font-size: 14px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: bold;
    text-align: left;
    color: #333333;
    line-height: 20px;
    letter-spacing: 0px;
    &::before {
      content: "";
      position: absolute;
      bottom: 0px;
      left: 4px;
      display: block;
      width: 45px;
      height: 3px;
      background: #fdd004;
      border-radius: 2px;
    }
  }
  .address-w {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: solid 1px #f0f0f0;
    img {
      margin-right: 11px;
      width: 19px;
    }
    .username {
      margin-bottom: 10px;
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #333333;
    }
    .address-text {
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #666666;
    }
  }
  .logistics-status {
    display: flex;
    align-items: flex-start;
    padding-top: 13px;
    img {
      margin-top: 4px;
      width: 22px;
      margin-right: 13px;
    }
    ul li {
      margin-bottom: 10px;
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #999999;
      line-height: 25px;
      letter-spacing: 0px;
    }
  }
}
#input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: -10;
}
// .transport-steps {
//   background: chocolate;
//   .van-icon {
//     font-size: 18px;
//   }

// }
// .van-step__icon--active {
//     font-size: 18px;
//   }
</style>
