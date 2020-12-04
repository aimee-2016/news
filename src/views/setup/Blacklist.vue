<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <div
          v-for="(item, index) in list"
          :key="index"
          class="member-item"
        >
          <div class="content">
            <div class="left">
              <div class="head-img">
                <van-image round fit="cover" :src="item.headImgPath" />
              </div>
              <div>
                <span class="name">{{ item.nickName }}</span>
              </div>
            </div>
            <div class="right">
              <self-button round @click="focusUser(item.id)">移除</self-button>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script type="text/ecmascript-6">
import selfButton from '@/components/button';
import {
  List,
  PullRefresh,
  Image
} from "vant";
export default {
  data() {
    return {
      list: [],
      page: 1,
      size: 20,
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
            .post("api/front/member/findBlackListPageByCondition.json", {
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
    focusUser(id) {
      this.$ajax
        .post("api/front/member/relieveBlock.json", {
          id: id
        })
        .then(() => {
          this.$toast('移除成功')
          this.initOnload()
        })
        .catch(error=> {
          this.$toast(error.message)
        });
    },
    initOnload() {
      this.page=1;
      this.list=[];
      this.finished = false;
      this.loading = true;
      this.onLoad()
    }
  },
  computed: {

  },
  watch: {

  },
  components: {
    "van-image": Image,
    'self-button': selfButton,
    "van-list": List,
    "van-pull-refresh": PullRefresh,
  }
}
</script>

<style lang="scss" scoped>
.member-item {
  padding: 0 15px;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: solid 1px #f0f0f0;
  .left {
    display: flex;
    align-items: center;
    .name {
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #333333;
      line-height: 15px;
    }
    .desc {
      margin-top: 8px;
      font-size: 0;
      span {
        margin-right: 4px;
        font-size: 12px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #838383;
        line-height: 12px;
        letter-spacing: 0px;
      }
    }
  }
  .head-img {
    position: relative;
    margin-right: 10px;
    width: 45px;
    height: 45px;
    .van-image--round {
      width: 45px;
      height: 45px;
    }
    img {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 14px;
    }
  }
}
</style>
