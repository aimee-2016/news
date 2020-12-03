<template>
  <div>
    <div class="top-info" v-lazy:background-image="herInfo.headImgPath">
      <div class="bg">
        <div class="return">
          <van-icon name="arrow-left" @click="$router.go(-1)" />
          <van-icon
            name="ellipsis"
            @click="modal.block = true"
            v-if="userInfo.id !== herInfo.id"
          />
        </div>
        <div class="row-1">
          <img v-lazy="herInfo.headImgPath" alt class="avatar" />
          <div v-if="userInfo.id === herInfo.id">
            <span class="btn-edit" @click="$router.push('/editmaterials/')"
              >编辑资料</span
            >
            <span class="btn-auth" @click="myAuth()">我的认证</span>
          </div>
          <div v-else>
            <span
              class="btn-edit"
              v-if="
                !(herInfo.followType && herInfo.followType.name === 'Block')
              "
              @click="init();"
              >私信</span
            >
            <span
              class="btn-auth"
              v-if="!herInfo.followType"
              @click="focusUser(herInfo.id)"
              >关注</span
            >
            <span
              class="btn-auth focused"
              v-if="herInfo.followType && herInfo.followType.name === 'Fans'"
              @click="unfocusUser(herInfo.id)"
              >已关注</span
            >
            <span
              class="btn-edit"
              v-if="herInfo.followType && herInfo.followType.name === 'Block'"
              >解除拉黑</span
            >
          </div>
        </div>
        <div class="row-2">
          <span class="name">{{ herInfo.nickName }}</span>
          <span class="age" v-if="herInfo.sex || herInfo.age">
            <span v-if="herInfo.sex">{{ herInfo.sex.message }}</span>
            <span v-if="herInfo.age"> {{ herInfo.age }}</span>
          </span>
        </div>
        <ul class="row-3">
          <li>
            <span class="num">{{ herInfo.followCount }}</span>
            <span class="text">关注</span>
          </li>
          <li>
            <span class="num">{{ herInfo.fansCount }}</span>
            <span class="text">粉丝</span>
          </li>
          <li>
            <span class="num">{{ herInfo.fabulousCount }}</span>
            <span class="text">获赞</span>
          </li>
        </ul>
        <ul class="row-4">
          <li>
            <span class="icon-auth icon"></span>
            <span class="text">认证：{{ herInfo.memberStatus.message }}</span>
          </li>
          <li>
            <span class="icon-location icon"></span>
            <span class="text">位置：{{ herInfo.address || "---" }}</span>
          </li>
          <li class="van-multi-ellipsis--l2">
            <span class="icon-desc icon"></span>
            <span class="text">简介：{{ herInfo.synopsis || "---" }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="tabs">
      <div class="nav">
        <ul>
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="{ selected: navId === item.id }"
            @click="checkNav(item.id, item.type)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="articleList.length ? '没有更多了' : ''"
          @load="onLoad"
        >
          <no-content v-if="!articleList.length && !loading"></no-content>
          <ul
            class="all"
            v-for="(item, index) in articleList"
            :key="index"
            v-else
          >
            <li v-if="item.type.name === 'PublishVideo'">
              <div class="info">
                <div class="left">
                  <img v-lazy="herInfo.headImgPath" alt class="avatar" />
                  <div class="text">
                    <span class="name">{{ herInfo.nickName }}</span>
                    <span class="time">{{ item.pubDate | changeTime }}</span>
                  </div>
                </div>
                <div class="right">
                  <span class="icon-top" v-if="item.whetherTop"></span>
                  <van-icon name="ellipsis" @click="articleFunc(item)" />
                </div>
              </div>
              <div
                class="content"
                @click="
                  $router.push({
                    path: '/videodetails/',
                    query: { id: item.id },
                  })
                "
              >
                <van-image fit="cover" lazy-load :src="item.videoImagePath" />
                <img src="../assets/img/video/play2x.png" alt="" />
                <span class="time">{{ item.videoTime | formatSeconds }}</span>
              </div>
              <div class="opreate">
                <span @click="modal.share = true">
                  <img src="../assets/img/myhome/icon-share@2x.png" alt />
                </span>
                <span>
                  <img
                    src="../assets/img/home/icon-support-hover@2x.png"
                    @click="articleunSupport(item)"
                    v-if="item.whetherLikeArticles"
                  />
                  <img
                    src="../assets/img/home/icon-support@2x.png"
                    @click="articleSupport(item)"
                    v-else
                  />
                  <i class="num">{{ item.likeCount }}</i>
                </span>
                <span
                  @click="
                    $router.push({
                      path: '/videodetails/',
                      query: { id: item.id },
                    })
                  "
                >
                  <img src="../assets/img/myhome/icon-49@2x.png" alt />
                  <i class="num">{{ item.commentCount }}</i>
                </span>
              </div>
            </li>
            <li v-if="item.type.name === 'PublishArticle'">
              <div class="info">
                <div class="left">
                  <img v-lazy="herInfo.headImgPath" alt class="avatar" />
                  <div class="text">
                    <span class="name">{{ herInfo.nickName }}</span>
                    <span class="time">{{ item.pubDate | changeTime }}</span>
                  </div>
                </div>
                <div class="right">
                  <span class="icon-top" v-if="item.whetherTop"></span>
                  <van-icon name="ellipsis" @click="articleFunc(item)" />
                </div>
              </div>
              <div
                class="content1"
                @click="
                  $router.push({
                    path: '/articledetails/',
                    query: { id: item.id },
                  })
                "
              >
                <div class="article">{{ item.title }}</div>
                <div class="picture">
                  <van-image fit="cover" lazy-load :src="item.imagePaths[0]" />
                </div>
              </div>
              <div class="opreate">
                <span @click="modal.share = true">
                  <img src="../assets/img/myhome/icon-share@2x.png" alt />
                </span>
                <span>
                  <img
                    src="../assets/img/home/icon-support-hover@2x.png"
                    @click="articleunSupport(item)"
                    v-if="item.whetherLikeArticles"
                  />
                  <img
                    src="../assets/img/home/icon-support@2x.png"
                    @click="articleSupport(item)"
                    v-else
                  />
                  <i class="num">{{ item.likeCount }}</i>
                </span>
                <span
                  @click="
                    $router.push({
                      path: '/articledetails/',
                      query: { id: item.id },
                    })
                  "
                >
                  <img src="../assets/img/myhome/icon-49@2x.png" alt />
                  <i class="num">{{ item.commentCount }}</i>
                </span>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-action-sheet
      v-model="modal.user"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
    />
    <van-action-sheet
      v-model="modal.block"
      :actions="actionsBlock"
      cancel-text="取消"
      close-on-click-action
      @select="onSelectBlock"
    />
    <van-popup v-model="modal.article" class="more-popup">
      <div
        @click="
          modal.article = false;
          uninterested();
        "
      >
        <div class="img-wrap">
          <img src="../assets/img/myhome/icon-56@2x.png" alt />
        </div>
        <div class="text">
          <span>不感兴趣</span>
        </div>
      </div>
      <div
        class="row-2"
        @click="
          modal.article = false;
          modal.report = true;
        "
      >
        <div class="img-wrap">
          <img src="../assets/img/myhome/icon-57@2x.png" alt />
        </div>
        <div class="text">
          <span>举报内容</span>
          <span>内容质量差 标题党 低俗 暴力血腥 恶心</span>
        </div>
      </div>
      <div
        @click="
          modal.article = false;
          blockAuthor();
        "
      >
        <div class="img-wrap">
          <img src="../assets/img/myhome/icon-58@2x.png" alt />
        </div>
        <div class="text">
          <span>拉黑作者：{{ herInfo.nickName }}</span>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="modal.report" class="more-popup">
      <div
        v-for="(item, index) in articleReportList"
        :key="index"
        @click="reportArticle(item.val)"
      >
        <div class="text">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="modal.complaint" closeable class="modal-complaint">
      <div class="container">
        <div class="title">举报用户</div>
        <div class="center">
          <div class="text"><span>#</span>我有话要说:</div>
          <van-field
            v-model="messageComplaint"
            rows="6"
            autosize
            type="textarea"
            placeholder="请具体说明问题，我们将尽快处理"
            style="background: #f0f0f0"
          />
        </div>
        <div class="footer">
          <van-button
            type="primary"
            round
            class="btn-yellow"
            @click="reportUser()"
            >确定</van-button
          >
        </div>
      </div>
    </van-popup>
    <van-share-sheet v-model="modal.share" :options="options1" title="分享到" />
  </div>
</template>
<script type="text/ecmascript-6">
import {
  Icon,
  ActionSheet,
  Dialog,
  List,
  PullRefresh,
  Image,
  ShareSheet,
  Popup,
  Button,
  Field,
} from "vant"; // Cell, CellGroup, Button,
export default {
  data() {
    return {
      herInfo: {
        headImgPath: "",
        sex: { message: "" },
        memberStatus: { message: "" },
      },
      navList: [
        { name: "全部", id: 0, type: "" },
        { name: "文章", id: 1, type: "PublishArticle" },
        { name: "视频", id: 2, type: "PublishVideo" },
      ],
      navId: 0,
      type: "",
      active: 0,
      actions: [{ name: "编辑" }, { name: "置顶" }, { name: "删除" }],
      actionsBlock1: [{ name: "拉黑" }, { name: "举报用户" }],
      actionsBlock2: [{ name: "解除拉黑" }, { name: "举报用户" }],
      articleReportList: [
        { name: "内容质量差", val: "PoorContent" },
        { name: "标题党", val: "TitleParty" },
        { name: "低俗", val: "Vulgar" },
        { name: "暴力血腥", val: "ViolentBloody" },
        { name: "恶心", val: "Nausea" },
      ],
      modal: {
        user: false,
        share: false,
        block: false,
        article: false,
        report: false,
        complaint: false,
      },
      options1: [
        [
          { name: "微信好友", icon: "wechat" },
          {
            name: "微信朋友圈",
            icon: require("../assets/img/home/friendscircle@2x.png"),
          },
          { name: "QQ", icon: "qq" },
          {
            name: "QQ空间",
            icon: require("../assets/img/home/qqzone@2x.png"),
          },
        ],
        [{ name: "微博", icon: "weibo" }],
      ],
      message: "",
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      articleList: [],
      refreshing: false,
      selectedItem: null,
      messageComplaint: "",
    };
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    
  },
  methods: {
    getUserInfo() {
      this.$ajax
        .post("api/front/member/findMemberById.json", {
          id: this.$route.query.id,
        })
        .then((res) => {
          this.herInfo = res.data;
        })
        .catch((error) => {
          this.$toast(error);
        });
    },
    checkNav(id, type) {
      this.navId = id;
      this.type = type;
      this.page = 1;
      this.articleList = [];
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    testPromise() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .post("api/front/articles/findArticlesPageByCondition.json", {
            EQ_memberId: this.$route.query.id,
            EQ_type: this.type,
            page: this.page,
            size: this.size,
            sort: "whetherTop,desc",
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    onLoad() {
      if (this.refreshing) {
        this.page = 1;
        this.articleList = [];
        this.refreshing = false;
      }
      this.testPromise().then((res) => {
        this.articleList.push(...res.data.content);
        this.loading = false;
        if (this.page >= res.data.totalPages) {
          this.finished = true;
        }
        this.page++;
      });
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    onSelect(item) {
      if (item.name === "删除") {
        Dialog.confirm({
          title: "确定删除此内容吗？",
          confirmButtonColor: "rgb(255, 203, 0)",
        }).then(() => {
          this.$ajax
            .post("api/front/articles/deleteArticle.json", {
              id: this.selectedItem.id,
            })
            .then(() => {
              this.$toast("删除成功");
              this.checkNav(this.navId, this.type);
            })
            .catch((error) => {
              this.$toast(error);
            });
        });
      } else if (item.name === "置顶") {
        this.$ajax
          .post("api/front/articles/setTop.json", {
            id: this.selectedItem.id,
          })
          .then(() => {
            this.$toast("置顶成功");
            this.checkNav(this.navId, this.type);
          })
          .catch((error) => {
            this.$toast(error);
          });
      }
    },
    onSelectBlock(item) {
      if (item.name === "拉黑") {
        Dialog.confirm({
          title: "确定拉黑该用户？",
          message: "拉黑后此用户不能关注您，也无法给您发送任何消息",
          confirmButtonColor: "#f99307",
        })
          .then(() => {
            this.blockAuthor();
          })
          .catch(() => {});
      } else if (item.name === "解除拉黑") {
        this.unblockAuthor();
      } else if (item.name === "举报用户") {
        this.modal.complaint = true;
      }
    },
    blockAuthor() {
      this.$ajax
        .post("api/front/member/block.json", {
          id: this.herInfo.id,
        })
        .then(() => {
          this.$toast("拉黑成功");
          this.herInfo.followType = {};
          this.herInfo.followType.name = "Block";
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    unblockAuthor() {
      this.$ajax
        .post("api/front/member/relieveBlock.json", {
          id: this.herInfo.id,
        })
        .then(() => {
          this.$toast("已解除黑名单");
          this.herInfo.followType = null;
        })
        .catch((error) => {
          this.$toast(error);
        });
    },
    uninterested() {
      this.$ajax
        .post("api/front/articles/uninterestedArticle.json", {
          id: this.selectedItem.id,
        })
        .then(() => {
          // this.checkNav(this.navId);
          this.$toast("操作成功");
          this.modal.article = false;
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    reportUser() {
      this.$ajax
        .post("api/front/articles/report.json", {
          type: "Users",
          beMemberId: this.herInfo.id,
          content: this.messageComplaint,
        })
        .then(() => {
          this.modal.complaint = false;
          this.$toast("举报用户成功");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    myAuth() {
      if (this.herInfo.memberStatus.name === "NotApplied") {
        this.$router.push("/authapply/");
      } else {
        this.$router.push("/applystatus/");
      }
    },
    articleSupport(item) {
      this.$ajax
        .post("api/front/articles/likeArticles.json", {
          id: item.id,
        })
        .then(() => {
          item.whetherLikeArticles = true;
          item.likeCount++;
          this.$toast("点赞成功");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    articleunSupport(item) {
      this.$ajax
        .post("api/front/articles/unLikeArticles.json", {
          id: item.id,
        })
        .then(() => {
          item.whetherLikeArticles = false;
          item.likeCount--;
          this.$toast("取消点赞");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    focusUser(id) {
      this.$ajax
        .post("api/front/member/follow.json", {
          id: id,
        })
        .then(() => {
          this.herInfo.followType = {};
          this.herInfo.followType.name = "Fans";
          this.$toast("关注成功");
        })
        .catch((error) => {
          this.$toast(error);
        });
    },
    unfocusUser(id) {
      this.$ajax
        .post("api/front/member/unFollow.json", {
          id: id,
        })
        .then(() => {
          this.herInfo.followType = null;
          this.$toast("取消关注成功");
        })
        .catch((error) => {
          this.$toast(error);
        });
    },
    articleFunc(item) {
      this.selectedItem = item;
      if (this.userInfo.id === this.herInfo.id) {
        this.modal.user = true;
      } else {
        this.modal.article = true;
      }
    },
    reportArticle(val) {
      this.$ajax
        .post("api/front/articles/report.json", {
          type: "Article",
          articleId: this.selectedItem.id,
          articlesReportType: val,
        })
        .then(() => {
          this.modal.report = false;
          this.$toast("举报成功");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(
          "ws://47.56.186.16:8099/ws?token=" + this.$store.state.token.split(' ')[1]
        );
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open() {
      console.log("socket连接成功他的主页");
      var paramsJie = {
        actionType: "CreateRoom",
        receiverMemberId: this.$route.query.id
      }
      this.socket.send(JSON.stringify(paramsJie))
    },
    error() {
      console.log("连接错误");
    },
    getMessage(msg) {
      let data = JSON.parse(msg.data);
      if (data.code === '200' && data.data.actionType === 'CreateRoom'&& data.data.pushType === 'Server') {
        this.getRoomAll()
        // this.$router.push({path: '/chat/',query: {receiverMemberId:data.data.chartRoomId,nickName:this.herInfo.nickName,headImgPath:this.herInfo.headImgPath}})
      }
    },
    getRoomAll() {
      this.$ajax
        .post("api/front/message/findChatRoomAll.json", {})
        .then((res) => {
          // this.list2 = res.data
          console.log(res.data)
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    actionsBlock() {
      if (this.herInfo.followType && this.herInfo.followType.name === "Block") {
        return this.actionsBlock2;
      } else {
        return this.actionsBlock1;
      }
    },
  },
  watch: {},
  components: {
    "van-icon": Icon,
    "van-action-sheet": ActionSheet,
    "van-list": List,
    "van-pull-refresh": PullRefresh,
    "van-image": Image,
    "van-share-sheet": ShareSheet,
    "van-popup": Popup,
    "van-button": Button,
    "van-field": Field,
  },
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
  background: #2e2840 no-repeat center;
  background-size: cover;
  .bg {
    height: 307px;
    padding: 18px 15px;
    background: rgba(46, 40, 64, 0.8);
  }
  .return {
    margin-bottom: 23px;
    font-size: 15px;
    .van-icon-ellipsis {
      float: right;
      font-size: 24px;
    }
  }
  .row-1 {
    display: flex;
    align-items: center;
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
    .focused {
      background: #e8e8e8;
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
      &:last-child {
        line-height: 1.2;
      }
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
.tabs {
  .nav {
    position: relative;
    padding: 0 16px;
    ul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
      border-bottom: solid 1px #f0f0f0;
      li {
        font-size: 14px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #666666;
        &.selected {
          position: relative;
          font-size: 14px;
          font-family: PingFang SC Bold, PingFang SC Bold-Bold;
          font-weight: 700;
          color: #333333;
          &::after {
            content: "";
            display: block;
            position: absolute;
            left: 50%;
            bottom: -16px;
            transform: translateX(-7.5px);
            width: 15px;
            height: 2px;
            background: #ffcb00;
            border-radius: 1px;
          }
        }
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
    position: relative;
    margin-top: 18px;
    width: 100%;
    height: 180px;
    border-radius: 3px;
    overflow: hidden;
    .van-image {
      width: 100%;
      height: 180px;
    }
    > img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 38px;
      height: 38px;
      transform: translate(-14px, -14px);
      z-index: 1;
    }
    .time {
      position: absolute;
      bottom: 0;
      right: 0;
      z-index: 1;
      width: 100%;
      height: 33px;
      padding: 12px 15px 0 0;
      background-image: linear-gradient(
        0deg,
        rgba(97, 100, 105, 1),
        rgba(255, 255, 255, 0)
      );
      opacity: 0.87;
      text-align: right;
      font-size: 10px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #ffffff;
    }
  }
  .content1 {
    display: flex;
    margin-top: 18px;
    .article {
      margin-top: 10px;
      width: 207px;
      margin-right: 30px;
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
      width: 109px;
      height: 81px;
      border-radius: 3px;
      overflow: hidden;
      .van-image {
        width: 109px;
        height: 81px;
      }
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
  .selected {
    .van-cell__value--alone {
      color: #f99307;
    }
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
</style>
