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
        <div v-for="(item, index) in list" :key="index" class="article-item" @click="toDetail(item.id)">
          <div class="content">
            <van-image
              fit="cover"
              lazy-load
              class="img-box"
              :src="item.imagePaths[0]"
            />
            <div class="right">
              <div class="text">
                {{ item.title }}
              </div>
              <div class="operate">
                <span
                  class="status"
                  :class="{ success: item.status.name === 'Approved' }"
                  >{{item.status.message}}</span>
                <span class="time">{{ item.pubDate | changeTime }}</span>
              </div>
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
  Image
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
            .post("api/front/articles/findMyExplosivePageByCondition.json", {
              page: this.page,
              size: this.size
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
    toDetail(id) {
      this.$router.push({path: '/explosivedetail',query: {id:id}})
    }
  },
  computed: {

  },
  watch: {

  },
  components: {
    "van-list": List,
    "van-pull-refresh": PullRefresh,
    "van-image": Image
  }
}
</script>

<style lang="scss" scoped>
#container {
  padding-top: 18px;
}
.article-item {
  margin-bottom: 17px;
  padding: 0 16px;
  .content {
    display: flex;
    align-items: center;
    .text {
      margin-bottom: 10px;
      font-size: 15px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      color: #333333;
      line-height: 25px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .img-box {
      width: 109px;
      height: 81px;
      border-radius: 3px;
      overflow: hidden;
      margin-right: 10px;
    }
    .right {
      .operate {
        font-size: 12px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
      }
      .status {
        margin-right: 10px;
        color: #f25f5f;
      }
      .success {
        color: #56c087;
      }
      .time {
        color: #999999;
      }
    }
  }
}
</style>
