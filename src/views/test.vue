<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <p class="refresh-m" v-if="refreshMessage">柬中资讯成功为您推荐{{resultSize}}条内容</p>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" ref="vanl">
        <div v-for="(item,index) in articleList" :key="index" class="article-item">
          <h3>{{item.title}}</h3>
          <div class="img-wrap">
            <img :src="inner" alt v-for="(inner,index) in item.imagePaths" :key="index" />
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script type="text/ecmascript-6">
import { List, PullRefresh} from "vant";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      articleList: [],
      page: 1,
      size: 2,
      refreshMessage: false,
      resultSize: 0
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    testPromise() {
      return new Promise((resolve, reject) => {
        console.log(this.page)
        console.log(this.size)
          this.$ajax
            .post("api/front/articles/findArticlesByColumnId.json", {
              page: this.page,
              size: this.size,
              columnId: 4,
              type: "PublishArticle"
            }).then(response=>{
              resolve(response)
            }).catch(error=>{
              reject(error)
            })
        })
    },
    onLoad() {
        if (this.refreshing) {
          this.page = 1
          this.articleList = [];
          this.refreshing = false;
          this.refreshMessage = true;
          setTimeout(() => {
            this.refreshMessage = false
          }, 3000);
        }
        this.testPromise().then(res=>{
          this.resultSize = res.data.number*res.data.size
          this.articleList.push(...res.data.content);
          this.loading = false;
          if(this.page>=res.data.totalPages) {
            this.finished = true;
          }
          console.log(this.$refs.vanl)
          this.page++
        })
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    
    // onRefresh() {
    //   this.testPromise().then(res=> {
    //     this.articleList = res.data.content;
    //     this.resultSize = res.data.size
    //     setTimeout(() => {
    //       this.isLoading = false
    //       this.refreshMessage = true
    //     }, 1000);
    //     setTimeout(() => {
    //       this.refreshMessage = false
    //     }, 3000);
    //   })
    // },
  },
  computed: {

  },
  watch: {

  },
  components: {
    // "van-search": Search,
    // "van-icon": Icon,
    "van-list": List,
    "van-pull-refresh": PullRefresh,
    // "van-cell": Cell
  },
}
</script>

<style lang="scss" scoped>
.article-item {
    margin-bottom: 87px;
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
</style>
