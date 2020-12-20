// import { Hash } from "@/utils/generateHash";
// import { message, notification } from "ant-design-vue";
const state = {
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
