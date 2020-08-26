<template>
  <div class="container">
    <self-header>{{ $route.query.title }}</self-header>
    <van-cell
      :value="item.problemTitle"
      v-for="(item, index) in list"
      :key="index"
      is-link
      @click="toDetail(item)"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell} from "vant";
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
this.getList()
  },
  mounted() {

  },
  methods: {
    getList() {
      this.$ajax
        .post("api/front/help/findHelpPageByCondition.json", {EQ_problemClassificationId: this.$route.query.id})
        .then(res => {
          this.list = res.data.content;
          console.log(this.list)
        })
        .catch((error)=> {
          console.log(error);
        });
    },
    toDetail(item) {
      this.$router.push({path: '/questiondetail',query: {id:item.id}})
    },
  },
  computed: {

  },
  watch: {

  },
  components: {
    "van-cell": Cell,
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 58px ;
}
</style>
