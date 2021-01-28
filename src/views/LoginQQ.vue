<template>
  <div>123131313</div>
</template>

<script type="text/ecmascript-6">
// import axios from "axios";
import { Icon,Form,Field,Button,Picker,Popup,Toast } from "vant";
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      
    };
  },
  created() {
    this.qqLogin()
  },
  mounted() {},
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    qqLogin() {
      if (QC.Login.check()) {//检查是否登录
        console.log("已经登录");
        QC.Login.getMe((openId, accessToken)=> {
        this.handleLogin({accessToken:accessToken,loginType:'QQ'}).then(() => {
          this.getUserInfo().then(() => {
            this.$router.push({
              name: '/home'
            })
          })
        }).catch((error)=> {
            Toast(error.message)
          })
      });
      } else {
        console.log("登录失败");
        // this.$router.push({
        //       name: '/login'
        //     })
      }
    }
  },
  computed: {},
  watch: {
  },
  components: {
    "van-icon": Icon,
    "van-form": Form,
    "van-field": Field,
    "van-button": Button,
    "van-picker": Picker,
    "van-popup": Popup
  },
  destroyed() {
  }
};
</script>

<style lang="scss" scoped>

</style>
