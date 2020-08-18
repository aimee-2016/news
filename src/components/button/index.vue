<template>
  <div>
    <button @click="clic()" :class="[size,borderR,disabled?'disabled':'']" :style="{diplay:block?'block':'inline-block',background:disabled?'#E8E8E8':color}" :disabled="disabled"><slot></slot></button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    color: {
        type: String,
        default: '#FDD004'
    },
    round: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    block: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'normal'
    },
  },
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    clic() {
      this.$emit('click')
    }
  },
  computed: {
    borderR() {
      if(this.round) {
        if(this.size==='normal') {
          return 'borderN'
        } else if(this.size==='large'){
          return 'borderL'
        } else {
          return 'border0'
        }
      } else {
        return 'border0'
      }
    }
  },
  watch: {

  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
button {
  border: none;
  text-align: center;
}
.borderN {
  border-radius: 13px;
}
.borderL {
  border-radius: 20px;
}
.normal {
  padding: 0 20px;
  height: 26px;
  background: #fdd004;
  font-size: 12px;
  font-family: PingFang SC Bold, PingFang SC Bold-Bold;
  font-weight: 700;
  color: #333333;
  line-height: 26px;
}
.large {
  padding: 0 40px;
  height: 40px;
  background: #ffdd00;
  font-size: 14px;
  font-family: PingFang SC Bold, PingFang SC Bold-Bold;
  font-weight: 700;
  color: #333333;
  line-height: 40px;
}
.disabled {
  color: #999999;
}
</style>
