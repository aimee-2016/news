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
          <li v-for="(item, index) in taskList" :key="index">
            <span class="name">{{ item.type.message }}</span>
            <div class="operate">
              <van-button
                type="primary"
                v-if="!item.whetherComplete"
                @click="$router.push('/home/')"
                >去完成</van-button
              >
              <img
                src="../../assets/img/auth/icon-completed.png"
                alt=""
                v-else
              />
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
        <van-button
          type="primary"
          :class="{ 'btn-yellow': btnStatus }"
          @click="creatorAuthor"
          >申请创作者</van-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button, Icon, Popup, Image,Dialog} from "vant";
export default {
  data() {
    return {
      taskList: [],
      btnStatus: false
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
        .post("api/front/member/findMemberAuthorizationRecord.json")
        .then(res => {
          this.taskList = res.data
          this.btnStatus = this.taskList.every(item=>item.whetherComplete)
        });
    },
    creatorAuthor() {
      if(!this.btnStatus) {
        this.$toast('请先完成申请条件')
        return false
      }
      Dialog.confirm({
          title: "是否申请创作者？",
          confirmButtonColor: "rgb(255, 203, 0)"
        })
          .then(() => {
            this.$ajax
        .post("api/front/member/applyCreatorAuthor.json")
        .then(res => {
          this.$toast('申请创作者成功')
          this.$router.push('/applystatus/')
        }).catch(error=> {
          this.$toast(error.message)
        });
          })
          .catch(() => {});

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
  .btn-yellow {
    background: #fdd004;
    border-color: #fdd004;
    color: #333333;
  }
}
</style>
