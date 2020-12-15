<template>
  <div class="comp-templete-list">
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  name: "Home",

  props: {
    data: {
      type: Array,
      required: false,
      default: function() {
        return [];
      }
    }
  },

  mixins: [],

  components: {},

  data() {
    return {};
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {}
};
</script>

<style lang="less" rel="stylesheet/less" scoped></style>
