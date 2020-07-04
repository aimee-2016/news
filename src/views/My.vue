<template>
  <div>
    <div class="signin">
      <ul>
        <li>10</li>
        <li>10</li>
        <li>10</li>
        <li>10</li>
        <li>10</li>
        <li>10</li>
        <li>10</li>
      </ul>
    </div>
    <ul class="handle">
      <li>
        <div class="img-b">
          <img src="../assets/img/my/icon-collection.png" alt />
        </div>
        <span>收藏</span>
      </li>
      <li>
        <div class="img-b">
          <img src="../assets/img/my/icon-history.png" alt />
        </div>
        <span>历史</span>
      </li>
      <li>
        <div class="img-b">
          <img src="../assets/img/my/icon-comment.png" alt />
        </div>
        <span>评论</span>
      </li>
      <li>
        <div class="img-b">
          <img src="../assets/img/my/icon-support.png" alt />
        </div>
        <span>点赞</span>
      </li>
    </ul>
    <van-cell-group>
      <van-cell icon="envelop-o" title="消息中心" is-link url="/vant/mobile.html" />
      <van-cell icon="edit" title="反馈帮助" is-link to="index" />
      <van-cell icon="setting-o" title="系统设置" is-link url="/vant/mobile.html" />
      <van-cell icon="info-o" title="关于我们" is-link to="index" />
    </van-cell-group>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup } from "vant";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
  components: {
    "van-cell-group": CellGroup,
    "van-cell": Cell
  }
};
</script>

<style lang="scss" scoped>
.handle {
  display: flex;
  justify-content: space-between;
  margin: 10px 14px;
  padding: 15px 36px;
  background: #ffffff;
  box-shadow: 0px 1px 10px 0px rgba(4, 0, 0, 0.1);
  .img-b {
    display: flex;
    align-items: center;
    height: 26px;
    img {
      width: 25px;
    }
  }

  span {
    display: block;
    margin-top: 10px;
  }
}
</style>
