<template>
  <div id="head">
    <van-icon name="arrow-left" @click="$router.go(-1)" />
    <span><slot></slot></span>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  Icon,
} from "vant"; 
export default {
  data() {
    return {

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
    "van-icon": Icon,
  }
}
</script>

<style lang="scss" scoped>
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
  .van-icon {
    position: absolute;
    left: 15px;
    top: 18px;
    font-size: 17px;
  }
}
</style>
