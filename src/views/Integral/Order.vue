<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>填写订单</span>
      <van-icon name="ellipsis" @click="modal.user = true" />
    </div>
    <div class="main">
      <div class="address">
        <div class="wrap">
          <div
            v-if="addressList.length === 0"
            class="box"
            @click="$router.push('/addaddress/')"
          >
            <div class="content">
              <div>添加收货地址</div>
            </div>
            <div class="right-icon">
              <van-icon name="arrow" />
            </div>
          </div>
          <div v-else class="box" @click="$router.push('/myaddress/')">
            <div class="content">
              <van-image
                round
                fit="cover"
                lazy-load
                :src="userInfo.headImgPath"
              />
              <div class="address-info">
                <div class="username">
                  联系人：{{
                    addressDefault.contactsName +
                      " " +
                      addressDefault.contactsPhone
                  }}
                </div>
                <div class="address-text">{{ addressDefault.address }}</div>
              </div>
            </div>
            <div class="right-icon">
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
      </div>
      <div class="goods-info">
        <div class="wrap">
          <div class="main-info">
            <div class="img-wrap">
              <img :src="goodsInfo.image" alt="" />
            </div>
            <div class="right-info">
              <div class="name">{{ goodsName }}</div>
              <div class="price">规格：{{ goodsConfig }}</div>
              <div class="price gray">发货时间：提交订单后的24小时内</div>
              <div class="integral">
                <span>{{ goodsInfo.integral }}积分</span><i>×{{ goodsNum }}</i>
              </div>
            </div>
          </div>
          <div class="row-num">
            <div class="name">
              兑换数量
            </div>
            <div class="num-wrap">
              <button @click="numcut">-</button>
              <input type="text" :value="goodsNum" />
              <button @click="numadd">+</button>
            </div>
          </div>
          <div class="row-transport">
            <div class="name">
              配送方式
            </div>
            <div class="right-select" @click="transportSelect()">
              <span>快递免邮</span>
              <van-icon name="arrow" />
            </div>
          </div>
        </div>
        <div class="bottom-info">
          <div class="info">
            <div class="integral">{{ goodsInfo.integral * goodsNum }}积分</div>
            <div class="price">价值：￥{{ goodsInfo.money * goodsNum }}</div>
          </div>
          <self-button round @click="exchangeGoods()">提交订单</self-button>
        </div>
      </div>
    </div>
    <van-action-sheet
      v-model="modal.type"
      :actions="transportList"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button, Icon, Popup, Image,ActionSheet, } from "vant";
import selfButton from "@/components/button";
export default {
  data() {
    return {
      addressList: [],
      goodsInfo: null,
      goodsNum: 1,
      goodsName:'',
      goodsConfig:'',
      addressDefault: null,
      transportList:[],
      modal: {
        type: false
      },
      transactionModeId: ''
    }
  },
  created() {
    this.goodsInfo = JSON.parse(sessionStorage.getItem('goodsInfo')).data
    this.goodsNum = JSON.parse(sessionStorage.getItem('goodsInfo')).num
    this.goodsName = JSON.parse(sessionStorage.getItem('goodsInfo')).name
    this.goodsConfig = JSON.parse(sessionStorage.getItem('goodsInfo')).config
    this.getAddressList()
    this.transportTypeInit()
  },
  mounted() {

  },
  methods: {
    getAddressList() {
      this.$ajax
        .post("api/front/good/findReceivingAddressListAll.json")
        .then(res => {
          this.addressList = res.data
          //从我的地址页面选择地址后跳转的情况
          if(this.$route.query.id) {
            this.addressDefault = this.addressList.filter(item=>Number(this.$route.query.id)===item.id)[0]
          } else {
            // 默认地址情况，没有默认，取地址列表第一个
            let addressDefaultList = this.addressList.filter(item=>item.whetherDefault)
          if(addressDefaultList.length===0) {
            this.addressDefault=this.addressList[0]
          } else {
            this.addressDefault=addressDefaultList[0]
          }
          }
        });
    },
    numcut() {
      if(this.goodsNum>1) {
        this.goodsNum--
      }
    },
    numadd() {
      if(this.goodsNum<this.goodsInfo.stock) {
        this.goodsNum++
      }
    },
    transportTypeInit() {
      this.$ajax.post("api/front/good/findTransactionModeListAll.json")
        .then(res => {
          this.transactionModeId = res.data[0].id
        })
    },
    transportSelect() {
      this.$ajax.post("api/front/good/findTransactionModeListAll.json")
        .then(res => {
          this.transportList = res.data
          this.modal.type =true
        }).catch(error=>{
          this.$toast(error.message)
        })
    },
    onSelect(item) {
      console.log(item)
      this.transactionModeId = item.id
    },
    exchangeGoods() {
      this.$ajax.post("api/front/good/exchange.json",{
        goodId: this.goodsInfo.goodId,
        specificationId: this.goodsInfo.id,
        number: this.goodsNum,
        transactionModeId: this.transactionModeId,
        receivingAddressId: this.addressDefault.id
      })
        .then(res => {
          // 商品id,跳订单详情
          // res.data
          this.$toast('兑换商品成功')
        }).catch(error=>{
          this.$toast(error.message)
        })
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
     "self-button": selfButton,
     "van-action-sheet": ActionSheet,
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
.wrap {
  padding: 0 15px;
}
.address {
  padding: 20px 0px;
  background: #fff;
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content {
      display: flex;
      align-items: center;
      .van-image {
        margin-right: 13px;
        width: 34px;
        height: 34px;
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
  }
}
.goods-info {
  margin-top: 10px;
  padding-top: 18px;
  background: #fff;
  .main-info {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    .img-wrap {
      margin-right: 16px;
      width: 75px;
      height: 75px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right-info {
      flex-grow: 1;
      > div:not(:last-child) {
        margin-bottom: 6px;
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
        font-size: 12px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #666666;
      }
      .gray {
        color: #999999;
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
    > .num-wrap {
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
  .row-transport {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 27px;
    .name {
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #333333;
    }
    .right-select {
      font-size: 13px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      text-align: center;
      color: #999999;
      line-height: 18px;
      .van-icon {
        vertical-align: middle;
      }
    }
  }
  .bottom-info {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 12px 15px 12px 20px;
    border-top: solid 1px #f0f0f0;
    .integral {
      margin-bottom: 7px;
      font-size: 16px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      color: #fc4d00;
    }
    .price {
      font-size: 12px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #999999;
    }
  }
}
</style>
