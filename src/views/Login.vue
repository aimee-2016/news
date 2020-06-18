<template>
  <div class="container">
    <van-icon name="cross" />
    <h1>手机号登陆/注册</h1>
    <van-form @submit="onSubmit">
      <!-- <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />-->
      <!-- <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="选择器"
        placeholder="请输入手机号"
        @click="showPicker = true"
      >-->
      <!-- </van-field> -->
      <div class="row">
        <div class="country-code" @click="showPicker = true">
          {{countryCode}}
          <van-icon name="arrow-down" />
        </div>
        <input type="text" placeholder="请输入手机号" v-model="tel" />
      </div>
      <div class="forget-password">忘记密码</div>
      <!-- <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />-->
      <div style="margin: 16px;">
        <van-button round block color="#FDD004" native-type="submit">下一步</van-button>
      </div>
      <div class="tips">未注册的手机号码验证后自动注册</div>
      <div class="share">
        <div class="title">第三方登录</div>
        <div class="place">
          <img src="../assets/img/icon-wechat.png" alt="微信" />
          <img src="../assets/img/icon-qq.png" alt="qq" />
        </div>
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
    </van-form>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import { Icon } from "vant";
import { Form } from "vant";
import { Field } from "vant";
import { Button } from "vant";
import { Picker } from "vant";
import { Popup } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      showPicker: false,
      tel: "",
      countryList: [],
      countryCode: ""
    };
  },
  created() {
    axios
      .get("api/front/member/findPhoneCode.json", {
        // 还可以直接把参数拼接在url后边
        params: {}
      })
      .then(res => {
        this.countryList = res.data.data.map(item => {
          return { text: `${item.cnName}+${item.countryTel}` };
        });
        this.countryList.filter((item, index) => {
          if (item.text.indexOf("中国") != -1) {
            this.countryCode = this.countryList[index].text;
            this.countryIndex = index;
          }
        });
        // console.log(this.countryList);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  mounted() {},
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    }
  },
  computed: {},
  watch: {},
  components: {
    "van-icon": Icon,
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
    "van-picker": Picker,
    "van-popup": Popup
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
  margin-bottom: 58px;
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
    img {
      width: 37px;
      &:last-child {
        margin-left: 20px;
      }
    }
  }
}
.row {
  display: flex;
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
.forget-password {
  margin-bottom: 50px;
  margin-top: 30px;
  font-size: 12px;
  font-family: PingFang SC Medium, PingFang SC Medium-Medium;
  font-weight: 500;
  color: #2b548a;
}
</style>
