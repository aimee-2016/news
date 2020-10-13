<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>我要爆料</span>
      <i class="right-text" @click="$router.push('/addaddress/')">提交</i>
    </div>
    <div class="section">
      <div class="top">
        <van-field
          v-model="message"
          rows="2"
          autosize
          label=""
          type="textarea"
          maxlength="300"
          placeholder="请写下您的意见或建议..."
          @input="count"
        />
        <van-uploader
          :max-size="500 * 1024"
          multiple
          @oversize="onOversize"
          :after-read="afterRead"
        >
          <img
            class="img1"
            src="../../assets/img/home/icon-upload@2x.png"
            alt=""
          />
        </van-uploader>
        <div class="count">
          <span>{{ num }}</span
          >/300
        </div>
      </div>
      <div class="center">
        <h2>选择反馈类型</h2>
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio
            :name="item.val"
            checked-color="#FFCB00"
            v-for="(item, index) in radioList"
            :key="index"
            @click="selectType(item.val)"
            >{{ item.name }}</van-radio
          >
        </van-radio-group>
      </div>
    </div>

    <div class="bottom">
      <van-field
        v-model="value"
        label="联系方式"
        placeholder="QQ、邮箱、手机（选填）"
        size="large"
      />
      <div class="btn-wrap">
        <van-button type="primary" class="btn2" @click="submit"
          >提交</van-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button, Icon, Popup, Image,Field, RadioGroup, Radio,Uploader } from "vant";
export default {
  data() {
    return {
        message: '',
      radioList: [
        {name:'程序bug',val:'Bug'},
        {name:'功能建议',val:'Propose'},
        {name:'内容意见',val:'Idea'},
        {name:'广告问题',val:'Advertising'},
        {name:'网络问题',val:'NetworkProblems'},
        {name:'其他',val:'Other'},
      ],
      radio: 'Bug',
      value: '',
      num: '',
      file: []
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    onOversize(file) {
      console.log(file);
      this.file = file
      this.$toast('文件大小不能超过 500kb');
    },
    count(val) {
      console.log(val)
      this.num = val.length
    },
    selectType(val) {
      console.log(val)
    },
    submit() {
      if(!this.message) {
        this.$toast('请填写意见或建议!')
        return false
      }
      this.$ajax
        .post("api/front/help/feedback.json", {
          feedBackType: this.radio,
          suggestions: this.message,
          imageList: this.file,
          contactInformation: this.value
          })
        .then(() => {
          // this.list = res.data.content;
          this.$toast('提交成功')
        })
        .catch((error)=> {
          this.$toast(error)
        });
    },
  },
  computed: {

  },
  watch: {

  },
  components: {
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button,
    "van-icon": Icon,
    "van-popup": Popup,
    "van-image": Image,
    "van-uploader": Uploader,
    "van-radio-group": RadioGroup,
    "van-radio": Radio,
    "van-field": Field
  }
}
</script>

<style lang="scss" scoped>
#container {
    padding: 58px 15px 0;
  .section {
    padding-bottom: 10px;
    background: #f8f8f8;
  }
  .top {
    background: #fff;
  }
  .center {
    margin-top: 10px;
    background: #fff;
  }
  .bottom {
    background: #fff;
  }
}
#head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 14px 15px;
  font-size: 17px;
  font-family: PingFang SC Medium, PingFang SC Medium-Medium;
  font-weight: 500;
  text-align: center;
  color: #333334;
  line-height: 24px;
  background: #fff;
  box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.08);
  .van-icon-arrow-left {
    position: absolute;
    left: 15px;
    top: 18px;
    font-size: 17px;
  }
  .right-text {
    font-style: normal;
    position: absolute;
    right: 15px;
    top: 15px;
    font-size: 15px;
  }
}
.img1 {
  width: 74px;
}
.count {
  text-align: right;
  font-size: 13px;
  font-family: PingFang SC Regular, PingFang SC Regular-Regular;
  font-weight: 400;
  color: #999999;
  span {
    color: #f99307;
  }
}
.center {
  padding-top: 20px;
  h2 {
    margin-bottom: 20px;
    font-size: 16px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    color: #333333;
  }
  .van-radio--horizontal {
    width: 100px;
    margin-bottom: 26px;
  }
}
.btn-wrap {
  text-align: center;
  .btn2 {
    margin-top: 40px;
    min-width: 140px;
    background: #ffdc22;
    color: #333333;
    border: none;
  }
}
</style>
