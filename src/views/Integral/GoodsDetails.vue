<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>礼品详情</span>
      <van-icon name="ellipsis" @click="modal.user = true" />
    </div>
    <div class="main">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(image, index) in details.goodImagesList"
          :key="index"
        >
          <img v-lazy="image" class="goods-img" />
        </van-swipe-item>
      </van-swipe>
      <div class="content">
        <div class="row-1">
          <div class="name">
            <h2>{{ details.name }}</h2>
            <span>剩余：{{ details.stock }}</span>
          </div>
          <!-- 至2019-12-30到期，还剩10天 startDate -->
          <div class="date">至{{ details.expirationDate }}到期</div>
          <div class="integral">{{ details.integral }}积分</div>
          <div class="money">价值：￥{{ details.money }}</div>
        </div>
        <div class="row-2">
          <div class="desc">
            <h2>商品描述</h2>
            <div v-html="details.goodDescribe"></div>
          </div>
          <div class="rule">
            <h2>使用规则</h2>
            <div>
              <p>
                1、此券购买【{{ details.name }}】，积分兑换绝，积分兑换绝对真实
              </p>
              <p>
                2、该福利产品由某某商家提供，更多商品及优惠欢迎到某某商家的店里选购
              </p>
            </div>
          </div>
          <div class="rule">
            <h2>活动规则：</h2>
            <div>
              <p>1、活动时间：2019年12月16日-2019年12月30日；</p>
              <p>2、本产品为一台【美的净水器【{{ details.name }}】</p>
              <p>3、每个账号仅限兑换1次该产品3、每个账号仅限兑换1次该产品</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-box">
        <span
          >当前积分<i>{{ userInfo.integral }}</i
          >积分</span
        >
        <!-- <self-button
              round
              @click="focusUser(topicDetails.author)"
              :disabled="!topicDetails.author.followType ? false : true"
            >{{ focusText(topicDetails.author.followType) }}</self-button> -->
        <self-button round>兑换礼品</self-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button, Icon, Popup, Image,Swipe, SwipeItem } from "vant";
import selfButton from "@/components/button";
export default {
  data() {
    return {
      details: null
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
        .post("api/front/good/findGoodsById.json", {id:this.$route.query.id})
        .then(res => {
          this.details = res.data
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
    "van-swipe": Swipe,
    "van-swipe-item":SwipeItem,
    "self-button": selfButton,
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
.goods-img {
  width: 375px;
  height: 230px;
}
h2 {
  font-size: 16px;
  font-family: PingFang SC Bold, PingFang SC Bold-Bold;
  font-weight: 700;
  color: #333333;
}
.content {
  > div {
    background: #fff;
  }
  .row-1 {
    margin-bottom: 10px;
    padding: 23px 15px 18px;
    .name {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 14px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #666666;
      }
    }
    .date {
      margin-top: 11px;
      font-size: 12px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #999999;
    }
    .integral {
      margin-top: 14px;
      font-size: 17px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      color: #fc4d00;
    }
    .money {
      margin-top: 11px;
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #666666;
    }
  }
  .row-2 {
    padding: 23px 15px 37px;
    > div {
      margin-bottom: 16px;
    }
    p {
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #666666;
      line-height: 1.5;
    }
  }
}
.bottom-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #fff;
  border-top: solid 1px #f0f0f0;
  span {
    font-size: 12px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #999999;
    i {
      margin-left: 10px;
      font-size: 16px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      color: #fc4d00;
      font-style: normal;
    }
  }
}
</style>
