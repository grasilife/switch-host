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
            @change="envSwitchChange(item)"
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
    envSwitchChange(item) {
      this.switchkey = item.address;
      for (let i = 0; i < this.gatewayList.length; i++) {
        if (item.name == this.gatewayList[i].name) {
          this.gatewayList[i].state = true;
        } else {
          this.gatewayList[i].state = false;
        }
      }
      Storage.set("gatewayList", this.gatewayList);
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped></style>
