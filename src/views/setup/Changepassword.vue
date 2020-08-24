<template>
  <div>
    <self-header>修改密码</self-header>
    <div class="container">
      <div>
        <van-form @submit="onSubmit5">
          <van-cell-group border>
          <van-field v-model="code" center clearable placeholder="请输入验证码">
            <template #button>
              <span
                style="border-left:solid 1px #E6E6E6;padding-left:10px;"
                size="small"
                native-type="button"
                @click="sendCode()"
                >{{ codeText }}</span
              >
            </template>
          </van-field>
          <van-field v-model="password1" type="text" clearable placeholder="请输入新密码（6-20位英文或数字）">
            </van-field>
          </van-cell-group>
          <div>
            <van-button
              round
              block
              native-type="submit"
              :disabled="!(code != ''&&password1!='')"
              style="background: #fdd004;border:none;"
              class="btn"
              >确认修改</van-button
            >
          </div>
        </van-form>
        <div class="tips">已向手机+85*****821发送验证码</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import selfHeader from '@/components/header'
import { Form,Field,Button,Toast,CellGroup } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      code: "",
      showPicker: false,
      telephone: "",
      countryList: [],
      countryIndex: 0,
      cnName: "中国",
      countryTel: "86",
      step: 2,
      text: "手机号登陆/注册",
      eyeType: 1,
      codeText: "获取验证码",
      password1: "",
      password2: "",
      eyeType1: 1,
      eyeType2: 1,
      codeInstance: null
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    onSubmit5() {
      let reg = /[a-zA-Z0-9]{6,20}/
      // console.log(reg.test(this.password1))
      if(reg.test(this.password1)) {
        console.log(1)
      } else {
        this.$toast('密码位数错误，需要大于6位，小于20位的英文或数字')
      }
      // this.$ajax
      //   .post("api/front/member/forgetPassWord.json", {
      //     phone: this.telephone,
      //     passWord: this.password1,
      //     sysCode: this.code,
      //     codeArea: this.countryTel
      //   })
      //   .then(() => {
      //     Toast('修改成功')
      //     this.step = 3
      //   })
      //   .catch(function(error) {
      //     Toast(error.message)
      //   });
    },
    sendCode() {
      if(this.codeText != '获取验证码') {
        return false
      }
      let num = 60;
      this.codeInstance = setInterval(() => {
        num--;
        this.codeText = `重新发送${num}s`;
        if (num === 0) {
          clearInterval(this.codeInstance);
          this.codeText = "获取验证码";
        }
      }, 1000);
      this.$ajax
        .post("api/front/member/sysCode.json", {
          phone: this.telephone,
          codeArea: this.countryTel
        })
        .then(() => {
          Toast('发送成功')
        })
        .catch(function(error) {
          Toast(error.message)
        });
    }
  },
  computed: {

  },
  watch: {

  },
  components: {
    'self-header': selfHeader,
    // "van-icon": Icon,
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
    // "van-picker": Picker,
    // "van-popup": Popup,
    "van-cell-group": CellGroup
  }
}
</script>

<style lang="scss" scoped>
.tips {
  margin-top: 16px;
  font-size: 12px;
  font-family: PingFang SC Medium, PingFang SC Medium-Medium;
  font-weight: 500;
  text-align: center;
  color: #3c5d77;
}
.btn {
  margin-top: 36px;
}
.container {
  padding: 26px 16px 0;
}
.van-cell-group {
  border: 1px solid #e6e6e6;
  border-radius: 3px;
}
</style>
