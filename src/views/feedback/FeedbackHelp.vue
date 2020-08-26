<template>
  <div>
    <div style="background:#F3F3F3">
      <van-cell-group title="常见问题">
        <van-cell
          :value="item.problemTitle"
          v-for="(item, index) in list"
          :key="index"
          @click="toDetail(item)"
        />
      </van-cell-group>
      <van-cell-group title="问题分类">
        <van-cell
          :value="item.name"
          v-for="(item, index) in list1"
          :key="index"
          @click="toList(item)"
        />
      </van-cell-group>
    </div>

    <div class="btn-wrap">
      <van-button type="primary" class="btn1">反馈历史</van-button>
      <van-button type="primary" class="btn2" @click="$router.push('/feedback')">意见反馈</van-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Button } from "vant";
export default {
  data() {
    return {
      list: [],
      list1: []
    }
  },
  created() {
    this.getList()
    this.getList1()
  },
  mounted() {

  },
  methods: {
    getList() {
      this.$ajax
        .post("api/front/help/findHelpPageByCondition.json", {EQ_whetherCommon: true})
        .then(res => {
          this.list = res.data.content;
        })
        .catch((error)=> {
          console.log(error);
        });
    },
    getList1() {
      this.$ajax
        .post("api/front/help/findProblemTypeListByCondition.json", {})
        .then(res => {
          this.list1 = res.data;
        })
        .catch((error)=> {
          console.log(error);
        });
    },
    toDetail(item) {
      this.$router.push({path: '/questiondetail',query: {id:item.id}})
    },
    toList(item) {
      this.$router.push({path: '/questionlist',query: {id:item.id,title:item.name}})
    }
  },
  computed: {

  },
  watch: {

  },
  components: {
    "van-cell-group": CellGroup,
    "van-cell": Cell,
    "van-button": Button
  }
}
</script>

<style lang="scss" scoped>
.btn-wrap {
  padding: 45px 56px 0;
  display: flex;
  justify-content: space-between;
  .btn1 {
    background: #f5f7f9;
    color: #333333;
    border: none;
  }
  .btn2 {
    background: #ffdc22;
    color: #333333;
    border: none;
  }
}
</style>
