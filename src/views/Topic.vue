<template>
  <div class="about">
    <div class="nav">
      <ul>
        <li
          v-for="(item,index) in navList"
          :key="index"
          :class="{selected:navId===item.id}"
          @click="getArticle(item.id)"
        >{{item.name}}</li>
      </ul>
      <van-icon name="search" />
    </div>
    <div class="tc-content">
      <div v-for="(item, index) in TopicList" :key="index">
        <div class="tc-fm">
          <img :src="item.imagePathsStr" />
        </div>
        <div>{{item.title}}</div>
        <div>
          <div>
            <span>热评</span>
            <span>1万人围观 526评论</span>
          </div>
          <div>
            <span>3小时前</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
export default {
  data() {
    return {
      navList: [
        {
          value: "Newest",
          name: "最新",
          id: "1"
        },
        {
          value: "Hottest",
          name: "热门",
          id: "2"
        }
      ],
      navId: "1",
      TopicList: []
    };
  },
  components: {
    "van-icon": Icon
  },
  created() {
    this.getTopic();
  },
  methods: {
    getTopic() {
      this.$ajax
        .post("api/front/articles/findTopicArticles.json", {
          page: "1",
          size: "10",
          topicQueryType: "Newest",
          title: ""
        })
        .then(res => {
          this.TopicList = res.data.content;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  position: relative;
  padding-top: 10px;
  height: calc(100% - 25px);
}
.search {
  display: flex;
  align-items: center;
  padding: 10px 25px 20px;
  .van-search {
    flex: 1;
    padding: 0;
  }
  .van-icon {
    margin-left: 16px;
    font-size: 22px;
  }
}
.nav {
  position: relative;
  padding: 0 16px;
  ul {
    display: flex;
    align-items: center;
    padding-right: 20px;
    li {
      margin-right: 20px;
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
          content: "";
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
  .van-icon-search {
    position: absolute;
    top: 0;
    right: 16px;
    font-size: 18px;
    color: #2d2d2d;
    background: #fff;
  }
}
.tc-content {
  .tc-fm {
    img {
      width: 100%;
      height: 192px;
    }
  }
}

</style>
