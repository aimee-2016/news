<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <!-- <span>礼品详情</span>
      <van-icon name="ellipsis" @click="modal.user = true" /> -->
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
          >当前积分<i>{{ userInfo.integral }}积分</i></span
        >
        <self-button
          round
          :disabled="details.integral > userInfo.integral"
          @click="modal.type = true"
          >兑换礼品</self-button
        >
      </div>
    </div>
    <van-popup v-model="modal.type" round position="bottom">
      <div class="modal-type">
        <div class="top-close">
          <van-icon name="close" @click="modal.type=false"/>
        </div>
        <div class="wrap">
          <div class="main-info">
            <div class="img-wrap">
              <img :src="selectedobj.image" alt="" />
            </div>
            <div class="right-info">
              <div class="integral">{{ selectedobj.integral }}积分</div>
              <div class="price">价值：￥{{ selectedobj.money }}</div>
              <div class="stock">剩余：{{ selectedobj.stock }}</div>
              <div class="price">已选{{ selectedType }}</div>
            </div>
          </div>
          <div class="select-list">
            <div
              class="row-type"
              v-for="(item, index) in attributeList"
              :key="index"
            >
              <div class="name">{{ item.key }}分类</div>
              <div class="list">
                <span
                  v-for="(inner, index1) in item.info"
                  :key="index1"
                  :class="{
                    selected: inner === JSON.parse(selectedobj.attribute)[item.key],
                  }"
                  @click="goodsSelect(item.key,inner, index,)"
                  >{{ inner }}</span
                >
              </div>
            </div>
            <div class="row-num">
              <div class="name">
                兑换数量
              </div>
              <div class="num-wrap">
                <button @click="numcut">-</button>
                <input type="text" :value="num" />
                <button @click="numadd">+</button>
              </div>
            </div>
          </div>
          <div class="btn-wrap">
            <van-button type="primary" round @click="submitOrder">确定</van-button>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button, Icon, Popup, Image,Swipe, SwipeItem } from "vant";
import selfButton from "@/components/button";
export default {
  data() {
    return {
      details: {},
      modal: {
        type:false
      },
      attributeList: [],
      selectedobj: null,
      goodsTypeInfo: null,
      selectedType: '',
      num: 1,
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
          this.attributeList = JSON.parse(res.data.attributeList)
          
          console.log(this.attributeList)
          let attributeListKey = []
          let showInfo = []
          this.attributeList.forEach(element => {
            attributeListKey.push(element.key+'_'+element.info[0])
            showInfo.push(element.info[0])
          });
          this.selectedType = showInfo.join(',')
          this.goodsTypeInfo = res.data.specificationDetailsDtos
          this.selectedobj = this.goodsTypeInfo[attributeListKey.join(';')]
          console.log(this.selectedobj)
        });
    },
    goodsSelect(key,val,index) {
      let attribute = JSON.parse(this.selectedobj.attribute)
      attribute[key] = val
      let attributeRes = []
      let showInfo = []
      for (const key in attribute) {
        attributeRes.push(key+'_'+attribute[key])
        showInfo.push(attribute[key])
      }
      this.selectedType = showInfo.join(',')
      this.selectedobj = this.goodsTypeInfo[attributeRes.join(';')]
    },
    numcut() {
      if(this.num>1) {
        this.num--
      }
    },
    numadd() {
      if(this.num<this.selectedobj.stock) {
        this.num++
      }
    },
    submitOrder() {
      if(this.selectedobj.integral > this.userInfo.integral) {
        this.$toast('积分不足')
        return false
      }
      this.$router.push('/order/')
      let goodsInfo = {
        data: this.selectedobj,num:this.num,name:this.details.name,config:this.selectedType
      }
      sessionStorage.setItem('goodsInfo',JSON.stringify(goodsInfo))
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
  background: #f8f8f8;
}
#head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .van-icon-arrow-left {
    position: absolute;
    left: 15px;
    top: 18px;
    font-size: 17px;
    color: #FFFFFF;
  }
}
.goods-img {
  width: 375px;
  height: 230px;
}
h2 {
  margin-bottom: 14px;
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
      h2 {
        margin-bottom: 0;
      }
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
  font-size: 0;
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
      vertical-align: middle;
    }
  }
}
.modal-type {
  .top-close {
    padding: 15px 15px 8px 0;
    text-align: right;
    .van-icon {
      // float: right;
      font-size: 16px;
      color: #9a9a9a;
    }
  }
  .wrap {
    padding: 0 33px;
  }
  .main-info {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    .img-wrap {
      margin-right: 16px;
      width: 93px;
      height: 93px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right-info {
      > div:not(:last-child) {
        margin-bottom: 10px;
      }
      .integral {
        font-size: 14px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        color: #fc4d00;
      }
      .price {
        font-size: 13px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #333333;
      }
      .stock {
        font-size: 13px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        text-align: left;
        color: #999999;
      }
    }
  }
  .select-list {
    .row-type {
      margin-bottom: 20px;
      .name {
        margin-bottom: 12px;
        font-size: 14px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #333333;
      }
      .list {
        span {
          display: inline-block;
          margin-right: 10px;
          padding: 7px 20px;
          background: #f8f8f8;
          border: 1px solid #dadada;
          border-radius: 5px;
          text-align: center;
          font-size: 13px;
          font-family: PingFang SC Medium, PingFang SC Medium-Medium;
          font-weight: 500;
          color: #333333;
        }
        .selected {
          border: 1px solid #fc4d00;
          background: #fdf2ec;
        }
      }
    }
    .row-num {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        font-size: 14px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #333333;
      }
      >.num-wrap {
        border: 1px solid #e6e6e6;
        border-radius: 3px;
      }
      button {
        width: 23px;
        height: 23px;
        color: #e6e6e6;
        border: none;
        background: none;
         &:first-of-type {
          border-right: 1px solid #e6e6e6;
        }
        &:last-of-type {
          border-left: 1px solid #e6e6e6;
        }
      }
      input {
        width: 35px;
        text-align: center;
      }
    }
  }
  .btn-wrap {
    padding: 40px 0 27px;
    .van-button {
      width: 100%;
      background: #FDD004;
      border-color: #FDD004;
      color: #333;
    }
  }
}
</style>
