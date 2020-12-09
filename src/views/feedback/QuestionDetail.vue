<template>
  <div class="container">
    <h3>{{ details.problemTitle }}</h3>
    <div class="content" v-html="details.content">
    </div>
    <div class="btn-wrap">
      <div class="btn" @click="support(1)">
        <i class="icon"></i>
        <span>有用</span>
      </div>
      <div class="btn" @click="support(2)">
        <i class="icon"></i>
        <span>没用</span>
      </div>
    </div>
    <div class="bottom">
      仍无法解决？点击 <span @click="$router.push('/feedback/')">意见反馈</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      details: null
    }
  },
  created() {
    this.getDetails()
  },
  mounted() {

  },
  methods: {
    getDetails() {
      this.$ajax
        .post('api/front/help/findHelpById.json', {
          id: this.$route.query.id,
        })
        .then((res) => {
          this.details = res.data
        })
    },
    support(type) {
      this.$ajax
        .post('api/front/help/createOrUpdateHelpUseful.json', {
          helpId: this.$route.query.id,
          whetherUseful: type===1?true:false
        })
        .then(() => {
          this.$toast('操作成功')
        }).catch((error)=> {
          this.$toast(error.message)
        });
    },
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
    padding-left: 14px;
    font-size: 18px;
    font-family: PingFang SC Bold, PingFang SC Bold-Bold;
    font-weight: 700;
    color: #333334;
    line-height: 18px;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 5px;
      height: 18px;
      background: #ffdc22;
    }
  }
  .content {
    font-size: 15px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #333333;
    line-height: 23px;
  }
  .btn-wrap {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    .btn {
      width: 88px;
      height: 37px;
      border: 1px solid #a7a7a7;
      border-radius: 19px;
      text-align: center;
      i {
        display: inline-block;
        margin-right: 6px;
        width: 17px;
        height: 17px;
        vertical-align: -3px;
      }
      span {
        font-size: 14px;
        font-family: PingFang SC Medium, PingFang SC Medium-Medium;
        font-weight: 500;
        color: #666666;
        line-height: 34px;
      }
      &:first-child {
        margin-right: 50px;
        i {
          background: url('../../assets/img/home/icon-support@2x.png');
          background-size: cover;
        }
        &:hover {
          i {
            background: url('../../assets/img/home/icon-support-hover@2x.png');
            background-size: cover;
          }
        }
      }
      &:last-child {
        i {
          background: url('../../assets/img/home/icon-unsupport@2x.png');
          background-size: cover;
        }
        &:hover {
          i {
            background: url('../../assets/img/home/icon-unsupport-hover@2x.png');
            background-size: cover;
          }
        }
      }
    }
  }
  .bottom {
    position: fixed;
    bottom: 37px;
    left: 0;
    width: 100%;
    font-size: 14px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    text-align: left;
    color: #666666;
    line-height: 23px;
    text-align: center;
    span {
      color: #4a6aa6;
    }
  }
}
</style>
