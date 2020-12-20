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
      <div>
        <div class="tabContainer">
          <a-tabs @change="tabClick" v-model="tabState">
            <a-tab-pane key="switch" tab="切换"> </a-tab-pane>
            <a-tab-pane key="whiteList" tab="白名单"> </a-tab-pane>
            <a-tab-pane key="gateway" tab="网关"> </a-tab-pane>
            <a-tab-pane key="commonHost" tab="公共host"> </a-tab-pane>
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
import { Storage } from "@/utils/storage";
import { Proxy } from "@/utils/proxy";
import SwitchComponent from "@/components/SwitchComponent";
import WhiteList from "@/components/WhiteList";
import GatewayHandle from "@/components/GatewayHandle";
import CommonHost from "@/components/CommonHost";
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

  mounted() {
    // console.log(Hash.create(32), "generateHash");
    // let ppp = this.getDomain("http://admin.xesv5.com/admin");
    // console.log(ppp, "ppp");
    // let domain = document.domain;
    // //如果在白名单则打开
    // for (let i = 0; i < this.blackList.length; i++) {
    //   if (domain == this.blackList[i].domain) {
    //     this.switchState = true;
    //     // this.setProxy(true);
    //   }
    // }
  },

  destroyed() {},

  methods: {
    doProxy(hostList) {
      if (this.switchState) {
        Proxy.setProxy(hostList);
      } else {
        Proxy.cancelProxy();
      }
    },

    switchChange() {
      let list = [
        {
          isOpen: true,
          domain: this.getDomain("http://admin.xesv5.com/admin"),
          ip: "120.52.32.211"
        }
      ];
      this.doProxy(list);

      let thisp = this;
      console.log(this.switchState);
      //将该域名加到白名单
      let domain = document.domain;
      if (this.switchState == true) {
        let obj = {
          domain: domain
        };
        console.log(this.blackList, "this.blackList");
        //重复的就不添加了
        let target = null;
        for (let i = 0; i < thisp.blackList.length; i++) {
          if (domain == thisp.blackList[i].domain) {
            target = i;
          }
        }
        if (target == null) {
          thisp.blackList.push(obj);
        }
      } else {
        //删除
        let target = null;
        for (let i = 0; i < thisp.blackList.length; i++) {
          if (domain == thisp.blackList[i].domain) {
            target = i;
          }
        }
        thisp.blackList.splice(target, 1);
      }
      Storage.set("blackList", this.blackList);
      //   this.setProxy(true);
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
