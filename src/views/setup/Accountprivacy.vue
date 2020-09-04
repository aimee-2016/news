<template>
  <div>
    <van-cell
      title="手机号"
      :value="userInfo.whetherBindPhone?'更改手机号':'去绑定手机号'"
      is-link
      url="/bindphone/"
      class="modify-tel"
    />
    <van-cell title="修改密码" is-link @click="onSelect" />
    <van-cell-group title="社交平台账号绑定">
      <van-cell title="微信">
        <template #right-icon>
          <van-switch v-model="userInfo.whetherBindWeChat" size="24px" active-color="#FDD004"/>
        </template>
      </van-cell>
      <van-cell title="腾讯QQ">
        <template #right-icon>
          <van-switch v-model="userInfo.whetherBindQQ" size="24px" active-color="#FDD004"/>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Cell,
  CellGroup,
  Dialog,
  Switch
} from "vant";
export default {
  data() {
    return {
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    onSelect(item) {
      Dialog.confirm({
          title: "修改登录密码",
          message: "将给手机+85*****821发送验证码",
          confirmButtonColor: "rgb(255, 203, 0)"
        })
          .then(() => {
            console.log(item)
            // this.$toast(item.name + "成功");
            this.$router.push('/Changepassword/')
          })
          .catch(() => {});
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {

  },
  components: {
    "van-cell": Cell,
    "van-cell-group": CellGroup,
    "van-switch": Switch
  }
}
</script>

<style lang="scss" scoped>
.modify-tel .van-cell__value {
  color: #fc4d00;
}
</style>
