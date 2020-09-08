<template>
  <div>
    <div class="container">
      <h3>积分说明</h3>
      <div class="content">
        <p>用户除第一次关注公众号可得20积分外，每日签到都可以得到5积分的奖励哦。</p>
        <p>积分的使用：</p>
        <p>1、积分可以用来参加柬途网定期举行的抽奖活动，</p>
        <p>2、积分还可以兑换积分商城里的商品，当积分达到商品可兑换的数额时即可兑换。</p>
        <p>3、实物奖品需留下电话、姓名和地址，方便我们邮寄礼品到您的住址。</p>
        <p>4、电话费兑换时，会弹出对应运营商的兑换编码，用户使用电话拨打收到的编码即可获得相应额度的话费。</p>
        <p>在线客服</p>
        <p>目前活动内容仅针对柬埔寨用户进行，如有不便，深感抱歉。</p>
        <p>如有出现意外情况，出现无法兑换的现象请及时与客服联系，</p>
        <p>联系方式：公众号直接回复消息或发邮件至jiantuwangwl@gmail.com</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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

  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px 15px 0;
  h3 {
    position: relative;
    margin-bottom: 18px;
    padding-left: 5px;
    font-size: 18px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    color: #333334;
    line-height: 18px;
    &::before {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      display: block;
      width: 80px;
      height: 4px;
      background: #fdd004;
      // border: 4px solid #fdd004;
      border-radius: 2px;
    }
  }
  .content {
    font-size: 15px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #333333;
    line-height: 24px;
  }
}
</style>
