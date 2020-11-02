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
        <div class="wrap">
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
          <div class="img-wrap">
            <van-image
              width="100%"
              height="100%"
              lazy-load
              fit='cover'
              :src="imgUrl"
            />
            <label for="image_uploads">{{imgUrl?'换封面':'上传封面'}}</label>
            <input
              type="file"
              id="image_uploads"
              name="image_uploads"
              accept=".jpg, .jpeg, .png"
              class="upload" 
              @change="tirggerFile"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="type">
      <div class="wrap">
        <span class="title">选择视频类型</span>
        <van-icon name="arrow" v-if="!endZoneName" @click="columnShow=true"/>
        <span class="text" v-else>{{endZoneName}}</span>
      </div>
    </div>
    <div class="bottom">
      <van-button color="#DAB728">发布</van-button>
    </div>
    <div class="overlay" v-if="columnShow">
      <div class="column">
        <div class="head">
          <van-icon name="arrow-left" @click="endZoneId = '';endZoneName = '';columnShow=false" />
          <span> 选择创作领域</span>
          <i class="right-text" @click="columnShow=false"> 确定</i>
        </div>
        <div class="main">
          <ul>
            <li
              v-for="(item, index) in lableList"
              :key="index"
              :class="{ selected: item.id === endZoneId }"
              @click="selectZone(item)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Icon, Field, Uploader, Button, Cell,Image } from "vant";
export default {
  data() {
    return {
      message: "",
      num: 0,
      fileList: [],
      title: "",
      content: "",
      imagePath: '',
      contacts: "",
      contactInformation: "",
      email: "",
      capture1: "camcorder",
      result: '',
      imgUrl: '',
      columnShow: false,
      endZoneId: '',
      endZoneName: ''
    };
  },
  created() {
    this.getLabelList()
  },
  mounted() {},
  methods: {
    tirggerFile(event) {
      let file = event.target.files[0];
      let url = "";
      var reader = new FileReader();
      reader.readAsDataURL(file);
      let that = this;
      reader.onload = function(e) {
        url = this.result.substring(this.result.indexOf(",") + 1);
        that.imgUrl = "data:image/png;base64," + url;
      };
      this.afterRead(file)
    },
    afterRead(file) {
      let formdata = new FormData();
      formdata.append("filename", file.name);
      formdata.append("file", file);
      this.$ajax
        .post("api/obs/upload.json", formdata)
        .then((res) => {
          this.imagePath=res.data.viewUrl;
        })
        .catch((error) => {
          this.$toast(error);
        });
    },
    onOversize(file) {
      this.$toast("文件大小不能超过 500kb");
    },
    count(val) {
      this.num = val.length;
    },
    selectType(val) {
      console.log(val);
    },
    submit() {
      if (!(this.title.length > 4 && this.title.length < 31)) {
        this.$toast("请输入标题");
        return false;
      }
      if (!this.content.length) {
        this.$toast("请输入内容");
        return false;
      }
      if (!this.content.length) {
        this.$toast("请选择类型");
        return false;
      }
     
      this.$ajax
        .post("api/front/articles/release.json", {
          title: this.title,
          content: this.content,
          type: "PublishVideo",
          videoImagePath: this.imagePath,
          columnId: this.contacts
        })
        .then(() => {
          this.$toast("提交成功");
          this.$router.push("/myexplosive/");
        })
        .catch((error) => {
          this.$toast(error);
        });
    },
    getLabelList() {
      this.$ajax
        .post("api/front/articles/findArticlesColumnListByCondition.json")
        .then(res => {
          this.lableList = res.data
        });
    },
    selectZone(item){
      this.endZoneId = item.id
      this.endZoneName = item.name
    },
    zoneSubmit() {
      // Dialog.confirm({
      //     title: `确定要申请${this.endZoneName}领域的标签认证吗？`,
      //     confirmButtonColor: "rgb(255, 203, 0)",
      //   })
      //     .then(() => {
      //       this.$ajax
      //       .post("api/front/member/applyLabel.json",{
      //         applyLabelType: this.$route.query.type,
      //         columnId: this.endZoneId
      //       })
      //       .then(res => {
      //         this.$router.push('/applystatus/')
      //       }).catch(error=> {
      //         this.$toast(error)
      //       });
      //     })
    }
  },
  computed: {},
  watch: {},
  components: {
    "van-icon": Icon,
    "van-uploader": Uploader,
    "van-field": Field,
    "van-button": Button,
    "van-cell": Cell,
    "van-image": Image
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
  &::after {
    border-color: #282a37;
  }
}
.top {
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
.type {
  padding: 0 15px;
  .wrap {
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    border-top: 1px solid #282a37;
    border-bottom: 1px solid #282a37;
  }
  .title {
    font-size: 15px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #ffffff;
    line-height: 1;
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
.overlay {
  position: fixed;
  top: 0;
  z-index: 1001;
  width: 100%;
  height: 100%;
  background: #fff;
  text-align: left;
  padding-top: 58px;
  .head {
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
.main {
  padding: 15px 15px 0;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      margin-bottom: 15px;
      margin-right: 10px;
      width: 77px;
      height: 31px;
      background: #f5f5f5;
      border-radius: 3px;
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #333333;
      text-align: center;
      line-height: 31px;
      &:nth-of-type(4n + 4) {
        margin-right: 0;
      }
      &:hover {
        background: #fdd004;
      }
      &.selected {
        background: #fdd004;
      }
    }
  }
}
}
</style>
