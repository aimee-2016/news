<template>
  <div>
    <div class="tp-head">
      <div @click="$router.push('/topic/')">
        <img src="../assets/img/topic/back.png" />
      </div>
      <div>
        <span>{{topicDetails.title}}</span>
      </div>
      <div>
        <img src="../assets/img/topic/icon1.png" />
      </div>
    </div>
    <div class="tp-">
        <div>
            <img :src="topicDetails.imagePathsStr" />
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        topicDetails: {}
    };
  },
  created() {
      this.queryTopicById();
  },
  methods: {
    queryTopicById() {
      this.$ajax
        .post("api/front/articles/findArticlesTopicDetails.json", {
          id: this.$route.query.id
        })
        .then(res => {
          this.topicDetails = res.data;
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.tp-head {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  margin: 14px 0;
  color: #333333;
  font-size: 17px;
}
</style>