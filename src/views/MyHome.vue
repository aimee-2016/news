<template>
  <div>
    <div
      class="top-info"
      :style="{
        background:
          '#2e2840 url(' + userInfo.headImgPath + ') no-repeat center',
        backgroundSize: 'cover',
      }"
    >
      <div class="bg">
        <div class="return">
          <van-icon name="arrow-left" @click="$router.go(-1)" />
          <!-- <van-icon name="ellipsis" @click="modal.user = true" /> -->
        </div>
        <div class="row-1">
          <img :src="userInfo.headImgPath" alt class="avatar" />
          <span class="btn-edit" @click="$router.push('/editmaterials/')"
            >编辑资料</span
          >
          <span class="btn-auth" @click="myAuth()">我的认证</span>
        </div>
        <div class="row-2">
          <span class="name">{{ userInfo.nickName }}</span>
          <span class="age" v-if="userInfo.sex || userInfo.age">
            <span v-if="userInfo.sex">{{ userInfo.sex.message }}</span>
            <span v-if="userInfo.age"> {{ userInfo.age }}</span>
          </span>
        </div>
        <ul class="row-3">
          <li>
            <span class="num">{{ userInfo.followCount }}</span>
            <span class="text">关注</span>
          </li>
          <li>
            <span class="num">{{ userInfo.fansCount }}</span>
            <span class="text">粉丝</span>
          </li>
          <li>
            <span class="num">{{ userInfo.fabulousCount }}</span>
            <span class="text">获赞</span>
          </li>
        </ul>
        <ul class="row-4">
          <li>
            <span class="icon-auth icon"></span>
            <span class="text">认证：{{ userInfo.memberStatus.message }}</span>
          </li>
          <li>
            <span class="icon-location icon"></span>
            <span class="text">位置：{{ userInfo.address || "---" }}</span>
          </li>
          <li class="van-multi-ellipsis--l2">
            <span class="icon-desc icon"></span>
            <span class="text">简介：{{ userInfo.synopsis || "---" }}</span>
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
          :finished-text="articleList.length?'没有更多了':''"
          @load="onLoad"
        >
          <no-content v-if="!articleList.length&&!loading"></no-content>
          <ul class="all" v-for="(item, index) in articleList" :key="index" v-else>
            <li v-if="item.type.name === 'PublishVideo'">
              <div class="info">
                <div class="left">
                  <img :src="userInfo.headImgPath" alt class="avatar" />
                  <div class="text">
                    <span class="name">{{ userInfo.nickName }}</span>
                    <span class="time">{{ item.pubDate | changeTime }}</span>
                  </div>
                </div>
                <div class="right">
                  <span class="icon-top" v-if="item.whetherTop"></span>
                  <van-icon
                    name="ellipsis"
                    @click="
                      selectedItem = item;
                      modal.user = true;
                    "
                  />
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
                  <img :src="userInfo.headImgPath" alt class="avatar" />
                  <div class="text">
                    <span class="name">{{ userInfo.nickName }}</span>
                    <span class="time">{{ item.pubDate | changeTime }}</span>
                  </div>
                </div>
                <div class="right">
                  <span class="icon-top" v-if="item.whetherTop"></span>
                  <van-icon
                    name="ellipsis"
                    @click="
                      selectedItem = item;
                      modal.user = true;
                    "
                  />
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
} from "vant"; // Cell, CellGroup, Button,
export default {
  data() {
    return {
      userInfo: null,
      navList: [
        { name: "全部", id: 0,type:''},
        { name: "文章", id: 1,type:'PublishArticle'},
        { name: "视频", id: 2,type:'PublishVideo'},
      ],
      navId: 0,
      type: '',
      active: 0,
      actions: [{ name: "编辑" }, { name: "置顶" },{ name: "删除" }],
      modal: {
        user: false,
        share: false
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
      selectedItem: null
    };
  },
  created() {
    this.getUserInfo()
  },
  mounted() {},
  methods: {
    getUserInfo() {
      
      this.$ajax
            .post("api/front/member/findMemberById.json", {
              id: this.$route.query.id,
            })
            .then((res) => {
              // this.$toast('删除成功');
              // this.checkNav(this.navId,this.type)
              console.log(res.data)
              this.userInfo = res.data
            })
            .catch(error=> {
              this.$toast(error)
            });
    },
    onSelect(item) {
      if (item.name === "删除") {
        Dialog.confirm({
          title: "确定删除此内容吗？",
          confirmButtonColor: "rgb(255, 203, 0)"
        })
          .then(() => {

            this.$ajax
            .post("api/front/articles/deleteArticle.json", {
              id: this.selectedItem.id,
            })
            .then(() => {
              this.$toast('删除成功');
              this.checkNav(this.navId,this.type)
            })
            .catch(error=> {
              this.$toast(error)
            });
          })
      } else if(item.name === "置顶"){
        this.$ajax
        .post("api/front/articles/setTop.json", {
          id: this.selectedItem.id,
        })
        .then(() => {
          this.$toast('置顶成功')
          this.checkNav(this.navId,this.type)
        })
        .catch(error=> {
          this.$toast(error)
        });
      }
    },
    checkNav(id,type) {
      this.navId = id;
      this.type = type
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
            EQ_memberId: this.userInfo.id,
            EQ_type: this.type,
            page: this.page,
            size: this.size,
            sort: 'whetherTop,desc',
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
    myAuth(){
      if(this.userInfo.memberStatus.name==='NotApplied') {
        this.$router.push('/authapply/')
      } else {
        this.$router.push('/applystatus/')
      }
    },
    articleSupport(item) {
      this.$ajax
        .post("api/front/articles/likeArticles.json", {
          id: item.id,
        })
        .then(() => {
          item.whetherLikeArticles = true;
          item.likeCount++
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
          item.likeCount--
          this.$toast("取消点赞");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
  },
  computed: {
    // userInfo() {
    //   return this.$store.state.userInfo;
    // }
  },
  watch: {},
  components: {
    "van-icon": Icon,
    "van-action-sheet": ActionSheet,
    // "van-dialog": Dialog,
    "van-list": List,
    "van-pull-refresh": PullRefresh,
    "van-image": Image,
    "van-share-sheet": ShareSheet,
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
    .van-icon-ellipsis {
      float: right;
      font-size: 24px;
    }
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
</style>
