<template>
  <div class="page-popup">
    <div class="titleContiner">
      <img src="../assets/切换.png" alt="" class="image" />
      <div class="title">环境切换</div>
      <div class="switch">
        <a-switch
          v-model="switchState"
          checked-children="开"
          un-checked-children="关"
          @change="switchChange"
        />
      </div>
    </div>
    <a-card :bordered="false" class="card">
      <div style="text-align:center">
        <div class="tabContainer">
          <a-tabs @change="tabClick" v-model="tabState">
            <a-tab-pane key="switch" tab="切换"> </a-tab-pane>
            <a-tab-pane key="blackList" tab="白名单"> </a-tab-pane>
            <a-tab-pane key="gateway" tab="网关"> </a-tab-pane>
          </a-tabs>
        </div>
        <div class="container">
          <div class="list" v-show="tabState == 'switch'">
            <a-list bordered :data-source="list">
              <a-list-item slot="renderItem" slot-scope="item">
                <div>{{ item.label }}</div>
                <div>
                  <a-switch
                    :checked="item.value == switchkey"
                    checked-children="开"
                    un-checked-children="关"
                    @change="envSwitchChange(item)"
                  />
                </div>
              </a-list-item>
            </a-list>
          </div>
          <div class="list" v-show="tabState == 'blackList'">
            <img src="../assets/logo.png" />
            <h3>A high quality UI Toolkit based on Vue.js</h3>
          </div>
          <div class="list" v-show="tabState == 'gateway'">
            网关
          </div>
        </div>
      </div>
    </a-card>
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
      switchkey: "online",
      switchState: false,
      tabState: "switch",
      list: [
        {
          label: "正式环境",
          value: "online"
        },
        {
          label: "灰度环境",
          value: "gray"
        },
        {
          label: "测试环境",
          value: "dev"
        }
      ]
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    envSwitchChange(item) {
      this.switchkey = item.value;
    },
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
  width: 380px;
  //   height: 500px;
  background: #e8eaec;
  padding: 0px 8px 8px 8px;
  .titleContiner {
    height: 52px;
    padding: 8px 0px 0px 0px;

    width: 100%;
    // float: left;
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
    // height: calc(100% - 60px);
    width: 100%;
    overflow: auto;
    // float: left;
    .tabContainer {
      height: 52px;
      width: 100%;
    }
    .container {
      //   height: calc(100% - 52px);
      width: 100%;
      .title {
        text-align: left;
      }
    }
  }
}
</style>
