<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>发布</span>
    </div>
    <div class="top">
      <van-field
        v-model="title"
        rows="1"
        autosize
        label=""
        type="textarea"
        maxlength="30"
        placeholder="标题"
      />
      <div class="text-wrap">
        <div class="wrap van-hairline--bottom">
          <van-field
            v-model="content"
            rows="2"
            autosize
            label=""
            type="textarea"
            maxlength="300"
            placeholder="说点什么~"
            :border="false"
            @input="count"
          />
          <van-uploader
            v-model="fileList"
            multiple
            :after-read="afterRead"
            :capture="capture1"
            accept="video/*"
          >
            <img
              class="img1"
              src="../../assets/img/home/icon-upload@2x.png"
              alt=""
            />
          </van-uploader>

          <!-- <div class="img-wrap">
            <label for="image_uploads">换封面</label>
            <input
              type="file"
              id="image_uploads"
              name="image_uploads"
              accept=".jpg, .jpeg, .png"
              multiple
            />
          </div> -->
        </div>
      </div>
    </div>
    <van-cell
      title="选择视频类型"
      is-link
      @click="toFiled('ApplyVideoLabel')"
    />
    <input type="file" accept="video/*" capture="camcorder" />
    <input type="file" accept="audio/*" capture="microphone" />
    <input type="file" accept="image/*" capture="camera" />
    <div class="bottom">
      <van-button color="#DAB728">发布</van-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Icon, Field, Uploader, Button, Cell } from "vant";
export default {
  data() {
    return {
      message: "",
      num: 0,
      fileList: [],
      title: "",
      content: "",
      imagePaths: [],
      contacts: "",
      contactInformation: "",
      email: "",
      capture1: "camcorder",
    };
  },
  created() {},
  mounted() {},
  methods: {
    afterRead(file) {
      let formdata = new FormData();
      formdata.append("filename", file.file.name);
      formdata.append("file", file.file);
      this.$ajax
        .post("api/obs/upload.json", formdata)
        .then((res) => {
          this.imagePaths.push(res.data.viewUrl);
          this.$toast(this.imagePaths);
        })
        .catch((error) => {
          this.$toast(error);
        });
    },
    onOversize(file) {
      this.$toast("文件大小不能超过 500kb");
    },
    toFiled(name) {
      this.$router.push({ path: "/createfiled/", query: { type: name } });
    },
    count(val) {
      this.num = val.length;
    },
    selectType(val) {
      console.log(val);
    },
    submit() {
      if (!(this.title.length > 4 && this.title.length < 31)) {
        this.$toast("爆料的标题请输入5-30个字）");
        return false;
      }
      if (!this.content.length) {
        this.$toast("请输入描述");
        return false;
      }
      if (!this.contacts.length) {
        this.$toast("请输入联系人");
        return false;
      }
      if (!this.contactInformation.length) {
        this.$toast("请输入联系人方式");
        return false;
      }
      this.$ajax
        .post("api/front/articles/release.json", {
          title: this.title,
          content: this.content,
          type: "BrokeTheNews",
          imagePaths: this.imagePaths,
          contacts: this.contacts,
          contactInformation: this.contactInformation,
          email: this.email,
        })
        .then(() => {
          this.$toast("提交成功");
          this.$router.push("/myexplosive/");
        })
        .catch((error) => {
          this.$toast(error);
        });
    },
  },
  computed: {},
  watch: {},
  components: {
    "van-icon": Icon,
    "van-uploader": Uploader,
    "van-field": Field,
    "van-button": Button,
    "van-cell": Cell,
  },
};
</script>

<style lang="scss" scoped>
#container {
  padding-top: 58px;
  height: 100%;
  background: #1b1d29;
  color: #fff;
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
  line-height: 24px;
  background: #1b1d29;
  color: #fff;
  .van-icon-arrow-left {
    position: absolute;
    left: 15px;
    top: 18px;
    font-size: 17px;
  }
}
.van-cell {
  background-color: #1b1d29;
  color: #fff;
}
.top {
  padding: 0 15px 0;
  .wrap {
    display: flex;
    justify-content: space-between;
    padding-bottom: 22px;
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

  .text-wrap {
    margin-top: 20px;
    display: flex;
    .van-field {
      width: 250px;
    }
    .img-wrap {
      position: relative;
      width: 80px;
      height: 107px;
      background: #ffffff;
      border-radius: 1px;
      label {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 2;
        display: inline-block;
        width: 100%;
        height: 21px;
        line-height: 21px;
        opacity: 0.3;
        background: #1b1d2a;
        border-radius: 1px;
        font-size: 11px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        text-align: left;
        color: #ffffff;
        text-align: center;
      }
      input {
        width: 100%;
        opacity: 0;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 1;
      }
    }
  }
}

.bottom {
  position: fixed;
  bottom: 0;
  padding: 0 15px 34px;
  width: 100%;
  text-align: center;
  .van-button {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    font-size: 16px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
