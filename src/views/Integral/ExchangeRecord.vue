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
            <div class="top">
              <div class="integral">{{ item.integral }}积分兑换</div>
              <div class="time">{{ item.exchangeDate }}</div>
            </div>
            <div class="center">
              <div class="info">
                <div class="name">{{ item.name }}</div>
                <div class="num gray">数量：{{ item.number }}</div>
                <div class="gray">{{ item.transactionMode }}</div>
              </div>
              <div class="img-wrap">
                <img v-lazy="item.goodImage" />
              </div>
            </div>
            <div class="bottom">
              <!-- Pending("Pending","商家待处理"),
              ToBeReceived("To be received","待收件"),
              Completed("Completed","已完成"),
              Cancel("cancel","已取消"), -->
              <div
                class="status"
                :class="{
                  red:
                    item.exchangeStatus.name === 'Pending' ||
                    item.exchangeStatus.name === 'cancel',
                }"
              >
                {{ item.exchangeStatus.message }}
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
        console.log(this.list)
    },
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    toDetail(id) {
      this.$router.push({path:'/exchangedetails/',query:{id:id}})
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
    "van-list": List,
    "van-pull-refresh": PullRefresh,
  }
}
</script>

<style lang="scss" scoped>
#container {
  padding: 20px 16px 0;
}
.article-item {
  padding: 0px 12px;
  margin-bottom: 14px;
  background: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(4, 0, 0, 0.19);
  .content {
    .top {
      padding-left: 5px;
      padding-bottom: 19px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .integral {
        font-size: 14px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #666666;
        line-height: 24px;
      }
      .time {
        font-size: 12px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #999999;
        line-height: 24px;
      }
    }
    .center {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 15px 20px 5px;
      border-top: solid 1px #f0f0f0;
      border-bottom: solid 1px #f0f0f0;
      .name {
        font-size: 16px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        text-align: justifyLeft;
        color: #333333;
        line-height: 1;
      }
      .gray {
        font-size: 14px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        text-align: justifyLeft;
        color: #666666;
        line-height: 1;
      }
      .num {
        margin: 19px 0;
      }
      .img-wrap {
        height: 85px;
        width: 85px;
        border-radius: 3px;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .bottom {
      padding: 24px 0 24px 5px;
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      line-height: 1;
      color: #2cb94b;
      .red {
        color: #fc4d00;
      }
    }
  }
}
</style>
