<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>柬中资讯认证</span>
      <i class="right-text" @click="$router.push('/feedbackhelp/')">常见问题</i>
    </div>
    <div class="main">
      <div class="top-tips">
        <h2>创作者申请条件</h2>
        <div>适用于在柬中资讯持续贡献内容的用户.</div>
      </div>
      <div class="interval-bar"></div>
      <div class="task-list">
        <ul>
          <li>
            <span class="name">有过点赞</span>
            <div class="operate">
              <img src="../../assets/img/auth/icon-completed.png" alt="" />
            </div>
          </li>
          <li>
            <span class="name">发表过评论</span>
            <div class="operate">
              <van-button type="primary" class="btn-yellow">去完成</van-button>
            </div>
          </li>
          <li>
            <span class="name">收藏过</span>
            <div class="operate">
              <img src="../../assets/img/auth/icon-completed.png" alt="" />
            </div>
          </li>
          <li>
            <span class="name">绑定手机号</span>
            <div class="operate">
              <van-button type="primary" class="btn-yellow">去完成</van-button>
            </div>
          </li>
        </ul>
      </div>
      <div class="rule">
        <h2>
          <img src="../../assets/img/auth/icon-bulb.png" alt="" /><span
            >创作者申请条件</span
          >
        </h2>
        <div>//认证后30天内，至少发布一次本领域的优质内容//</div>
      </div>
      <div class="privilege">
        <h2>认证特权</h2>
        <dl>
          <dt>独家标识</dt>
          <dd>享有专属标识，彰显独特身份</dd>
          <dt>优先推荐</dt>
          <dd>内容优先推荐，增加曝光快速增粉</dd>
          <dt>更多特权</dt>
          <dd>更多认证用专享功能</dd>
        </dl>
      </div>
      <div class="btn-wrap">
        <van-button type="primary" class="btn-yellow">申请创作者</van-button>
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
    // this.getAddressList()
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
.top-tips {
  padding: 25px 0;
  text-align: center;
  h2 {
    margin-bottom: 18px;
    font-size: 18px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    color: #333333;
  }
  div {
    font-size: 14px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #999999;
  }
}
.task-list {
  ul {
    padding: 0 15px;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #f0f0f0;
    &:last-child {
      border-bottom: none;
    }
    .name {
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #333333;
    }
    img {
      width: 47px;
    }
    .van-button {
      height: 24px;
      padding: 0 10px;
      background: #fdd004;
      border-color: #fdd004;
      border-radius: 3px;
      font-size: 13px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #333333;
    }
  }
}
.rule {
  margin: 0 15px 23px;
  padding: 13px 0 15px;
  background: #f7f8fa;
  border-radius: 5px;
  text-align: center;
  h2 {
    margin-bottom: 12px;
    font-size: 15px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    color: #333333;

    img {
      margin-right: 4px;
      width: 14px;
      vertical-align: middle;
    }
  }
  div {
    font-size: 14px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #666666;
  }
}
.privilege {
  padding: 0 15px 20px;
  h2 {
    position: relative;
    margin-bottom: 18px;
    font-size: 18px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    color: #333333;

    &::before {
      content: "";
      position: absolute;
      bottom: -4px;
      left: 0px;
      display: block;
      width: 74px;
      height: 4px;
      background: #fdd004;
      border-radius: 2px;
    }
  }
  dl {
    dt {
      margin-bottom: 11px;
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #333333;
    }
    dd {
      margin-bottom: 18px;
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #999999;
    }
  }
}
.btn-wrap {
  padding: 0 28px 38px;
  .van-button {
    width: 100%;
height: 41px;
background: #fee263;
border-color: #fdd004;
border-radius: 5px;
font-size: 15px;
font-family: PingFang SC Bold, PingFang SC Bold-Bold;
font-weight: 700;
color: #666666;
  }
}
</style>
