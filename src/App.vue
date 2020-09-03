<template>
  <div id="app" style="height:100%">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data () {
    return {
    };
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["getUserInfo"]),
    init() {
      if (this.$store.state.token && !this.userInfo) {
        this.getUserInfo();
      }
    },
  }
}
</script>
<style lang='scss' scoped>
 #app {
  background: #fff;
}
// #main {
//   height: inherit;
// } 
//  #app::-webkit-scrollbar {
//     display: none;
// } 
</style>

