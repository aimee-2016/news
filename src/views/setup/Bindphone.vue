<template>
  <div>
    <div class="container">
      <div v-if="step === 1">
        <van-form @submit="onSubmit1">
          <van-cell-group border>
            <van-field
              v-model="telephone"
              type="text"
              placeholder="请输入想要绑定的手机号"
            >
              <template #left-icon>
                <span @click="getContryList()">
                  {{ '+' + countryTel }}
                  <van-icon
                    name="arrow-down"
                    size="8"
                    color="#AEAEAE"
                    style="display:inline-block;vertical-align:middle;margin-right:10px"
                  />
                </span>
                <span style="color:#E6E6E6">|</span>
              </template>
            </van-field>
          </van-cell-group>
          <van-button
            style="background: #fdd004;border:none;"
            round
            block
            :disabled="telephone === ''"
            native-type="submit"
            class="btn"
            >下一步</van-button
          >
        </van-form>
        <div class="tips">未注册的手机号码验证后自动注册</div>
      </div>
      <div v-if="step===2">
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
          </van-cell-group>
          <div>
            <van-button
              round
              block
              native-type="submit"
              :disabled="!(code != '')"
              style="background: #fdd004;border:none;"
              class="btn"
              >确认绑定</van-button
            >
          </div>
        </van-form>
        <div class="tips">已向手机+85*****821发送验证码</div>
      </div>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="countryList"
          :default-index="countryIndex"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Icon,Form,Field,Button,Picker,Popup,Toast,CellGroup } from "vant";
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
      step: 1,
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
    getContryList() {
      this.$ajax
        .post("api/front/member/findPhoneCode.json", {})
        .then(res => {
          this.countryList = res.data.map(item => {
            return { text: item.cnName, code: item.countryTel };
          });
          this.countryList.filter((item, index) => {
            if (item.text === this.cnName) {
              this.cnName = this.countryList[index].text;
              this.countryTel = this.countryList[index].code;
              this.countryIndex = index;
            }
          });
          this.showPicker = true
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onSubmit1() {
      this.step = 2;
    },
    onConfirm(item) {
      this.cnName = item.text;
      this.countryTel = item.code;
      this.showPicker = false;
    },
    onSubmit5() {
      this.$ajax
        .post("api/front/member/forgetPassWord.json", {
          phone: this.telephone,
          passWord: this.password1,
          sysCode: this.code,
          codeArea: this.countryTel
        })
        .then(() => {
          Toast('修改成功')
          this.step = 3
        })
        .catch(function(error) {
          Toast(error.message)
        });
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
    "van-icon": Icon,
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
    "van-picker": Picker,
    "van-popup": Popup,
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
