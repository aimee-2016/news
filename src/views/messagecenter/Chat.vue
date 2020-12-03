<template>
  <div id="chat">
    <self-header>{{ $route.query.nickName }}</self-header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="main">
        <div class="time-tips" v-if="!chatList.length">
          <span>{{ currentTime }}</span>
          <div>现在可以开始聊天了</div>
        </div>

        <ul>
          <li
            v-for="(item, index) in chatList"
            :key="index"
            :class="{ left: !item.whetherOwn, right: item.whetherOwn }"
          >
            <van-image round fit="cover" :src="item.headImgPath" />
            <span class="text">{{ item.content }}</span>
          </li>
        </ul>
      </div>
    </van-pull-refresh>
    <div class="chatContent-textarea">
      <van-field
        v-model="chatContent"
        rows="1"
        autosize
        label
        type="textarea"
        placeholder="请输入......"
      />
      <span @click="setChat">发送</span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import {
  Image,
  Field,
  PullRefresh,
} from "vant";
export default {
  components: {
    "van-image": Image,
    "van-field": Field,
    "van-pull-refresh": PullRefresh,
  },
  data() {
    return {
      chatContent: "",
      page: 1,
      chatList: [],
      isLoading: false,
      currentTime: new Date().getHours() + ":" + new Date().getMinutes(),
      socket:""
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  watch: {},
  methods: {
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(
          "ws://47.56.186.16:8099/ws?token=" + this.$store.state.token.split(' ')[1]
        );
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open() {
      console.log("socket连接成功chat");
    },
    error() {
      console.log("连接错误chat");
    },
    getMessage(msg) {
      let data = JSON.parse(msg.data);
      if (data.data.actionType !== 'Heartbeat') {
          var paramsJie = {
          actionType: "MessageSignIn",
          charRoomId: this.$route.query.receiverMemberId
        }
        if (data.data.pushType === 'Other' && data.data.actionType === 'Chat') {
          this.socket.send(JSON.stringify(paramsJie))
        }
        if(data.code === '200' && data.data.actionType === 'Chat') {
          if (data.data.pushType === 'Server' ) {
            let info = {
                headImgPath: this.userInfo.headImgPath,
                content: this.chatContent,
                whetherOwn: true
              }
            this.chatList.push(info)
            this.chatContent = ''
            this.$nextTick(()=> {
              if(document.body.scrollTop>=0) {
                document.body.scrollTop = document.getElementsByClassName('van-pull-refresh')[0].scrollHeight;
              }
              if(document.documentElement.scrollTop>=0) {
                document.documentElement.scrollTop = document.getElementsByClassName('van-pull-refresh')[0].scrollHeight;
              }
            })
          } else if(data.data.pushType === "Other") {
            let info = {
                whetherOwn: false,
                headImgPath: data.data.headImgPath,
                content: data.data.content
              }
            this.chatList.push(info)
          }
        }
      }
    },
    close() {
      console.log("socket已经关闭chat");
    },
    // 聊天
    setChat() {
      if (this.chatContent === "") {
        this.$toast("请输入回复内容");
        return;
      }
      let params = {
        receiverMemberId: this.$route.query.receiverMemberId,
        content: this.chatContent,
        chatType: "Txt",
        actionType: "Chat",
      };
      this.socket.send(JSON.stringify(params));
    },
    testPromise() {
      return new Promise((resolve, reject) => {
        this.$ajax
          .post("api/front/message/findChatRecordPageByCondition.json", {
            EQ_chatRoomId: this.$route.query.receiverMemberId,
            page: this.page,
            size: 10,
            sort: "pubDate,desc",
          })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    onRefresh() {
      this.page = Math.floor(this.chatList.length/10) + 1
      let sliceNum = 10 - this.chatList.length%10
      this.testPromise().then((res) => {
        this.chatList.unshift(...res.data.content.reverse().slice(0,sliceNum));
        this.isLoading = false;
        if (this.page >= res.data.totalPages) {
          this.isLoading = false;
        }
        this.page++;
      });
    },
  },
  created() {
  },
  mounted() {
    this.init();
  },
};
</script>
<style  lang="scss" scoped>
#chat {
  padding-top: 58px;
  padding-bottom: 74px;
  height: 100%;
  background: #f4f4f4;
}
.chatContent-textarea {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  .van-cell {
    width: 300px;
    background: #f4f4f4;
  }
  > span {
    width: 48px;
    height: 26px;
    margin-left: 20px;
    background: #fdd004;
    border-radius: 5px;
    font-size: 13px;
    font-family: PingFang SC Medium, PingFang SC Medium-Medium;
    font-weight: 500;
    color: #333333;
    text-align: center;
    line-height: 26px;
  }
}
.van-pull-refresh {
  // min-height: 100%;
  background: #f4f4f4;
}
.main {
  padding: 15px 20px 74px;
  .time-tips {
    margin-bottom: 36px;
    text-align: center;
    span {
      display: block;
      margin-bottom: 12px;
      font-size: 15px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
    }
    div {
      display: inline-block;
      padding: 9px 13px;
      background: #e0dfdf;
      border-radius: 5px;
    }
  }
  li {
    display: flex;
    align-items: center;
    margin-bottom: 34px;
    &.left {
      padding-right: 44px;
      .van-image {
        margin-right: 10px;
      }
    }
    &.right {
      flex-direction: row-reverse;
      padding-left: 44px;
      .van-image {
        margin-left: 10px;
      }
    }
    .van-image {
      flex-shrink: 0;
      width: 44px;
      height: 44px;
    }
    .text {
      padding: 16px;
      background: #ffffff;
      border-radius: 5px;
      font-size: 14px;
      font-family: PingFang SC Medium, PingFang SC Medium-Medium;
      font-weight: 500;
      color: #222222;
      line-height: 1.5;
    }
  }
}
</style>