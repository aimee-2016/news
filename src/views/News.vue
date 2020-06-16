<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="search">
      <van-search v-model="serchValue" placeholder="请输入搜索关键词" />
      <van-icon name="chat-o" badge="9" />
    </div>
    <div class="nav">
      <ul>
        <li
          v-for="(item,index) in navList"
          :key="index"
          :class="{selected:navId===index}"
          @click="navId=index"
        >{{item.name}}</li>
      </ul>
      <van-icon name="wap-nav" @click="columnShow=true" />
    </div>
    <div class="display">
      <div class="no-login">
        <img src="../assets/img/形状55.png" alt="add" />
        <p>您还没有登录，请前往登录</p>
      </div>
    </div>
    <div class="overlay" v-if="columnShow">
      <div class="column">
        <div class="head">
          <span>所有栏目</span>
          <van-icon name="cross" @click="columnShow=false" />
        </div>
        <div class="container">
          <div class="item">
            <div class="top">
              <div class="text">
                <span class="title">我的栏目</span>
                <span class="desc">点击进入栏目</span>
              </div>
              <button>编辑</button>
            </div>
            <ul class="list">
              <li v-for="(item,index) in myList" :key="index">{{item.name}}</li>
            </ul>
          </div>
          <div class="item">
            <div class="top">
              <div class="text">
                <span class="title">栏目推荐</span>
                <span class="desc">点击添加栏目</span>
              </div>
            </div>
            <ul class="list">
              <li v-for="(item,index) in recommendList" :key="index">
                <van-icon name="plus" />
                {{item.name}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Search } from "vant";
import { Icon } from "vant";
export default {
  name: "Home",
  data() {
    return {
      navList: [
        { name: "关注", id: 1 },
        { name: "热点", id: 1 },
        { name: "创业", id: 1 },
        { name: "快讯", id: 1 },
        { name: "新闻", id: 1 },
        { name: "娱乐", id: 1 },
        { name: "体育", id: 1 }
      ],
      navId: 0,
      serchValue: "",
      myList: [
        { name: "关注", id: 1 },
        { name: "热点", id: 1 },
        { name: "创业", id: 1 },
        { name: "快讯", id: 1 },
        { name: "新闻", id: 1 },
        { name: "娱乐", id: 1 },
        { name: "体育", id: 1 },
        { name: "关注", id: 1 },
        { name: "热点", id: 1 },
        { name: "创业", id: 1 },
        { name: "快讯", id: 1 },
        { name: "新闻", id: 1 },
        { name: "娱乐", id: 1 },
        { name: "体育", id: 1 }
      ],
      recommendList: [
        { name: "关注", id: 1 },
        { name: "热点", id: 1 },
        { name: "创业", id: 1 },
        { name: "快讯", id: 1 },
        { name: "新闻", id: 1 },
        { name: "娱乐", id: 1 },
        { name: "体育", id: 1 }
      ],
      columnShow: false
    };
  },
  components: {
    "van-search": Search,
    "van-icon": Icon
  }
};
</script>
<style lang="scss" scoped>
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
    justify-content: space-between;
    align-items: center;
    li {
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
  .van-icon-wap-nav {
    position: absolute;
    top: 0;
    right: 16px;
    font-size: 18px;
    color: #2d2d2d;
    background: #fff;
  }
}
.display {
  .no-login {
    padding-top: 136px;
    p {
      margin-top: 18px;
      font-size: 13px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #666666;
    }
  }
}
.overlay {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  text-align: left;
  .column {
    padding: 0 15px;
  }
  .head {
    text-align: center;
    margin: 17px 0 31px;
      font-size: 17px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #333333;
    .van-icon-cross {
      position: absolute;
      right: 15px;
    }
  }
  .item {
    margin-bottom: 13px;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 23px;
      .text {
         .title {
        margin-right: 9px;
        font-size: 17px;
        font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
        font-weight: 800;
        color: #333333;
      }
      .desc {
        font-size: 11px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #666666;
      }
      }
     
      button {
        width: 60px;
        height: 27px;
        background: none;
        border: 1px solid #f99307;
        border-radius: 14px;
        font-size: 13px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #f99307;
      }
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 77px;
        height: 31px;
        margin-bottom: 15px;
        margin-right: 12px;
        background: #f5f5f5;
        border-radius: 3px;
        font-size: 15px;
        line-height: 31px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        text-align: center;
        color: #333333;
        &:nth-of-type(4n+4) {
          margin-right: 0;
        }
        .van-icon-plus {
          color: #F99307;
        }
      }
    }
  }
}
</style>
