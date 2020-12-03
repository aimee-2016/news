<template>
  <div>
    <div class="no-content">
      <img v-lazy="imgsrc" alt="" />
      <!-- <img v-lazy="item.imagePaths[0]" /> -->
      <p><slot>亲!暂无数据</slot></p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      imgsrc: require('../../assets/img/home/logo@2x.png')
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
  computed: {

  },
  watch: {

  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.no-content {
  padding: 100px 0;
  text-align: center;
  img {
    width: 63px;
    height: 63px;
  }
  p {
    margin-top: 18px;
    font-size: 13px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #666666;
  }
}
</style>
