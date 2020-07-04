<template>
  <div class="container">
    <div v-if="step===1">
      <div class="top-text" style="margin-bottom:58px;">
        <van-icon name="cross" @click="$router.go(-1)" />
        <h1>{{text}}</h1>
      </div>
      <van-form @submit="onSubmit1">
        <van-field v-model="telephone" type="text" placeholder="请输入手机号">
          <template #left-icon>
            <span @click="getContryList()">
              {{cnName+'+'+countryTel}}
              <van-icon
                name="arrow-down"
                size="8"
                color="#AEAEAE"
                style="display:inline-block;vertical-align:middle"
              />
            </span>
          </template>
        </van-field>
        <div class="desc" @click="step=4">忘记密码</div>
        <van-button
          style="margin-top:50px;background: #fdd004;border:none;"
          round
          block
          :disabled="telephone===''"
          native-type="submit"
        >下一步</van-button>
      </van-form>
      <div class="tips">未注册的手机号码验证后自动注册</div>
      <div class="share">
        <div class="title">第三方登录</div>
        <div class="place">
          <span class="we-chat"></span>
          <span class="qq"></span>
        </div>
      </div>
    </div>
    <!-- step2 -->
    <div v-if="step===2">
      <div class="top-text">
        <van-icon name="cross" @click="close()" />
        <h1>{{text}}</h1>
      </div>
      <div class="telephone-entered">
        <i>您输入的号码是</i>
        <span>{{'+'+countryTel+' '+telephone}}</span>
      </div>
      <van-form @submit="onSubmit2">
        <van-field v-model="password" :type="eyeType===1?'password':'text'" placeholder="请输入密码">
          <template #right-icon>
            <van-icon name="closed-eye" v-if="eyeType===1" @click="eyeType=2" />
            <van-icon name="eye-o" v-if="eyeType===2" @click="eyeType=1" />
          </template>
        </van-field>
        <div class="desc" @click="step=3">验证码登录</div>
        <div style="margin-top: 50px;">
          <van-button
            round
            block
            native-type="submit"
            :disabled="password===''"
            style="background: #fdd004;border:none;"
          >登录</van-button>
        </div>
      </van-form>
    </div>
    <!-- step3 -->
    <div v-if="step===3">
      <div class="top-text">
        <van-icon name="cross" @click="close()" />
        <h1>{{text}}</h1>
      </div>
      <div class="telephone-entered">
        <i>您输入的号码是</i>
        <span>{{'+'+countryTel+' '+telephone}}</span>
      </div>
      <van-form @submit="onSubmit3">
        <van-field v-model="code" center clearable placeholder="请输入验证码">
          <template #button>
            <van-button
              style="background: #f3f3f3;border:none"
              round
              clearable
              size="small"
              :disabled="codeText!='获取验证码'"
              native-type="button"
              @click="sendCode()"
            >{{codeText}}</van-button>
          </template>
        </van-field>
        <div class="desc" @click="step=2">密码登录</div>
        <div style="margin-top: 50px;">
          <van-button
            round
            block
            native-type="submit"
            :disabled="code===''"
            style="background: #fdd004;border:none;"
          >登录</van-button>
        </div>
      </van-form>
    </div>
    <div v-if="step===4">
      <div class="top-text" style="margin-bottom:50px;">
        <van-icon name="cross" @click="close()" />
        <h1>{{text}}</h1>
      </div>
      <van-form @submit="onSubmit4">
        <van-field v-model="telephone" type="text" placeholder="请输入手机号">
          <template #left-icon>
            <span @click="showPicker = true">
              {{cnName+'+'+countryTel}}
              <van-icon
                name="arrow-down"
                size="8"
                color="#AEAEAE"
                style="display:inline-block;vertical-align:middle"
              />
            </span>
          </template>
        </van-field>
        <div style="margin-top: 50px;">
          <van-button
            round
            block
            native-type="submit"
            :disabled="telephone===''"
            style="background: #fdd004;border:none;"
          >下一步</van-button>
        </div>
      </van-form>
    </div>
    <div v-if="step===5">
      <div class="top-text">
      <van-icon name="cross" @click="close()" />
      <h1>{{text}}</h1>
      </div>
      <div class="telephone-entered">
        <i>您输入的号码是</i>
        <span>{{'+'+countryTel+' '+telephone}}</span>
      </div>
      <van-form @submit="onSubmit5">
        <van-field v-model="code" center clearable placeholder="请输入验证码">
          <template #button>
            <van-button
              style="background: #f3f3f3;border:none"
              round
              clearable
              size="small"
              native-type="button"
              :disabled="codeText!='获取验证码'"
              @click="sendCode()"
            >{{codeText}}</van-button>
          </template>
        </van-field>
        <van-field v-model="password1" :type="eyeType1===1?'password':'text'" placeholder="设置新密码">
          <template #right-icon>
            <van-icon name="closed-eye" v-if="eyeType1===1" @click="eyeType1=2" />
            <van-icon name="eye-o" v-if="eyeType1===2" @click="eyeType1=1" />
          </template>
        </van-field>
        <van-field v-model="password2" :type="eyeType2===1?'password':'text'" placeholder="确认新密码">
          <template #right-icon>
            <van-icon name="closed-eye" v-if="eyeType2===1" @click="eyeType2=2" />
            <van-icon name="eye-o" v-if="eyeType2===2" @click="eyeType2=1" />
          </template>
        </van-field>
        <div style="margin-top: 50px;">
          <van-button
            round
            block
            native-type="submit"
            :disabled="!(code!=''&&password1!=''&&password2!='')"
            style="background: #fdd004;border:none;"
          >登录</van-button>
        </div>
      </van-form>
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
</template>

<script type="text/ecmascript-6">
// import axios from "axios";
import { Icon,Form,Field,Button,Picker,Popup,Toast } from "vant";
import { mapActions } from 'vuex'
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
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    close() {
      this.step = 1;
      this.codeText = "获取验证码";
      clearInterval(this.codeInstance);
    },
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
    onSubmit2() {
        const userName = this.telephone
        const password = this.password
        const codeArea = this.countryTel
        const loginType = "PASSWORD"
        this.handleLogin({userName, password,loginType,codeArea}).then(() => {
          this.getUserInfo().then(() => {
            this.$router.push({
              name: 'home'
            })
          })
        }).catch(function(error) {
            Toast(error.message)
          })
    },
    onSubmit3() {
      const userName = this.telephone
      const password = this.code
      const codeArea = this.countryTel
      const loginType = "SYSCODE"
      this.handleLogin({userName, password,loginType,codeArea}).then(() => {
        this.getUserInfo().then(() => {
          this.$router.push({
            name: 'home'
          })
        })
      }).catch(function(error) {
          Toast(error.message)
        })
    },
    onSubmit4() {
      this.step = 5;
    },
    onSubmit5() {
      if(this.password1!=this.password2) {
        Toast('两次密码不一致！')
        return false
      }
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
    onConfirm(item) {
      this.cnName = item.text;
      this.countryTel = item.code;
      this.showPicker = false;
    },
    sendCode() {
      let num = 60;
      this.codeInstance = setInterval(() => {
        num--;
        this.codeText = `重新发送（${num}）`;
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
  computed: {},
  watch: {
    step: function(val) {
      switch (val) {
        case 1:
          this.text = "手机号登陆/注册";
          break;
        case 2:
          this.text = "密码登录";
          break;
        case 3:
          this.text = "验证码登录";
          break;
        case 4:
          this.text = "找回密码";
          break;
        case 5:
          this.text = "手机号验证";
          break;
      }
    }
  },
  components: {
    "van-icon": Icon,
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
    "van-picker": Picker,
    "van-popup": Popup
  },
  destroyed() {
    if (this.codeInstance) {
      clearInterval(this.codeInstance);
    }
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
  font-size: 19px;
  font-family: PingFang SC Bold, PingFang SC Bold-Bold;
  font-weight: 700;
  color: #333333;
}
.tips {
  margin-top: 19px;
  font-size: 12px;
  font-family: PingFang SC Medium, PingFang SC Medium-Medium;
  font-weight: 500;
  text-align: center;
  color: #666666;
}
.share {
  position: fixed;
  bottom: 56px;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  margin: 0 auto;
  border-top: solid 1px #666666;
  text-align: center;
  .title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
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
    margin-top: 24px;
    span {
      display: inline-block;
      width: 37px;
      height: 36px;
      background-size: 37px 36px;
      background-repeat: no-repeat;
      &.we-chat {
        @include bg-image("../assets/img/login/icon-wechat");
      }
      &.qq {
        margin-left: 20px;
        @include bg-image("../assets/img/login/icon-qq");
      }
    }
  }
}
.row {
  display: flex;
  padding-bottom: 10px;
  border-bottom: solid 1px #f0f0f0;
  input {
    flex: 1;
  }
  .country-code {
    margin-right: 15px;
    font-size: 15px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #333333;
    .van-icon-arrow-down {
      color: #aeaeae;
      vertical-align: middle;
    }
  }
}
.desc {
  display: inline-block;
  margin-top: 12px;
  margin-left: 16px;
  font-size: 12px;
  font-family: PingFang SC Medium, PingFang SC Medium-Medium;
  font-weight: 500;
  color: #2b548a;
}
.telephone-entered {
  margin-top: 11px;
  margin-bottom: 48px;
  font-size: 13px;
  font-family: PingFang SC Medium, PingFang SC Medium-Medium;
  font-weight: 500;
  i {
    font-style: normal;

    color: #666666;
  }
  span {
    margin-left: 10px;
    font-size: 13px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    color: #333333;
  }
}
</style>
