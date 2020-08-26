<template>
  <div id="detail">
    <self-header>{{ $route.query.title }}</self-header>
    <div class="container">
      <div class="time">{{ time}}</div>
      <div class="content">{{ content }}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'svb',
  data() {
    return {
      content: '',
      time: ''
    }
  },
  created() {
    if(this.$route.query.type==='1') {
      this.systemMsg()
    } else {
      this.myMsg()
    }
  },
  mounted() {

  },
  methods: {
    systemMsg() {
      this.$ajax
        .post('api/front/message/findSystemMessageById.json', {id: this.$route.query.id})
        .then((res) => {
          this.content = res.data.content
          this.time = res.data.nowDate
        })
    },
    myMsg() {
      this.$ajax
        .post('api/front/message/findCommentMessageDetails.json', {id: this.$route.query.id})
        .then((res) => {
          this.content = res.data.content
          this.time = res.data.nowDate
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
#detail {
  background: #f4f4f4;
  height: 100%;
  padding-top: 52px;
}
.container {
  padding: 22px 15px 0;
  .time {
    margin-bottom: 16px;
    font-size: 15px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #999999;
  }
  .content {
    font-size: 14px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #222222;
    line-height: 23px;
    letter-spacing: 0px;
  }
}
</style>
