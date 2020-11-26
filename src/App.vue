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
      socket: ''
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
      if (this.$store.state.token) {
        this.heartbeat()
      }
    },
    initheartbeat() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(
          "ws://47.56.186.16:8099/ws?token=" + this.$store.state.token.split(' ')[1]
        );
        // 监听socket连接
        this.socket.onopen = () => {
          console.log("socket连接成功,心跳");
          let params = {
            actionType: 'Heartbeat'
          }
          this.socket.send(JSON.stringify(params))
        };
        // 监听socket错误信息
        this.socket.onerror = () => {
          console.log("连接错误,心跳");
        };
        // 监听socket消息
        this.socket.onmessage = evt => {
    //   let data = JSON.parse(evt.data);
          console.log('ws.js')
        };
      }
    },
    heartbeat() {
      let head = setTimeout(() => {
          this.heartbeat()
        }, 480000);
        this.initheartbeat()
        if (!this.$store.state.token) {
          this.socket.close();
          clearTimeout(head);
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
