<template>
  <div class="WhiteList">
    <a-table
      :columns="whiteListColumns"
      :data-source="whiteList"
      :pagination="false"
      bordered
      rowKey="domin"
    >
    </a-table>
  </div>
</template>

<script>
import { Storage } from "@/utils/storage";
export default {
  name: "WhiteList",

  props: {},

  mixins: [],

  components: {},

  data() {
    return {
      whiteList: [],
      whiteListColumns: [
        {
          title: "domain白名单",
          dataIndex: "domain",
          ellipsis: true,
          align: "center"
        }
      ]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    if (Storage.get("whiteList")) {
      this.whiteList = Storage.get("whiteList");
    }
  },

  destroyed() {},

  methods: {}
};
</script>

<style lang="less" rel="stylesheet/less" scoped></style>
