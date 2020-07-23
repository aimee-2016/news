<template>
  <div class="about">
    <div class="nav">
      <ul>
        <li
          v-for="(item,index) in navList"
          :key="index"
          :class="{selected:navId===item.id}"
          @click="getTopic(item.value)"
        >{{item.name}}</li>
      </ul>
      <van-icon name="search" />
    </div>
    <div class="tc-content">
      <div v-for="(item, index) in topicList" :key="index" @click="$router.push({path: '/topicdetails/', query: {id: item.id}})">
        <div class="tc-fm">
          <img :src="item.imagePathsStr" />
        </div>
        <div class="tp-desc">
          <p class="tp-title">{{item.title}}</p>
          <div class="tp-bt">
            <div class="tp-left">
              <img v-if="index < 4" src="../assets/img/topic/hot.png">
              <span class="tp-hot" v-if="index < 4">热评</span>
              <span class="tp-lok" v-if="item.viewCount > 10000">{{item.viewCount / 10000}}万人围观</span> 
              <span class="tp-lok" v-else>{{item.viewCount}}人围观</span>
              <span v-if="item.commentCount > 10000">{{item.commentCount / 10000}}万评论</span>
              <span v-else>{{item.commentCount}}评论</span>
            </div>
            <div class="tp-right">
              <span>{{item.tiemText}}</span>
            </div>
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
      topicList: []
    };
  },
  components: {
    "van-icon": Icon
  },
  created() {
    this.getTopic();
  },
  methods: {
    getTopic(value) {
      this.$ajax
        .post("api/front/articles/findTopicArticles.json", {
          page: "1",
          size: "10",
          topicQueryType: value || "Newest",
          title: ""
        })
        .then(res => {
          this.topicList = res.data.content;
          this.topicList.forEach(item => {
            item.tiemText = this.calculationDate(item);
          })
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    calculationDate(item) {
      let date = new Date(item.pubDate);
      let date2 = new Date(item.nowDate);
      let year = date.getFullYear();
      let month = date.getMonth() + 1 > 9 ? date.getMonth() : '0' + date.getMonth();
      let day = date.getDay() > 9 ? date.getDay() : '0' + date.getDay();
      let num = date2.getTime() - date.getTime();
      if (num >= 604800000) {
          if (date.getFullYear() === date2.getFullYear()) {
            return `${month} - ${day}`
          } else {
            return `${year} - ${month} - ${day}`
          }
      }
      if (num >= 86400000) {
        return new Date(num).getDay() + '天前'
      }
      if (num >= 3600000) {
        return new Date(num).getHours() + '小时前'
      }
      if (num >= 180000) {
        return new Date(num).getMinutes() + '分钟前'
      }
      if (num < 180000) {
        return '刚刚'
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  position: relative;
  padding-top: 10px;
  height: calc(100% - 58px);
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
  .tp-desc {
    margin: 17px 0 13px 0;
    padding: 0 12px 0 20px;
    font-size: 12px;
    .tp-title {
      font-size: 16px;
      color: #333333;
      font-weight: Bold;
    }
    .tp-bt {
      display: flex;
      justify-content: space-between;
      margin-top: 11px;
      .tp-left {
        color: #999999;
        img {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
        .tp-hot {
          color: #F45641;
          margin-left:6px;
        }
        .tp-lok {
          margin: 0 9px 0 12px;
        }
      }
      .tp-right {
        color: #999999;
      }
    }
  }
}

</style>
