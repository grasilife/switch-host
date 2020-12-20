<template>
  <div class="SwitchComponent">
    <a-list bordered :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <div>{{ item.name }}</div>
        <div>
          <a-switch
            :checked="item.address == switchkey"
            checked-children="开"
            un-checked-children="关"
            @change="change(item)"
          />
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  name: "SwitchComponent",

  props: {
    data: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    }
  },

  mixins: [],

  components: {},

  data() {
    return {
      switchkey: "online"
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    change(item) {
      this.$emit("change", item);
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped></style>
