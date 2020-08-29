<template>
  <div id="comment-d">
    <div id="head">
      <van-icon name="cross" @click="$router.go(-1)" />
    </div>
    <div class="tp-ct-box" id="author-top" v-if="authorData.memberDto">
      <div class="tp-ct-list">
        <div class="tp-ct-item">
          <div class="tp-ct-head">
            <img :src="authorData.memberDto.headImgPath" />
          </div>
          <div class="tp-ct-rt">
            <div class="tp-ct-info">
              <div class="tp-ct-nm">
                <span>{{ authorData.memberDto.nickName }}</span>
              </div>
              <div class="right">
                <van-button
                  round
                  size="small"
                  color="#4e82e7"
                  @click="focusUser(authorData.memberDto)"
                  plain
                  type="primary"
                  :disabled="!authorData.memberDto.followType ? false : true"
                >{{ '+ '+focusText(authorData.memberDto.followType) }}</van-button>
              </div>
            </div>
            <div
              class="tp-ct-lt"
              @click="selectedItem = authorData;commentShow = true"
            >{{ authorData.content }}</div>
            <div class="time">
              <span>{{ authorData.commentDate }}</span>
            </div>
            <div class="tp-ct-time">
              <div class="operate">
                <span
                  class="jubao"
                  @click="
                        selectedItem = authorData
                        modal.complaint = true
                      "
                >举报</span>
                <div class="message" @click="selectedItem = authorData;commemtType = 1;commentShow = true;">
                  <img src="../assets/img/home/information.png" />
                  <span>{{ authorData.replyCount }}</span>
                </div>
                <div class="support">
                  <img
                    src="../assets/img/home/icon-support1-hover@2x.png"
                    @click="unSupport(authorData)"
                    v-if="authorData.whetherLikes"
                  />
                  <img
                    src="../assets/img/home/icon-support1@2x.png"
                    @click="support(authorData)"
                    v-else
                  />
                  <span>{{ authorData.likesCount }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="tp-ct-box">
          <p class="tp-ct-title" id="topAnchor">热门评论({{ totalElements || 0 }})</p>
          <div class="tp-ct-list" v-for="item in list" :key="item.id">
            <div class="tp-ct-item" v-if="item.memberDto">
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
                    >删除</span>
                    <span
                      v-else
                      @click="
                        selectedItem = item
                        modal.complaint = true
                      "
                    >举报</span>
                  </div>
                </div>
                <div class="tp-ct-wr">
                  <div
                    class="tp-ct-lt"
                    @click="selectedItem = item;commemtType = 2;commentShow = true"
                  >
                  <span v-if="item.replyCommentMemberDto" class="ait">@{{item.replyCommentMemberDto.nickName}}:</span>
                  <span>{{ item.content }}</span>
                  </div>
                  <div class="operate">
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
                <div class="tp-ct-time">
                  <div>
                    <span>{{ item.commentDate }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="at-bottom">
      <span class="comment" @click="selectedItem = authorData;commemtType = 1;commentShow = true;">写评价</span>
      <div class="operate">
        <div class="icon-support">
          <img
            src="../assets/img/home/icon-support-hover@2x.png"
            @click="unSupport(authorData)"
            v-if="authorData.whetherLikes"
          />
          <img
            src="../assets/img/home/icon-support@2x.png"
            @click="support(authorData)"
            v-else
          />
        </div>
      </div>
    </div>
    <van-popup v-model="commentShow" position="bottom">
      <div class="comment-textarea">
        <van-field v-model="comment" rows="2" autosize label type="textarea" placeholder="写评价" />
        <span @click="articleCommentBefore">发送</span>
      </div>
    </van-popup>
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
          <div class="text">
            <span>#</span>我有话要说:
          </div>
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
          <van-button type="primary" round class="btn-yellow" @click="reportArticle()">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
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
  Icon
} from "vant";
export default {
  data() {
    return {
      page: 1,
      size: 5,
      list: [],
      totalElements: 0,
      loading: false,
      finished: false,
      comment: "",
      commentShow: false,
      selectedItem: null,
      authorData: null,
      modal: {
        complaint: false
      },
      articleReportList: [
        { name: "淫秽色情", val: "Pornographic" },
        { name: "违法信息", val: "IllegalInformation" },
        { name: "营销广告", val: "Advertisement" },
        { name: "暴力血腥", val: "ViolentBloody" },
        { name: "恶心攻击谩骂", val: "MaliciousAttack" }
      ],
      message: "",
      selectedType: "",
      commemtType: 1
    };
  },
  created() {
    this.getAuthorComment();
  },
  mounted() {},
  methods: {
    getAuthorComment() {
      this.$ajax
        .post("api/front/articles/findCommentSingleById.json", {
          id: this.$route.query.id
        })
        .then(response => {
          this.authorData = response.data;
        });
    },
    getData() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .post("api/front/articles/findCommentById.json", {
            EQ_parentId: this.$route.query.id,
            page: this.page,
            size: this.size
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
      this.getData().then(res => {
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
    articleCommentBefore() {
      if (this.commemtType === 1) {
        this.relayComent();
      } else {
        this.relay2Coment();
      }
    },
    relayComent() {
      this.$ajax
        .post("api/front/articles/articlesCommentOrReplay.json", {
          commentId: this.selectedItem.id,
          articlesId: this.$route.query.articleId,
          content: this.comment,
          type: "Reply"
        })
        .then(() => {
          this.commentShow = false;
          this.commentInit();
          this.$toast("评论成功");
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    relay2Coment() {
      this.$ajax
        .post("api/front/articles/articlesCommentOrReplay.json", {
          commentId: this.selectedItem.id,
          articlesId: this.$route.query.articleId,
          content: this.comment,
          type: "ReplyReply"
        })
        .then(() => {
          this.commentShow = false;
          this.commentInit();
          this.$toast("评论成功");
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    focusUser(item) {
      this.$ajax
        .post("api/front/member/follow.json", {
          id: item.id
        })
        .then(() => {
          item.followType = 'Fans'
          this.$toast("关注成功");
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
    },
    support(item) {
      this.$ajax
        .post("api/front/articles/likeComment.json", {
          id: item.id
        })
        .then(() => {
          item.whetherLikes = true;
          item.likesCount++;
          this.$toast("点赞成功");
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    unSupport(item) {
      this.$ajax
        .post("api/front/articles/unLikeComment.json", {
          id: item.id
        })
        .then(() => {
          item.whetherLikes = false;
          item.likesCount--;
          this.$toast("取消点赞");
        })
        .catch(error => {
          this.$toast(error.message);
        });
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
          content: this.message
        })
        .then(() => {
          this.modal.report = false;
          this.$toast("举报成功");
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    onSelect(id) {
      Dialog.confirm({
        title: "确定删除此评论？",
        confirmButtonColor: "#f99307",
        theme: "round-button"
      })
        .then(() => {
          this.delComment(id);
        })
        .catch(() => {});
    },
    delComment(id) {
      this.$ajax
        .post("api/front/articles/deleteComment.json", {
          id: id
        })
        .then(() => {
          this.commentInit()
          this.$toast("删除成功");
          // const isLargeNumber = element => element.id === id;
          // const index = this.list.findIndex(isLargeNumber);
          // this.list.splice(index, 1);
        })
        .catch(error => {
          this.$toast(error.message);
        });
    }
  },
  computed: {},
  watch: {},
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
    "van-icon": Icon
  }
};
</script>

<style lang="scss" scoped>
#comment-d {
  padding: 48px 0;
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
  .van-icon {
    position: absolute;
    left: 15px;
    top: 18px;
    font-size: 17px;
  }
}
#author-top {
  margin-top: 0;
  .tp-ct-list {
    margin-top: 0;
  }
  .time {
    font-size: 11px;
    color: #999999;
  }
  .tp-ct-info {
    display: flex;
    align-items: center;
  }
  .operate {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .jubao {
      margin-right: 26px;
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
    width: 300px;
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
        .tp-ct-wr {
          display: flex;
          justify-content: space-between;
        }
        .tp-ct-lt {
          color: #333333;
          font-size: 15px;
          font-weight: bold;
          margin: 9px 0 15px 0;
          .ait {
            color: #4273ad;
          }
        }
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
            font-size: 11px;
            color: #999999;
          }
        }
        .tp-ct-time {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: #999999;
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
</style>
