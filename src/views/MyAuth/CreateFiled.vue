<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span> 选择创作领域</span>
      <i class="right-text" @click="zoneSubmit()"> 确定</i>
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
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button, Icon, Popup, Image,Dialog} from "vant";
export default {
  data() {
    return {
      lableList: [],
      endZoneId: '',
      endZoneName: ''
    }
  },
  created() {
    this.getLabelList()
  },
  mounted() {

  },
  methods: {
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
      if(!this.endZoneId) {
        this.$toast('请先选择创作领域')
        return false
      }
      Dialog.confirm({
          title: `确定要申请${this.endZoneName}领域的标签认证吗？`,
          confirmButtonColor: "rgb(255, 203, 0)",
        })
          .then(() => {
            this.$ajax
            .post("api/front/member/applyLabel.json",{
              applyLabelType: this.$route.query.type,
              columnId: this.endZoneId
            })
            .then(res => {
              this.$router.push('/applystatus/')
            }).catch(error=> {
              this.$toast(error)
            });
          })
    }
  },
  computed: {
      userInfo() {
      return this.$store.state.userInfo;
    }
  },
  watch: {

  },
  components: {
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button,
    "van-icon": Icon,
    "van-popup": Popup,
    "van-image": Image
  }
}
</script>

<style lang="scss" scoped>
#container {
  padding-top: 58px;
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
</style>
