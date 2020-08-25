<template>
  <div class="home">
    <div class="search">
      <van-icon name="arrow-left" @click="$router.push('/home')" />
      <van-search
        v-model="serchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>
    <div class="serch-container" v-if="navShow">
      <div class="history" v-if="historyRecordL.length">
        <p>
          <span>搜索历史</span>
          <van-icon name="delete" @click="delAll" />
        </p>
        <ul>
          <li v-for="(item, index) in historyRecordL" :key="index">
            <span
              @click="
                serchValue = item
                onSearch(item)
              "
              >{{ item }}</span
            >
            <van-icon name="cross" @click="delId(index)" />
          </li>
        </ul>
      </div>
      <div class="hot">
        <p>
          <span>热门搜索</span>
        </p>
        <ul>
          <li
            v-for="(item, index) in historyList"
            :key="index"
            @click="
              serchValue = item
              onSearch(item)
            "
          >
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="box" v-else>
      <div class="nav">
        <ul>
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="{ selected: navId === item.id }"
            @click="checkNav(item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="article">
        <!-- <div class="no-login" v-if="firstId===navId">
          <img src="../assets/img/home/logo@2x.png" alt="add" />
          <p v-if="!userInfo">您还没有登录，请前往登录</p>
          <p v-if="userInfo&&articleList.length===0">你还没有关注任何人，请前往关注</p>
        </div>-->
        <!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <transition name="fade">
            <p class="refresh-m" v-if="refreshMessage">柬中资讯成功为您推荐{{resultSize}}条内容</p>
          </transition>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            
          </van-list>
        </van-pull-refresh>-->
        <div class="wrap-b" v-if="navId === 1">
          <div class="div1" v-if="videoList.length">
            <div class="article-head">
              <h3>视频</h3>
              <span>
                查看更多
                <van-icon name="arrow" @click="$router.push('/video')" />
              </span>
            </div>
            <div
              v-for="(item, index) in videoList"
              :key="index"
              class="article-item"
            >
              <div class="content">
                <div class="img-wrap">
                  <img v-lazy="item.videoImagePath" alt />
                  <van-icon name="play-circle" />
                </div>
                <h3>{{ item.title }}</h3>
              </div>
              <div class="operat">
                <div class="left">
                  <van-image round fit="cover" :src="item.author.headImgPath" />
                  <span class="name">{{ item.author.nickName }}</span>
                  <img
                    src="../assets/img/home/icon-auth@2x.png"
                    alt
                    v-if="item.author.memberStatus.name === 'CertifyAdopt'"
                    class="auth"
                  />
                  <span>{{ item.commentCount }}评论</span>
                  <span>{{ item.pubDate | changeTime }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="div2" v-if="informationList.length">
            <div class="article-head">
              <h3>资讯</h3>
              <span>
                查看更多
                <van-icon name="arrow" @click="$router.push('/home')" />
              </span>
            </div>
            <div
              v-for="(item, index) in informationList"
              :key="index"
              class="article-item"
            >
              <div class="content">
                <div class="img-wrap">
                  <img
                    v-for="(inner, index) in item.imagePaths"
                    :key="index"
                    v-lazy="inner"
                  />
                </div>
                <h3>{{ item.title }}</h3>
              </div>
              <div class="operat">
                <div class="left">
                  <van-image round fit="cover" :src="item.author.headImgPath" />
                  <span class="name">{{ item.author.nickName }}</span>
                  <img
                    src="../assets/img/home/icon-auth@2x.png"
                    alt
                    v-if="item.author.memberStatus.name === 'CertifyAdopt'"
                    class="auth"
                  />
                  <span>{{ item.commentCount }}评论</span>
                  <span>{{ item.pubDate | changeTime }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="div3" v-if="memberList.length">
            <div class="article-head">
              <h3>用户</h3>
              <span>
                查看更多
                <van-icon name="arrow" />
              </span>
            </div>
            <div
              v-for="(item, index) in memberList"
              :key="index"
              class="member-item"
            >
              <div class="content">
                <div class="left">
                  <div class="head-img">
                    <van-image round fit="cover" :src="item.headImgPath" />
                    <img
                      src="../assets/img/home/icon-auth-1@2x.png"
                      alt
                      v-if="item.memberStatus.name === 'CertifyAdopt'"
                      class="auth"
                    />
                  </div>
                  <div>
                    <span class="name">{{ item.nickName }}</span>
                    <div class="desc">
                      <span>{{ item.memberFansCountCount }}个粉丝</span>
                      <span>{{ item.synopsis }}</span>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <!-- Fans 就是关注
                  Block 是拉黑
                  null 就是没有关注也没有拉黑-->
                  <self-button
                    round
                    @click="focusUser(item.id)"
                    :disabled="!item.followType ? false : true"
                    >{{ focusText(item.followType) }}</self-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="div4" v-if="topicList.length">
            <div class="article-head">
              <h3>话题</h3>
              <span>
                查看更多
                <van-icon name="arrow" @click="$router.push('/topic')" />
              </span>
            </div>
            <div
              v-for="(item, index) in topicList"
              :key="index"
              class="article-item"
            >
              <div class="content">
                <div class="img-wrap">
                  <img v-lazy="item.imagePathsStr" />
                </div>
                <h3>{{ item.title }}</h3>
              </div>
              <div class="operat">
                <div class="left">
                  <span>{{ item.viewCount }}围观</span>
                  <span>{{ item.commentCount }}人评论</span>
                  <span>{{ item.pubDate | changeTime }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-b" v-if="navId === 2">
          <div
            v-for="(item, index) in videoList"
            :key="index"
            class="article-item"
          >
            <div class="content">
              <div class="img-wrap">
                <img v-lazy="item.videoImagePath" alt />
                <van-icon name="play-circle" />
              </div>
              <h3>{{ item.title }}</h3>
            </div>
            <div class="operat">
              <div class="left">
                <van-image round fit="cover" :src="item.author.headImgPath" />
                <span class="name">{{ item.author.nickName }}</span>
                <img
                  src="../assets/img/home/icon-auth@2x.png"
                  alt
                  v-if="item.author.memberStatus.name === 'CertifyAdopt'"
                  class="auth"
                />
                <span>{{ item.commentCount }}评论</span>
                <span>{{ item.pubDate | changeTime }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-b" v-if="navId === 3">
          <div
            v-for="(item, index) in informationList"
            :key="index"
            class="article-item"
          >
            <div class="content">
              <div class="img-wrap">
                <img
                  v-for="(inner, index) in item.imagePaths"
                  :key="index"
                  v-lazy="inner"
                />
              </div>
              <h3>{{ item.title }}</h3>
            </div>
            <div class="operat">
              <div class="left">
                <van-image round fit="cover" :src="item.author.headImgPath" />
                <span class="name">{{ item.author.nickName }}</span>
                <img
                  src="../assets/img/home/icon-auth@2x.png"
                  alt
                  v-if="item.author.memberStatus.name === 'CertifyAdopt'"
                  class="auth"
                />
                <span>{{ item.commentCount }}评论</span>
                <span>{{ item.pubDate | changeTime }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-b" v-if="navId === 4">
          <div
            v-for="(item, index) in memberList"
            :key="index"
            class="member-item"
          >
            <div class="content">
              <div class="left">
                <div class="head-img">
                  <van-image round fit="cover" :src="item.headImgPath" />
                  <img
                    src="../assets/img/home/icon-auth-1@2x.png"
                    alt
                    v-if="item.memberStatus.name === 'CertifyAdopt'"
                    class="auth"
                  />
                </div>
                <div>
                  <span class="name">{{ item.nickName }}</span>
                  <div class="desc">
                    <span>{{ item.memberFansCountCount }}个粉丝</span>
                    <span>{{ item.synopsis }}</span>
                  </div>
                </div>
              </div>
              <div class="right">
                <!-- Fans 就是关注
                  Block 是拉黑
                null 就是没有关注也没有拉黑-->
                <self-button
                  round
                  @click="focusUser(item.id)"
                  :disabled="!item.followType ? false : true"
                  >{{ focusText(item.followType) }}</self-button
                >
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-b" v-if="navId === 5">
          <div
            v-for="(item, index) in topicList"
            :key="index"
            class="article-item"
          >
            <div class="content">
              <div class="img-wrap">
                <img v-lazy="item.imagePathsStr" />
              </div>
              <h3>{{ item.title }}</h3>
            </div>
            <div class="operat">
              <div class="left">
                <span>{{ item.viewCount }}围观</span>
                <span>{{ item.commentCount }}人评论</span>
                <span>{{ item.pubDate | changeTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import selfButton from '@/components/button'
import { Icon, Search, Image } from 'vant'
export default {
  name: 'Home',
  data() {
    return {
      navShow: true,
      navList: [
        { name: '综合', id: 1 },
        { name: '视频', id: 2 },
        { name: '资讯', id: 3 },
        { name: '用户', id: 4 },
        { name: '话题', id: 5 },
      ],
      navId: 1,
      firstId: 0,
      serchValue: '',
      columnShow: false,
      isEdit: true,
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      resultSize: 10,
      articleList: [],
      refreshing: false,
      refreshMessage: false,
      selectedItem: null,
      historyList: [],
      allList: [],
      historyRecordL: [],
      informationList: [],
      memberList: [],
      topicList: [],
      videoList: [],
    }
  },
  components: {
    'van-search': Search,
    'van-icon': Icon,
    'van-image': Image,
    'self-button': selfButton,
  },
  created() {
    this.historyRecordL = JSON.parse(localStorage.getItem('historyR'))
      ? JSON.parse(localStorage.getItem('historyR'))
      : []
    this.getHistoryList()
  },
  methods: {
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
    getHistoryList() {
      this.$ajax
        .post('api/front/articles/findHotSearch.json', {})
        .then((res) => {
          this.historyList = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getAll() {
      this.$ajax
        .post('api/front/articles/findComprehensive.json', {
          queryValue: this.serchValue,
        })
        .then((res) => {
          this.informationList = res.data.informationList
          this.memberList = res.data.memberList
          this.topicList = res.data.topicList
          this.videoList = res.data.videoList
        })
        .catch((error) => {
          console.log(error)
        })
    },
    checkNav(id) {
      this.navId = id
    },
    onSearch(val) {
      if (val) {
        this.navShow = false
        let historyRecord = JSON.parse(localStorage.getItem('historyR'))
          ? JSON.parse(localStorage.getItem('historyR'))
          : []
        historyRecord.push(val)
        let historyRecordL = historyRecord.filter(function(
          element,
          index,
          self,
        ) {
          return self.indexOf(element) == index
        })
        this.historyRecordL = historyRecordL
        localStorage.setItem('historyR', JSON.stringify(historyRecordL))
        this.getAll()
      }
    },
    delId(index) {
      this.historyRecordL.splice(index, 1)
      localStorage.setItem('historyR', JSON.stringify(this.historyRecordL))
    },
    delAll() {
      this.historyRecordL = []
      localStorage.setItem('historyR', JSON.stringify(this.historyRecordL))
    },
    onCancel() {
      // this.$router.push('/home')
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
  },
  watch: {
    serchValue: function(val) {
      if (!val) {
        this.navShow = true
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.fade-leave-active {
  transition: height 0.5s ease;
}
.fade-leave,
.fade-enter-to {
  opacity: 1;
  height: 30px;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0;
  opacity: 0;
}
.home {
  position: relative;
  // text-align: center;
  // height: 100%;
}
// .top-f {
//   width: 100%;
//   position: fixed;
//   top: 0;
//   z-index: 2;
//   background:#fff;
// }
.search {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 10px 25px 20px 0;
  .van-search {
    flex: 1;
    padding: 0;
  }
  .van-icon {
    margin: 0 15px;
    font-size: 15px;
  }
}
.serch-container {
  width: 100%;
  position: fixed;
  top: 60px;
  z-index: 2;
  background: #fff;
  padding: 20px;
  > div {
    margin-bottom: 24px;
  }
  p {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    color: #666666;
    span {
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    li {
      margin-right: 10px;
      margin-bottom: 4px;
      padding: 6px;
      background: #f8f8f8;
      border-radius: 13px;
      font-size: 12px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      text-align: center;
      color: #333333;
      span {
        margin-right: 6px;
      }
      .van-icon {
        vertical-align: middle;
      }
    }
  }
}
.nav {
  width: 100%;
  position: fixed;
  top: 60px;
  z-index: 2;
  background: #fff;
  padding: 0 16px;
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    // padding-right: 20px;
    padding-bottom: 13px;
    li {
      // margin-right: 20px;
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #999999;
      &.selected {
        position: relative;
        font-size: 17px;
        font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
        font-weight: 800;
        color: #333333;
        &::after {
          content: '';
          display: block;
          position: absolute;
          left: 50%;
          bottom: -6px;
          transform: translateX(-7.5px);
          width: 15px;
          height: 3px;
          background: #fdd004;
        }
      }
    }
  }
}
.article {
  // min-height: 100%;
  padding-top: 100px;
  padding-bottom: 58px;
  text-align: left;
  .refresh-m {
    // margin-bottom: 6px;
    background: #faf2cd;
    font-size: 13px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #fb9600;
    line-height: 30px;
    text-align: center;
  }
  .article-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
    padding: 0 16px;
    h3 {
      font-size: 15px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      color: #333333;
      line-height: 15px;
    }
    span {
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #999999;
    }
  }
  .article-item {
    margin-bottom: 17px;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 16px;
    .content {
      display: flex;
      h3 {
        margin-bottom: 10px;
        font-size: 16px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        color: #333333;
        line-height: 22px;
        letter-spacing: -1px;
      }
      .img-wrap {
        display: flex;
        position: relative;
        img {
          width: 110px;
          height: 80px;
          margin-right: 10px;
        }
        .van-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          color: rgba($color: #070707, $alpha: 0.4);
          font-size: 22px;
          transform: translate(-11px, -11px);
        }
      }
    }
  }
  .member-item {
    margin-bottom: 17px;
    padding: 0 15px;
    .content {
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
  }

  .operat {
    display: flex;
    justify-content: space-between;
    margin: 12px 0;
    font-size: 10px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #999999;
    line-height: 20px;
    letter-spacing: 0px;
    .left {
      display: flex;
      align-items: center;
      span {
        margin-right: 15px;
      }
      .van-image--round {
        margin-right: 5px;
        width: 26px;
        height: 26px;
        vertical-align: middle;
      }
      .name {
        margin-right: 5px;
        font-size: 14px;
        font-family: PingFang SC Bold, PingFang SC Bold-Bold;
        font-weight: 700;
        color: #333333;
      }
      .auth {
        margin-right: 15px;
        width: 12px;
        height: 12px;
      }
    }
  }
  .no-login {
    padding-top: 136px;
    text-align: center;
    height: 100%;
    img {
      width: 63px;
    }
    p {
      margin-top: 18px;
      font-size: 13px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #666666;
    }
  }
}
</style>
