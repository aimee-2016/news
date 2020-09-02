<template>
  <div id="collection">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span class="title" style="float:right" v-if="active===0" @click="editStatus=!editStatus">{{editStatus?'取消':'编辑'}}</span>
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
                  <div v-if="editStatus" class="checkbox-wrap">
                    <van-checkbox v-model="item.checked" checked-color="#ffcb00" @click="changeNum(item.checked)"/>
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
                      <!-- <div class="right">
                        <span class="icon-top" v-if="item.articlesQueryResultDto.whetherTop"></span>
                        <van-icon name="ellipsis" />
                      </div> -->
                    </div>
                    <div class="content1" :class="{changew:editStatus}" @click="toDetail(item.articlesQueryResultDto.type.name,item.articlesQueryResultDto.id)">
                      <div class="article van-multi-ellipsis--l3">{{item.articlesQueryResultDto.title}}</div>
                      <van-image fit="cover" lazy-load :src="item.articlesQueryResultDto.imagePaths[0]"/>
                    </div>
                    <div class="opreate">
                      <span>
                        <img src="../../assets/img/myhome/icon-share@2x.png" alt />
                      </span>
                      <span @click="toDetail(item.articlesQueryResultDto.type.name,item.articlesQueryResultDto.id)">
                        <img src="../../assets/img/myhome/icon-49@2x.png" alt />
                        <i class="num">{{item.articlesQueryResultDto.commentCount}}</i>
                      </span>
                      <span>
                        <img
                          src="../../assets/img/home/icon-support1-hover@2x.png"
                          @click="articleunSupport(item)"
                          v-if="item.articlesQueryResultDto.whetherLikeArticles"
                        />
                        <img
                          src="../../assets/img/home/icon-support1@2x.png"
                          @click="articleSupport(item)"
                          v-else
                        />
                        <i class="num">{{item.articlesQueryResultDto.likeCount}}</i>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="item.articlesQueryResultDto.type.name=='PublishVideo'">
                  <div v-if="editStatus">
                    <van-checkbox v-model="item.checked" checked-color="#ffcb00" @click="changeNum(item.checked)"/>
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
                    </div>
                    <div class="content2" :class="{changew1:editStatus}" @click="toDetail(item.articlesQueryResultDto.type.name,item.articlesQueryResultDto.id)">
                      <van-image fit="cover" lazy-load :src="item.articlesQueryResultDto.videoImagePath"/>
                      <van-icon name="play-circle" />
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
                          src="../../assets/img/home/icon-support1-hover@2x.png"
                          @click="articleunSupport(item)"
                          v-if="item.articlesQueryResultDto.whetherLikeArticles"
                        />
                        <img
                          src="../../assets/img/home/icon-support1@2x.png"
                          @click="articleSupport(item)"
                          v-else
                        />
                        <i class="num">{{item.articlesQueryResultDto.likeCount}}</i>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="item.articlesQueryResultDto.type.name=='Topic'">
                  <div v-if="editStatus">
                    <van-checkbox v-model="item.checked" checked-color="#ffcb00" @click="changeNum(item.checked)"/>
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
                    </div>
                    <div class="content2" :class="{changew1:editStatus}" @click="toDetail(item.articlesQueryResultDto.type.name,item.articlesQueryResultDto.id)">
                    <van-image fit="cover" lazy-load :src="item.articlesQueryResultDto.imagePaths[0]"/>
                    </div>
                    <div class="content2-title">{{item.articlesQueryResultDto.title}}</div>
                    <div class="opreate1" @click="toDetail(item.articlesQueryResultDto.type.name,item.articlesQueryResultDto.id)">
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
            <ul class="all comment-all">
              <li v-for="(item, index) in list1" :key="index">
                <div>
                  <div class="box-content comment-box">
                    <div class="info">
                      <div class="left">
                        <van-image fit="cover" round lazy-load :src="userInfo.headImgPath"/>
                        <div class="text">
                          <span class="name">{{userInfo.nickName}}</span>
                          <span class="time">{{item.articlesDto.pubDate | changeTime}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="comment">{{item.content}}</div>
                    <div class="commment-row">
                      <div class="content-comment" @click="toDetail(item.articlesDto.type.name,item.articlesDto.id)">
                        <div class="van-ellipsis">{{item.articlesDto.title}}</div>
                        <div class="van-multi-ellipsis--l3" v-if="item.type.name==='Comment'">
                          {{item.articlesDto.contentView}}
                        </div>
                        <div class="van-multi-ellipsis--l3" v-else>
                          <span>@{{item.commentSingleDto.memberDto.nickName}}</span>
                          {{item.commentSingleDto.content}}
                        </div>
                      </div>
                      <van-image fit="cover" lazy-load :src="item.articlesDto.imagePaths[0]"/>
                    </div>
                    <div class="opreate">
                      <span>
                        <img src="../../assets/img/myhome/icon-share@2x.png" alt />
                      </span>
                      <span @click="toDetail(item.articlesDto.type.name,item.articlesDto.id)">
                        <img src="../../assets/img/myhome/icon-49@2x.png" alt />
                        <i class="num">{{item.articlesDto.commentCount}}</i>
                      </span>
                      <span>
                        <img
                          src="../../assets/img/home/icon-support1-hover@2x.png"
                          @click="articleunSupport1(item)"
                          v-if="item.articlesDto.whetherLikeArticles"
                        />
                        <img
                          src="../../assets/img/home/icon-support1@2x.png"
                          @click="articleSupport1(item)"
                          v-else
                        />
                        <i class="num">{{item.articlesDto.likeCount}}</i>
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="点赞"> 
        <van-pull-refresh v-model="refreshing2" success-text="刷新成功" @refresh="onRefresh2">
          <van-list v-model="loading2" :finished="finished2" finished-text="我是有底线的" @load="onLoad2">
            <ul class="all">
              <li v-for="(item, index) in list2" :key="index">
                <div v-if="item.articlesDto.type.name=='PublishArticle'">
                  <div class="box-content">
                    <div class="info">
                      <div class="left">
                        <van-image fit="cover" round lazy-load :src="item.articlesDto.author.headImgPath"/>
                        <div class="text">
                          <span class="name">{{item.articlesDto.nickName}}</span>
                          <span class="time">{{item.articlesDto.pubDate | changeTime}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="content1" @click="toDetail(item.articlesDto.type.name,item.articlesDto.id)">
                      <div class="article van-multi-ellipsis--l3">{{item.articlesDto.title}}</div>
                      <van-image fit="cover" lazy-load :src="item.articlesDto.imagePaths[0]"/>
                    </div>
                    <div class="opreate">
                      <span>
                        <img src="../../assets/img/myhome/icon-share@2x.png" alt />
                      </span>
                      <span @click="toDetail(item.articlesDto.type.name,item.articlesDto.id)">
                        <img src="../../assets/img/myhome/icon-49@2x.png" alt />
                        <i class="num">{{item.articlesDto.commentCount}}</i>
                      </span>
                      <span>
                        <img
                          src="../../assets/img/home/icon-support1-hover@2x.png"
                          @click="articleunSupport1(item)"
                          v-if="item.articlesDto.whetherLikeArticles"
                        />
                        <img
                          src="../../assets/img/home/icon-support1@2x.png"
                          @click="articleSupport1(item)"
                          v-else
                        />
                        <i class="num">{{item.articlesDto.likeCount}}</i>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="item.articlesDto.type.name=='PublishVideo'">
                  <div class="box-content">
                    <div class="info">
                      <div class="left">
                        <van-image fit="cover" round lazy-load :src="item.articlesDto.author.headImgPath"/>
                        <div class="text">
                          <span class="name">{{item.articlesDto.nickName}}</span>
                          <span class="time">{{item.articlesDto.pubDate | changeTime}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="content2" @click="toDetail(item.articlesDto.type.name,item.articlesDto.id)">
                      <van-image fit="cover" lazy-load :src="item.articlesDto.videoImagePath"/>
                      <van-icon name="play-circle" />
                    </div>
                    <div class="opreate">
                      <span>
                        <img src="../../assets/img/myhome/icon-share@2x.png" alt />
                      </span>
                      <span>
                        <img src="../../assets/img/myhome/icon-49@2x.png" alt />
                        <i class="num">{{item.articlesDto.commentCount}}</i>
                      </span>
                      <span>
                        <img
                          src="../../assets/img/home/icon-support1-hover@2x.png"
                          @click="articleunSupport1(item)"
                          v-if="item.articlesDto.whetherLikeArticles"
                        />
                        <img
                          src="../../assets/img/home/icon-support1@2x.png"
                          @click="articleSupport1(item)"
                          v-else
                        />
                        <i class="num">{{item.articlesDto.likeCount}}</i>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="item.articlesDto.type.name=='Topic'">
                  <div class="box-content">
                    <div class="info">
                      <div class="left">
                        <van-image fit="cover" round lazy-load :src="item.articlesDto.author.headImgPath"/>
                        <div class="text">
                          <span class="name">{{item.articlesDto.nickName}}</span>
                          <span class="time">{{item.articlesDto.pubDate | changeTime}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="content2" @click="toDetail(item.articlesDto.type.name,item.articlesDto.id)">
                    <van-image fit="cover" lazy-load :src="item.articlesDto.imagePaths[0]"/>
                    </div>
                    <div class="content2-title">{{item.articlesDto.title}}</div>
                    <div class="opreate1" @click="toDetail(item.articlesDto.type.name,item.articlesDto.id)">
                      <span>
                        {{item.articlesDto.viewCount}}人围观
                      </span>
                      <span>
                        {{item.articlesDto.commentCount}}评论
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="历史"> 
        <van-pull-refresh v-model="refreshing3" success-text="刷新成功" @refresh="onRefresh3">
          <van-list v-model="loading3" :finished="finished3" finished-text="我是有底线的" @load="onLoad3">
            <ul class="all">
              <li v-for="(item, index) in list3" :key="index">
                <div v-if="item.articlesDto.type.name=='PublishArticle'">
                  <div class="box-content">
                    <div class="info">
                      <div class="left">
                        <van-image fit="cover" round lazy-load :src="item.articlesDto.author.headImgPath"/>
                        <div class="text">
                          <span class="name">{{item.articlesDto.nickName}}</span>
                          <span class="time">{{item.articlesDto.pubDate | changeTime}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="content1" @click="toDetail(item.articlesDto.type.name,item.articlesDto.id)">
                      <div class="article van-multi-ellipsis--l3">{{item.articlesDto.title}}</div>
                      <van-image fit="cover" lazy-load :src="item.articlesDto.imagePaths[0]"/>
                    </div>
                    <div class="opreate">
                      <span>
                        <img src="../../assets/img/myhome/icon-share@2x.png" alt />
                      </span>
                      <span @click="toDetail(item.articlesDto.type.name,item.articlesDto.id)">
                        <img src="../../assets/img/myhome/icon-49@2x.png" alt />
                        <i class="num">{{item.articlesDto.commentCount}}</i>
                      </span>
                      <span>
                        <img
                          src="../../assets/img/home/icon-support1-hover@2x.png"
                          @click="articleunSupport1(item)"
                          v-if="item.articlesDto.whetherLikeArticles"
                        />
                        <img
                          src="../../assets/img/home/icon-support1@2x.png"
                          @click="articleSupport1(item)"
                          v-else
                        />
                        <i class="num">{{item.articlesDto.likeCount}}</i>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="item.articlesDto.type.name=='PublishVideo'">
                  <div class="box-content">
                    <div class="info">
                      <div class="left">
                        <van-image fit="cover" round lazy-load :src="item.articlesDto.author.headImgPath"/>
                        <div class="text">
                          <span class="name">{{item.articlesDto.nickName}}</span>
                          <span class="time">{{item.articlesDto.pubDate | changeTime}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="content2" @click="toDetail(item.articlesDto.type.name,item.articlesDto.id)">
                      <van-image fit="cover" lazy-load :src="item.articlesDto.videoImagePath"/>
                      <van-icon name="play-circle" />
                    </div>
                    <div class="opreate">
                      <span>
                        <img src="../../assets/img/myhome/icon-share@2x.png" alt />
                      </span>
                      <span>
                        <img src="../../assets/img/myhome/icon-49@2x.png" alt />
                        <i class="num">{{item.articlesDto.commentCount}}</i>
                      </span>
                      <span>
                        <img
                          src="../../assets/img/home/icon-support1-hover@2x.png"
                          @click="articleunSupport1(item)"
                          v-if="item.articlesDto.whetherLikeArticles"
                        />
                        <img
                          src="../../assets/img/home/icon-support1@2x.png"
                          @click="articleSupport1(item)"
                          v-else
                        />
                        <i class="num">{{item.articlesDto.likeCount}}</i>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="item.articlesDto.type.name=='Topic'">
                  <div class="box-content">
                    <div class="info">
                      <div class="left">
                        <van-image fit="cover" round lazy-load :src="item.articlesDto.author.headImgPath"/>
                        <div class="text">
                          <span class="name">{{item.articlesDto.nickName}}</span>
                          <span class="time">{{item.articlesDto.pubDate | changeTime}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="content2" @click="toDetail(item.articlesDto.type.name,item.articlesDto.id)">
                    <van-image fit="cover" lazy-load :src="item.articlesDto.imagePaths[0]"/>
                    </div>
                    <div class="content2-title">{{item.articlesDto.title}}</div>
                    <div class="opreate1" @click="toDetail(item.articlesDto.type.name,item.articlesDto.id)">
                      <span>
                        {{item.articlesDto.viewCount}}人围观
                      </span>
                      <span>
                        {{item.articlesDto.commentCount}}评论
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <div id="footer-operate" v-if="editStatus&&active===0">
      <span @click="emptyCollection()">一键清空</span>
      <span class="del" @click="delCollection()">删除(<i>{{checkNum}}</i>)</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import selfButton from "@/components/button";
import { Tabs, Tab, List, PullRefresh, Image, Icon, Checkbox, Dialog } from "vant";
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
      page2: 1,
      size2: 20,
      list2: [],
      loading2: false,
      finished2: false,
      refreshing2: false,
      page3: 1,
      size3: 20,
      list3: [],
      loading3: false,
      finished3: false,
      refreshing3: false,
      editStatus: false,
      checkNum: 0
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
            'api/front/articles/findArticlesCollectionPageByCondition.json',
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
    onLoadInit(id) {
      this.page=1;
      this.list=[];
      this.finished = false;
      this.loading = true;
      this.onLoad();
    },
    onLoad() {
      if (this.refreshing) {
        this.page = 1;
        this.list = [];
        this.refreshing = false;
      }
      this.getData().then(res => {
        res.data.content.forEach(element => {
          this.$set(element,'checked',false)
        });
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
    getData2() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .post("api/front/articles/findLikeArticlesPageByMemberId.json", {
            page: this.page2,
            size: this.size2
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    onLoad2() {
      if (this.refreshing2) {
        this.page2 = 1;
        this.list2 = [];
        this.refreshing2 = false;
      }
      this.getData2().then(res => {
        this.list2.push(...res.data.content);
        this.loading2 = false;
        if (this.page2 >= res.data.totalPages) {
          this.finished2 = true;
        }
        this.page2++;
      });
    },
    onRefresh2() {
      this.finished2 = false;
      this.loading2 = true;
      this.onLoad2();
    },
    getData3() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .post("api/front/articles/findArticlesHistoryPageByMemberId.json", {
            page: this.page3,
            size: this.size3
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    onLoad3() {
      if (this.refreshing3) {
        this.page3 = 1;
        this.list3 = [];
        this.refreshing3 = false;
      }
      this.getData3().then(res => {
        this.list3.push(...res.data.content);
        this.loading3 = false;
        if (this.page3 >= res.data.totalPages) {
          this.finished3 = true;
        }
        this.page3++;
      });
    },
    onRefresh3() {
      this.finished3 = false;
      this.loading3 = true;
      this.onLoad3();
    },
    toDetail(type,id) {
      let url = ''
      switch (type) {
        case 'PublishArticle':
          url = '/articledetails/'
          break;
        case 'PublishVideo':
          url = '/videodetails/'
          break;
        case 'Topic':
          url = '/topicdetails/'
          break;
      }
      this.$router.push({
        path: url,
        query: { id: id}
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
    },
    articleSupport(item) {
      this.$ajax
        .post("api/front/articles/likeArticles.json", {
          id: item.articlesQueryResultDto.id
        })
        .then(() => {
          item.articlesQueryResultDto.whetherLikeArticles = true;
          this.$toast("点赞成功");
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    articleunSupport(item) {
      this.$ajax
        .post("api/front/articles/unLikeArticles.json", {
          id: item.articlesQueryResultDto.id
        })
        .then(() => {
          item.articlesQueryResultDto.whetherLikeArticles = false;
          this.$toast("取消点赞");
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    articleSupport1(item) {
      this.$ajax
        .post("api/front/articles/likeArticles.json", {
          id: item.articlesDto.id
        })
        .then(() => {
          item.articlesDto.whetherLikeArticles = true;
          this.$toast("点赞成功");
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    articleunSupport1(item) {
      this.$ajax
        .post("api/front/articles/unLikeArticles.json", {
          id: item.articlesDto.id
        })
        .then(() => {
          item.articlesDto.whetherLikeArticles = false;
          this.$toast("取消点赞");
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    changeNum(val) {
      if(val) {
        this.checkNum++
      } else {
        this.checkNum--
      }
    },
    emptyCollection() {
      if(!this.list.length) {
        return false
      }
      Dialog.confirm({
        title: "确定清空收藏？",
        confirmButtonColor: "#f99307",
        theme: "round-button"
      })
        .then(() => {
          this.emptyCollection1();
        })
    },
    emptyCollection1() {
      this.$ajax
        .post("api/front/articles/deleteAllOperation.json", {
          operationType: 'Collection'
        })
        .then(() => {
          this.onLoadInit()
          this.$toast("清空成功");
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    delCollection() {
      if(!this.list.length) {
        return false
      }
      Dialog.confirm({
        title: "确定删除收藏？",
        confirmButtonColor: "#f99307",
        theme: "round-button"
      })
        .then(() => {
          this.delCollection1();
        })
    },
    delCollection1() {
      let resultList = this.list.filter(item=>item.checked).map(item=>item.id)
      this.$ajax
        .post("api/front/articles/deleteBatchOperation.json", {
          operationType: 'Collection',
          ids: resultList
        })
        .then(() => {
          this.onLoadInit()
          this.$toast("删除成功");
        })
        .catch(error => {
          this.$toast(error.message);
        });
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
  padding: 58px 0 50px;
}
#head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 58px;
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
.all {
  background: #f8f8f8;
  li {
    margin-bottom: 10px;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    > div {
      display: flex;
      align-items: center;
      padding: 20px 15px 13px;
      .checkbox-wrap {
        margin-right: 15px;
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
    display: flex;
    justify-content: flex-end;
    position: relative;
    margin-top: 18px;
    .van-image {
      width: 100%;
      height: 180px;
    }
    .van-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      color: rgba($color: #070707, $alpha: 0.4);
      font-size: 38px;
      transform: translate(-19px, -19px);
    }
  }
  .changew1 {
    .van-image {
      width: 95%;
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
      // color: #4e627a;
    }
    .van-image {
      width: 109px;
      height: 81px;
    }
  }
  .changew {
    .article {
      width: 165px;
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
.comment-all {
  li {
    >div {
      padding-left: 0;
      padding-right: 0;
      .comment-box {
        margin-left: 0;
      }
    }
  }
  .info {
    padding: 0 15px;
  }
  .opreate {
    padding-left: 15px;
  }
  .comment-box {
    .comment {
      padding: 22px 15px 12px 15px;
      font-size: 16px;
      font-family: PingFang SC Bold, PingFang SC Bold-Bold;
      font-weight: 700;
      color: #333333;
    }
    .commment-row {
      display: flex;
      align-items: center;
      background: #f8f8f8;
      padding: 16px 15px;
      .content-comment {
        margin-right: 18px;
        width: 188px;
        flex-grow:1;
        .van-ellipsis {
          font-size: 16px;
          font-family: PingFang SC Bold, PingFang SC Bold-Bold;
          font-weight: 700;
          color: #4e627a;
        }
        .van-multi-ellipsis--l3 {
          margin-top: 12px;
          font-size: 14px;
          font-family: PingFang SC Medium, PingFang SC Medium-Medium;
          font-weight: 500;
          color: #333333;
          line-height: 22px;
          span {
            color: #4e627a;
            font-size: 14px;
          }
        }
      }
      .van-image {
        width: 140px;
        height: 105px;
        border-radius: 5px;
        overflow: hidden;
      }
    }
  }
}
#footer-operate {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border-top: 1px solid #e6e6e6;
  font-size: 16px;
  font-family: PingFang SC Medium, PingFang SC Medium-Medium;
  font-weight: bold;
  color: #333333;
  line-height: 50px;
  background: #fff;
  .del {
    color: #f99307;
    i {
      font-style: normal;
    }
  }
}
</style>
