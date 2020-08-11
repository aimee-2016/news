<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="search">
      <van-search v-model="serchValue" placeholder="请输入搜索关键词" />
      <van-icon name="chat-o" badge="9" />
    </div>
    <div class="nav">
      <ul>
        <li
          v-for="(item,index) in navList"
          :key="index"
          :class="{selected:navId===item.id}"
          @click="getArticle(item.id)"
        >{{item.name}}</li>
      </ul>
      <van-icon name="wap-nav" @click="getRecommendList()" />
    </div>
    <div class="article">
      <!-- <div class="no-login">
        <img src="../assets/img/形状55.png" alt="add" />
        <p>您还没有登录，请前往登录</p>
      </div>-->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="height:100%">
        <p>柬中资讯成功为您推荐{{resultSize}}条内容</p>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div v-for="(item,index) in articleList" :key="index" class="article-item">
            <h3>{{item.title}}</h3>
            <div class="img-wrap">
              <img :src="inner" alt v-for="(inner,index) in item.imagePaths" :key="index" />
            </div>
            <div class="operat">
              <div class="left">
                <span>{{item.author.nickName}}</span>
                <span>{{item.commentCount}}评论</span>
                <span>{{item.pubDate|changeTime}}</span>
              </div>
              <div class="close">
                <van-icon name="cross" />
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
          <van-icon name="cross" @click="columnShow=false" />
        </div>
        <div class="container">
          <div class="item">
            <div class="top">
              <div class="text">
                <span class="title">我的栏目</span>
                <span class="desc">点击进入栏目</span>
              </div>
              <button @click="isEdit=false" v-if="isEdit">编辑</button>
              <button @click="addColumn()" v-else>完成</button>
            </div>
            <ul class="list">
              <li v-for="(item,index) in myList" :key="index">
                {{item.name}}
                <span v-if="!isEdit&&!item.mustHave" @click="delId(item.id)">
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
              <li v-for="(item,index) in recommendList" :key="index" @click="addId(item.id)">
                <van-icon name="plus" />
                {{item.name}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Icon, Search, Toast, List, PullRefresh } from "vant";
export default {
  name: "Home",
  data() {
    return {
      // timeago,
      navList: [
        { name: "关注", id: 1 },
        { name: "热点", id: 1 },
        { name: "创业", id: 1 },
        { name: "快讯", id: 1 },
        { name: "新闻", id: 1 },
        { name: "娱乐", id: 1 },
        { name: "体育", id: 1 }
      ],
      navId: 0,
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
        { name: "体育", id: 1 }
      ],
      recommendList: [
        { name: "关注", id: 1 },
        { name: "热点", id: 1 },
        { name: "创业", id: 1 },
        { name: "快讯", id: 1 },
        { name: "新闻", id: 1 },
        // { name: "娱乐", id: 1 },
        // { name: "体育", id: 1 }
      ],
      columnShow: false,
      isEdit: true,
      list: [],
      loading: false,
      finished: false,
      page: 1,
      size: 10,
      resultSize: 10,
      articleList: [],
      count: 0,
      isLoading: false,
    };
  },
  components: {
    "van-search": Search,
    "van-icon": Icon,
    "van-list": List,
    "van-pull-refresh": PullRefresh
  },
  created() {
    this.getNavList();
  },
  methods: {
    getNavList() {
      this.$ajax
        .post("api/front/member/findIndexColumnList.json", {})
        .then(res => {
          this.navList = res.data;
          this.navId = res.data[0].id;
          this.getArticle(this.navId);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getArticle(id) {
      this.navId = id;
      this.$ajax
        .post("api/front/articles/findArticlesByColumnId.json", {
          page: this.page,
          size: this.size,
          columnId: this.navId,
          type: "PublishArticle"
        })
        .then(res => {
          // this.navList = res.data
          this.articleList = res.data.content;
          this.resultSize = res.data.size
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onRefresh() {
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
      // this.page++
      // this.$ajax
      //   .post("api/front/articles/findArticlesByColumnId.json", {
      //     page: this.page,
      //     size: this.size,
      //     columnId: this.navId,
      //     type: "PublishArticle"
      //   })
      //   .then(res => {
      //     // this.navList = res.data
      //     this.articleList = res.data.content
      //     this.loading = false;
      //     if(this.page=res.data.totalPages) {
      //       this.finished = true;
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    getRecommendList() {
      this.$ajax
        .post("api/front/articles/findArticlesAddColumn.json", {})
        .then(res => {
          this.myList = res.data.memberColumns;
          this.recommendList = res.data.recommendedColumns;
          this.columnShow=true
        })
        .catch((error)=> {
          console.log(error);
          // console(this.$router)
          this.$router.push({
              name: 'login'
            })
        });
    },
    delId(id) {
      let endIndex = this.myList.findIndex(item => item.id === id);
      let endItem = this.myList.filter(item => item.id === id);
      this.myList.splice(endIndex, 1);
      this.recommendList.push(endItem[0]);
    },
    addId(id) {
      let endIndex = this.recommendList.findIndex(item => item.id === id);
      let endItem = this.recommendList.filter(item => item.id === id);
      this.recommendList.splice(endIndex, 1);
      this.myList.push(endItem[0]);
    },
    addColumn() {
      let ids = this.myList.map(item => item.id);
      this.$ajax
        .post("api/front/member/addColumn.json", { ids: ids })
        .then(() => {
          Toast("修改成功");
          this.isEdit = true;
        })
        .catch(function(error) {
          Toast(error.message);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  text-align: center;
  height: 100%;
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
  position: relative;
  padding: 0 16px;
  ul {
    display: flex;
    align-items: center;
    padding-right: 20px;
    li {
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
  .van-icon-wap-nav {
    position: absolute;
    top: 0;
    right: 16px;
    font-size: 18px;
    color: #2d2d2d;
    background: #fff;
  }
}
.article {
  height: 100%;
  padding: 40px 16px 0;
  text-align: left;
  .article-item {
    margin-bottom: 17px;
    border-bottom: 1px solid #f0f0f0;
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
    img {
      width: 110px;
      height: 80px;
      margin-right: 10px;
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
  // .no-login {
  //   padding-top: 136px;
  //   p {
  //     margin-top: 18px;
  //     font-size: 13px;
  //     font-family: PingFang SC Medium, PingFang SC Medium-Medium;
  //     font-weight: 500;
  //     color: #666666;
  //   }
  // }
}
.overlay {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  text-align: left;
  .column {
    padding: 0 15px;
  }
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
      li {
        width: 77px;
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
        &:nth-of-type(4n + 4) {
          margin-right: 0;
        }
        .van-icon-plus {
          color: #f99307;
        }
        .van-icon-cross {
          font-size: 8px;
          color: #666666;
        }
      }
    }
  }
}
</style>
