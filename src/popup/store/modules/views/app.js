const state = {
  systemId: "personalCenterId"
};
const mutations = {
  changeSystem(state, paylod) {
    state.systemId = paylod.id;
    console.log(paylod, "我擦我擦我擦");
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
