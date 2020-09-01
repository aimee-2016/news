<template>
  <div id="collection">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span class="title" style="float:right" @click="editStatus=!editStatus">{{editStatus?'取消':'编辑'}}</span>
    </div>
    <van-tabs
      v-model="active"
      line-width="15px"
      line-heigth="2px"
      title-active-color=" #333333"
      color="#ffcb00"
      sticky
    >
      <van-tab title="收藏">
        <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="我是有底线的" @load="onLoad">
            <ul class="all">
              <li v-for="(item, index) in list" :key="index">
                <div v-if="item.articlesQueryResultDto.type.name=='PublishArticle'">
                  <div v-if="editStatus">
                    <van-checkbox v-model="checked" checked-color="#ffcb00" />
                  </div>
                  <div box-content>
                    <div class="info">
                      <div class="left">
                        <van-image fit="cover" round lazy-load :src="item.articlesQueryResultDto.author.headImgPath"/>
                        <div class="text">
                          <span class="name">{{item.articlesQueryResultDto.nickName}}</span>
                          <span class="time">{{item.articlesQueryResultDto.pubDate | changeTime}}</span>
                        </div>
                      </div>
                      <div class="right">
                        <span class="icon-top" v-if="item.articlesQueryResultDto.whetherTop"></span>
                        <van-icon name="ellipsis" />
                      </div>
                    </div>
                    <div class="content1">
                      <div class="article">{{item.articlesQueryResultDto.title}}</div>
                      <van-image fit="cover" lazy-load :src="item.articlesQueryResultDto.imagePaths[0]"/>
                    </div>
                    <div class="opreate">
                      <span>
                        <img src="../../assets/img/myhome/icon-share@2x.png" alt />
                      </span>
                      <span>
                        <img src="../../assets/img/myhome/icon-49@2x.png" alt />
                        <i class="num">{{item.articlesQueryResultDto.commentCount}}</i>
                      </span>
                      <span>
                        <img
                          src="../../assets/img/myhome/icon-50@2x.png"
                          @click="modal.support=true"
                          alt
                        />
                        <i class="num">{{item.articlesQueryResultDto.likeCount}}</i>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="item.articlesQueryResultDto.type.name=='PublishVideo'">
                  <div v-if="editStatus">
                    <van-checkbox v-model="checked" checked-color="#ffcb00" />
                  </div>
                  <div class="box-content">
                    <div class="info">
                      <div class="left">
                        <van-image fit="cover" round lazy-load :src="item.articlesQueryResultDto.author.headImgPath"/>
                        <div class="text">
                          <span class="name">{{item.articlesQueryResultDto.nickName}}</span>
                          <span class="time">{{item.articlesQueryResultDto.pubDate | changeTime}}</span>
                        </div>
                      </div>
                      <div class="right">
                        <span class="icon-top" v-if="item.articlesQueryResultDto.whetherTop"></span>
                        <van-icon name="ellipsis" @click="modal.article = true" />
                      </div>
                    </div>
                    <div class="content2">
                    <van-image fit="cover" lazy-load :src="item.articlesQueryResultDto.videoImagePath"/>
                    </div>
                    <div class="opreate">
                      <span>
                        <img src="../../assets/img/myhome/icon-share@2x.png" alt />
                      </span>
                      <span>
                        <img src="../../assets/img/myhome/icon-49@2x.png" alt />
                        <i class="num">{{item.articlesQueryResultDto.commentCount}}</i>
                      </span>
                      <span>
                        <img
                          src="../../assets/img/myhome/icon-50@2x.png"
                          @click="modal.support=true"
                          alt
                        />
                        <i class="num">{{item.articlesQueryResultDto.likeCount}}</i>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="item.articlesQueryResultDto.type.name=='Topic'">
                  <div v-if="editStatus">
                    <van-checkbox v-model="checked" checked-color="#ffcb00" />
                  </div>
                  <div class="box-content">
                    <div class="info">
                      <div class="left">
                        <van-image fit="cover" round lazy-load :src="item.articlesQueryResultDto.author.headImgPath"/>
                        <div class="text">
                          <span class="name">{{item.articlesQueryResultDto.nickName}}</span>
                          <span class="time">{{item.articlesQueryResultDto.pubDate | changeTime}}</span>
                        </div>
                      </div>
                      <div class="right">
                        <span class="icon-top" v-if="item.articlesQueryResultDto.whetherTop"></span>
                        <van-icon name="ellipsis" @click="modal.article = true" />
                      </div>
                    </div>
                    <div class="content2">
                    <van-image fit="cover" lazy-load :src="item.articlesQueryResultDto.imagePaths[0]"/>
                    </div>
                    <div class="content2-title">{{item.articlesQueryResultDto.title}}</div>
                    <div class="opreate1">
                      <span>
                        {{item.articlesQueryResultDto.viewCount}}人围观
                      </span>
                      <span>
                        {{item.articlesQueryResultDto.commentCount}}评论
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="评论">
        <van-pull-refresh v-model="refreshing1" success-text="刷新成功" @refresh="onRefresh1">
          <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad1">
            <div class="msg-container">
              <div v-for="(item, index) in list1" :key="index" class="msg-item">
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
                    <self-button
                      round
                      @click="focusUser(item.id)"
                      :disabled="!item.followType ? false : true"
                    >{{ focusText(item.followType) }}</self-button>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="点赞">
        <van-pull-refresh v-model="refreshing1" success-text="刷新成功" @refresh="onRefresh1">
          <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad1">
            <div class="msg-container">
              <div v-for="(item, index) in list1" :key="index" class="msg-item">
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
                    <self-button
                      round
                      @click="focusUser(item.id)"
                      :disabled="!item.followType ? false : true"
                    >{{ focusText(item.followType) }}</self-button>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="历史">
        <van-pull-refresh v-model="refreshing1" success-text="刷新成功" @refresh="onRefresh1">
          <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad1">
            <div class="msg-container">
              <div v-for="(item, index) in list1" :key="index" class="msg-item">
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
                    <self-button
                      round
                      @click="focusUser(item.id)"
                      :disabled="!item.followType ? false : true"
                    >{{ focusText(item.followType) }}</self-button>
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
import selfButton from "@/components/button";
import { Tabs, Tab, List, PullRefresh, Image, Icon, Checkbox } from "vant";
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
      refreshing1: false,
      checked: true,
      editStatus: false,
    };
  },
  created() {
    this.active = this.$route.query.active;
  },
  mounted() {},
  methods: {
    getData() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .post(
            "api/front/articles/findArticlesCollectionPageByCondition.json",
            {
              page: this.page,
              size: this.size
            }
          )
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
          .post("api/front/articles/findMyCommentPageByMemberId.json", {
            page: this.page1,
            size: this.size1
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
    focusUser(id) {
      this.$ajax
        .post("api/front/member/follow.json", {
          id: id
        })
        .then(() => {
          this.$toast("关注成功");
          this.getAll();
        })
        .catch(error => {
          this.$toast(error);
        });
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
    "self-button": selfButton,
    "van-checkbox": Checkbox
  }
};
</script>

<style lang="scss" scoped>
#collection {
  padding-top: 58px;
}
#head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 14px 15px;
  font-size: 17px;
  font-family: PingFang SC Medium, PingFang SC Medium-Medium;
  font-weight: 500;
  text-align: center;
  color: #333334;
  line-height: 24px;
  background: #fff;
  box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.08);
  .van-icon {
    position: absolute;
    left: 15px;
    top: 18px;
    font-size: 17px;
  }
}
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
  }
}
.all {
  background: #f8f8f8;
  li {
    margin-bottom: 10px;
    background: #fff;
    > div {
      display: flex;
      align-items: center;
      padding: 20px 15px 13px;
      .box-content {
          margin-left: 10px;
      }
    }
  }
  .box-content {
    width: 100%;
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
    }
    .van-image--round {
      margin-right: 10px;
      width: 43px;
      height: 43px;
    }
    .text {
      font-size: 0;
      span {
        display: block;
      }
      .name {
        font-size: 15px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: bold;
        color: #333333;
      }
      .time {
        margin-top: 10px;
        font-size: 11px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #999999;
      }
    }
    .right {
      .icon-top {
        display: inline-block;
        width: 43px;
        height: 36px;
        margin-right: 29px;
        background-size: 43px 36px;
        background-repeat: no-repeat;
        @include bg-image("../../assets/img/myhome/icon-top");
      }
      .van-icon-ellipsis {
        font-size: 20px;
        vertical-align: super;
      }
    }
  }
  .content2 {
    margin-top: 18px;
    .van-image {
      width: 100%;
      height: 180px;
    }
  }
  .content2-title {
    margin-top: 17px;
      font-size: 16px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      color: #333333;
    }
  .content1 {
    display: flex;
    margin-top: 18px;
    .article {
      margin-top: 10px;
      width: 200px;
      margin-right: 30px;
      height: 58px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 16px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      line-height: 20px;
      color: #333333;
    }
    .van-image {
      width: 109px;
      height: 81px;
    }
  }
  .opreate1 {
    margin-top: 11px;
    span {
      margin-right: 9px;
      font-size: 12px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #999999;
    }
  }
  .opreate {
    margin-top: 18px;
    > span {
      margin-right: 27px;
      .num {
        margin-left: 4px;
        font-size: 13px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #666666;
        font-style: normal;
      }
      img {
        width: 16px;
        vertical-align: text-top;
      }
    }
  }
}
</style>
