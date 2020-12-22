<template>
  <div>
    <van-tabs
      v-model="active"
      line-width="33px"
      line-heigth="2px"
      title-active-color=" #333333"
      color="#ffcb00"
    >
      <van-tab title="系统消息" :badge="systemMessageCount">
        <van-pull-refresh
          v-model="refreshing"
          success-text="刷新成功"
          @refresh="onRefresh"
        >
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="list.length?'没有更多了':''"
            @load="onLoad"
          >
            <no-content v-if="!list.length&&!loading"></no-content>
            <div class="msg-container van-hairline--top" v-else>
              <div
                v-for="(item, index) in list"
                :key="index"
                class="msg-item"
                @click="toDetail(item,'1')"
              >
                <div class="content">
                  <div class="left">
                    <div class="head-img">
                      <van-image round fit="cover" :src="item.systemImage" />
                    </div>
                    <div>
                      <div class="row-1">
                        <span class="name">{{ item.title }}</span>
                        <span class="time">{{
                          item.pubDate | changeTime
                        }}</span>
                      </div>
                      <div class="desc">
                        {{
                          item.content
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="回复我的" :badge="replyCount">
        <van-pull-refresh
          v-model="refreshing1"
          success-text="刷新成功"
          @refresh="onRefresh1"
        >
          <van-list
            v-model="loading1"
            :finished="finished1"
            :finished-text="list.length?'没有更多了':''"
            @load="onLoad1"
          >
            <no-content v-if="!list1.length&&!loading1"></no-content>
            <div class="msg-container van-hairline--top" v-else>
              <div v-for="(item, index) in list1" :key="index" class="msg-item" @click="toCommentDetail(item.commentId,item.parentCommentId,item.id)">
                <div class="content">
                  <div class="left">
                    <div class="head-img">
                        <i class="dot" v-if="item.readType.name === 'Unread'"></i>
                        <van-image round fit="cover" :src="item.headImgPath" />
                    </div>
                    <div>
                      <div class="row-1">
                        <span class="name">{{ item.nickName }}</span>
                        <span class="time">{{
                          item.pubDate | changeTime
                        }}</span>
                      </div>
                      <div class="desc">
                        {{
                          item.content
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="私信" :badge="privateLetterCount">
        <no-content v-if="!list2.length"></no-content>
        <div class="msg-container van-hairline--top">
          <div v-for="(item, index) in list2" :key="index" class="msg-item" @click="toChat(item)">
            <div class="content">
              <div class="left">
                <div class="head-img">
                  <van-image round fit="cover" :src="item.headImgPath" />
                </div>
                <div>
                  <div class="row-1">
                    <span class="name">{{ item.nickName }}</span>
                    <span class="time">{{ item.pubDate | changeTime }}</span>
                  </div>
                  <div class="desc">
                    {{
                      item.content
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Tabs,
  Tab,
  List,
  PullRefresh,
  Image,
  Icon
} from "vant"; 
export default {
  name: 'svb',
  data() {
    return {
      active: 0,
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
      list2: [],
      systemMessageCount: "",
      replyCount: "",
      privateLetterCount: ""
    }
  },
  created() {
    this.onLoad2()
    this.unreadData()
  },
  mounted() {
    // if(this.$route.query.tab&&this.$route.query.tab===1) {
    //   this.active = 1
    // } else if(this.$route.query.tab&&this.$route.query.tab===2) {
    //   this.active = 2
    // }
  },
  methods: {
    unreadData() {
      this.$ajax
        .post('api/front/message/findMessageUnRead.json', {})
        .then((res) => {
          this.systemMessageCount = res.data.systemMessageCount || ''
          this.replyCount = res.data.replyCount || ''
          this.privateLetterCount = res.data.privateLetterCount || ''
        })
    },
    getData() {
      return new Promise((resolve, reject) => {
          this.$ajax
            .post("api/front/message/findSystemMessagePageByCondition.json", {
              page: this.page,
              size: this.size,
              sort: 'pubDate',
              IN_pushTargetType: "ALL"
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
    getData1() {
      return new Promise((resolve, reject) => {
          this.$ajax
            .post("api/front/message/findCommentByMemberId.json", {
              page: this.page1,
              size: this.size1
            }).then(response=>{
              resolve(response)
            }).catch(error=>{
              reject(error)
            })
        })
    },
    onLoad1() {
        if (this.refreshing1) {
          this.page1 = 1
          this.list1 = [];
          this.refreshing1 = false;
        }
        this.getData1().then(res=>{
          this.list1.push(...res.data.content);
          this.loading1 = false;
          if(this.page1>=res.data.totalPages) {
            this.finished1 = true;
          }
          this.page1++
        })
    },
    onRefresh1() {
      this.finished1 = false;
      this.loading1 = true;
      this.onLoad1();
    },
    getData2() {
      return new Promise((resolve, reject) => {
          this.$ajax
            .post("api/front/message/findChatRoomAll.json", {}).then(response=>{
              resolve(response)
            }).catch(error=>{
              reject(error)
            })
        })
    },
    onLoad2() {
      this.getData2().then(res=>{
        this.list2 = res.data
      })
    },
    toDetail(item,type) {
      this.$router.push({path: '/msgdetail/',query: {id:item.id,type:type,title:item.nickName}})
    },
    getDetailOne(id) {
      return new Promise((resolve, reject) => {
          this.$ajax
            .post("api/front/message/findCommentMessageDetails.json", {
              id: id
            }).then(response=>{
              resolve(response)
            }).catch(error=>{
              reject(error)
            })
        })
    },
    toCommentDetail(id,parentId,idOne) {
      this.getDetailOne(idOne).then(res=>{
        this.$router.push({
          path: "/articlecommentdetails/",
          query: { articleId: id, id: parentId,type:'msg' },
        });
      })
    },
    toChat(item) {
      this.$router.push({path: '/chat/',query: {roomId:item.id,receiverMemberId:item.receiverMemberId,nickName:item.nickName,type:'msg'}})
    }
  },
  computed: {

  },
  watch: {

  },
  components: {
    "van-tabs": Tabs,
    "van-tab": Tab,
    "van-list": List,
    "van-pull-refresh": PullRefresh,
    'van-image': Image,
    "van-icon": Icon
  }
}
</script>

<style lang="scss" scoped>
.msg-container {
  // border-top: solid 1px #f0f0f0;
  padding: 0 15px;
  .msg-item {
    padding: 17px 0;
    border-bottom: solid 1px #f0f0f0;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .head-img {
        position: relative;
        margin-right: 12px;
        width: 43px;
        height: 43px;
        .dot {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 100;
          width: 10px;
          height: 10px;
          background:#ee0a24;
          border-radius: 50%;
        }
        .van-image--round {
          width: 43px;
          height: 43px;
        }
      }
      .row-1 {
        display: flex;
        justify-content: space-between;
        .name {
          font-size: 15px;
          font-family: PingFang SC Medium, PingFang SC Medium-Medium;
          font-weight: 500;
          color: #323232;
          line-height: 15px;
        }
        .time {
          font-size: 12px;
          font-family: PingFang SC Regular, PingFang SC Regular-Regular;
          font-weight: 400;
          color: #838383;
          line-height: 12px;
        }
      }
      .desc {
        margin-top: 8px;
        width: 260px;
        font-size: 14px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #5a5a5a;
        line-height: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
