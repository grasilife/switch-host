// import { Hash } from "@/utils/generateHash";
// import { message, notification } from "ant-design-vue";
const state = {
  proxyList: [],
  whiteList: [
    {
      name: "resource.xesv5.com",
      id: "wgGdIBNcRtVnNWfuU5IF3h1Dql4hzLLf"
    },
    {
      name: "admin.xesv5.com",
      id: "3ZXNGcFIrCmRPjxKA8WX5qgAH5s_6YD0"
    }
  ],
  switchIndex: {
    name: "灰度环境",
    address: "124.250.113.18",
    id: "wgGdIBNcRtVnNWfuU5IF3h1Dql4hzLLf",
    state: true
  },
  gatewayList: [
    {
      name: "灰度环境",
      address: "124.250.113.18",
      id: "wgGdIBNcRtVnNWfuU5IF3h1Dql4hzLLf",
      state: true
    },
    {
      name: "测试环境",
      address: "120.52.32.211",
      id: "3ZXNGcFIrCmRPjxKA8WX5qgAH5s_6YD0",
      state: false
    }
  ]
};
const mutations = {
  updateProxyList(state, paylod) {
    state.proxyList = paylod;
  },
  gatewayRemove(state, paylod) {
    console.log(paylod, "paylod");
    let target = null;
    for (let i = 0; i < state.gatewayList.length; i++) {
      if (paylod.name == state.gatewayList[i].name) {
        target = i;
        break;
      }
    }
    console.log(target, "target");
    if (target != null) {
      console.log(state.gatewayList, target, "jahuhauhuauh");
      state.gatewayList.splice(target, 1);
    }
  },
  gatewayDdd(state, paylod) {
    state.gatewayList.push(paylod);
  },
  gatewayEdit(state, paylod) {
    console.log(paylod, "修改");
    state.gatewayList[paylod.index].name = paylod.data.name;
    state.gatewayList[paylod.index].address = paylod.data.address;
  },
  envSwitchChange(state, paylod) {
    state.switchIndex = { ...paylod };
  },
  whiteListRemove(state, paylod) {
    console.log(paylod, "paylod");
    let target = null;
    for (let i = 0; i < state.whiteList.length; i++) {
      if (paylod.name == state.whiteList[i].name) {
        target = i;
        break;
      }
    }
    if (target != null) {
      console.log(state.whiteList, target, "jahuhauhuauh");
      state.whiteList.splice(target, 1);
    }
  },
  whiteListEdit(state, paylod) {
    state.whiteList[paylod.index].name = paylod.data.name;
  }
};
const actions = {};
const getters = {};
// namespaced 属性，限定命名空间
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
