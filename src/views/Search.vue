<template>
  <div class="home">
    <div class="search">
      <van-icon name="arrow-left" @click="$router.push('/home')" />
      <van-search
        v-model="serchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>
    <div class="serch-container" v-if="navShow">
      <div class="history">
        <p>
          <span>搜索历史</span>
          <van-icon name="delete" />
        </p>
        <ul>
          <li v-for="(item,index) in historyList" :key="index">
            <span>{{item}}</span>
            <van-icon name="cross" />
          </li>
        </ul>
      </div>
      <div class="hot">
        <p>
          <span>热门搜索</span>
        </p>
        <ul>
          <li v-for="(item,index) in historyList" :key="index">
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="box" v-else>
      <div class="nav">
        <ul>
          <li
            v-for="(item,index) in navList"
            :key="index"
            :class="{selected:navId===item.id}"
            @click="checkNav(item.id)"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="article">
        <!-- <div class="no-login" v-if="firstId===navId">
          <img src="../assets/img/home/logo@2x.png" alt="add" />
          <p v-if="!userInfo">您还没有登录，请前往登录</p>
          <p v-if="userInfo&&articleList.length===0">你还没有关注任何人，请前往关注</p>
        </div> -->
        <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <transition name="fade">
            <p class="refresh-m" v-if="refreshMessage">柬中资讯成功为您推荐{{resultSize}}条内容</p>
          </transition>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            
          </van-list>
        </van-pull-refresh> -->
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
                  <van-icon name="cross" @click="modal.article = true;selectedItem=item" />
                </div>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Icon, Search, Toast, List, PullRefresh, Popup } from "vant";
export default {
  name: "Home",
  data() {
    return {
      // timeago,
      navShow: true,
      navList: [
        { name: "综合", id: 1 },
        { name: "视频", id: 2 },
        { name: "资讯", id: 3 },
        { name: "用户", id: 4 },
        { name: "话题", id: 5 }
      ],
      navId: 0,
      firstId: 0,
      serchValue: "",
      columnShow: false,
      isEdit: true,
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      resultSize: 10,
      articleList: [],
      refreshing: false,
      refreshMessage: false,
      selectedItem: null,
      historyList: [],
      allList: []
    };
  },
  components: {
    "van-search": Search,
    "van-icon": Icon,
    "van-list": List,
    "van-pull-refresh": PullRefresh,
    "van-popup": Popup
  },
  created() {
    this.getHistoryList();
  },
  methods: {
    // getNavList() {
    //   this.$ajax
    //     .post("api/front/member/findIndexColumnList.json", {})
    //     .then(res => {
    //       this.navList = res.data;
    //       this.navId = res.data[0].id;
    //       this.firstId = res.data[0].id;
    //       // this.getArticle();
    //       this.onLoad()
    //     })
    //     .catch(error=> {
    //       console.log(error);
    //     });
    // },
    getHistoryList() {
        this.$ajax
        .post("api/front/articles/findHotSearch.json", {})
        .then(res => {
          this.historyList = res.data
        })
        .catch(error=> {
          console.log(error);
        });
    },
    getAll() {
        this.$ajax
        .post("api/front/articles/findComprehensive.json", {queryValue: this.serchValue})
        .then(res => {
          this.articleList = res.data
        })
        .catch(error=> {
          console.log(error);
        });
    },
    checkNav(id) {
      // this.navId=id;
      // this.page=1;
      // this.articleList=[];
      // this.finished = false;
      // this.loading = true;
      // this.onLoad();
    },
    // onLoad() {
    //     if (this.refreshing) {
    //       this.page = 1
    //       this.articleList = [];
    //       this.refreshing = false;
    //       this.refreshMessage = true;
    //       setTimeout(() => {
    //         this.refreshMessage = false
    //       }, 3000);
    //     }
    //     this.testPromise().then(res=>{
    //       // console.log(res.data.content)
    //       this.resultSize = res.data.number*res.data.size
    //       this.articleList.push(...res.data.content);
    //       this.loading = false;
    //       if(this.page>=res.data.totalPages) {
    //         this.finished = true;
    //       }
    //       this.page++
    //     })
    // },
    // onRefresh() {
    //   // 清空列表数据
    //   this.finished = false;

    //   // 重新加载数据
    //   // 将 loading 设置为 true，表示处于加载状态
    //   this.loading = true;
    //   this.onLoad();
    // },
    onSearch(val) {
      if(val) {
        this.navShow = false
        this.getAll()
      }
    },
    onCancel() {
      this.$router.push('/home')
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  }
};
</script>
<style lang="scss" scoped>
.fade-leave-active {
  transition: height .5s ease;
}
.fade-leave,.fade-enter-to {
 opacity: 1;
 height: 30px;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0;
  opacity: 0;
}
.home {
  position: relative;
  // text-align: center;
  // height: 100%;
}
// .top-f {
//   width: 100%;
//   position: fixed;
//   top: 0;
//   z-index: 2;
//   background:#fff;
// }
.search {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  background:#fff;
  display: flex;
  align-items: center;
  padding: 10px 25px 20px 0;
  .van-search {
    flex: 1;
    padding: 0;
  }
  .van-icon {
    margin: 0 15px;
    font-size: 15px;
  }
}
.serch-container {
  width: 100%;
  position: fixed;
  top: 60px;
  z-index: 2;
  background:#fff;
  padding: 20px;
  >div {
    margin-bottom: 28px;
  }
  p {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    color: #666666;
    span {
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    li {
      margin-right: 10px;
      padding: 6px;
      background: #f8f8f8;
      border-radius: 13px;
      font-size: 12px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      text-align: center;
      color: #333333;
      span {
        margin-right: 6px;
      }
      .van-icon {
        vertical-align: middle;
      }
    }
  }
}
.nav {
  width: 100%;
  position: fixed;
  top: 60px;
  z-index: 2;
  background:#fff;
  padding: 0 16px;
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    // padding-right: 20px;
    padding-bottom: 13px;
    li {
      // margin-right: 20px;
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
}
.article {
  // min-height: 100%;
  padding-top:100px;
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
  .article-item {
    margin-bottom: 17px;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 16px;
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
// .serch-container {
//   padding-top:100px;
// }
</style>
