<template>
  <div>
    <div class="top-info">
      <div class="row-1">
        <img :src="userInfo.headImgPath" alt class="avatar" />
        <span class="btn-edit">编辑资料</span>
        <span class="btn-auth">我的认证</span>
      </div>
      <div class="text">
        <span class="name">卡卡</span>
        <span class="age">女 18</span>
      </div>
      <ul class="follow">
        <li>
          <span class="num">{{userInfo.followCount}}</span>
          <span class="text">关注</span>
        </li>
        <li>
          <span class="num">{{userInfo.fansCount}}</span>
          <span class="text">粉丝</span>
        </li>
        <li>
          <span class="num">{{userInfo.fabulousCount}}</span>
          <span class="text">获赞</span>
        </li>
      </ul>
      <ul class="introduce-list">
        <li>
          <van-icon name="good-job-o" />
          <van-icon name="comment-o" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.top-info {
  .avatar {
    width: 62px;
    height: 62px;
    border-radius: 59%;
  }
}
</style>
