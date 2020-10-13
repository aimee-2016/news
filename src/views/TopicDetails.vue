<template>
  <div id="detial">
    <div class="tp-head">
      <div @click="$router.push('/topic/')">
        <img src="../assets/img/topic/back.png" />
      </div>
      <div>
        <span>{{ topicDetails.title }}</span>
      </div>
      <div>
        <img src="../assets/img/topic/icon1.png" @click="showShare = true" />
      </div>
    </div>
    <div class="tp-top-box">
      <div class="tp-top-content">
        <!-- <img :src="topicDetails.imagePathsStr" /> -->
        <div class="content-v">
          <div v-html="topicDetails.content">
            {{ topicDetails.content }}
          </div>
          <!-- <span class="view-count">{{topicDetails.viewCount}}人围观</span> -->
        </div>

        <p class="tp-top-ed">
          本文编辑：{{ topicDetails.currentEditionStr || "--" }}
        </p>
        <div class="tp-top-plorm">
          <img src="../assets/img/topic/icon2.png" />
          {{ topicDetails.problem || "--" }}
        </div>
        <div class="tp-re">
          <img src="../assets/img/topic/hot.png" />
          <span>已有{{ topicDetails.voteCount || 0 }}人参与投票</span>
        </div>
        <div class="tp-debate">
          <div class="tp-de-desc">
            <img src="../assets/img/topic/icon4.png" />
            <span>{{ topicDetails.orthodoxView || "--" }}</span>
          </div>
          <div class="tp-de-desc">
            <img src="../assets/img/topic/icon3.png" />
            <span>{{ topicDetails.opposingView || "--" }}</span>
          </div>
        </div>
        <div class="vote-show">
          <div class="circle-l circle" @click="vote('Orthodox')">
            <img src="../assets/img/topic/hand-l.png" />
            <span>喜欢</span>
          </div>
          <div class="vote-proportion">
            <div class="vote-text">
              <span>{{ topicDetails.orthodoxVoteCount||0 }}</span>
              <div class="img-wrap">
                <img src="../assets/img/topic/text-pk@2x.png" alt="" />
              </div>
              <span>{{ topicDetails.opposingVoteCount||0 }}</span>
            </div>
            <div class="bar-wrap">
              <span class="bar" :style="{width:topicDetails.orthodoxProportion+'%'||'50%'}"></span>
              <span class="bar" :style="{width:topicDetails.opposingProportion+'%'||'50%'}"></span>
            </div>
          </div>
          <div class="circle-r circle" @click="vote('Opposing')">
            <img src="../assets/img/topic/hand-r.png" />
            <span>不喜欢</span>
          </div>
        </div>
      </div>
    </div>
    <div class="interval-bar"></div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      style="background:#fff"
    >
      <div class="tp-ct-box">
        <p class="tp-ct-title" id="topAnchor">
          热门评论({{ totalElements || 0 }})
        </p>
        <div class="tp-ct-list" v-for="item in list" :key="item.id">
          <div class="tp-ct-item">
            <div class="tp-ct-head">
              <img :src="item.memberDto.headImgPath" />
            </div>
            <div class="tp-ct-rt">
              <div class="tp-ct-info">
                <div class="tp-ct-nm">
                  <span>{{ item.memberDto.nickName }}</span>
                </div>
                <div class="tp-ct-jb">
                  <span
                    v-if="item.whetherDelete"
                    style="color:#333333;font-size:14px;"
                    @click="onSelect(item.id)"
                    >删除</span
                  >
                  <span
                    v-else
                    @click="
                      selectedItem = item;
                      modal.complaint = true;
                    "
                    >举报</span
                  >
                </div>
              </div>
              <div class="tp-ct-lt">{{ item.content }}</div>
              <div class="tp-ct-time">
                <div>
                  <span>{{ item.commentDate }}</span>
                </div>
                <div class="operate">
                  <div class="message" @click="toCommentDetail(item.id)">
                    <img src="../assets/img/home/information.png" />
                    <span>{{ item.replyCount }}</span>
                  </div>
                  <div class="support">
                    <img
                      src="../assets/img/home/icon-support1-hover@2x.png"
                      @click="unSupport(item)"
                      v-if="item.whetherLikes"
                    />
                    <img
                      src="../assets/img/home/icon-support1@2x.png"
                      @click="support(item)"
                      v-else
                    />
                    <span>{{ item.likesCount }}</span>
                  </div>
                </div>
              </div>
              <div
                class="child-item"
                @click="toCommentDetail(item.id)"
                v-if="item.commentTopDtos.length"
              >
                <div v-for="inner in item.commentTopDtos" :key="inner.id">
                  {{ inner.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
    <div class="at-bottom">
      <!-- <input type="text" placeholder="写评论" /> -->
      <span class="comment" @click="commentShow = true">写评价</span>
      <div class="operate">
        <div class="icon-support">
          <img
            src="../assets/img/home/icon-support-hover@2x.png"
            @click="articleunSupport()"
            v-if="topicDetails.whetherLikeArticles"
          />
          <img
            src="../assets/img/home/icon-support@2x.png"
            @click="articleSupport()"
            v-else
          />
        </div>
        <div class="icon-collection">
          <img
            src="../assets/img/home/icon-collection-hover.png"
            @click="articleunCollection()"
            v-if="topicDetails.whetherCollection"
          />
          <img
            src="../assets/img/home/icon-collection.png"
            @click="articleCollection()"
            v-else
          />
        </div>
        <div class="icon-share" @click="showShare1 = true">
          <img src="../assets/img/home/icon-share.png" alt />
        </div>
      </div>
    </div>
    <van-popup v-model="modal.complaint" closeable class="modal-complaint">
      <div class="container">
        <div class="title">举报评论</div>
        <van-cell-group>
          <van-cell
            :value="item.name"
            v-for="(item, index) in articleReportList"
            :key="index"
            :class="{ selected: selectedType === item.val }"
            @click="typeSelect(item.val)"
          />
        </van-cell-group>
        <div class="center">
          <div class="text"><span>#</span>我有话要说:</div>
          <van-field
            v-model="message"
            rows="6"
            autosize
            type="textarea"
            placeholder="请具体说明问题，我们将尽快处理"
            style="background: #f0f0f0;"
          />
        </div>
        <div class="footer">
          <van-button
            type="primary"
            round
            class="btn-yellow"
            @click="reportArticle()"
            >确定</van-button
          >
        </div>
      </div>
    </van-popup>
    <van-share-sheet v-model="showShare" :options="options" title="分享到" />
    <van-share-sheet v-model="showShare1" :options="options1" title="分享到" />
    <van-popup v-model="commentShow" position="bottom">
      <div class="comment-textarea">
        <van-field
          v-model="comment"
          rows="2"
          autosize
          label
          type="textarea"
          placeholder="写评价"
        />
        <span @click="articleComment">发送</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import selfButton from "@/components/button";
import {
  Image,
  List,
  Popup,
  Dialog,
  ShareSheet,
  Cell,
  CellGroup,
  Button,
  Field,
} from "vant";
export default {
  data() {
    return {
      //   topicDetails: {},
      //   commentList: {},
      modal: {
        complaint: false,
      },
      articleReportList: [
        { name: "淫秽色情", val: "Pornographic" },
        { name: "违法信息", val: "IllegalInformation" },
        { name: "营销广告", val: "Advertisement" },
        { name: "暴力血腥", val: "ViolentBloody" },
        { name: "恶心攻击谩骂", val: "MaliciousAttack" },
      ],
      selectedType: "",
      message: "",
      selectedItem: null,
      topicDetails: {},
      commentList: {},
      page: 1,
      size: 5,
      list: [],
      totalElements: 0,
      loading: false,
      finished: false,
      showShare: false,
      showShare1: false,
      options: [
        [
          { name: "微信好友", icon: "wechat" },
          {
            name: "微信朋友圈",
            icon: require("../assets/img/home/friendscircle@2x.png"),
          },
          { name: "QQ", icon: "qq" },
          {
            name: "QQ空间",
            icon: require("../assets/img/home/qqzone@2x.png"),
          },
        ],
        [
          { name: "微博", icon: "weibo" },
          {
            name: "系统分享",
            icon: require("../assets/img/home/love@2x.png"),
          },
          { name: "复制链接", icon: "link" },
        ],
      ],
      options1: [
        [
          { name: "微信好友", icon: "wechat" },
          {
            name: "微信朋友圈",
            icon: require("../assets/img/home/friendscircle@2x.png"),
          },
          { name: "QQ", icon: "qq" },
          {
            name: "QQ空间",
            icon: require("../assets/img/home/qqzone@2x.png"),
          },
        ],
        [{ name: "微博", icon: "weibo" }],
      ],
      comment: "",
      commentShow: false,
      delAddnum: 0,
    };
  },
  created() {
    this.queryTopicById();
  },
  methods: {
    queryTopicById() {
      this.$ajax
        .post("api/front/articles/findArticlesTopicDetails.json", {
          id: this.$route.query.id,
        })
        .then((res) => {
          this.topicDetails = res.data;
        });
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .post("api/front/articles/findCommentPageByCondition.json", {
            page: this.page,
            size: this.size,
            EQ_articlesId: this.$route.query.id,
            EQ_type: "Comment",
            sort: "asc",
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
      this.getData().then((res) => {
        this.totalElements = res.data.totalElements;
        this.list.push(...res.data.content);
        this.loading = false;
        if (this.page >= res.data.totalPages) {
          this.finished = true;
        }
        this.page++;
      });
    },
    commentInit() {
      this.page = 1;
      this.list = [];
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    typeSelect(val) {
      this.selectedType = val;
    },
    reportArticle() {
      if (!this.selectedType) {
        this.$toast("请选择举报类型");
        return false;
      }
      this.modal.complaint = false;
      this.$ajax
        .post("api/front/articles/report.json", {
          type: "Comment",
          commentId: this.selectedItem.id,
          commentReportType: this.selectedType,
          content: this.message,
        })
        .then(() => {
          this.modal.report = false;
          this.$toast("举报成功");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    onSelect(id) {
      Dialog.confirm({
        title: "确定删除此评论？",
        confirmButtonColor: "#f99307",
        theme: "round-button",
      })
        .then(() => {
          this.delComment(id);
        })
        .catch(() => {});
    },
    delComment(id) {
      this.$ajax
        .post("api/front/articles/deleteComment.json", {
          id: id,
        })
        .then(() => {
          this.commentInit();
          this.$toast("删除成功");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    support(item) {
      this.$ajax
        .post("api/front/articles/likeComment.json", {
          id: item.id,
        })
        .then(() => {
          item.whetherLikes = true;
          item.likesCount++;
          this.$toast("点赞成功");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    unSupport(item) {
      this.$ajax
        .post("api/front/articles/unLikeComment.json", {
          id: item.id,
        })
        .then(() => {
          item.whetherLikes = false;
          item.likesCount--;
          this.$toast("取消点赞");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    articleSupport() {
      this.$ajax
        .post("api/front/articles/likeArticles.json", {
          id: this.$route.query.id,
        })
        .then(() => {
          this.topicDetails.whetherLikeArticles = true;
          // likeCount
          this.$toast("点赞成功");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    articleunSupport() {
      this.$ajax
        .post("api/front/articles/unLikeArticles.json", {
          id: this.$route.query.id,
        })
        .then(() => {
          this.topicDetails.whetherLikeArticles = false;
          this.$toast("取消点赞");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    articleCollection() {
      this.$ajax
        .post("api/front/articles/articlesCollection.json", {
          id: this.$route.query.id,
        })
        .then(() => {
          this.topicDetails.whetherCollection = true;
          this.$toast("收藏成功");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    articleunCollection() {
      this.$ajax
        .post("api/front/articles/unArticlesCollection.json", {
          ids: [this.$route.query.id],
        })
        .then(() => {
          this.topicDetails.whetherCollection = false;
          this.$toast("取消收藏");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    articleComment() {
      this.$ajax
        .post("api/front/articles/articlesCommentOrReplay.json", {
          articlesId: this.$route.query.id,
          content: this.comment,
          type: "Comment",
        })
        .then(() => {
          this.commentShow = false;
          this.commentInit();
          this.$toast("评论成功");
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    },
    toCommentDetail(id) {
      this.$router.push({
        path: "/articlecommentdetails/",
        query: { articleId: this.$route.query.id, id: id },
      });
    },
    vote(type) {
      this.$ajax
        .post("api/front/articles/vote.json", {
          articlesId: this.$route.query.id,
          differentiationType: type
        })
        .then((res) => {
          this.$toast("投票成功");
          this.topicDetails.orthodoxProportion=res.data.orthodoxProportion
          this.topicDetails.opposingProportion=res.data.opposingProportion
          this.topicDetails.orthodoxVoteCount=res.data.orthodoxVoteCount
          this.topicDetails.opposingVoteCount=res.data.opposingVoteCount
        })
        .catch((error) => {
          this.$toast(error.message);
        });
    }
  },
  components: {
    "van-image": Image,
    "self-button": selfButton,
    "van-list": List,
    "van-share-sheet": ShareSheet,
    "van-popup": Popup,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button,
    "van-field": Field,
  },
};
</script>

<style lang="scss" scoped>
#detial {
  padding-bottom: 50px;
}
.btn-yellow.van-button--primary {
  display: block;
  margin: 20px auto 0;
  width: 95px;
  height: 39px;
  background: #ffdd00;
  color: #333334;
  border-color: #ffdd00;
}
.tp-head {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  margin: 14px 0;
  color: #333333;
  font-size: 17px;
}
.tp-top-box {
  .tp-top-content {
    padding: 0 16px 0 19px;
    .content-v {
      .view-count {
        display: inline-block;
        margin-top: 38px;
        width: 98px;
        height: 29px;
        opacity: 0.9;
        background: #ea6b48;
        border-radius: 0px 5px 0px 0px;
        font-size: 13px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        text-align: center;
        color: #ffffff;
        line-height: 29px;
      }
    }
    .tp-top-ed {
      margin-top: 20px;
      font-size: 12px;
      color: #999999;
      text-align: right;
    }
    .tp-top-plorm {
      margin-top: 22px;
      img {
        vertical-align: middle;
      }
    }
    .tp-debate {
      display: flex;
      justify-content: space-between;
      .tp-de-desc {
        width: 50%;
        font-size: 13px;
        color: #333333;
        padding: 21px 31px 20px 8px;
        box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        margin-right: 15px;
        img {
          margin-right: 9px;
        }
      }
      .tp-de-desc:last-child {
        margin-right: 0;
      }
    }
    .tp-re {
      font-size: 13px;
      color: #999999;
      margin: 13px 0;
      img {
        vertical-align: middle;
        margin-right: 9px;
      }
    }
  }
}
.tp-ct-box {
  background: #fff;
  margin-top: 17px;
  padding: 0px 15px 0;
  .tp-ct-title {
    font-size: 15px;
    color: #333333;
    font-weight: bold;
  }
  .tp-ct-list {
    margin-top: 30px;
    .tp-ct-item {
      display: flex;
      .tp-ct-head {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        img {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
          border-radius: 50%;
        }
      }
      .tp-ct-rt {
        margin-left: 11px;
        width: 100%;
        .tp-ct-info {
          display: flex;
          justify-content: space-between;
          .tp-ct-nm {
            font-size: 15px;
            font-weight: bold;
            color: #4e627a;
          }
          .tp-ct-jb {
            font-size: 12px;
            color: #999999;
          }
        }
        .tp-ct-lt {
          color: #333333;
          font-size: 15px;
          font-weight: bold;
          margin: 9px 0 15px 0;
        }
        .tp-ct-time {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: #999999;
          .operate {
            display: flex;
            align-items: center;
            .message {
              margin-right: 30px;
              img {
                width: 17px;
                margin-right: 4px;
                vertical-align: -2px;
              }
            }
            .support {
              img {
                width: 15px;
                margin-right: 4px;
                vertical-align: -2px;
              }
            }
          }
        }
      }
    }
    .child-item {
      margin-top: 13px;
      padding: 8px 15px;
      background: #f8f8f8;
      font-size: 14px;
      line-height: 1.5;
    }
  }
}
.at-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px;
  background: #fff;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2);
  .comment {
    width: 195px;
    height: 34px;
    padding-left: 16px;
    background: #f4f4f4;
    border-radius: 17px;
    line-height: 34px;
  }
  .operate {
    display: flex;
    img {
      display: inline-block;
      width: 20px;
      height: 20px;
    }
    .icon-collection {
      margin: 0 30px;
    }
  }
}
.modal-complaint {
  width: 320px;
  border-radius: 5px;
  padding: 17px;
  .title {
    font-size: 16px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: bold;
    color: #333333;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
  }
  .selected {
    .van-cell__value--alone {
      color: #f99307;
    }
  }
  .center {
    margin-top: 14px;
    .text {
      margin-bottom: 12px;
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      text-align: justifyLeft;
      color: #333333;
      span {
        color: #f99307;
      }
    }
  }
}
.comment-textarea {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: #fff;

  .van-cell {
    width: 300px;
    background: #f4f4f4;
  }
  > span {
    color: #999;
  }
}
.interval-bar {
  width: 100%;
  height: 10px;
  background: #f8f8f8;
}
.vote-show {
  display: flex;
  align-items: center;
  margin: 27px 0 24px;
  .circle {
    padding-top: 11px;
    width: 58px;
    height: 58px;
    border-radius: 50%;
    text-align: center;
    font-size: 0;
    img {
      width: 16px;
    }
    span {
      display: block;
      margin-top: 7px;
      font-size: 12px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      text-align: justifyLeft;
      color: #ffffff;
    }
  }
  .circle-l {
    background: #3d77f5;
  }
  .circle-r {
    background: #fd585e;
  }
  .vote-proportion {
    flex-grow: 1;
    padding: 0 9px;
    .vote-text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0;
      img {
        width: 50%;
      }
      span {
        font-size: 15px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        text-align: justifyLeft;
        color: #3c78f5;
        &:last-of-type {
          color: #FD585E;
        }
      }
      
    }
    .bar-wrap {
      margin-top: 6px;
      .bar {
        display: inline-block;
        height: 10px;
        background: #3D77F5;
        &:last-of-type {
          background: #F75B5E;
        }
      }
    }
  }
}
</style>
