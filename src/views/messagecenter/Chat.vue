<template>
  <div id="chat">
    <self-header>{{ $route.query.nickName }}</self-header>
    <div class="main">121414</div>
    <div class="comment-textarea">
      <van-field v-model="comment" rows="1" autosize label type="textarea" placeholder="请输入......" />
      <span @click="articleComment">发送</span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import selfButton from "@/components/button";
import {
  Image,
  List,
  Popup,
  Dialog,
  ShareSheet,
  Cell,
  CellGroup,
  Button,
  Field
} from "vant";
export default {
  components: {
    "van-image": Image,
    "self-button": selfButton,
    "van-list": List,
    "van-share-sheet": ShareSheet,
    "van-popup": Popup,
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button,
    "van-field": Field
  },
  data() {
    return {
      comment: ''
    };
  },
  computed: {

  },
  watch: {},
  methods: {
    articleComment() {
      // let anchor = document.createElement('a')
      // anchor.setAttribute('id', 'topAnchor')
      // document.body.appendChild(anchor);
      // anchor.click()
      // document.body.removeChild(anchor);
      this.$ajax
        .post("api/front/articles/articlesCommentOrReplay.json", {
          articlesId: this.$route.query.id,
          content: this.comment,
          type: "Comment"
        })
        .then(() => {
          this.commentShow = false;
          this.commentInit();
          this.$toast("评论成功");
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style  lang="scss" scoped>
#chat {
  padding-top: 58px;
  padding-bottom: 74px;
  height: 100%;
  background: #f4f4f4;
}
.main {
  padding: 20px 15px;
}
.comment-textarea {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  .van-cell {
    width: 300px;
    background: #f4f4f4;
  }
  > span {
    width: 48px;
    height: 26px;
    margin-left: 20px;
    background: #fdd004;
    border-radius: 5px;
    font-size: 13px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #333333;
    text-align: center;
    line-height: 26px;
  }
}
</style>