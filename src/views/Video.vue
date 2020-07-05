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
      <van-icon name="search" @click="columnShow=true" />
    </div>
    <div class="vd-list">
      <jz-video />
    </div>
  </div>
</template>

<script>
import { Icon } from "vant";
import video from "@/components/video/index";
export default {
  data() {
    return {
      navList: [
        {
          value: "关注",
          name: "关注",
          id: '1'
        },
        {
          value: "美食",
          name: "美食",
          id: '2'
        }
      ],
      navId: '1'
    };
  },
  components: {
    "van-icon": Icon,
    "jz-video": video
    // "van-list": List
  }
};
</script>

<style lang="scss" scoped>
.about {
  position: relative;
  padding-top: 10px;
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
.vd-list {
  margin-top: 32px;
}
</style>