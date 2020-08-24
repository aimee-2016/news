<template>
  <div>
    <self-header>黑名单</self-header>
    <div v-for="(item, index) in blackList" :key="index" class="member-item">
      <div class="content">
        <div class="left">
          <div class="head-img">
            <van-image round fit="cover" :src="item.headImgPath" />
          </div>
          <div>
            <span class="name">{{ item.nickName }}</span>
          </div>
        </div>
        <div class="right">
          <self-button round @click="focusUser(item.id)">移除</self-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import selfHeader from '@/components/header'
import selfButton from '@/components/button';
import {
  Image
} from "vant";
export default {
  data() {
    return {
      blackList: []
    }
  },
  created() {
    this.getAll()
  },
  mounted() {

  },
  methods: {
    getAll() {
        this.$ajax
        .post("api/front/member/findBlackListPageByCondition.json", {page: 10,size:20})
        .then(res => {
          this.blackList = res.data.content
        })
        .catch(error=> {
          console.log(error);
        });
    },
    focusUser(id) {
      this.$ajax
        .post("api/front/member/relieveBlock.json", {
          id: id
        })
        .then(() => {
          this.$toast('移除成功')
          this.getAll()
        })
        .catch(error=> {
          this.$toast(error)
        });
    },
  },
  computed: {

  },
  watch: {

  },
  components: {
    'self-header': selfHeader,
    "van-image": Image,
    'self-button': selfButton
  }
}
</script>

<style lang="scss" scoped>
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
</style>
