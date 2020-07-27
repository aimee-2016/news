<template>
  <div>
    <div class="tp-head">
      <div @click="$router.push('/topic/')">
        <img src="../assets/img/topic/back.png" />
      </div>
      <div>
        <span>{{topicDetails.title}}</span>
      </div>
      <div>
        <img src="../assets/img/topic/icon1.png" />
      </div>
    </div>
    <div class="tp-top-box">
        <div class="tp-top-content">
            <!-- <img :src="topicDetails.imagePathsStr" /> -->
            <div v-html="topicDetails.content">
                {{topicDetails.content}}
            </div>
            <p class="tp-top-ed">本文编辑：{{topicDetails.currentEditionStr || '--'}}</p>
            <div class="tp-top-plorm">
                <img src="../assets/img/topic/icon2.png">
                {{topicDetails.problem || '--'}}
            </div>
            <div class="tp-re">
                <img src="../assets/img/topic/hot.png">
                <span>已有{{topicDetails.voteCount || 0}}人参与投票</span>
            </div>
            <div class="tp-debate">
                <div class="tp-de-desc">
                    <img src="../assets/img/topic/icon4.png">
                    <span>{{topicDetails.orthodoxView || '--'}}</span>
                </div>
                <div class="tp-de-desc">
                    <img src="../assets/img/topic/icon3.png">
                    <span>{{topicDetails.opposingView || '--'}}</span>
                </div>
            </div>
            <div>
                <div class="tp-">

                </div>
            </div>
        </div>
    </div>
    <div class="tp-ct-box">
        <p class="tp-ct-title">热门评论({{commentList.totalElements || 0}})</p>
        <div class="tp-ct-list" v-for="item in commentList.content" :key="item.id">
            <div class="tp-ct-item">
                <div class="tp-ct-head">
                    <img :src="item.memberDto.headImgPath">
                </div>
                <div class="tp-ct-rt">
                    <div class="tp-ct-info">
                        <div class="tp-ct-nm">
                            <span>{{item.memberDto.nickName}}</span>
                        </div>
                        <div class="tp-ct-jb">
                            <span v-if="item.whetherDelete" style="color:#333333;font-size:14px;">删除</span>
                            <span v-else>举报</span>
                        </div>
                    </div>
                    <div class="tp-ct-lt">{{item.content}}</div>
                    <div class="tp-ct-time">
                        <div>
                            <span>{{item.commentDate}} 05:12</span>
                        </div>
                        <div>
                            <img src="../assets/img/topic/icon5.png">
                            <img src="../assets/img/topic/icon6.png">
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        topicDetails: {},
        commentList: {}
    };
  },
  created() {
      this.queryTopicById();
      this.queryComment();
  },
  methods: {
    queryTopicById() {
      this.$ajax
        .post("api/front/articles/findArticlesTopicDetails.json", {
          id: this.$route.query.id
        })
        .then(res => {
          this.topicDetails = res.data;
        })
    },
    queryComment() {
        this.$ajax.post('/api/front/articles/findCommentPageByCondition.json', {
            page: '1',
            size: '5',
            EQ_articlesId: this.$route.query.id,
            EQ_type: 'Comment'
        }).then(res => {
            this.commentList = res.data;
        })
    }
  }
};
</script>

<style lang="scss" scoped>
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
        .tp-top-ed {
            margin-top: 20px;
            font-size: 12px;
            color: #999999;
            text-align: right;
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
                box-shadow: 1px 1px 4px 0px rgba(0,0,0,0.1); 
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
    margin-top: 51px;
    padding: 0 15px;
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
                        color: #4E627A;
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
                    font-size: 11px;
                    color: #999999;
                    img:first-child {
                        margin-right: 31px;
                    }
                }
            }
        }
    }
}
</style>