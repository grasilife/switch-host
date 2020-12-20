<template>
  <div class="comp-templete-list"></div>
</template>

<script>
export default {
  name: "CommonHost",

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
