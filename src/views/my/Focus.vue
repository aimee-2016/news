<template>
  <div>
    <span class="return-icon" @click="$router.go(-1)">
      <van-icon name="arrow-left" />
    </span>
    <van-tabs
      v-model="active"
      line-width="20px"
      line-heigth="2px"
      title-active-color=" #333333"
      color="#ffcb00"
      sticky
    >
      <van-tab title="关注">
        <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :finished-text="list.length?'没有更多了':''" @load="onLoad">
            <div class="msg-container">
              <no-content v-if="!list.length&&!loading">您还没有关注任何人，请前往关注</no-content>
              <div v-for="(item, index) in list" :key="index" class="msg-item" v-else @click="$router.push({path:'/myhome/',query:{id:item.id}})">
                <div class="content">
                  <div class="left">
                    <div class="head-img">
                      <van-image round fit="cover" :src="item.headImgPath" />
                    </div>
                    <div class="text">
                      <div class="name">{{ item.nickName }}</div>
                      <div class="desc">
                        {{
                        item.synopsis
                        }}
                      </div>
                      <div class="fans-count">粉丝数:{{item.fansCount}}</div>
                    </div>
                  </div>
                  <div class="right">
                     <span
                        class="focus"
                        @click="focusUser(item)"
                        v-if="!item.followType"
                        >+关注</span
                      >
                      <span
                        class="focused"
                        @click="unfocusUser(item)"
                        v-if="item.followType&&item.followType.name === 'Fans'"
                        >已关注</span
                      >
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="粉丝">
        <van-pull-refresh v-model="refreshing1" success-text="刷新成功" @refresh="onRefresh1">
          <van-list v-model="loading1" :finished="finished1" :finished-text="list1.length?'没有更多了':''" @load="onLoad1">
            <div class="msg-container">
              <no-content v-if="!list1.length&&!loading1"></no-content>
              <div v-for="(item, index) in list1" :key="index" class="msg-item" v-else @click="$router.push({path:'/myhome/',query:{id:item.id}})">
                <div class="content">
                  <div class="left">
                    <div class="head-img">
                      <van-image round fit="cover" :src="item.headImgPath" />
                    </div>
                    <div class="text">
                      <div class="name">{{ item.nickName }}</div>
                      <div class="desc">
                        {{
                        item.synopsis
                        }}
                      </div>
                      <div class="fans-count">粉丝数:{{item.fansCount}}</div>
                    </div>
                  </div>
                  <div class="right">
                    <!-- <self-button
                      round
                      @click="focusUser(item)"
                      :disabled="!item.followType ? false : true"
                    >{{ focusText(item.followType) }}</self-button> -->
                    <span
                        class="focus"
                        @click="focusUser(item)"
                        v-if="!item.followType"
                        >+关注</span
                      >
                      <span
                        class="focused"
                        @click="unfocusUser(item)"
                        v-if="item.followType&&item.followType.name === 'Fans'"
                        >已关注</span
                      >
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import { Tabs, Tab, List, PullRefresh, Image, Icon } from "vant";
export default {
  name: "svb",
  data() {
    return {
      active: 1,
      page: 1,
      size: 20,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page1: 1,
      size1: 20,
      list1: [],
      loading1: false,
      finished1: false,
      refreshing1: false
    };
  },
  created() {
    this.active = this.$route.query.active
  },
  mounted() {},
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .post("api/front/member/findMyConcernsPageByCondition.json", {
            page: this.page,
            size: this.size,
            id: this.userInfo.id
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    onLoad() {
      if (this.refreshing) {
        this.page = 1;
        this.list = [];
        this.refreshing = false;
      }
      this.getData().then(res => {
        this.list.push(...res.data.content);
        this.loading = false;
        if (this.page >= res.data.totalPages) {
          this.finished = true;
        }
        this.page++;
      });
    },
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    getData1() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .post("api/front/member/findMyFansPageByCondition.json", {
            page: this.page1,
            size: this.size1,
            id: this.userInfo.id
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    onLoad1() {
      if (this.refreshing1) {
        this.page1 = 1;
        this.list1 = [];
        this.refreshing1 = false;
      }
      this.getData1().then(res => {
        this.list1.push(...res.data.content);
        this.loading1 = false;
        if (this.page1 >= res.data.totalPages) {
          this.finished1 = true;
        }
        this.page1++;
      });
    },
    onRefresh1() {
      this.finished1 = false;
      this.loading1 = true;
      this.onLoad1();
    },
    toDetail(item, type) {
      this.$router.push({
        path: "/msgdetail",
        query: { id: item.id, type: type, title: item.title }
      });
    },
    focusUser(item) {
      this.$ajax
        .post("api/front/member/follow.json", {
          id: item.id
        })
        .then(() => {
          item.followType = {}
          item.followType.name = 'Fans'
          this.$toast("关注成功");
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    unfocusUser(item) {
      this.$ajax
        .post('api/front/member/unFollow.json', {
          id: item.id,
        })
        .then(() => {
          item.followType = null
          this.$toast('取消关注成功')
        })
        .catch((error) => {
          this.$toast(error.message)
        })
    },
    focusText(item) {
      if (item) {
        return item.name === "Fans"
          ? "已关注"
          : item.name === "Block"
          ? "已拉黑"
          : "关注";
      } else {
        return "关注";
      }
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {},
  components: {
    "van-tabs": Tabs,
    "van-tab": Tab,
    "van-list": List,
    "van-pull-refresh": PullRefresh,
    "van-image": Image,
    "van-icon": Icon,
  }
};
</script>

<style lang="scss" scoped>
.msg-container {
  padding: 10px 15px 0;
  .msg-item {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: solid 1px #f0f0f0;
    .left {
      display: flex;
      align-items: center;
      .head-img {
        position: relative;
        margin-right: 10px;
        width: 53px;
        height: 53px;
        .van-image--round {
          width: 53px;
          height: 53px;
        }
      }
      .text {
        width: 156px;
        .name {
          margin-bottom: 5px;
          font-size: 14px;
          color: #333;
          line-height: 14px;
        }
        .desc {
          margin-bottom: 7px;
          width: 156px;
          font-size: 12px;
          color: #666666;
          line-height: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .fans-count {
          font-size: 11px;
          color: #999999;
          line-height: 11px;
        }
      }
    }
    .right {
      span {
        display: inline-block;
        width: 60px;
        height: 25px;
        border-radius: 13px;
        font-size: 11px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        line-height: 25px;
        text-align: center;
      }
      .focus {
        background: #fdd004;
        color: #333333;
      }
      .focused {
        background: #e8e8e8;
        color: #999999;

      }
    }
  }
}
.return-icon {
  position: fixed;
  top: 12px;
  left: 15px;
  z-index: 100;
  font-size: 18px;
}
</style>
