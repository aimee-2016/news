<template>
  <div class="container">
    <div class="top">
      <div>审核状态：{{ explosiveDetails.status.message }}</div>
      <div>提交时间：{{ explosiveDetails.pubDate }}</div>
      <div>反馈时间：{{ explosiveDetails.auditDate }}</div>
    </div>
    <div class="title">{{ explosiveDetails.title }}</div>
    <div class="content" v-html="explosiveDetails.content"></div>
    <div class="bottom">
      <div>联系人:{{ explosiveDetails.author.nickName }}</div>
      <div>联系方式：{{ explosiveDetails.contactInformation }}</div>
      <div>邮箱：{{ explosiveDetails.email }}1231</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      explosiveDetails: null
    }
  },
  created() {
    this.queryTopicById()
  },
  mounted() {

  },
  methods: {
    queryTopicById() {
      this.$ajax
        .post('api/front/articles/findArticlesById.json', {
          id: this.$route.query.id,
        })
        .then((res) => {
          this.explosiveDetails = res.data
        })
    },
  },
  computed: {

  },
  watch: {

  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px 15px 0;
}
.top {
  margin-bottom: 28px;
  div {
    margin-bottom: 16px;
    font-size: 14px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #666666;
  }
}
.title {
  margin-bottom: 20px;
  font-size: 17px;
  font-family: PingFang SC Heavy, PingFang SC Heavy-Heavy;
  font-weight: 800;
  color: #333333;
  line-height: 30px;
}
.bottom {
  margin-top: 24px;
  > div {
    margin-bottom: 10px;
    font-size: 12px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    text-align: left;
    color: #333333;
  }
}
</style>
