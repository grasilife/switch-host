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
      }
    })
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    click(item) {
      this.$store.commit("views/app/envSwitchChange", item);
      this.$emit("click", item);
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped></style>
