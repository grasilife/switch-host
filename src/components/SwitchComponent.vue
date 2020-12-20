<template>
  <div class="SwitchComponent">
    <a-list bordered :data-source="data">
      <div v-for="(item, index) in data" :key="index">
        <div>{{ item.name }}</div>
        <div>
          <a-switch
            :v-model="item.state"
            checked-children="开"
            un-checked-children="关"
            @click="click(item)"
          />
        </div>
      </div>
      <!-- <a-list-item slot="renderItem" slot-scope="item">
        <div>{{ item.name }}</div>
        <div>
          <a-switch
            :v-model="item.state"
            checked-children="开"
            un-checked-children="关"
            @click="click(item)"
          />
        </div>
      </a-list-item> -->
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
    return {};
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    click(item) {
      this.$emit("click", item);
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped></style>
