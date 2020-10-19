<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>柬中资讯认证</span>
    </div>
    <div class="main">
      <div class="task-list">
        <div class="item">
          <span class="name">创作者认证</span>
          <div class="operate">
            <img
              src="../../assets/img/auth/icon1.png"
              alt=""
              v-if="authStatus === 'AssessmentPeriod'"
            />
            <img src="../../assets/img/auth/icon2.png" alt="" v-else />
          </div>
        </div>
        <div class="item">
          <span class="name">文章创作领域</span>
          <div class="operate">
            <span class="gray" v-if="!articleStatus">未达成申请条件</span>
            <span class="yellow" v-else>已达成申请条件</span>
          </div>
        </div>
        <div class="rule" v-if="authStatus === 'CertifyAdopt'">
          <h2>
            <span>如何获取文章领域标签</span>
          </h2>
          <div class="desc">
            在任意领域发布n篇优质文章之后即可申请文章领域标签
          </div>
          <div class="btn-wrap">
            <van-button type="primary" @click="publishArticle()"
              >去发布文章</van-button
            >
            <van-button type="primary" :disabled="!articleStatus">立即申请领域标签</van-button>
          </div>
        </div>
        <div class="item">
          <span class="name">视频创作领域</span>
          <div class="operate">
            <span class="gray" v-if="!videoStatus">未达成申请条件</span>
            <span class="yellow" v-else>已达成申请条件</span>
          </div>
        </div>
        <div class="rule" v-if="authStatus === 'CertifyAdopt'">
          <h2>
            <span>如何获取视频领域标签</span>
          </h2>
          <div class="desc">
            在任意领域发布n条优质视频之后即可申请视频领域标签
          </div>
          <div class="btn-wrap">
            <van-button type="primary"
              >去发布视频</van-button
            >
            <van-button type="primary" :disabled="!videoStatus" @click="$router.push('/createfiled/')">立即申请领域标签</van-button>
          </div>
        </div>
      </div>
      <div class="rule" v-if="authStatus !== 'CertifyAdopt'">
        <h2>
          <img src="../../assets/img/auth/icon-shield.png" alt="" />
          <span>请30天内完成任务，否则将取消认证</span>
        </h2>
        <div class="desc">
          认证后30天内，至少发布一次本领域的优质内容即可通过考核。
        </div>
        <div class="btn-wrap">
          <van-button type="primary" @click="publishArticle()"
            >去发布文章</van-button
          >
          <van-button type="primary">去发布视频</van-button>
        </div>
      </div>
      <div class="interval-bar"></div>
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
    </div>
    <textarea
      id="input"
      v-model="textareaV"
      ref="inputT"
      style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;"
    ></textarea>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button, Icon, Popup, Image,Dialog} from "vant";
export default {
  data() {
    return {
      taskList: [],
      authStatus: false,
      videoStatus: false,
      articleStatus: false,
      textareaV: 'www.cjhchchchch'
    }
  },
  created() {
    this.getTaskList()
  },
  mounted() {

  },
  methods: {
    getTaskList() {
      this.$ajax
        .post("api/front/articles/countArticlesAndVideo.json")
        .then(res => {
          this.authStatus= res.data.memberStatus.name
          this.videoStatus = res.data.whetherVideoApply
          this.articleStatus = res.data.whetherArticleApply
        });
    },
    publishArticle() {
      Dialog.alert({
          title: "发布文章",
          message: "请复制以下网址，在电脑端登录创作者管理系统：www.cjhchchchch",
          theme: 'round-button',
          confirmButtonColor: '#FFDC22',
          width:'250px',
          confirmButtonText:'复制链接'
        }).then(() => {
          // window.open(url,'_self')
          this.$refs['inputT'].select()
          document.execCommand("copy"); // 执行浏览器复制命令
          this.$toast("复制成功")
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
}
.task-list {
  padding: 0 15px;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #f0f0f0;
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
    .operate {
      span {
        font-size: 14px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
      }
      .gray {
        color: #999999;
      }
      .yellow {
        color: #f99307;
      }
    }
  }
}
.rule {
  margin: 28px auto 26px;
  width: 296px;
  h2 {
    position: relative;
    margin-bottom: 12px;
    font-size: 18px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    color: #333333;
    img {
      position: absolute;
      top: 0;
      left: -28px;
      width: 21px;
    }
  }
  .desc {
    margin-bottom: 30px;
    font-size: 14px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #999999;
    line-height: 24px;
  }
  .btn-wrap {
    // padding: 0 28px 26px;
    text-align: center;
    .van-button {
      height: 33px;
      padding: 0 13px;
      background: #fdd004;
      border-color: #fdd004;
      border-radius: 5px;
      font-size: 15px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      color: #333333;
      &:first-of-type {
        margin-right: 10px;
      }
    }
    // .btn-yellow {
    //   background: #fdd004;
    //   border-color: #fdd004;
    //   color: #333333;
    // }
  }
}
.privilege {
  margin-top: 20px;
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
</style>
