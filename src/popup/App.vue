<template>
  <div class="page-popup">
    <div class="titleContiner">
      <img src="../assets/切换.png" alt="" class="image" />
      <div class="title">环境切换</div>
      <div class="switch">
        <a-switch
          :checked="switchState"
          checked-children="开"
          un-checked-children="关"
          @change="switchChange"
        />
      </div>
    </div>
    <a-card :bordered="false" class="card">
      <div>
        <div class="tabContainer">
          <a-tabs @change="tabClick" v-model="tabState">
            <a-tab-pane key="switch" tab="切换"> </a-tab-pane>
            <a-tab-pane key="whiteList" tab="白名单"> </a-tab-pane>
            <a-tab-pane key="gateway" tab="网关"> </a-tab-pane>
            <!-- <a-tab-pane key="commonHost" tab="公共host"> </a-tab-pane> -->
          </a-tabs>
        </div>
        <div class="container">
          <div class="list" v-if="tabState == 'switch'">
            <SwitchComponent></SwitchComponent>
          </div>
          <div class="list" v-if="tabState == 'whiteList'">
            <WhiteList></WhiteList>
          </div>
          <div class="list" v-if="tabState == 'gateway'">
            <GatewayHandle></GatewayHandle>
          </div>
          <div class="list" v-if="tabState == 'commonHost'">
            <CommonHost></CommonHost>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { Proxy } from "@/utils/proxy";
import SwitchComponent from "@/components/SwitchComponent";
import WhiteList from "@/components/WhiteList";
import GatewayHandle from "@/components/GatewayHandle";
import CommonHost from "@/components/CommonHost";
import { mapState } from "vuex";
export default {
  name: "App",

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

  components: {
    SwitchComponent,
    WhiteList,
    GatewayHandle,
    CommonHost
  },

  data() {
    return {
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

  computed: {
    ...mapState({
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
    switchChange(value) {
      this.$store.commit("views/app/changeSwitchState", value);
      this.doProxy(this.proxyList);
    },
    tabClick() {
      console.log(this.tabState);
    }
  }
};
</script>
<style lang="less"></style>
<style lang="less" rel="stylesheet/less" scoped>
.page-popup {
  width: 560px;
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
