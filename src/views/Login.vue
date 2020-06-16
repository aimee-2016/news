<template>
  <div class="container">
    <van-icon name="cross" />
    <h1>手机号登陆/注册</h1>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block color="#FDD004" native-type="submit">提交</van-button>
      </div>
      <div class="tips">未注册的手机号码验证后自动注册</div>
      <div class="share">
        <div class="title">第三方登录</div>
        <div class="place">
          <img src="../assets/img/icon-wechat.png" alt="微信" />
          <img src="../assets/img/icon-qq.png" alt="qq" />
        </div>
      </div>
    </van-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { Icon } from "vant";
import { Form } from "vant";
import { Field } from "vant";
import { Button } from "vant";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    }
  },
  computed: {},
  watch: {},
  components: {
    "van-icon": Icon,
    "van-form": Form,
    "van-field": Field,
    "van-button": Button
  }
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 25px 56px;
}
.van-icon-cross {
  margin: 30px 0 35px;
  font-size: 21px;
}
h1 {
  margin-bottom: 40px;
  font-size: 19px;
  font-family: PingFang SC Bold, PingFang SC Bold-Bold;
  font-weight: 700;
  color: #333333;
}
.tips {
  font-size: 12px;
  font-family: PingFang SC Medium, PingFang SC Medium-Medium;
  font-weight: 500;
  text-align: center;
  color: #666666;
}
.share {
  position: fixed;
  bottom: 56px;
  width: 180px;
  margin: 0 auto;
  border-top: solid 1px #666666;
  text-align: center;
  .title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 94px;
    margin: 0 auto;
    background: #fff;
    font-size: 11px;
    font-family: PingFang SC Regular, PingFang SC Regular-Regular;
    font-weight: 400;
    color: #666666;
    line-height: 16px;
  }
  .place {
    img {
      width: 37px;
      &:last-child {
        margin-left: 20px;
      }
    }
  }
}
</style>
