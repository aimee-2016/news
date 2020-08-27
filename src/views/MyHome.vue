<template>
  <div>
    <div class="top-info" :style="{background:  '#2e2840 url('+userInfo.headImgPath+')'}">
      <div class="bg">
        <div class="return">
          <van-icon name="arrow-left" />
          <van-icon name="ellipsis" style="float:right;font-size:24px" @click="modal.user = true" />
        </div>
        <div class="row-1">
          <img :src="userInfo.headImgPath" alt class="avatar" />
          <span class="btn-edit">编辑资料</span>
          <span class="btn-auth">我的认证</span>
        </div>
        <div class="row-2">
          <span class="name">卡卡</span>
          <span class="age">女 18</span>
        </div>
        <ul class="row-3">
          <li>
            <span class="num">{{userInfo.followCount}}</span>
            <span class="text">关注</span>
          </li>
          <li>
            <span class="num">{{userInfo.fansCount}}</span>
            <span class="text">粉丝</span>
          </li>
          <li>
            <span class="num">{{userInfo.fabulousCount}}</span>
            <span class="text">获赞</span>
          </li>
        </ul>
        <ul class="row-4">
          <li>
            <span class="icon-auth icon"></span>
            <span class="text">认证：美食文章创作者、美食视频创作者</span>
          </li>
          <li>
            <span class="icon-location icon"></span>
            <span class="text">位置：海外</span>
          </li>
          <li>
            <span class="icon-desc icon"></span>
            <span class="text">简介：喜爱美食所以旅行，感受不同国家的美食</span>
          </li>
        </ul>
      </div>
    </div>
    <van-tabs
      v-model="active"
      line-width="15px"
      line-heigth="2px"
      title-active-color=" #333333"
      color="#ffcb00"
    >
      <van-tab title="全部">
        <ul class="all">
          <li>
            <div class="info">
              <div class="left">
                <img :src="userInfo.headImgPath" alt class="avatar" />
                <div class="text">
                  <span class="name">大马哈</span>
                  <span class="time">5分钟前</span>
                </div>
              </div>
              <div class="right">
                <span class="icon-top"></span>
                <van-icon name="ellipsis" @click="modal.article = true" />
              </div>
            </div>
            <div class="content"></div>
            <div class="opreate">
              <span>
                <img src="../assets/img/myhome/icon-share@2x.png" alt />
              </span>
              <span>
                <img src="../assets/img/myhome/icon-50@2x.png" @click="modal.support=true" alt />
                <i class="num">12</i>
              </span>
              <span>
                <img src="../assets/img/myhome/icon-49@2x.png" alt />
                <i class="num">355</i>
              </span>
            </div>
          </li>
          <li>
            <div class="info">
              <div class="left">
                <img :src="userInfo.headImgPath" alt class="avatar" />
                <div class="text">
                  <span class="name">大马哈</span>
                  <span class="time">5分钟前</span>
                </div>
              </div>
              <div class="right">
                <span class="icon-top"></span>
                <van-icon name="ellipsis" />
              </div>
            </div>
            <div class="content1">
              <div class="article">三里屯街拍：身材这么好的妹子难遇到，网友：回家去三里屯街拍：身材这么好的妹子回家去三里屯街拍：身材这么好的妹子.</div>
              <div class="picture"></div>
            </div>
            <div class="opreate">
              <span>
                <img src="../assets/img/myhome/icon-share@2x.png" alt />
              </span>
              <span>
                <img src="../assets/img/myhome/icon-50@2x.png" @click="modal.support=true" alt />
                <i class="num">12</i>
              </span>
              <span>
                <img src="../assets/img/myhome/icon-49@2x.png" alt />
                <i class="num">355</i>
              </span>
            </div>
          </li>
        </ul>
      </van-tab>
      <van-tab title="文章">
        <ul class="all">
          <li>
            <div class="info">
              <div class="left">
                <img :src="userInfo.headImgPath" alt class="avatar" />
                <div class="text">
                  <span class="name">大马哈</span>
                  <span class="time">5分钟前</span>
                </div>
              </div>
              <div class="right">
                <span class="icon-top"></span>
                <van-icon name="ellipsis" />
              </div>
            </div>
            <div class="content1">
              <div class="article">三里屯街拍：身材这么好的妹子难遇到，网友：回家去三里屯街拍：身材这么好的妹子回家去三里屯街拍：身材这么好的妹子.</div>
              <div class="picture"></div>
            </div>
            <div class="opreate">
              <span>
                <img src="../assets/img/myhome/icon-share@2x.png" alt />
              </span>
              <span>
                <img src="../assets/img/myhome/icon-50@2x.png" @click="modal.support=true" alt />
                <i class="num">12</i>
              </span>
              <span>
                <img src="../assets/img/myhome/icon-49@2x.png" alt />
                <i class="num">355</i>
              </span>
            </div>
          </li>
        </ul>
      </van-tab>
      <van-tab title="视频"></van-tab>
    </van-tabs>
    <van-popup v-model="modal.article" class="more-popup">
      <div>
        <div class="img-wrap">
          <img src="../assets/img/myhome/icon-56@2x.png" alt />
        </div>
        <div class="text">
          <span>不感兴趣</span>
        </div>
      </div>
      <div class="row-2">
        <div class="img-wrap">
          <img src="../assets/img/myhome/icon-57@2x.png" alt />
        </div>
        <div class="text" @click="modal.article=false;modal.report=true">
          <span>举报内容</span>
          <span>内容质量差 标题党 低俗 暴力血腥 恶心</span>
        </div>
      </div>
      <div>
        <div class="img-wrap">
          <img src="../assets/img/myhome/icon-58@2x.png" alt />
        </div>
        <div class="text">
          <span>拉黑作者：小千作者</span>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="modal.report" class="more-popup">
      <div>
        <div class="text">
          <span>内容质量差</span>
        </div>
      </div>
      <div>
        <div class="text">
          <span>标题党</span>
        </div>
      </div>
      <div>
        <div class="text">
          <span>低俗</span>
        </div>
      </div>
      <div>
        <div class="text">
          <span>暴力血腥</span>
        </div>
      </div>
      <div>
        <div class="text">
          <span>恶心</span>
        </div>
      </div>
    </van-popup>
    <van-action-sheet
      v-model="modal.user"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
    />
    <van-popup v-model="modal.complaint" closeable class="modal-complaint">
      <div class="container">
        <div class="title">举报用户</div>
        <div class="center">
          <div class="text">
            <span>#</span>我有话要说:
          </div>
          <van-field
            v-model="message"
            rows="6"
            autosize
            type="textarea"
            placeholder="请具体说明问题，我们将尽快处理"
            style="background: #f0f0f0;"
          />
        </div>
        <div class="footer">
          <van-button type="primary" round class="btn-yellow" @click="modal.complaint=false">确定</van-button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="modal.support" class="modal-support">
      <div class="container">
        <div class="name">卡卡</div>
        <div class="text">
          共获得
          <span>23424354</span>个赞
        </div>
        <img src="../assets/img/myhome/icon-44@2x.png" alt />
        <van-button type="primary" round class="btn-yellow" @click="modal.support=false">好的</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script type="text/ecmascript-6">
import {
  Icon,
  Tabs,
  Tab,
  Popup,
  ActionSheet,
  Dialog,
  Field,
  Button
} from "vant"; // Cell, CellGroup, Button,
export default {
  data() {
    return {
      active: 0,
      actions: [{ name: "拉黑/解绑拉黑" }, { name: "举报用户" }],
      modal: {
        report: false,
        complaint: false,
        article: false,
        user: false,
        support: false
      },
      message: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    onSelect(item) {
      this.modal.user = false;
      if (item.name === "举报用户") {
        this.modal.complaint = true;
      } else {
        Dialog.confirm({
          title: "确定拉黑该用户？？",
          message: "拉黑后此用户不能关注您，也无法给您发送任何消息",
          confirmButtonColor: "rgb(255, 203, 0)"
        })
          .then(() => {
            this.$toast(item.name + "成功");
            // 已解除黑名单
          })
          .catch(() => {});
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {},
  components: {
    // "van-cell-group": CellGroup,
    // "van-cell": Cell,
    "van-button": Button,
    "van-icon": Icon,
    "van-tabs": Tabs,
    "van-tab": Tab,
    "van-popup": Popup,
    "van-action-sheet": ActionSheet,
    // "van-dialog": Dialog,
    "van-field": Field
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
.top-info {
  height: 307px;
  color: #fff;
  .bg {
    height: 307px;
    padding: 18px 15px;
    background: rgba(46, 40, 64, 0.8);
  }
  .return {
    margin-bottom: 23px;
    font-size: 15px;
  }
  .row-1 {
    .avatar {
      margin-right: 10px;
      width: 62px;
      height: 62px;
      border-radius: 50%;
      vertical-align: middle;
    }
    span {
      display: inline-block;
      margin-left: 23px;
      width: 104px;
      height: 33px;
      background: #6c677b;
      border-radius: 3px;
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      line-height: 33px;
      color: #ffffff;
      text-align: center;
    }
    .btn-auth {
      background: #fdd004;
      color: #333333;
    }
  }
  .row-2 {
    margin-top: 22px;
    .name {
      margin-right: 19px;
      font-size: 22px;
      font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
      font-weight: 800;
      color: #ffffff;
    }
    .age {
      display: inline-block;
      padding: 2px 6px;
      background: #fdb4c5;
      border-radius: 8px;
      font-size: 11px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      color: #ffffff;
    }
  }
  .row-3 {
    display: flex;
    margin-top: 11px;
    li {
      margin-right: 13px;
      .num {
        margin-right: 3px;
        font-size: 11px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        text-align: left;
        color: #a19fac;
      }
      .text {
        font-size: 15px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
      }
    }
  }
  .row-4 {
    margin-top: 18px;
    li {
      margin-bottom: 10px;
      .icon {
        display: inline-block;
      }
      .icon-auth {
        margin-right: 9px;
        width: 15px;
        height: 13px;
        background-size: 15px 13px;
        background-repeat: no-repeat;
        @include bg-image("../assets/img/myhome/icon-auth");
      }
      .icon-location {
        margin-right: 10px;
        width: 12px;
        height: 15px;
        background-size: 12px 15px;
        background-repeat: no-repeat;
        @include bg-image("../assets/img/myhome/icon-location");
      }
      .icon-desc {
        margin-right: 11px;
        width: 11px;
        height: 13px;
        background-size: 11px 13px;
        background-repeat: no-repeat;
        @include bg-image("../assets/img/myhome/icon-desc");
      }
    }
  }
}
.all {
  padding: 22px 15px;
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
    }
    .avatar {
      margin-right: 10px;
      width: 43px;
      height: 43px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .text {
      font-size: 0;
      span {
        display: block;
      }
      .name {
        font-size: 15px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: bold;
        color: #333333;
      }
      .time {
        margin-top: 10px;
        font-size: 11px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #999999;
      }
    }
    .right {
      .icon-top {
        display: inline-block;
        width: 43px;
        height: 36px;
        margin-right: 29px;
        background-size: 43px 36px;
        background-repeat: no-repeat;
        @include bg-image("../assets/img/myhome/icon-top");
      }
      .van-icon-ellipsis {
        font-size: 20px;
        vertical-align: super;
      }
    }
  }
  .content {
    margin-top: 18px;
    width: 100%;
    height: 180px;
    border: #333333 solid 1px;
  }
  .content1 {
    display: flex;
    margin-top: 18px;
    .article {
      margin-top: 10px;
      width: 65%;
      margin-right: 5%;
      height: 58px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 16px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      line-height: 20px;
      color: #333333;
    }
    .picture {
      width: 30%;
      height: 81px;
      background: pink;
    }
  }
  .opreate {
    margin-top: 18px;
    > span {
      margin-right: 27px;
      .num {
        margin-left: 4px;
        font-size: 13px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #666666;
        font-style: normal;
      }
      img {
        width: 16px;
        vertical-align: text-top;
      }
    }
  }
}
.more-popup {
  padding: 0 22px;
  width: 300px;
  background: #ffffff;
  border-radius: 5px;
  > div {
    display: flex;
    padding: 24px 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .img-wrap {
    margin-right: 8px;
    width: 15px;
    img {
      width: 100%;
    }
  }
  .text {
    font-size: 15px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    text-align: left;
    color: #333333;
    line-height: 1;
    letter-spacing: -1px;
  }
  .row-2 {
    .text {
      span {
        display: block;
        &:last-child {
          margin-top: 10px;
          color: #999999;
        }
      }
    }
  }
}
.modal-complaint {
  width: 320px;
  border-radius: 5px;
  padding: 17px;
  .title {
    font-size: 16px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: bold;
    color: #333333;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
  }
  .center {
    margin-top: 14px;
    .text {
      margin-bottom: 12px;
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      text-align: justifyLeft;
      color: #333333;
      span {
        color: #f99307;
      }
    }
  }
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
 