<template>
  <div class="page-popup">
    <div class="titleContiner">
      <img src="../assets/切换.png" alt="" class="image" />
      <div class="title">环境切换</div>
      <div class="switch">
        <i-switch size="large" @on-change="switchChange" v-model="switchState">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </div>
    </div>
    <Card class="card">
      <div style="text-align:center">
        <div class="tabContainer">
          <Tabs value="name1" v-model="tabState" @on-click="tabClick">
            <TabPane label="切换" name="switch"></TabPane>
            <TabPane label="白名单" name="blackList"></TabPane>
          </Tabs>
        </div>
        <div class="container">
          <div class="list" v-show="tabState == 'switch'">
            switch
          </div>
          <div class="list" v-show="tabState == 'blackList'">
            <img src="../assets/logo.png" />
            <h3>A high quality UI Toolkit based on Vue.js</h3>
          </div>
        </div>
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
      switchState: false,
      tabState: "switch"
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
    },
    tabClick() {
      console.log(this.tabState);
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.page-popup {
  width: 400px;
  height: 500px;
  background: #eee;
  padding: 0px 8px 0px 8px;
  .titleContiner {
    height: 52px;
    padding: 8px 0px 0px 0px;
    width: 100%;
    float: left;
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
  .card {
    height: calc(100% - 60px);
    width: 100%;
    overflow: auto;
    float: left;
    .tabContainer {
      height: 52px;
      width: 100%;
    }
    .container {
      height: calc(100% - 52px);
      width: 100%;
    }
  }
}
</style>
