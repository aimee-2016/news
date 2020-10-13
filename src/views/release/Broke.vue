<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>我要爆料</span>
      <i class="right-text" @click="submit">提交</i>
    </div>
    <div class="top">
      <van-field
        v-model="title"
        rows="1"
        autosize
        label=""
        type="textarea"
        maxlength="30"
        placeholder="请输入你想爆料的标题（5-30个字）必填"
      />
      <van-field
        v-model="content"
        rows="2"
        autosize
        label=""
        type="textarea"
        maxlength="300"
        placeholder="添加描述和配图（必填）"
        @input="count"
      />
      <van-uploader
        :max-size="500 * 1024"
        v-model="fileList"
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
    <div class="interval-bar"></div>
    <div class="bottom">
      <van-field
        v-model="contacts"
        label="联系人"
        required
        placeholder="必填"
        size="large"
      />
      <van-field
        v-model="contactInformation"
        label="联系方式 "
        required
        placeholder="必填"
        size="large"
      />
      <van-field
        v-model="email"
        label="邮箱 "
        placeholder="选填"
        size="large"
      />
      <dl class="explain">
        <dt>爆料说明：</dt>
        <dd>
          1、反对任何形式曝光他人个人隐私的行为，如有需要，请务必在个人信息部分打上马赛克。
        </dd>
        <dd>
          2、请勿在本版块重复发帖、发布广告内容、违规内容等，违者一律删帖，严重者封号处理。
        </dd>
        <dd>3、爆料请陈述事情的来龙去脉及提供相关爆料证据；</dd>
        <dd>
          4、发帖人在本版块相关的所有行为（包括但不限于访问浏览、利用、转载、宣传介绍）时，不得利用本版块以任何方式直接或者间接的从事违反中国法律、国际公约以及社会公德的行为，且访问者应当恪守下述承诺：
          传输和利用信息符合中国法律、国际公约的规定、符合公序良俗；不将本版块以及与之相关的网络服务用作非法用途以及非正当用途；不干扰和扰乱本版块以及与之相关的网络服务；遵守与本版块以及与之相关的网络服务的协议、规定、程序和惯例等
        </dd>
        <dd>5、每名爆料者都能都在爆料被采用后，得到200积分的奖励。</dd>
      </dl>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {  Icon,Field,Uploader } from "vant";
export default {
  data() {
    return {
    message: '',
    num: 0,
    fileList: [],
    title: '',
    content: '',
    imagePaths: [],
    contacts: '',
    contactInformation: '',
    email: '',
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    afterRead(file) {
      let formdata = new FormData();
      formdata.append("filename", file.file.name);
      formdata.append("file", file.file);
      this.$ajax
        .post("api/obs/upload.json", formdata)
        .then((res) => {
            this.imagePaths.push(res.data.viewUrl)
        })
        .catch(error=> {
          this.$toast(error)
        });
    },
    onOversize(file) {
      this.$toast('文件大小不能超过 500kb');
    },
    count(val) {
      this.num = val.length
    },
    selectType(val) {
      console.log(val)
    },
    submit() {
      if(!(this.title.length>4&&this.title.length<31)) {
        this.$toast('爆料的标题请输入5-30个字）')
        return false
      }
      if(!this.content.length) {
        this.$toast('请输入描述')
        return false
      }
      if(!this.contacts.length) {
        this.$toast('请输入联系人')
        return false
      }
      if(!this.contactInformation.length) {
        this.$toast('请输入联系人方式')
        return false
      }
      this.$ajax
        .post("api/front/articles/release.json", {
          title: this.title,
          content: this.content,
          type: 'BrokeTheNews',
          imagePaths: this.imagePaths,
          contacts: this.contacts,
          contactInformation: this.contactInformation,
          email: this.email,
          })
        .then(() => {
          this.$toast('提交成功')
          this.$router.push('/myexplosive/')
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
    "van-icon": Icon,
    "van-uploader": Uploader,
    "van-field": Field
  }
}
</script>

<style lang="scss" scoped>
#container {
  padding-top: 58px;
}
.interval-bar {
  width: 100%;
  height: 10px;
  background: #f8f8f8;
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
.top {
  padding: 0 15px 24px;
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
}

.bottom {
  padding: 0 15px 34px;
  .explain {
    padding: 0 5px;
    dt {
      margin-top: 24px;
      margin-bottom: 16px;
      font-size: 16px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #f18139;
    }
    dd {
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      color: #666666;
      line-height: 2;
    }
  }
}
</style>
