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
/* #app {
  position:absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
}
#main {
  height: inherit;
} */
/* #app::-webkit-scrollbar {
    display: none;
} */
</style>

