<template>
  <div class="home">
    <div class="top-f">
      <div class="search">
        <van-search
          v-model="serchValue"
          placeholder="请输入搜索关键词"
          @click="$router.push('/search')"
        />
        <van-icon
          name="chat-o"
          :badge="msgNum"
          @click="$router.push('/msgcenter/')"
        />
      </div>
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
        <span class="icon"
          ><van-icon name="wap-nav" @click="getRecommendList()"
        /></span>
      </div>
    </div>
    <div class="article">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <!-- <transition name="fade">
          <p class="refresh-m" v-if="refreshMessage">
            柬中资讯成功为您推荐{{ resultSize }}条内容
          </p>
        </transition> -->
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="articleList.length ? '没有更多了' : ''"
          @load="onLoad"
        >
          <!-- <template #loading>
            <img class="doge" src="../assets/img/home/loading.png" />
          </template> -->
          <div v-if="!articleList.length && !loading">
            <no-content v-if="hotId === navId && userInfo"
              >您还没有关注任何人，请前往关注</no-content
            >
            <no-content v-if="hotId === navId && !userInfo"
              >您还没有登录，请前往登录</no-content
            >
            <no-content v-if="hotId !== navId"></no-content>
          </div>
          <div
            v-for="(item, index) in articleList"
            :key="index"
            class="article-item"
            v-else
          >
            <div v-if="item.whetherTop" class="top-item">
              <div class="top-left">
                <div
                  @click="
                    $router.push({
                      path: '/articledetails/',
                      query: { id: item.id },
                    })
                  "
                >
                  <h3>{{ item.title }}</h3>
                </div>
                <div class="operat">
                  <div class="left">
                    <span class="red">置顶</span>
                    <span>{{ item.author.nickName }}</span>
                    <span>{{ item.commentCount }}评论</span>
                    <!-- <span>{{ item.pubDate | changeTime }}</span> -->
                  </div>
                  <div class="close">
                    <van-icon
                      name="cross"
                      @click="
                        modal.article = true;
                        selectedItem = item;
                      "
                    />
                  </div>
                </div>
              </div>
              <div class="img-wrap">
                <van-image lazy-load :src="inner" v-for="(inner, index) in item.imagePaths" :key="index" fit="cover"/>
              </div>
            </div>
            <div v-else>
              <div
                @click="
                  $router.push({
                    path: '/articledetails/',
                    query: { id: item.id },
                  })
                "
              >
                <h3>{{ item.title }}</h3>
                <div class="img-wrap" v-if="item.imagePaths.length>1">
                  <van-image lazy-load :src="inner" v-for="(inner, index) in item.imagePaths" :key="index" fit="cover"/>
                </div>
                <div class="img-wrap-1" v-else>
                  <van-image lazy-load :src="inner" v-for="(inner, index) in item.imagePaths" :key="index" fit="cover"/>
                </div>
              </div>
              <div class="operat">
                <div class="left">
                  <span>{{ item.author.nickName }}</span>
                  <span>{{ item.commentCount }}评论</span>
                  <span>{{ item.pubDate | changeTime }}</span>
                </div>
                <div class="close">
                  <van-icon
                    name="cross"
                    @click="
                      modal.article = true;
                      selectedItem = item;
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div class="overlay" v-if="columnShow">
      <div class="column">
        <div class="head">
          <span>所有栏目</span>
          <van-icon name="cross" @click="columnShow = false" />
        </div>
        <div class="container">
          <div class="item">
            <div class="top">
              <div class="text">
                <span class="title">我的栏目</span>
                <span class="desc">点击进入栏目</span>
              </div>
              <button @click="isEdit = false" v-if="isEdit">编辑</button>
              <button @click="addColumn()" v-else>完成</button>
            </div>
            <ul class="list">
              <li v-for="(item, index) in myList" :key="index">
                {{ item.name }}
                <span v-if="!isEdit && !item.mustHave" @click="delId(item.id)">
                  <van-icon name="cross" />
                </span>
              </li>
            </ul>
          </div>
          <div class="item">
            <div class="top">
              <div class="text">
                <span class="title">栏目推荐</span>
                <span class="desc">点击添加栏目</span>
              </div>
            </div>
            <ul class="list">
              <li
                v-for="(item, index) in recommendList"
                :key="index"
                @click="addId(item.id)"
              >
                <van-icon name="plus" />
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
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
import { Icon, Search, Toast, List, PullRefresh, Popup, Image } from "vant";
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
        // { name: "关注", id: 1 },
        // { name: "热点", id: 1 },
        // { name: "创业", id: 1 },
        // { name: "快讯", id: 1 },
        // { name: "新闻", id: 1 },
        // { name: "娱乐", id: 1 },
        // { name: "体育", id: 1 }
      ],
      navId: 0,
      firstId: 0,
      serchValue: "",
      myList: [
        // { name: "关注", id: 1 },
        // { name: "热点", id: 1 },
        // { name: "创业", id: 1 },
        // { name: "快讯", id: 1 },
        // { name: "新闻", id: 1 },
        // { name: "娱乐", id: 1 },
        // { name: "体育", id: 1 },
        // { name: "关注", id: 1 },
        // { name: "热点", id: 1 },
        // { name: "创业", id: 1 },
        // { name: "快讯", id: 1 },
        // { name: "新闻", id: 1 },
        // { name: "娱乐", id: 1 },
        // { name: "体育", id: 1 },
      ],
      recommendList: [
        // { name: "关注", id: 1 },
        // { name: "热点", id: 1 },
        // { name: "创业", id: 1 },
        // { name: "快讯", id: 1 },
        // { name: "新闻", id: 1 },
        // { name: "娱乐", id: 1 },
        // { name: "体育", id: 1 },
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
      refreshMessage: false,
      selectedItem: null,
      articleReportList: [
        { name: "内容质量差", val: "PoorContent" },
        { name: "标题党", val: "TitleParty" },
        { name: "低俗", val: "Vulgar" },
        { name: "暴力血腥", val: "ViolentBloody" },
        { name: "恶心", val: "Nausea" },
      ],
      topList: [],
      msgNum: null,
      hotId: "",
    };
  },
  components: {
    "van-search": Search,
    "van-icon": Icon,
    "van-list": List,
    "van-pull-refresh": PullRefresh,
    "van-popup": Popup,
    "van-image": Image
  },
  created() {},
  mounted() {
    if(this.$store.state.token) {
      this.unreadData();
    }
    this.getNavList();
  },
  methods: {
    getNavList() {
      this.$ajax
        .post("api/front/member/findIndexColumnList.json", {})
        .then((res) => {
          this.navList = res.data;
          this.navId = res.data.filter((item) => item.name === "热点")[0].id;
          this.hotId = res.data.filter((item) => item.name === "关注")[0].id;
          // this.firstId = res.data.filter(item=>item.name==='热点')[0].id
          // this.getArticle();
          this.$nextTick(() => {
            let liDoms = this.$refs["navW"].children;
            let endWidth = 0;
            liDoms.forEach((element) => {
              endWidth += element.offsetWidth + 20;
            });
            this.$refs["navW"].style.width = (endWidth + 30) / 15 + "rem";
          });
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
        // console.log(this.page)
        // console.log(this.size)
        this.$ajax
          .post("api/front/articles/findArticlesByColumnId.json", {
            page: this.page,
            size: this.size,
            columnId: this.navId,
            type: "PublishArticle",
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
        // this.refreshMessage = true;
        // setTimeout(() => {
        //   this.refreshMessage = false;
        // }, 3000);
      }
      this.testPromise().then((res) => {
        if(res.code==='200'&&res.data.content.length) {
          // console.log(res.data.content)
          this.resultSize = res.data.number * res.data.size;
          this.articleList.push(...res.data.content);
          // let topList = res.data.content.filter(element => {
          //   return element.whetherTop === true
          // });
          // this.topList.push(...topList)
          // console.log(topList)
          this.loading = false;
          if (this.page >= res.data.totalPages) {
            this.finished = true;
          }
          this.page++;
        }
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
    getRecommendList() {
      this.$ajax
        .post("api/front/articles/findArticlesAddColumn.json", {})
        .then((res) => {
          this.myList = res.data.memberColumns;
          this.recommendList = res.data.recommendedColumns;
          this.columnShow = true;
        })
        .catch((error) => {
          console.log(error);
          // console(this.$router)
          this.$router.push({
            name: "/login/",
          });
        });
    },
    delId(id) {
      let endIndex = this.myList.findIndex((item) => item.id === id);
      let endItem = this.myList.filter((item) => item.id === id);
      this.myList.splice(endIndex, 1);
      this.recommendList.push(endItem[0]);
    },
    addId(id) {
      let endIndex = this.recommendList.findIndex((item) => item.id === id);
      let endItem = this.recommendList.filter((item) => item.id === id);
      this.recommendList.splice(endIndex, 1);
      this.myList.push(endItem[0]);
      if(this.isEdit) {
        this.addColumn()
      }
    },
    addColumn() {
      let ids = this.myList.map((item) => item.id);
      this.$ajax
        .post("api/front/member/addColumn.json", { ids: ids })
        .then(() => {
          Toast("修改成功");
          this.getNavList();
          this.isEdit = true;
        })
        .catch((error) => {
          Toast(error.message);
        });
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
    unreadData() {
      this.$ajax
        .post("api/front/message/findMessageUnRead.json", {})
        .then((res) => {
          this.msgNum =
            res.data.systemMessageCount +
            res.data.replyCount +
            res.data.privateLetterCount;
          if(!this.msgNum) {
            this.msgNum = null
          }
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
.search {
  display: flex;
  align-items: center;
  padding: 10px 25px 20px;
  .van-search {
    flex: 1;
    padding: 0;
  }
  .van-icon {
    margin-left: 16px;
    font-size: 22px;
  }
}
.nav {
  padding: 0 16px;
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
  .icon {
    padding-right: 16px;
    position: absolute;
    z-index: 1;
    bottom: 13px;
    right: 0;
    background: #fff;
    .van-icon-wap-nav {
      font-size: 18px;
      color: #2d2d2d;
    }
  }
}
.article {
  // min-height: 100%;
  padding-top: 100px;
  padding-bottom: 58px;
  text-align: left;
  .refresh-m {
    // margin-bottom: 6px;
    background: #faf2cd;
    font-size: 13px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #fb9600;
    line-height: 30px;
    text-align: center;
  }
  .doge {
    display: block;
    width: 180px;
    margin: 0 auto;
  }
  .article-item {
    margin-bottom: 17px;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 16px;
  }
  .top-item {
    display: flex;
    justify-content: space-between;
    .top-left {
      margin-right: 20px;
    }
    .red {
      color: #EC4448;
    }
  }
  h3 {
    margin-bottom: 10px;
    font-size: 16px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    color: #333333;
    line-height: 22px;
    letter-spacing: -1px;
  }
  .img-wrap {
    display: flex;
    .van-image {
      width: 110px;
      height: 80px;
      margin-right: 10px;
      border-radius: 3px;
      overflow: hidden;
    }
  }
  .img-wrap-1 {
    .van-image {
      width: 100%;
      height: 180px;
      overflow: hidden;
    }
  }
  .operat {
    display: flex;
    justify-content: space-between;
    margin: 13px 0 15px;
    font-size: 10px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #999999;
    line-height: 20px;
    letter-spacing: 0px;
    .left {
      span {
        margin-right: 10px;
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
.overlay {
  position: fixed;
  top: 0;
  z-index: 1001;
  width: 100%;
  height: 100%;
  background: #fff;
  text-align: left;
  .head {
    text-align: center;
    margin: 17px 0 31px;
    font-size: 17px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #333333;
    .van-icon-cross {
      position: absolute;
      right: 15px;
    }
  }
  .item {
    margin-bottom: 13px;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      margin-bottom: 23px;
      .text {
        .title {
          margin-right: 9px;
          font-size: 17px;
          font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
          font-weight: 800;
          color: #333333;
        }
        .desc {
          font-size: 11px;
          font-family: PingFang SC Medium, PingFang SC Medium-Medium;
          font-weight: 500;
          color: #666666;
        }
      }

      button {
        width: 60px;
        height: 27px;
        background: none;
        border: 1px solid #f99307;
        border-radius: 14px;
        font-size: 13px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #f99307;
      }
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      padding-left: 15px;
      li {
        padding: 0 10px;
        min-width: 77px;
        height: 31px;
        margin-bottom: 15px;
        margin-right: 12px;
        background: #f5f5f5;
        border-radius: 3px;
        font-size: 15px;
        line-height: 31px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        text-align: center;
        color: #333333;
        .van-icon-plus {
          color: #f99307;
          vertical-align: -2px;
        }
        .van-icon-cross {
          font-size: 8px;
          color: #666666;
        }
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
</style>
