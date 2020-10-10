<template>
  <div id="container">
    <div id="head">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      <span>添加收获地址</span>
      <i class="right-text" @click="saveAddress">保存</i>
    </div>
    <div class="main">
      <van-field v-model="username" placeholder="请填写联系人" />
      <van-field v-model="tel" placeholder="请填写电话号码" />
      <van-field v-model="address" placeholder="请填写详细地址" />
      <van-field name="switch" label="设置默认地址">
        <template #button>
          <van-switch v-model="switchChecked" active-color="#FDD004" size="25px" />
        </template>
      </van-field>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button, Icon, Popup, Image, Field,Switch } from "vant";
export default {
  data() {
    return {
      username: '',
      tel: '',
      address: '',
      switchChecked: false
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init() {
      if(this.$route.query.id) {
        this.$ajax
        .post("api/front/good/findReceivingAddressListAll.json")
        .then(res => {
          let addressDefault = res.data.filter(item=>Number(this.$route.query.id)===item.id)[0]
          this.username=addressDefault.contactsName
          this.tel=addressDefault.contactsPhone
          this.address=addressDefault.address
          this.switchChecked=addressDefault.whetherDefault
        });
      }
    },
    saveAddress() {
      if(this.$route.query.id) {
        this.modifyAddress()
      } else {
        this.addAddress()
      }
    },
    addAddress() {
      if(!(this.username&&this.tel&&this.address)) {
        this.$toast('请填写完整信息')
      }
      this.$ajax
        .post("api/front/good/createReceivingAddress.json",{address:this.address,contactsName:this.username,contactsPhone:this.tel,whetherDefault:this.switchChecked})
        .then(res => {
          this.$toast('添加收获地址成功');
          this.$router.push('/myaddress/')
        }).catch(error => {
          this.$toast(error.message);
        });
    },
    modifyAddress() {
      if(!(this.username&&this.tel&&this.address)) {
        this.$toast('请填写完整信息')
      }
      this.$ajax
        .post("api/front/good/updateReceivingAddress.json",{id:this.$route.query.id,address:this.address,contactsName:this.username,contactsPhone:this.tel,whetherDefault:this.switchChecked})
        .then(res => {
          this.$toast('修改收获地址成功');
          this.$router.push('/myaddress/')
        }).catch(error => {
          this.$toast(error.message);
        });
    },
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
    "van-image": Image,
    "van-field": Field,
    "van-switch": Switch
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
    top: 16px;
    font-size: 15px;
  }
}
</style>
