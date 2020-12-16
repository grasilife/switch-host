<template>
  <div class="page-popup">
    <Card>
      <div slot="title" class="titleContiner">
        <img src="../assets/切换.png" alt="" class="image" />
        <div class="title">环境切换</div>
        <div class="switch">
          <i-switch size="large" on-change="switchChange" v-model="switchState">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </div>
      </div>
      <div style="text-align:center">
        <img src="../assets/logo.png" />
        <h3>A high quality UI Toolkit based on Vue.js</h3>
      </div>
    </Card>
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
    return {
      switchState: false
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    switchChange() {
      console.log(this.switchState);
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.page-popup {
  width: 400px;
  height: 500px;
  background: #eee;
  padding: 6px 6px 6px 6px;
  .titleContiner {
    height: 32px;
    .image {
      width: 32px;
      height: 32px;
      float: left;
    }
    .title {
      height: 32px;
      line-height: 32px;
      float: left;
      padding: 0px 12px 0px 12px;
    }
    .switch {
      height: 32px;
      float: right;
      line-height: 32px;
    }
  }
}
</style>
