<template>
  <div class="comp-templete-list">
    <a-button type="primary" @click="downloadJson">
      导出数据
    </a-button>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import { mapState } from "vuex";
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

  computed: {
    ...mapState({
      proxyList: state => {
        return state.views.app.proxyList;
      },
      switchState: state => {
        return state.views.app.switchState;
      },
      whiteList: state => {
        return state.views.app.whiteList;
      },
      gatewayList: state => {
        return state.views.app.gatewayList;
      }
    })
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    // 导出生成json文件
    downloadJson() {
      let data = {
        whiteList: this.whiteList,
        proxyList: this.proxyList,
        gatewayList: this.gatewayList
      };
      var blob = new Blob([JSON.stringify(data)], { type: "" });
      saveAs(blob, "switchHost.json");
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped></style>
