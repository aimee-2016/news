<template>
  <div id="detial">
    <div class="video-box">
      <div class="tp-head">
        <div @click="$router.go(-1)">
          <van-icon name="arrow-left" />
        </div>
        <div>
          <van-icon name="ellipsis" @click="showShare = true" />
        </div>
      </div>
      <jz-video
      :videoUrl="topicDetails.videoPath"
      :videoImg='topicDetails.videoImagePath'
      :id="topicDetails.id+''"
      />
    </div>
    <div class="tp-top-box">
      <div class="tp-top-content">
        <div class="user-info" v-if="topicDetails.title">
          <div class="left">
            <div class="head-img" @click="$router.push({path:'/myhome/',query:{id:topicDetails.author.id}})">
              <van-image
                round
                fit="cover"
                :src="topicDetails.author.headImgPath"
              />
              <img
                src="../assets/img/home/icon-auth-1@2x.png"
                alt
                v-if="topicDetails.author.memberStatus.name === 'CertifyAdopt'"
                class="auth"
              />
            </div>
            <div>
              <span class="name">{{ topicDetails.author.nickName }}</span>
              <div class="desc">
                <span>{{ topicDetails.author.fansCount }}粉丝</span>
              </div>
            </div>
          </div>
          <div class="right">
            <self-button
              round
              @click="focusUser(topicDetails.author)"
              :disabled="!topicDetails.author.followType ? false : true"
              >{{ focusText(topicDetails.author.followType) }}</self-button
            >
          </div>
        </div>
        <div class="title">
          <span>{{ topicDetails.title }}</span>
        </div>
        <p class="tp-top-ed">
          <span>{{ topicDetails.viewCount }}次播放量</span>
          <span>{{ topicDetails.likeCount }}人点赞</span>
          <span>{{ topicDetails.pubDate }}发布</span>
        </p>
      </div>
    </div>
    <div class="recommend-list">
      <div
        class="content"
        v-for="(item, index) in recommendList"
        :key="index"
        @click="toDetailsPage(item.id)"
      >
        <div class="info">
          <h3>
            {{
              item.title
            }}
          </h3>
          <div>
            <span class="name">{{ topicDetails.author.nickName }}</span>
            <span>{{ topicDetails.viewCount }}次播放量</span>
          </div>
        </div>
        <van-image :src="item.videoImagePath" fit="cover" lazy-load />
      </div>
      <div class="see-more" v-if="showMore">
        <div class="content-box" @click="onLoadRe()">
          <span>查看更多</span><van-icon name="arrow-down" />
        </div>
      </div>
    </div>
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
                  <span v-if="item.memberDto">{{ item.memberDto.nickName }}</span>
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
import video from "@/components/video/index";
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
  Icon,
} from "vant";
export default {
  inject: ["reload"],
  data() {
    return {
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
      recommendList: [],
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
      rePage: 1,
      showMore: true      
    };
  },
  created() {
    this.queryTopicById();
    this.onLoadRe();
  },
  methods: {
    queryTopicById() {
      this.$ajax
        .post("api/front/articles/findArticlesById.json", {
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
    focusUser(item) {
      this.$ajax
        .post("api/front/member/follow.json", {
          id: item.id,
        })
        .then(() => {
          item.followType = {}
          item.followType.name = 'Fans'
          this.$toast("关注成功");
        })
        .catch((error) => {
          this.$toast(error.message);
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
    },
    getDataRe() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .post("api/front/articles/findRecommendArticles.json", {
            page: this.rePage,
            size: 5,
            id: this.$route.query.id,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    onLoadRe() {
      this.getDataRe().then((res) => {
        this.recommendList.push(...res.data.content);
        if (this.rePage > res.data.totalPages) {
          this.showMore = false;
        }
        this.rePage++;
      });
    },
    toDetailsPage(id) {
      this.$router.push({
        path: "/videodetails/",
        query: { id: id },
      });
      this.reload();
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
          // const isLargeNumber = element => element.id === id;
          // const index = this.list.findIndex(isLargeNumber);
          // this.list.splice(index, 1);
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
      // let anchor = document.createElement('a')
      // anchor.setAttribute('id', 'topAnchor')
      // document.body.appendChild(anchor);
      // anchor.click()
      // document.body.removeChild(anchor);
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
          this.comment = ""
        })
        .catch((error) => {
          if(error.status==='208') {
            this.$router.push('/login/')
          } else {
            this.$toast(error.message)
          }
        });
    },
    toCommentDetail(id) {
      this.$router.push({
        path: "/articlecommentdetails/",
        query: { articleId: this.$route.query.id, id: id },
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
    "van-icon": Icon,
    "jz-video": video,
  },
};
</script>

<style lang="scss" scoped>
#detial {
  padding-bottom: 50px;
  background: #f8f8f8;
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

.video-box {
  position: relative;
  video {
    width: 100%;
    height: 230px;
  }
  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 38px;
    height: 38px;
    transform: translate(-14px, -14px);
    z-index: 1;
  }
  .tp-head {
    position: absolute;
    top: 0;
    z-index: 10000;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 14px 15px;
    color: #fff;
    .van-icon-arrow-left {
      font-size: 20px;
    }
    .van-icon-ellipsis {
      font-size: 24px;
    }
  }
}
.tp-top-box {
  background: #fff;
  .tp-top-content {
    padding: 0px 16px 0 19px;
    .title {
      font-size: 18px;
      font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
      font-weight: 800;
      color: #333333;
      line-height: 27px;
    }
    .user-info {
      margin-top: 18px;
      margin-bottom: 19px;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
          margin-top: 4px;
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
        width: 40px;
        height: 40px;
        .van-image--round {
          width: 40px;
          height: 40px;
        }
        img {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 14px;
        }
      }
    }
    .tp-top-ed {
      margin-top: 13px;
      padding-bottom: 20px;
      span {
        &:last-child {
          margin-right: 0;
        }
        margin-right: 15px;
        font-size: 12px;
        color: #999999;
      }
    }
    .tp-top-plorm {
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
.recommend-list {
  margin-top: 10px;
  padding: 20px 15px 1px;
  background: #fff;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .info {
      width: 207px;
      h3 {
        margin-bottom: 16px;
        font-size: 15px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: bold;
        color: #333333;
        line-height: 21px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      span {
        font-size: 12px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #999999;
      }
      .name {
        margin-right: 16px;
      }
    }
    .van-image {
      width: 110px;
      height: 80px;
      border-radius: 5px;
      overflow: hidden;
    }
  }
  .see-more {
    margin-bottom: 24px;
    text-align: center;
    .content-box {
      display: inline-block;
    }
    span {
      margin-right: 6px;
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #333333;
    }
    .van-icon {
      vertical-align: middle;
    }
  }
}
.tp-ct-box {
  background: #fff;
  margin-top: 10px;
  padding: 20px 15px 0;
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
</style>
