<template>
  <div>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="tp-ct-box">
          <p class="tp-ct-title" id="topAnchor">
            热门评论({{ totalElements || 0 }})
          </p>
          <div class="tp-ct-list" v-for="item in list" :key="item.id">
            <div class="tp-ct-item">
              <div class="tp-ct-head">
                <img :src="item.memberDto.headImgPath" />
              </div>
              <div class="tp-ct-rt">
                <div class="tp-ct-info">
                  <div class="tp-ct-nm">
                    <span>{{ item.memberDto.nickName }}</span>
                  </div>
                  <div class="tp-ct-jb">
                    <span
                      v-if="item.whetherDelete"
                      style="color:#333333;font-size:14px;"
                      @click="onSelect(item.id)"
                      >删除</span
                    >
                    <span
                      v-else
                      @click="
                        selectedItem = item
                        modal.complaint = true
                      "
                      >举报</span
                    >
                  </div>
                </div>
                <div class="tp-ct-lt">{{ item.content }}</div>
                <div class="tp-ct-time">
                  <div>
                    <span>{{ item.commentDate }}</span>
                  </div>
                  <div class="operate">
                    <div class="message">
                      <img
                        src="../assets/img/home/information.png"
                        @click="
                          commemtType = 2
                          selectedItem = item
                          commentShow = true
                        "
                      />
                      <span>{{ item.replyCount }}</span>
                    </div>
                    <div class="support">
                      <img
                        src="../assets/img/home/icon-support1-hover@2x.png"
                        @click="unSupport(item)"
                        v-if="item.whetherLikes"
                      />
                      <img
                        src="../assets/img/home/icon-support1@2x.png"
                        @click="support(item)"
                        v-else
                      />
                      <span>{{ item.likesCount }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>

    <van-popup v-model="commentShow" position="bottom">
      <div class="comment-textarea">
        <van-field
          v-model="comment"
          rows="2"
          autosize
          label=""
          type="textarea"
          placeholder="写评价"
        />
        <span @click="articleCommentBefore">发送</span>
      </div>
    </van-popup>
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

<style lang="scss" scoped></style>
