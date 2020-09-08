<template>
  <div id="container">
    <van-pull-refresh
      v-model="refreshing"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" :key="index" class="article-item">
          <div class="content">
            <div class="left">
              <div class="name">{{ item.integralType.message }}</div>
              <div class="date">{{ item.integralDate }}</div>
            </div>
            <div class="right">
              + {{ item.integral }}
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  List,
  PullRefresh,
} from "vant";
export default {
  data() {
    return {
      page: 1,
      size: 5,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
          this.$ajax
            .post("api/front/good/findOrderPageByCondition.json", {
              page: this.page,
              size: this.size,
              sort: 'exchangeDate'
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
          this.list = [];
          this.refreshing = false;
        }
        this.getData().then(res=>{
          this.list.push(...res.data.content);
          this.loading = false;
          if(this.page>=res.data.totalPages) {
            this.finished = true;
          }
          this.page++
        })
    },
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {

  },
  components: {
    "van-list": List,
    "van-pull-refresh": PullRefresh,
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  padding: 0 15px;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border: solid 1px #f0f0f0;
  }
  .left {
    .name {
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #333333;
    }
    .date {
      margin-top: 10px;
      font-size: 12px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #999999;
    }
  }
  .right {
    font-size: 18px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    color: #fc4d00;
  }
}
</style>
