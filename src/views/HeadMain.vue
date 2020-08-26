<template>
  <div id="head-wrap">
    <self-header>{{$route.meta.title}}</self-header>
    <router-view></router-view>
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

<style lang="scss" scoped>
#head-wrap {
  position: relative;
  padding-top: 52px;
}
</style>
