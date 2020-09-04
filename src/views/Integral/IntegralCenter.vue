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
      <div class="sign-in"></div>
      <div class="goods-list"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button, Icon, Popup, Image } from "vant";
export default {
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

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
.sign-in {
}
.goods-list {
}
</style>
