<template>
  <div id="detial">
    <div class="tp-head">
      <div @click="$router.push('/home/')">
        <img src="../assets/img/topic/back.png" />
      </div>

      <div>
        <img src="../assets/img/topic/icon1.png" />
      </div>
    </div>
    <div class="tp-top-box">
      <div class="tp-top-content">
        <div class="title">
          <span>{{ topicDetails.title }}</span>
        </div>
        <div class="user-info" v-if="topicDetails.title">
          <div class="left">
            <div class="head-img">
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
                <span>{{ topicDetails.pubDate | changeTime }}</span>
                <span>{{ topicDetails.author.synopsis }}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <self-button
              round
              @click="focusUser(topicDetails.id)"
              :disabled="!topicDetails.author.followType ? false : true"
              >{{ focusText(topicDetails.author.followType) }}</self-button
            >
          </div>
        </div>
        <div v-html="topicDetails.content">
          <!-- {{topicDetails.content}} -->
        </div>
        <p class="tp-top-ed">
          <span>本文经授权发布，柬中资讯不代表立场如若转载请联系原作者</span>
          <span>{{ topicDetails.viewCount }}人阅读</span>
        </p>
      </div>
    </div>
    <div class="recommend-list">
      <div class="content" v-for="(item, index) in recommendList" :key="index">
        <h3>{{ item.title }}</h3>
        <div class="img-wrap">
          <img v-lazy="item.imagePaths[0]" />
        </div>
      </div>
    </div>
    <div class="tp-ct-box">
      <p class="tp-ct-title">热门评论({{ commentList.totalElements || 0 }})</p>
      <div
        class="tp-ct-list"
        v-for="item in commentList.content"
        :key="item.id"
      >
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
                  >删除</span
                >
                <span v-else>举报</span>
              </div>
            </div>
            <div class="tp-ct-lt">{{ item.content }}</div>
            <div class="tp-ct-time">
              <div>
                <span>{{ item.commentDate }} 05:12</span>
              </div>
              <div>
                <img src="../assets/img/topic/icon5.png" />
                <img src="../assets/img/topic/icon6.png" />
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
import selfButton from '@/components/button'
import { Icon, Image } from 'vant'
export default {
  data() {
    return {
      topicDetails: {},
      commentList: {},
      recommendList: [],
    }
  },
  created() {
    this.queryTopicById()
    this.queryComment()
    this.getRecommendList()
  },
  methods: {
    queryTopicById() {
      this.$ajax
        .post('api/front/articles/findArticlesById.json', {
          id: this.$route.query.id,
        })
        .then((res) => {
          this.topicDetails = res.data
        })
    },
    queryComment() {
      this.$ajax
        .post('/api/front/articles/findCommentPageByCondition.json', {
          page: '1',
          size: '5',
          EQ_articlesId: this.$route.query.id,
          EQ_type: 'Comment',
          sort: 'commentDate'
        })
        .then((res) => {
          this.commentList = res.data
        })
    },
    focusUser(id) {
      this.$ajax
        .post('api/front/member/follow.json', {
          id: id,
        })
        .then(() => {
          this.$toast('关注成功')
          this.getAll()
        })
        .catch((error) => {
          this.$toast(error)
        })
    },
    focusText(item) {
      if (item) {
        return item.name === 'Fans'
          ? '已关注'
          : item.name === 'Block'
          ? '已拉黑'
          : '关注'
      } else {
        return '关注'
      }
    },
    getRecommendList() {
      this.$ajax
        .post('api/front/articles/findRecommendArticles.json', {
          page: 1,
          size: 5,
          id: this.$route.query.id,
        })
        .then((res) => {
          this.recommendList = res.data.content
          console.log(this.recommendList)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  components: {
    'van-icon': Icon,
    'van-image': Image,
    'self-button': selfButton,
  },
}
</script>

<style lang="scss" scoped>
#detial {
  background: #f8f8f8;
}
.tp-head {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 14px 15px;
  // margin: 14px 0;
  color: #333333;
  font-size: 17px;
}
.tp-top-box {
  background: #fff;
  .tp-top-content {
    padding: 60px 16px 0 19px;
    .title {
      font-size: 20px;
      font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
      font-weight: bold;
      color: #333333;
    }
    .user-info {
      margin-top: 20px;
      margin-bottom: 20px;
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
      margin-top: 20px;
      padding-bottom: 20px;
      span {
        display: block;
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
    h3 {
      margin-right: 20px;
      font-size: 15px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: bold;
      text-align: justifyLeft;
      color: #333333;
      line-height: 21px;
      letter-spacing: 0px;
    }
    .img-wrap {
      display: flex;
      img {
        width: 110px;
        height: 80px;
        border-radius: 5px;
      }
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
