<template>
  <div class="SwitchComponent">
    <a-list bordered :data-source="gatewayList">
      <a-list-item slot="renderItem" slot-scope="item">
        <div>{{ item.name }}</div>
        <div>
          <a-switch
            :checked="item.id == switchIndex.id"
            checked-children="开"
            un-checked-children="关"
            @click="click(item)"
          />
        </div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Proxy } from "@/utils/proxy";
export default {
  name: "SwitchComponent",

  props: {},

  mixins: [],

  components: {},

  data() {
    return {};
  },

  computed: {
    ...mapState({
      gatewayList: state => {
        return state.views.app.gatewayList;
      },
      switchIndex: state => {
        return state.views.app.switchIndex;
      },
      proxyList: state => {
        return state.views.app.proxyList;
      },
      switchState: state => {
        return state.views.app.switchState;
      }
    })
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    doProxy(hostList) {
      if (this.switchState) {
        Proxy.setProxy(hostList);
      } else {
        Proxy.cancelProxy();
      }
    },
    click(item) {
      this.$store.commit("views/app/envSwitchChange", item);
      this.$emit("click", item);
      this.doProxy(this.proxyList);
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped></style>
