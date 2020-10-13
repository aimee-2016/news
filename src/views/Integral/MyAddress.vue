<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>我的地址</span>
      <i class="right-text" @click="$router.push('/addaddress/')">添加新地址</i>
    </div>
    <div class="main">
      <div class="address" v-for="(item, index) in addressList" :key="index">
        <div class="wrap">
          <div class="box">
            <div class="content" @click="selectAddress(item.id)">
              <van-image
                round
                fit="cover"
                lazy-load
                :src="userInfo.headImgPath"
              />
              <div class="address-info">
                <div class="username-row">
                  <span class="username">联系人：{{ item.contactsName }}</span>
                  <span class="tel">{{ item.contactsPhone }}</span>
                </div>
                <div class="address-text">
                  <span v-if="item.whetherDefault" class="default-flag"
                    >默认</span
                  >地址：{{ item.address }}
                </div>
              </div>
            </div>
            <div class="right-icon" @click="editAddress(item.id)">
              <span>编辑</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button, Icon, Popup, Image } from "vant";
export default {
  data() {
    return {
      addressList: []
    }
  },
  created() {
    this.getAddressList()
  },
  mounted() {

  },
  methods: {
    getAddressList() {
      this.$ajax
        .post("api/front/good/findReceivingAddressListAll.json")
        .then(res => {
          this.addressList = res.data
        });
    },
    selectAddress(id) {
      this.$router.push({path:'/order/',query: {
        id: id
      }})
    },
    editAddress(id){
      this.$router.push({path:'/addaddress/',query: {
        id: id
      }})
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
    "van-image": Image
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
  .right-text {
    font-style: normal;
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 15px;
  }
}
.address {
  &:last-child .box {
    border-bottom: none;
  }
  .wrap {
    padding: 0 15px;
  }
  background: #fff;
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;
    border-bottom: solid 1px #f0f0f0;

    .content {
      flex-grow: 1;
      display: flex;
      align-items: center;
      .van-image {
        margin-right: 13px;
        width: 34px;
        height: 34px;
      }
      .username-row {
        margin-bottom: 10px;
        font-size: 15px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        .username {
          color: #333333;
        }
        .tel {
          margin-left: 15px;
          color: #999999;
        }
      }
      .address-text {
        font-size: 14px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #333333;
        line-height: 21px;
        .default-flag {
          display: inline-block;
          margin-right: 10px;
          width: 37px;
          height: 19px;
          background: #fdd004;
          border-radius: 3px;
          font-family: PingFang SC Bold, PingFang SC Bold-Bold;
          font-weight: 700;
          color: #333333;
          line-height: 19px;
          text-align: center;
        }
      }
    }
    .right-icon {
      display: inline-block;
      padding: 6px 0 6px 16px;
      border-left: solid 1px #e6e6e6;
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      text-align: left;
      color: #999999;
      line-height: 21px;
    }
  }
}
</style>
