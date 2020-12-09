<template>
  <div class="home">
    <div class="top-f">
      <div class="nav">
        <ul ref="navW">
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="{ selected: navId === item.id }"
            @click="checkNav(item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
        <van-icon name="search" @click="$router.push('/search')" />
      </div>
    </div>
    <div class="article">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="articleList.length?'没有更多了':''"
          @load="onLoad"
        >
          <div v-if="!articleList.length&&!loading">
            <no-content v-if="hotId===navId&&userInfo">您还没有关注任何人，请前往关注</no-content>
            <no-content v-if="hotId===navId&&!userInfo">您还没有登录，请前往登录</no-content>
            <no-content v-if="hotId!==navId"></no-content>
          </div>
          <div
            v-for="(item, index) in articleList"
            :key="index"
            class="article-item"
            v-else
          >
            <div
              class="img-box"
              @click="
                $router.push({
                  path: '/videodetails/',
                  query: { id: item.id },
                })
              "
            >
              <div class="title-b">
                <h3>{{ item.title }}</h3>
              </div>
              <van-image lazy-load fit="cover" :src="item.videoImagePath" >
                <!-- <template v-slot:loading>
                  <img src="../assets/img/home/video-no.png" alt="">
                </template> -->
              </van-image>
              <img src="../assets/img/video/play2x.png" alt="" />
              <div class="info">
                <span>{{ item.viewCount }}次播放量 | </span
                ><span>{{ item.videoTime | formatSeconds }}</span>
              </div>
            </div>
            <div class="operat">
              <div class="left">
                <van-image round fit="cover" :src="item.author.headImgPath" />
                <span class="name">{{ item.author.nickName }}</span>
                <span
                  class="focus"
                  v-if="!item.author.followType"
                  @click="
                    $router.push({
                      path: '/videodetails/',
                      query: { id: item.id },
                    })
                  ">+关注</span
                >
                <span
                  class="focused"
                  v-if="item.author.followType&&item.author.followType.name === 'Fans'"
                  >已关注</span
                >
              </div>
              <div class="right">
                <div>
                  <img
                    src="../assets/img/video/icon-50@2x.png"
                    alt=""
                    v-if="!item.whetherLikeArticles"
                    @click="articleSupport(item)"
                  />
                  <img
                    src="../assets/img/video/icon-50-h@2x.png"
                    alt=""
                    @click="articleunSupport(item)"
                    v-else
                  />
                  <span>{{ item.likeCount }}</span>
                </div>
                <div
                  @click="
                    $router.push({
                      path: '/videodetails/',
                      query: { id: item.id },
                    })
                  "
                >
                  <img src="../assets/img/video/icon-49@2x.png" alt="" />
                  <span>{{ item.commentCount }}</span>
                </div>
                <div
                  @click="
                    modal.article = true;
                    selectedItem = item;
                  "
                >
                  <img src="../assets/img/video/other2x.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-popup v-model="modal.article" class="more-popup" v-if="selectedItem">
      <div>
        <div class="img-wrap">
          <img src="../assets/img/myhome/icon-56@2x.png" alt />
        </div>
        <div
          class="text"
          @click="
            modal.article = false;
            uninterested();
          "
        >
          <span>不感兴趣</span>
        </div>
      </div>
      <div class="row-2">
        <div class="img-wrap">
          <img src="../assets/img/myhome/icon-57@2x.png" alt />
        </div>
        <div
          class="text"
          @click="
            modal.article = false;
            modal.report = true;
          "
        >
          <span>举报内容</span>
          <span>内容质量差 标题党 低俗 暴力血腥 恶心</span>
        </div>
      </div>
      <div>
        <div class="img-wrap">
          <img src="../assets/img/myhome/icon-58@2x.png" alt />
        </div>
        <div
          class="text"
          @click="
            modal.article = false;
            blockAuthor();
          "
        >
          <span>拉黑作者：{{ selectedItem.author.nickName }}</span>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="modal.report" class="more-popup" v-if="selectedItem">
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
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Icon, List, PullRefresh, Popup, Image } from "vant";
export default {
  name: "Home",
  data() {
    return {
      // timeago,
      modal: {
        report: false,
        complaint: false,
        article: false,
        user: false,
        support: false,
      },
      navList: [
        { name: "关注", id: 1 },
        { name: "热点", id: 1 },
        { name: "创业", id: 1 },
        { name: "快讯", id: 1 },
        { name: "新闻", id: 1 },
        // { name: "娱乐", id: 1 },
        // { name: "体育", id: 1 }
      ],
      navId: 0,
      firstId: 0,
      serchValue: "",
      myList: [
        { name: "关注", id: 1 },
        { name: "热点", id: 1 },
        { name: "创业", id: 1 },
        { name: "快讯", id: 1 },
        { name: "新闻", id: 1 },
        { name: "娱乐", id: 1 },
        { name: "体育", id: 1 },
        { name: "关注", id: 1 },
        { name: "热点", id: 1 },
        { name: "创业", id: 1 },
        { name: "快讯", id: 1 },
        { name: "新闻", id: 1 },
        { name: "娱乐", id: 1 },
        { name: "体育", id: 1 },
      ],
      recommendList: [
        { name: "关注", id: 1 },
        { name: "热点", id: 1 },
        { name: "创业", id: 1 },
        { name: "快讯", id: 1 },
        { name: "新闻", id: 1 },
        { name: "娱乐", id: 1 },
        { name: "体育", id: 1 },
      ],
      columnShow: false,
      isEdit: true,
      list: [],
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      resultSize: 10,
      articleList: [],
      count: 0,
      refreshing: false,
      selectedItem: null,
      articleReportList: [
        { name: "内容质量差", val: "PoorContent" },
        { name: "标题党", val: "TitleParty" },
        { name: "低俗", val: "Vulgar" },
        { name: "暴力血腥", val: "ViolentBloody" },
        { name: "恶心", val: "Nausea" },
      ],
      topList: [],
      msgNum: 0,
      hotId: ''
    };
  },
  components: {
    "van-icon": Icon,
    "van-list": List,
    "van-pull-refresh": PullRefresh,
    "van-popup": Popup,
    "van-image": Image,
  },
  created() {
    this.getNavList();
  },
  methods: {
    getNavList() {
      this.$ajax
        .post("api/front/member/findIndexColumnList.json", {})
        .then((res) => {
          this.navList = res.data;
          this.navId = res.data.filter(item=>item.name==='热点')[0].id
          this.hotId = res.data.filter(item=>item.name==='关注')[0].id
          // this.firstId = res.data[0].id;
          // this.getArticle();
          this.$nextTick(()=>{
            let liDoms = this.$refs['navW'].children
            let endWidth = 0
            liDoms.forEach(element => {
              endWidth += element.offsetWidth+20
            });
            this.$refs['navW'].style.width = (endWidth+30)/15+'rem'
          })
          this.onLoad();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkNav(id) {
      this.navId = id;
      this.page = 1;
      this.articleList = [];
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    testPromise() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .post("api/front/articles/findArticlesByColumnId.json", {
            page: this.page,
            size: this.size,
            columnId: this.navId,
            type: "PublishVideo",
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
    focusUser(item) {
      this.$ajax
        .post('api/front/member/follow.json', {
          id: item.author.id,
        })
        .then(() => {
          this.checkNav(this.navId);
          this.$toast('关注成功')
        })
        .catch((error) => {
          this.$toast(error.message)
        })
    },
    unfocusUser(item) {
      this.$ajax
        .post('api/front/member/unFollow.json', {
          id: item.author.id,
        })
        .then(() => {
          this.checkNav(this.navId);
          this.$toast('取消关注成功')
        })
        .catch((error) => {
          this.$toast(error.message)
        })
    },
    uninterested() {
      this.$ajax
        .post("api/front/articles/uninterestedArticle.json", {
          id: this.selectedItem.id,
        })
        .then(() => {
          this.checkNav(this.navId);
          this.$toast("操作成功");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    blockAuthor() {
      this.$ajax
        .post("api/front/member/block.json", {
          id: this.selectedItem.author.id,
        })
        .then(() => {
          // this.checkNav(this.navId)
          this.$toast("操作成功");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
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
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>
<style lang="scss" scoped>
.fade-leave-active {
  transition: height 0.5s ease;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
  height: 30px;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0;
  opacity: 0;
}
.home {
  position: relative;
  text-align: center;
  // height: 100%;
}
.top-f {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  background: #fff;
}
.nav {
  padding: 20px 16px 0;
  width: 100%;
  overflow-x: scroll;
  &::-webkit-scrollbar{display: none;}
  ul {
    display: flex;
    flex-wrap: wrap;
    padding-right: 20px;
    padding-bottom: 13px;
    li {
      flex-shrink: 0;
      margin-right: 20px;
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #999999;
      &.selected {
        position: relative;
        font-size: 17px;
        font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
        font-weight: 800;
        color: #333333;
        &::after {
          content: "";
          display: block;
          position: absolute;
          left: 50%;
          bottom: -6px;
          transform: translateX(-7.5px);
          width: 15px;
          height: 3px;
          background: #fdd004;
        }
      }
    }
  }
  .van-icon-search {
    padding: 16px 16px 2px 6px;
    position: absolute;
    z-index: 1;
    bottom: 13px;
    right: 0;
    background: #fff;
  }
}
.article {
  padding-top: 60px;
  padding-bottom: 58px;
  text-align: left;
  // .refresh-m {
  //   background: #faf2cd;
  //   font-size: 13px;
  //   font-family: PingFang SC Medium, PingFang SC Medium-Medium;
  //   font-weight: 500;
  //   color: #fb9600;
  //   line-height: 30px;
  //   text-align: center;
  // }
  .article-item {
    .img-box {
      position: relative;
      height: 200px;
      .van-image {
        width: 100%;
        height: 200px;
      }
      .title-b {
        position: absolute;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 77px;
        padding: 15px 0 0 15px;
        background-image: linear-gradient(
          180deg,
          rgba(97, 100, 105, 1),
          rgba(255, 255, 255, 0)
        );
        opacity: 0.87;
        h3 {
          font-size: 17px;
          font-family: PingFang SC Bold, PingFang SC Bold-Bold;
          font-weight: 700;
          color: #ffffff;
        }
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
      .info {
        position: absolute;
        bottom: 0;
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
        span {
          font-size: 10px;
          font-family: PingFang SC Medium, PingFang SC Medium-Medium;
          font-weight: 500;
          color: #ffffff;
        }
      }
    }
    .operat {
      display: flex;
      justify-content: space-between;
      padding: 13px 16px 16px;
      .left {
        .van-image {
          margin-right: 5px;
          width: 26px;
          height: 26px;
          vertical-align: middle;
        }
        span {
          font-size: 14px;
          font-family: PingFang SC Bold, PingFang SC Bold-Bold;
          font-weight: 700;
        }
        .name {
          margin-right: 5px;
          color: #333333;
        }
        .focus {
          color: #f99307;
        }
        .focused {
          color: #999999;
        }
      }
      .right {
        display: flex;
        align-items: center;
        div {
          margin-right: 18px;
          &:last-child {
            margin-right: 0;
            img {
              vertical-align: 2px;
            }
          }
        }
        span {
          font-size: 13px;
          font-family: PingFang SC Medium, PingFang SC Medium-Medium;
          font-weight: 500;
          color: #666666;
        }
        img {
          margin-right: 5px;
          width: 17px;
          vertical-align: -2px;
        }
      }
    }
  }

  .no-login {
    padding-top: 136px;
    text-align: center;
    height: 100%;
    img {
      width: 63px;
    }
    p {
      margin-top: 18px;
      font-size: 13px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #666666;
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
</style>
