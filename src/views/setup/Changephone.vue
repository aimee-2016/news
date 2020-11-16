<template>
  <div>
    <div class="container">
      <div v-if="step === 1">
        <van-form @submit="onSubmit1">
          <van-cell-group border>
            <van-field
              v-model="telephone"
              type="text"
              placeholder="请输入当前绑定的手机号"
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
            <van-field
              v-model="newtelephone"
              type="text"
              placeholder="请输入新手机号"
            >
              <template #left-icon>
                <span @click="getContryList1()">
                  {{ '+' + countryTel1 }}
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
            :disabled="telephone === ''|| newtelephone === ''"
            native-type="submit"
            class="btn"
            >下一步</van-button
          >
        </van-form>
        <div class="tips">更改绑定的手机号之后可以用新手机号及当前密码登录</div>
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
        <div class="tips">已向手机+{{this.telephoneF}}发送验证码</div>
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
      <van-popup v-model="showPicker1" position="bottom">
        <van-picker
          show-toolbar
          :columns="countryList1"
          :default-index="countryIndex1"
          @confirm="onConfirm1"
          @cancel="showPicker1 = false"
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
      showPicker1: false,
      telephone: "",
      telephoneF: "",
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
      codeInstance: null,
      newtelephone: '',
      countryList1: [],
      countryIndex1: 0,
      cnName1: "中国",
      countryTel1: "86",
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    getContryList(name) {
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
    getContryList1() {
      this.$ajax
        .post("api/front/member/findPhoneCode.json", {})
        .then(res => {
          this.countryList1 = res.data.map(item => {
            return { text: item.cnName, code: item.countryTel };
          });
          this.countryList1.filter((item, index) => {
            if (item.text === this.cnName1) {
              this.cnName1 = this.countryList1[index].text;
              this.countryTel1 = this.countryList1[index].code;
              this.countryIndex1 = index;
            }
          });
          this.showPicker1 = true
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    onSubmit1() {
      this.sendCode()
    },
    onConfirm(item) {
      this.cnName = item.text;
      this.countryTel = item.code;
      this.showPicker = false;
    },
    onConfirm1(item) {
      this.cnName1 = item.text;
      this.countryTel1 = item.code;
      this.showPicker1 = false;
    },
    onSubmit5() {
      this.$ajax
        .post("api/front/member/replacePhone.json", {
          code: this.code,
        })
        .then(() => {
          Toast('绑定手机号成功')
          this.$router.push('/accountprivacy/')
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
        .post("api/front/member/replacePhoneSendSysCode.json", {
          oldPhone: this.telephone,
          oldCodeArea: this.countryTel,
          newPhone: this.newtelephone,
          newCodeArea: this.countryTel1
        })
        .then(() => {
          // Toast('发送成功')
          this.step = 2;
          this.telephoneF = this.newtelephone.slice(0,3)+'*****'+this.newtelephone.slice(-4)
        })
        .catch((error)=> {
          clearInterval(this.codeInstance);
          this.codeText = "获取验证码";
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
