<template>
  <div id="app" style="height:100%">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
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
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
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
