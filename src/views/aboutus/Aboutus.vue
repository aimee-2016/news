<template>
  <div class="container">
    <div class="logo">
      <img src="../../assets/img/home/logo@2x.png" alt="" />
      <div>当前版本V1.0.0</div>
    </div>
    <van-cell
      :value="item"
      v-for="(item, index) in list"
      :key="index"
      is-link
      @click="toDetail(index)"
    />

    <van-share-sheet v-model="showShare" :options="options" />
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell,ShareSheet} from "vant";
export default {
  data() {
    return {
      list: ['用户协议','分享给朋友'],
      showShare: false,
      options: [
        [
          { name: '微信好友', icon: 'wechat' },
          {
            name: '微信朋友圈',
            icon: require('../../assets/img/home/friendscircle@2x.png'),
          },
          { name: 'QQ', icon: 'qq' },
          {
            name: 'QQ空间',
            icon: require('../../assets/img/home/qqzone@2x.png'),
          },
        ],
        [
          { name: '微博', icon: 'weibo' },
          { name: '系统分享', icon: require('../../assets/img/home/love@2x.png') },
          { name: '复制链接', icon: 'link' }
        ],
      ]
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    toDetail(index) {
      if(index===1) {
        this.showShare = true
      } else if (index === 0) {
        this.$router.push('/useragreement/')
      }
    },
  },
  computed: {

  },
  watch: {

  },
  components: {
    "van-cell": Cell,
    "van-share-sheet": ShareSheet
  }
}
</script>

<style lang="scss" scoped>
.logo {
  padding: 44px 0;
  text-align: center;
  background: #f8f8f8;
  img {
    width: 62px;
  }
  div {
    margin-top: 10px;
    font-size: 13px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #666666;
  }
}
</style>
