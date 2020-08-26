<template>
  <div>
    <van-cell title="编辑资料" is-link />
    <van-cell title="账号和隐私设置" is-link url="/accountprivacy/" />
    <van-cell title="黑名单" is-link url="/blacklist/" />
    <van-cell title="清理缓存" value="200MB" @click="show = true" />
    <div @click="loginout" class="login-out">退出登录</div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      description="确定删除所有缓存？离线内容及图片均会被清除"
      close-on-click-action
      @select="select"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Cell,
  ActionSheet
} from "vant";
export default {
  data() {
    return {
      show: false,
      actions: [
        { name: '确定' },
      ],
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    select(item) {
      console.log(item.name)
    },
    loginout() {
      this.$ajax
        .post("api/front/member/loginOut.json", {})
        .then(() => {
          this.$toast('退出成功')
        })
        .catch(error=> {
          this.$toast(error)
        });
    }
  },
  computed: {

  },
  watch: {

  },
  components: {
    "van-cell": Cell,
    "van-action-sheet": ActionSheet
  }
}
</script>

<style lang="scss" scoped>
.login-out {
  margin-top: 20px;
  font-size: 15px;
  font-family: PingFang SC Medium, PingFang SC Medium-Medium;
  font-weight: 500;
  text-align: center;
  color: #fc4d00;
  line-height: 24px;
}
</style>
